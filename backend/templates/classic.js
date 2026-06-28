const buildHtmlShell = require('./builder');

const metadata = {
  id: 'classic',
  name: 'Classic Professional',
  description: 'Traditional corporate styling with a clean layout. Perfect for professional and formal applications.',
  thumbnailColor: '#1e293b' // Deep slate
};

function render(data) {
  const { name = '', email = '', phone = '', address = '', summary = '', education = [], experience = [], skills = [], certifications = [] } = data;

  const style = `
    .resume-container {
      max-width: 800px;
      margin: 0 auto;
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      font-size: 24pt;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 5px;
      letter-spacing: -0.02em;
    }
    .contact-info {
      font-size: 9pt;
      color: #475569;
      display: flex;
      justify-content: center;
      gap: 15px;
      flex-wrap: wrap;
    }
    .contact-item {
      display: inline-block;
    }
    .summary-text {
      margin-bottom: 15px;
      font-size: 10pt;
      color: #334155;
      line-height: 1.5;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-weight: 600;
      color: #0f172a;
      font-size: 10.5pt;
      margin-bottom: 2px;
    }
    .item-subheader {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-style: italic;
      color: #475569;
      font-size: 9.5pt;
      margin-bottom: 5px;
    }
    .item-desc {
      font-size: 9.5pt;
      color: #334155;
      margin-bottom: 12px;
      line-height: 1.4;
      white-space: pre-line;
    }
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 15px;
    }
    .skill-tag {
      background: #f1f5f9;
      color: #334155;
      border: 1px solid #e2e8f0;
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 9pt;
      font-weight: 500;
    }
    .cert-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .cert-item {
      border-left: 2px solid #cbd5e1;
      padding-left: 10px;
      margin-bottom: 8px;
    }
    .cert-title {
      font-weight: 600;
      font-size: 9.5pt;
      color: #0f172a;
    }
    .cert-meta {
      font-size: 8.5pt;
      color: #64748b;
    }
  `;

  const content = `
    <div class="resume-container">
      <div class="header">
        <h1>${name}</h1>
        <div class="contact-info">
          ${email ? `<span class="contact-item">${email}</span>` : ''}
          ${phone ? `<span class="contact-item">&bull; ${phone}</span>` : ''}
          ${address ? `<span class="contact-item">&bull; ${address}</span>` : ''}
        </div>
      </div>

      ${summary ? `
        <div class="section-title">Professional Summary</div>
        <div class="summary-text">${summary}</div>
      ` : ''}

      ${experience && experience.length > 0 ? `
        <div class="section-title">Work Experience</div>
        ${experience.map(exp => `
          <div>
            <div class="item-header">
              <span>${exp.position}</span>
              <span>${exp.startDate || ''} ${exp.endDate ? ` - ${exp.endDate}` : ' - Present'}</span>
            </div>
            <div class="item-subheader">
              <span>${exp.company}${exp.location ? `, ${exp.location}` : ''}</span>
            </div>
            ${exp.description ? `<div class="item-desc">${exp.description}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${education && education.length > 0 ? `
        <div class="section-title">Education</div>
        ${education.map(edu => `
          <div>
            <div class="item-header">
              <span>${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
              <span>${edu.startDate || ''} ${edu.endDate ? ` - ${edu.endDate}` : ''}</span>
            </div>
            <div class="item-subheader">
              <span>${edu.school}</span>
            </div>
            ${edu.description ? `<div class="item-desc">${edu.description}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${skills && skills.length > 0 ? `
        <div class="section-title">Skills</div>
        <div class="skills-grid">
          ${skills.map(skill => `
            <span class="skill-tag">${typeof skill === 'string' ? skill : (skill.name + (skill.level ? ` (${skill.level})` : ''))}</span>
          `).join('')}
        </div>
      ` : ''}

      ${certifications && certifications.length > 0 ? `
        <div class="section-title">Certifications</div>
        <div class="cert-grid">
          ${certifications.map(cert => `
            <div class="cert-item">
              <div class="cert-title">${cert.name}</div>
              <div class="cert-meta">${cert.issuer}${cert.date ? ` &bull; ${cert.date}` : ''}</div>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  return buildHtmlShell({ title: `${name} - Resume`, style, content });
}

module.exports = { metadata, render };
