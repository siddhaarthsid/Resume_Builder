const buildHtmlShell = require('./builder');

const metadata = {
  id: 'minimal',
  name: 'Minimalist Clean',
  description: 'An elegant, high-contrast resume style focusing on clean typography and generous whitespace. Fits many fields.',
  thumbnailColor: '#475569' // Slate grey
};

function render(data) {
  const { name = '', email = '', phone = '', address = '', summary = '', education = [], experience = [], skills = [], certifications = [] } = data;

  const style = `
    .resume-box {
      max-width: 750px;
      margin: 0 auto;
      color: #27272a;
    }
    .header-block {
      border-bottom: 1px solid #e4e4e7;
      padding-bottom: 15px;
      margin-bottom: 15px;
    }
    .header-block h1 {
      font-size: 22pt;
      font-weight: 700;
      letter-spacing: -0.03em;
      color: #09090b;
      margin-bottom: 4px;
    }
    .meta-line {
      font-size: 9pt;
      color: #71717a;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .meta-line span {
      display: inline-flex;
      align-items: center;
    }
    .meta-line span:not(:last-child)::after {
      content: '|';
      margin-left: 12px;
      color: #d4d4d8;
    }
    .section-header {
      font-family: 'Outfit', sans-serif;
      font-size: 11pt;
      font-weight: 700;
      color: #09090b;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      margin-top: 15px;
      margin-bottom: 8px;
    }
    .section-header:first-of-type {
      margin-top: 0;
    }
    .summary-p {
      font-size: 9.5pt;
      line-height: 1.5;
      color: #3f3f46;
      margin-bottom: 12px;
    }
    .history-item {
      margin-bottom: 10px;
    }
    .history-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-weight: 600;
      font-size: 9.5pt;
      color: #09090b;
    }
    .history-sub {
      font-size: 8.5pt;
      color: #71717a;
      margin-bottom: 3px;
    }
    .history-desc {
      font-size: 9pt;
      color: #3f3f46;
      line-height: 1.4;
      white-space: pre-line;
    }
    .skills-row {
      font-size: 9pt;
      color: #3f3f46;
      line-height: 1.5;
      margin-bottom: 12px;
    }
    .skills-row strong {
      color: #09090b;
    }
    .certs-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .cert-row {
      display: flex;
      justify-content: space-between;
      font-size: 9pt;
      color: #3f3f46;
    }
    .cert-row strong {
      color: #09090b;
    }
  `;

  const content = `
    <div class="resume-box">
      <div class="header-block">
        <h1>${name}</h1>
        <div class="meta-line">
          ${email ? `<span>${email}</span>` : ''}
          ${phone ? `<span>${phone}</span>` : ''}
          ${address ? `<span>${address}</span>` : ''}
        </div>
      </div>

      ${summary ? `
        <div class="section-header">Summary</div>
        <p class="summary-p">${summary}</p>
      ` : ''}

      ${experience && experience.length > 0 ? `
        <div class="section-header">Experience</div>
        ${experience.map(exp => `
          <div class="history-item">
            <div class="history-header">
              <span>${exp.position}</span>
              <span style="font-weight: 500; font-size: 8.5pt; color: #71717a;">
                ${exp.startDate || ''} ${exp.endDate ? ` - ${exp.endDate}` : ' - Present'}
              </span>
            </div>
            <div class="history-sub">${exp.company}${exp.location ? ` &bull; ${exp.location}` : ''}</div>
            ${exp.description ? `<div class="history-desc">${exp.description}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${education && education.length > 0 ? `
        <div class="section-header">Education</div>
        ${education.map(edu => `
          <div class="history-item">
            <div class="history-header">
              <span>${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
              <span style="font-weight: 500; font-size: 8.5pt; color: #71717a;">
                ${edu.startDate || ''} ${edu.endDate ? ` - ${edu.endDate}` : ''}
              </span>
            </div>
            <div class="history-sub">${edu.school}</div>
            ${edu.description ? `<div class="history-desc">${edu.description}</div>` : ''}
          </div>
        `).join('')}
      ` : ''}

      ${skills && skills.length > 0 ? `
        <div class="section-header">Skills</div>
        <div class="skills-row">
          ${skills.map(skill => {
            const skillStr = typeof skill === 'string' ? skill : (skill.name + (skill.level ? ` (${skill.level})` : ''));
            return skillStr;
          }).join(', ')}
        </div>
      ` : ''}

      ${certifications && certifications.length > 0 ? `
        <div class="section-header">Certifications</div>
        <div class="certs-list">
          ${certifications.map(cert => `
            <div class="cert-row">
              <span><strong>${cert.name}</strong> - ${cert.issuer}</span>
              <span style="font-size: 8.5pt; color: #71717a;">${cert.date || ''}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;

  return buildHtmlShell({ title: `${name} - Resume`, style, content });
}

module.exports = { metadata, render };
