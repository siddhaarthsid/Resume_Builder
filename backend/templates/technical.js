const buildHtmlShell = require('./builder');

const metadata = {
  id: 'technical',
  name: 'Technical Developer',
  description: 'Designed specifically for tech, software developer, and IT roles. Prioritizes key skills, technologies, projects, and certifications in an easy-to-scan grid.',
  thumbnailColor: '#0284c7' // Tech sky blue
};

function render(data) {
  const { name = '', email = '', phone = '', address = '', dob = '', summary = '', education = [], experience = [], skills = [], certifications = [] } = data;

  const style = `
    .resume-box {
      max-width: 750px;
      margin: 0 auto;
      color: #0f172a;
    }
    .header-section {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #0284c7;
      padding-bottom: 12px;
      margin-bottom: 15px;
    }
    .header-title h1 {
      font-size: 24pt;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.02em;
    }
    .header-title p {
      font-size: 11pt;
      color: #0284c7;
      font-weight: 600;
    }
    .header-details {
      text-align: right;
      font-size: 8.5pt;
      color: #475569;
      line-height: 1.5;
    }
    .grid-container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
    }
    .section-title {
      font-size: 11pt;
      font-weight: 700;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
      margin-top: 15px;
      margin-bottom: 8px;
    }
    .summary-p {
      font-size: 9pt;
      line-height: 1.5;
      color: #334155;
      margin-bottom: 10px;
    }
    .history-item {
      margin-bottom: 12px;
    }
    .history-header {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      font-size: 9.5pt;
      color: #0f172a;
    }
    .history-sub {
      font-size: 8.5pt;
      color: #0284c7;
      font-weight: 600;
      margin-bottom: 3px;
    }
    .history-desc {
      font-size: 8.5pt;
      color: #334155;
      line-height: 1.4;
      white-space: pre-line;
    }
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .skill-chip {
      background-color: #eff6ff;
      color: #1e40af;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 8pt;
      font-weight: 600;
      border: 1px solid #bfdbfe;
    }
    .cert-item {
      font-size: 8.5pt;
      color: #334155;
      margin-bottom: 6px;
    }
  `;

  const content = `
    <div class="resume-box">
      <div class="header-section">
        <div class="header-title">
          <h1>${name}</h1>
          <p>Technical Professional</p>
        </div>
        <div class="header-details">
          ${email ? `<div>✉ ${email}</div>` : ''}
          ${phone ? `<div>📞 ${phone}</div>` : ''}
          ${address ? `<div>📍 ${address}</div>` : ''}
          ${dob ? `<div>🎂 DOB: ${dob}</div>` : ''}
        </div>
      </div>

      <div class="grid-container">
        <!-- Main Column (Left) -->
        <div>
          ${summary ? `
            <div class="section-title">Professional Summary</div>
            <p class="summary-p">${summary}</p>
          ` : ''}

          ${experience && experience.length > 0 ? `
            <div class="section-title">Work Experience</div>
            ${experience.map(exp => `
              <div class="history-item">
                <div class="history-header">
                  <span>${exp.position}</span>
                  <span style="font-weight: 500; font-size: 8pt; color: #64748b;">
                    ${exp.startDate || ''} ${exp.endDate ? ` - ${exp.endDate}` : ' - Present'}
                  </span>
                </div>
                <div class="history-sub">${exp.company} &bull; ${exp.location || ''}</div>
                ${exp.description ? `<div class="history-desc">${exp.description}</div>` : ''}
              </div>
            `).join('')}
          ` : ''}

          ${education && education.length > 0 ? `
            <div class="section-title">Education</div>
            ${education.map(edu => `
              <div class="history-item">
                <div class="history-header">
                  <span>${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                  <span style="font-weight: 500; font-size: 8pt; color: #64748b;">
                    ${edu.startDate || ''} ${edu.endDate ? ` - ${edu.endDate}` : ''}
                  </span>
                </div>
                <div class="history-sub">${edu.school}</div>
                ${edu.description ? `<div class="history-desc">${edu.description}</div>` : ''}
              </div>
            `).join('')}
          ` : ''}
        </div>

        <!-- Sidebar Column (Right) -->
        <div>
          ${skills && skills.length > 0 ? `
            <div class="section-title">Skills & Tools</div>
            <div class="skills-grid">
              ${skills.map(skill => {
                const skillStr = typeof skill === 'string' ? skill : (skill.name + (skill.level ? ` (${skill.level})` : ''));
                return `<span class="skill-chip">${skillStr}</span>`;
              }).join('')}
            </div>
          ` : ''}

          ${certifications && certifications.length > 0 ? `
            <div class="section-title" style="margin-top: 20px;">Certifications</div>
            <div>
              ${certifications.map(cert => `
                <div class="cert-item">
                  <strong>${cert.name}</strong><br/>
                  <span style="font-size: 7.5pt; color: #64748b;">${cert.issuer} &bull; ${cert.date || ''}</span>
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;

  return buildHtmlShell({ title: `${name} - Technical Resume`, style, content });
}

module.exports = { metadata, render };
