const buildHtmlShell = require('./builder');

const metadata = {
  id: 'modern',
  name: 'Modern Accent',
  description: 'A stylish and organized two-column layout with deep blue headers. Great for readability and modern resume styles.',
  thumbnailColor: '#0284c7' // Blue/Sky accent
};

function render(data) {
  const { name = '', email = '', phone = '', address = '', summary = '', education = [], experience = [], skills = [], certifications = [] } = data;

  const style = `
    .resume-wrapper {
      display: grid;
      grid-template-columns: 240px 1fr;
      gap: 20px;
      min-height: 270mm; /* approximate full page */
    }
    
    /* Left Sidebar */
    .sidebar {
      background: #f8fafc;
      border-right: 1px solid #e2e8f0;
      padding: 20px 15px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .name-heading {
      font-size: 20pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.1;
      margin-bottom: 5px;
      border-bottom: 3px solid #0284c7;
      padding-bottom: 10px;
    }
    
    .sidebar-section-title {
      font-family: 'Outfit', sans-serif;
      font-size: 10pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0284c7;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
      margin-bottom: 8px;
    }
    
    .sidebar-text {
      font-size: 9pt;
      color: #334155;
      line-height: 1.4;
      word-break: break-all;
    }
    
    .contact-block {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    
    /* Right Content Area */
    .main-content {
      padding: 20px 10px;
    }
    
    .main-section-title {
      font-family: 'Outfit', sans-serif;
      font-size: 12pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #0f172a;
      border-bottom: 2px solid #0284c7;
      padding-bottom: 3px;
      margin-top: 15px;
      margin-bottom: 10px;
    }
    
    .main-section-title:first-of-type {
      margin-top: 0;
    }
    
    .summary-box {
      font-size: 9.5pt;
      color: #334155;
      margin-bottom: 15px;
      line-height: 1.5;
    }
    
    .item-block {
      margin-bottom: 12px;
    }
    
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-weight: 700;
      font-size: 10pt;
      color: #0f172a;
    }
    
    .item-company {
      font-weight: 500;
      color: #0284c7;
      font-size: 9pt;
      margin-bottom: 4px;
    }
    
    .item-desc {
      font-size: 9pt;
      color: #475569;
      line-height: 1.4;
      white-space: pre-line;
    }
    
    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .skill-item {
      font-size: 9pt;
      font-weight: 500;
      color: #334155;
      background: #e0f2fe;
      border-radius: 4px;
      padding: 3px 6px;
      border: 1px solid #bae6fd;
    }

    .cert-item {
      margin-bottom: 8px;
    }
    .cert-name {
      font-weight: 600;
      font-size: 9pt;
      color: #1e293b;
    }
    .cert-meta {
      font-size: 8pt;
      color: #64748b;
    }
  `;

  const content = `
    <div class="resume-wrapper">
      <div class="sidebar">
        <div>
          <h1 class="name-heading">${name}</h1>
        </div>
        
        <div>
          <div class="sidebar-section-title">Contact</div>
          <div class="contact-block sidebar-text">
            ${email ? `<div><strong>Email:</strong><br/>${email}</div>` : ''}
            ${phone ? `<div><strong>Phone:</strong><br/>${phone}</div>` : ''}
            ${address ? `<div><strong>Address:</strong><br/>${address}</div>` : ''}
          </div>
        </div>

        ${skills && skills.length > 0 ? `
          <div>
            <div class="sidebar-section-title">Skills</div>
            <div class="skills-list">
              ${skills.map(skill => `
                <div class="skill-item">${typeof skill === 'string' ? skill : (skill.name + (skill.level ? ` - ${skill.level}` : ''))}</div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${certifications && certifications.length > 0 ? `
          <div>
            <div class="sidebar-section-title">Certifications</div>
            ${certifications.map(cert => `
              <div class="cert-item">
                <div class="cert-name">${cert.name}</div>
                <div class="cert-meta">${cert.issuer}${cert.date ? ` (${cert.date})` : ''}</div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>

      <div class="main-content">
        ${summary ? `
          <div class="main-section-title">Profile Summary</div>
          <div class="summary-box">${summary}</div>
        ` : ''}

        ${experience && experience.length > 0 ? `
          <div class="main-section-title">Work Experience</div>
          ${experience.map(exp => `
            <div class="item-block">
              <div class="item-header">
                <span>${exp.position}</span>
                <span style="font-weight: 500; font-size: 8.5pt; color: #64748b;">
                  ${exp.startDate || ''} ${exp.endDate ? ` - ${exp.endDate}` : ' - Present'}
                </span>
              </div>
              <div class="item-company">${exp.company}${exp.location ? ` | ${exp.location}` : ''}</div>
              ${exp.description ? `<div class="item-desc">${exp.description}</div>` : ''}
            </div>
          `).join('')}
        ` : ''}

        ${education && education.length > 0 ? `
          <div class="main-section-title">Education</div>
          ${education.map(edu => `
            <div class="item-block">
              <div class="item-header">
                <span>${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                <span style="font-weight: 500; font-size: 8.5pt; color: #64748b;">
                  ${edu.startDate || ''} ${edu.endDate ? ` - ${edu.endDate}` : ''}
                </span>
              </div>
              <div class="item-company">${edu.school}</div>
              ${edu.description ? `<div class="item-desc">${edu.description}</div>` : ''}
            </div>
          `).join('')}
        ` : ''}
      </div>
    </div>
  `;

  return buildHtmlShell({ title: `${name} - Resume`, style, content });
}

module.exports = { metadata, render };
