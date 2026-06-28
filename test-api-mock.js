/**
 * API Integration Test Script (with optional DB mock fallback)
 * 
 * This script starts the backend server, overrides the database query layer
 * with an in-memory store if DATABASE_URL is not configured, and runs tests
 * against the Express endpoints to verify the entire system.
 */

const request = require('http');
const path = require('path');

// Configure Mock DB data if no database url is present
const db = require('./backend/db/db');
require('dotenv').config({ path: path.join(__dirname, 'backend/.env') });

const inMemoryDb = {
  profile: null,
  resumes: []
};

if (!process.env.DATABASE_URL) {
  console.log('\n\x1b[36m%s\x1b[0m', 'ℹ️ No DATABASE_URL found. Mocking the DB layer in-memory for testing...');
  
  db.query = async (text, params) => {
    // 1. SELECT * FROM resume_profiles WHERE user_id = $1
    if (text.includes('SELECT * FROM resume_profiles')) {
      return { rows: inMemoryDb.profile ? [inMemoryDb.profile] : [] };
    }
    
    // 2. INSERT INTO resume_profiles
    if (text.includes('INSERT INTO resume_profiles')) {
      const [userId, name, email, phone, address, dob, summary, education, experience, skills, certifications] = params;
      inMemoryDb.profile = {
        id: 101,
        user_id: userId,
        name,
        email,
        phone,
        address,
        dob,
        summary,
        education: JSON.parse(education),
        experience: JSON.parse(experience),
        skills: JSON.parse(skills),
        certifications: JSON.parse(certifications)
      };
      return { rows: [inMemoryDb.profile] };
    }
    
    // 3. INSERT INTO resumes
    if (text.includes('INSERT INTO resumes')) {
      const [userId, profileId, templateId, consentJobMatching] = params;
      const newResume = {
        id: inMemoryDb.resumes.length + 1,
        user_id: userId,
        profile_id: profileId,
        template_id: templateId,
        consent_job_matching: consentJobMatching,
        generated_at: new Date()
      };
      inMemoryDb.resumes.push(newResume);
      return { rows: [newResume] };
    }
    
    // 4. SELECT DISTINCT ON (rp.user_id) ... FROM resumes
    if (text.includes('FROM resumes r')) {
      // Filter resumes by consent_job_matching = true
      const consented = inMemoryDb.resumes.filter(r => r.consent_job_matching);
      // Map to include profile
      const matches = consented.map(r => ({
        profile_id: r.profile_id,
        user_id: r.user_id,
        name: inMemoryDb.profile.name,
        email: inMemoryDb.profile.email,
        phone: inMemoryDb.profile.phone,
        address: inMemoryDb.profile.address,
        summary: inMemoryDb.profile.summary,
        skills: inMemoryDb.profile.skills,
        education: inMemoryDb.profile.education,
        experience: inMemoryDb.profile.experience,
        certifications: inMemoryDb.profile.certifications,
        generated_at: r.generated_at,
        template_id: r.template_id
      }));
      return { rows: matches };
    }
    
    return { rows: [] };
  };
}

// Start Server
const app = require('./backend/app');
const PORT = 5999;
const server = app.listen(PORT, async () => {
  console.log(`Test Server started on port ${PORT}`);
  
  try {
    await runTests();
    console.log('\n\x1b[32m%s\x1b[0m', '✅ ALL INTEGRATION TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('\n\x1b[31m%s\x1b[0m', '❌ TEST RUN FAILED:', err);
  } finally {
    server.close(() => {
      console.log('Test Server stopped.');
      process.exit(0);
    });
  }
});

// Helper to make local http requests
function apiRequest(method, path, body = null, responseType = 'json') {
  return new Promise((resolve, reject) => {
    const req = request.request({
      hostname: 'localhost',
      port: PORT,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    }, (res) => {
      if (responseType === 'binary') {
        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve({
          status: res.statusCode,
          headers: res.headers,
          body: Buffer.concat(chunks)
        }));
      } else {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({
              status: res.statusCode,
              headers: res.headers,
              body: data ? JSON.parse(data) : null
            });
          } catch (e) {
            resolve({ status: res.statusCode, headers: res.headers, body: data });
          }
        });
      }
    });

    req.on('error', (err) => reject(err));
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n--- 1. Testing GET /api/resume/templates ---');
  const tplRes = await apiRequest('GET', '/api/resume/templates');
  console.log('Templates Count:', tplRes.body.length);
  if (tplRes.status !== 200 || !Array.isArray(tplRes.body) || tplRes.body.length < 4) {
    throw new Error('Templates endpoint failed or did not return all 4 templates');
  }
  console.log('Available template IDs:', tplRes.body.map(t => t.id).join(', '));

  console.log('\n--- 2. Testing GET /api/resume/profile (empty check) ---');
  const profEmptyRes = await apiRequest('GET', '/api/resume/profile');
  console.log('Profile Result:', profEmptyRes.body);
  if (profEmptyRes.status !== 200 || typeof profEmptyRes.body.name !== 'string') {
    throw new Error('Profile endpoint failed on empty profile check');
  }

  console.log('\n--- 3. Testing POST /api/resume/profile (save profile) ---');
  const mockProfile = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '555-8888',
    address: 'Austin, TX',
    summary: 'Experienced Warehouse Manager and Logistics Supervisor.',
    skills: ['Forklift Certified', 'OSHA 10 Safety', 'Team Leadership'],
    education: [{ school: 'Austin Community College', degree: 'Associate in Logistics', startDate: '2018', endDate: '2020' }],
    experience: [{ company: 'Apex Distribution', position: 'Shift Supervisor', startDate: '2021', endDate: 'Present', description: 'Managed shift of 15 crew members.' }]
  };
  const profSaveRes = await apiRequest('POST', '/api/resume/profile', mockProfile);
  console.log('Save Response:', profSaveRes.body);
  if (profSaveRes.status !== 200 || !profSaveRes.body.profile) {
    throw new Error('Profile save endpoint failed');
  }

  console.log('\n--- 4. Testing POST /api/resume/generate (with matching consent) ---');
  const genRes = await apiRequest('POST', '/api/resume/generate', {
    templateId: 'modern',
    consentJobMatching: true
  }, 'binary');
  console.log('PDF Status:', genRes.status);
  console.log('Content-Type:', genRes.headers['content-type']);
  console.log('Content-Length:', genRes.headers['content-length']);
  if (genRes.status !== 200 || genRes.headers['content-type'] !== 'application/pdf' || genRes.body.length === 0) {
    throw new Error('PDF generation endpoint failed or did not return binary PDF content');
  }

  console.log('\n--- 5. Testing GET /api/jobs/matches (privacy consent verification) ---');
  const matchesRes = await apiRequest('GET', '/api/jobs/matches');
  console.log('Matches Count:', matchesRes.body.matchesCount);
  console.log('Matched Candidates:', matchesRes.body.candidates.map(c => c.name));
  if (matchesRes.status !== 200 || matchesRes.body.matchesCount !== 1 || matchesRes.body.candidates[0].name !== 'Jane Smith') {
    throw new Error('Job matching privacy query failed or consented candidate not found');
  }
}
