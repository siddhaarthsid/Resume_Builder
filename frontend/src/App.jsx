import React, { useState } from 'react';
import ResumeBuilder from './ResumeBuilder.jsx';
import JobPortal from './components/JobPortal.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('builder'); // 'builder' | 'jobs'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Sticky Header Nav */}
      <header className="header-nav">
        <div className="container nav-content">
          <div className="logo" onClick={() => setCurrentPage('builder')} style={{ cursor: 'pointer' }}>
            <span>📝</span> QuickResume
          </div>
          <nav className="nav-links">
            <button 
              className={`nav-link btn-secondary ${currentPage === 'builder' ? 'active' : ''}`}
              onClick={() => setCurrentPage('builder')}
            >
              Resume Builder
            </button>
            <button 
              className={`nav-link btn-secondary ${currentPage === 'jobs' ? 'active' : ''}`}
              onClick={() => setCurrentPage('jobs')}
            >
              💼 Job Portal
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px 0' }}>
        <div className="container">
          {currentPage === 'builder' ? (
            <>
              <ResumeBuilder onRedirectToJobs={() => setCurrentPage('jobs')} />
              
              {/* Rich SEO Landing Page & Guides Section */}
              <section style={{ marginTop: '60px', paddingTop: '40px', borderTop: '2px solid var(--surface-border)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '15px', color: 'var(--primary)' }}>How to Build a Professional Resume with Our Online Editor</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto 40px auto', fontSize: '1.05rem' }}>
                  Create an outstanding, ATS-compliant CV using our simple builder. Follow professional standards to grab the recruiter's attention and land your dream job interview.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '50px' }}>
                  <div className="glass-card" style={{ background: '#ffffff' }}>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '1.2rem' }}>1. Enter Personal Details & DOB</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      Start by filling out your full name, location, and contact details. Use our 10-digit phone formatter for clean alignment. Add your Date of Birth (DOB) calendar info if applying internationally where it is commonly requested.
                    </p>
                  </div>
                  <div className="glass-card" style={{ background: '#ffffff' }}>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '1.2rem' }}>2. Add Work History & Skills</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      List your career history chronologically. Highlight key achievements, machine certifications, and technical proficiencies. Enter skills separated by commas to automatically create clean, readable chips.
                    </p>
                  </div>
                  <div className="glass-card" style={{ background: '#ffffff' }}>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '12px', fontSize: '1.2rem' }}>3. Pick an ATS-Friendly Design</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      Choose from 7 distinct, professionally designed layouts, including our new <strong>Executive Corporate</strong>, <strong>Technical Developer</strong>, and <strong>Compact High-Density</strong> layouts. Check them out using the <strong>Quick Preview</strong> modal before downloading.
                    </p>
                  </div>
                </div>

                <div className="glass-card" style={{ background: '#ffffff', padding: '30px' }}>
                  <h3 style={{ marginBottom: '20px', color: 'var(--text-primary)', textAlign: 'center' }}>Frequently Asked Questions (FAQ)</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                    <div>
                      <h4 style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '6px' }}>What is an ATS-friendly resume template?</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        An Applicant Tracking System (ATS) scans resume text for matching keywords. Our layouts are carefully structured with native HTML/CSS styles and standard font weights, ensuring that recruitment scanners can parse your details without errors.
                      </p>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '6px' }}>Do I need a database connection to build resumes?</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        No. The editor runs an autosave draft mechanism in the background. If you do not have a PostgreSQL database connected, our mock API server runs a secure in-memory cache fallback, letting you test and generate PDF files immediately.
                      </p>
                    </div>
                    <div>
                      <h4 style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '6px' }}>Is my data secure for job matching?</h4>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                        Yes. When downloading your PDF, you can explicitly opt-in or opt-out of matching features. Only profiles with explicit matching consent are queried at the database layer to suggest jobs.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <JobPortal />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} QuickResume. Built with speed and simplicity in mind.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
