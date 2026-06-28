const buildHtmlShell = require('./builder');

const metadata = {
  id: 'executive',
  name: 'Executive Corporate',
  description: 'A prestigious, structured design featuring a deep blue header and polished serif typography. Perfect for leadership, consulting, and corporate roles.',
  thumbnailColor: '#1e3a8a' // Corporate navy
};

function render(data) {
  const { name = '', email = '', phone = '', address = '', dob = '', summary = '', education = [], experience = [], skills = [], certifications = [] } = data;

  const style = `
    .resume-box {
      max-width: 750px;
      margin: 0 auto;
      color: #1e293b;
      font-family: 'Georgia', serif;
    }
    .header-banner {
      background-color: #0f172a;
      color: #ffffff;
      padding: 24px;
      border-radius: 4px;
      margin-bottom: 20px;
    }
    .header-banner h1 {
      font-size: 24pt;
      font-weight: 700;
      color: #ffffff;
      margin-bottom: 6px;
      font-family: 'Outfit', sans-serif;
    }
    .header-meta {
      font-size: 9pt;
      color: #cbd5e1;
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
      font-family: 'Inter', sans-serif;
    }
    .header-meta span {
      display: inline-flex;
      align-items: center;
    }
    .section-header {
      font-family: 'Outfit', sans-serif;
      font-size: 12pt;
      font-weight: 700;
      color: #1e3a8a;
      border-bottom: 2px solid #1e3a8a;
      padding-bottom: 4px;
      margin-top: 18px;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .summary-p {
      font-size: 10pt;
      line-height: 1.6;
      color: #334155;
      margin-bottom: 12px;
      font-style: italic;
    }
    .history-item {
      margin-bottom: 12px;
    }
    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-weight: 700;
      font-size: 10.5pt;
      color: #0f172a;
      font-family: 'Outfit', sans-serif;
    }
    .history-sub {
      font-size: 9pt;
      font-weight: 600;
      color: #475569;
      margin-bottom: 4px;
      font-family: 'Inter', sans-serif;
    }
    .history-desc {
      font-size: 9.5pt;
      color: #334155;
      line-height: 1.5;
      white-space: pre-line;
    }
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
      font-family: 'Inter', sans-serif;
    }
    .skill-tag {
      background-color: #f1f5f9;
      color: #1e293b;
      padding: 4px 10px;
      border-radius: 4px;
      font-size: 8.5pt;
      font-weight: 500;
      border: 1px solid #e2e8f0;
    }
    .certs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 8px;
      font-family: 'Inter', sans-serif;
    }
    .cert-card {
      font-size: 9pt;
      color: #334155;
      padding: 6px;
      border-left: 3px solid #1e3a8a;
      background-color: #f8fafc;
    }
  `;

  const content = `
    <div class="resume-box">
      <div class="header-banner">
        <h1>${name}</h1>
        <div class="header-meta">
          ${email ? `<span>✉ ${email}</span>` : ''}
          ${phone ? `<span>📞 ${phone}</span>` : ''}
          ${address ? `<span>📍 ${address}</span>` : ''}
          ${dob ? `<span>🎂 DOB: ${dob}</span>` : ''}
        </div>
      </div>

      ${summary ? `
        <div class="section-header">Executive Summary</div>
        <p class="summary-p">${summary}</p>
      ` : ''}

      ${experience && experience.length > 0 ? `
        <div class="section-header">Professional History</div>
        ${experience.map(exp => `
          <div class="history-item">
            <div class="history-header">
              <span>${exp.position}</span>
              <span style="font-weight: 500; font-size: 8.5pt; color: #64748b;">
                ${exp.startDate || ''} ${exp.endDate ? ` - ${exp.endDate}` : ' - Present'}
              </span>
            </div>
            <div class="history-sub">${exp.company}${exp.location ? ` &bull; ${exp.location}` : ''}</div>
            ${exp.description ? `<div class="history-desc">${exp.description}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${education && education.length > 0 ? `
        <div class="section-header">Academic Background</div>
        ${education.map(edu => `
          <div class="history-item">
            <div class="history-header">
              <span>${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
              <span style="font-weight: 500; font-size: 8.5pt; color: #64748b;">
                ${edu.startDate || ''} ${edu.endDate ? ` - ${edu.endDate}` : ''}
              </span>
            </div>
            <div class="history-sub">${edu.school}</div>
            ${edu.description ? `<div class="history-desc">${edu.description}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${skills && skills.length > 0 ? `
        <div class="section-header">Core Competencies</div>
        <div class="skills-container">
          ${skills.map(skill => {
            const skillStr = typeof skill === 'string' ? skill : (skill.name + (skill.level ? ` (${skill.level})` : ''));
            return `<span class="skill-tag">${skillStr}</span>`;
          }).join('')}
        </div>
      ` : ''}

      ${certifications && certifications.length > 0 ? `
        <div class="section-header">Professional Credentials</div>
        <div class="certs-grid">
          ${certifications.map(cert => `
            <div class="cert-card">
              <strong>${cert.name}</strong><br/>
              <span style="font-size: 8pt; color: #64748b;">${cert.issuer} &bull; ${cert.date || ''}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  return buildHtmlShell({ title: `${name} - Executive Resume`, style, content });
}

module.exports = { metadata, render };
