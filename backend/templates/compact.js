const buildHtmlShell = require('./builder');

const metadata = {
  id: 'compact',
  name: 'Compact High-Density',
  description: 'A space-efficient layout designed to pack maximum content onto a single page without sacrificing readability. Ideal for dense work histories.',
  thumbnailColor: '#6b7280' // Neutral gray
};

function render(data) {
  const { name = '', email = '', phone = '', address = '', dob = '', summary = '', education = [], experience = [], skills = [], certifications = [] } = data;

  const style = `
    .resume-box {
      max-width: 750px;
      margin: 0 auto;
      color: #1f2937;
      font-size: 8.5pt;
      line-height: 1.35;
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #374151;
      padding-bottom: 6px;
      margin-bottom: 10px;
    }
    .header-name {
      font-size: 18pt;
      font-weight: 700;
      color: #111827;
      letter-spacing: -0.02em;
    }
    .header-contacts {
      font-size: 8pt;
      color: #4b5563;
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .section-title {
      font-size: 9.5pt;
      font-weight: 700;
      color: #111827;
      border-bottom: 1px solid #d1d5db;
      padding-bottom: 2px;
      margin-top: 10px;
      margin-bottom: 6px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .summary-p {
      color: #374151;
      margin-bottom: 6px;
    }
    .history-item {
      margin-bottom: 6px;
    }
    .history-header {
      display: flex;
      justify-content: space-between;
      font-weight: 700;
      color: #111827;
    }
    .history-sub {
      font-style: italic;
      color: #4b5563;
      margin-bottom: 2px;
    }
    .history-desc {
      color: #374151;
      white-space: pre-line;
    }
    .skills-row {
      color: #374151;
      margin-bottom: 6px;
    }
    .skills-row strong {
      color: #111827;
    }
    .certs-row {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
    }
    .cert-item {
      color: #374151;
    }
  `;

  const content = `
    <div class="resume-box">
      <div class="header-row">
        <div class="header-name">${name}</div>
        <div class="header-contacts">
          ${email ? `<span>${email}</span>` : ''}
          ${phone ? `<span>${phone}</span>` : ''}
          ${address ? `<span>${address}</span>` : ''}
          ${dob ? `<span>DOB: ${dob}</span>` : ''}
        </div>
      </div>

      ${summary ? `
        <div class="section-title">Summary</div>
        <p class="summary-p">${summary}</p>
      ` : ''}

      ${experience && experience.length > 0 ? `
        <div class="section-title">Experience</div>
        ${experience.map(exp => `
          <div class="history-item">
            <div class="history-header">
              <span><strong>${exp.position}</strong> &bull; ${exp.company}</span>
              <span style="font-weight: 500; font-size: 8pt; color: #4b5563;">
                ${exp.startDate || ''} ${exp.endDate ? ` - ${exp.endDate}` : ' - Present'}
              </span>
            </div>
            ${exp.location ? `<div class="history-sub">${exp.location}</div>` : ''}
            ${exp.description ? `<div class="history-desc">${exp.description}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${education && education.length > 0 ? `
        <div class="section-title">Education</div>
        ${education.map(edu => `
          <div class="history-item">
            <div class="history-header">
              <span><strong>${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</strong> &bull; ${edu.school}</span>
              <span style="font-weight: 500; font-size: 8pt; color: #4b5563;">
                ${edu.startDate || ''} ${edu.endDate ? ` - ${edu.endDate}` : ''}
              </span>
            </div>
            ${edu.description ? `<div class="history-desc">${edu.description}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${skills && skills.length > 0 ? `
        <div class="section-title">Skills</div>
        <div class="skills-row">
          ${skills.map(skill => {
            return typeof skill === 'string' ? skill : (skill.name + (skill.level ? ` (${skill.level})` : ''));
          }).join(', ')}
        </div>
      ` : ''}

      ${certifications && certifications.length > 0 ? `
        <div class="section-title">Certifications</div>
        <div class="certs-row">
          ${certifications.map(cert => `
            <div class="cert-item">
              <strong>${cert.name}</strong> (${cert.issuer} &bull; ${cert.date || ''})
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  return buildHtmlShell({ title: `${name} - Compact Resume`, style, content });
}

module.exports = { metadata, render };
