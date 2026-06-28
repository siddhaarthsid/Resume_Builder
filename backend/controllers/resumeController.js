const db = require('../db/db');
const templateService = require('../services/templateService');
const pdfService = require('../services/pdfService');

/**
 * GET /api/resume/profile
 * Retrieves the current logged-in user's profile.
 */
async function getProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const result = await db.query(
      'SELECT * FROM resume_profiles WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      // Return a blank template instead of 404 to make frontend rendering simpler
      return res.json({
        name: '',
        email: '',
        phone: '',
        address: '',
        dob: '',
        summary: '',
        education: [],
        experience: [],
        skills: [],
        certifications: []
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching resume profile:', error);
    next(error);
  }
}

/**
 * POST /api/resume/profile
 * Creates or updates the current logged-in user's profile.
 */
async function saveProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const { name, email, phone, address, dob, summary, education = [], experience = [], skills = [], certifications = [] } = req.body;

    const result = await db.query(
      `INSERT INTO resume_profiles (user_id, name, email, phone, address, dob, summary, education, experience, skills, certifications, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8::jsonb, $9::jsonb, $10::jsonb, $11::jsonb, CURRENT_TIMESTAMP)
       ON CONFLICT (user_id) 
       DO UPDATE SET
         name = EXCLUDED.name,
         email = EXCLUDED.email,
         phone = EXCLUDED.phone,
         address = EXCLUDED.address,
         dob = EXCLUDED.dob,
         summary = EXCLUDED.summary,
         education = EXCLUDED.education,
         experience = EXCLUDED.experience,
         skills = EXCLUDED.skills,
         certifications = EXCLUDED.certifications,
         updated_at = CURRENT_TIMESTAMP
       RETURNING *`,
      [
        userId,
        name,
        email,
        phone || null,
        address || null,
        dob || null,
        summary || null,
        JSON.stringify(education),
        JSON.stringify(experience),
        JSON.stringify(skills),
        JSON.stringify(certifications)
      ]
    );

    res.json({
      message: 'Profile saved successfully',
      profile: result.rows[0]
    });
  } catch (error) {
    console.error('Error saving resume profile:', error);
    next(error);
  }
}

/**
 * GET /api/resume/templates
 * Lists all available templates and their metadata.
 */
function getTemplates(req, res) {
  const templates = templateService.getTemplatesList();
  res.json(templates);
}

/**
 * POST /api/resume/generate
 * Generates a PDF of the resume based on the selected template and saves the download entry.
 */
async function generatePdfAction(req, res, next) {
  try {
    const userId = req.user.id;
    const { templateId, consentJobMatching = false } = req.body;

    if (!templateId) {
      return res.status(400).json({ error: 'Template ID is required' });
    }

    // 1. Load the active template
    const template = templateService.getTemplate(templateId);
    if (!template) {
      return res.status(404).json({ error: `Template '${templateId}' not found.` });
    }

    // 2. Fetch the user profile from the database
    const profileResult = await db.query(
      'SELECT * FROM resume_profiles WHERE user_id = $1',
      [userId]
    );

    if (profileResult.rows.length === 0) {
      return res.status(400).json({ error: 'Cannot generate resume without profile data. Please fill out the profile first.' });
    }

    const profileData = profileResult.rows[0];

    // 3. Render HTML template with profile data
    console.log(`[Resume Controller] Rendering template: ${templateId}`);
    const htmlContent = template.render(profileData);

    // 4. Generate PDF buffer using Puppeteer
    const pdfBuffer = await pdfService.generatePdf(htmlContent);

    // 5. Write resume record with the consent flag at the database layer
    console.log(`[Resume Controller] Recording resume download. Consent to job matching: ${consentJobMatching}`);
    await db.query(
      `INSERT INTO resumes (user_id, profile_id, template_id, consent_job_matching, generated_at)
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`,
      [userId, profileData.id, templateId, !!consentJobMatching]
    );

    // 6. Stream the PDF back to the client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="resume_${templateId}.pdf"`);
    res.setHeader('Content-Length', pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('[Resume Controller] Error generating resume PDF:', error);
    next(error);
  }
}

module.exports = {
  getProfile,
  saveProfile,
  getTemplates,
  generatePdf: generatePdfAction
};
