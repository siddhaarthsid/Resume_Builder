const buildHtmlShell = require('./builder');

const metadata = {
  id: 'creative',
  name: 'Creative Impact',
  description: 'A bold design with a dark header block and stylish typography. Perfect for showcasing a modern and memorable image.',
  thumbnailColor: '#4f46e5' // Indigo
};

function render(data) {
  const { name = '', email = '', phone = '', address = '', summary = '', education = [], experience = [], skills = [], certifications = [] } = data;

  const style = `
    .resume-box {
      max-width: 800px;
      margin: 0 auto;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);
    }
    .header-banner {
      background: linear-gradient(135deg, #4f46e5 0%, #312e81 100%);
      color: #ffffff;
      padding: 30px;
      text-align: left;
    }
    .header-banner h1 {
      font-size: 26pt;
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 8px;
      letter-spacing: -0.03em;
    }
    .header-contact {
      display: flex;
      gap: 15px;
      font-size: 9.5pt;
      color: #c7d2fe;
      flex-wrap: wrap;
    }
    .body-padding {
      padding: 25px;
      background: #ffffff;
    }
    .grid-layout {
      display: grid;
      grid-template-columns: 1.8fr 1fr;
      gap: 25px;
    }
    .column-title {
      font-family: 'Outfit', sans-serif;
      font-size: 11.5pt;
      font-weight: 700;
      color: #312e81;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 2px solid #e0e7ff;
      padding-bottom: 4px;
      margin-top: 20px;
      margin-bottom: 12px;
    }
    .column-title:first-of-type {
      margin-top: 0;
    }
    .summary-text {
      font-size: 9.5pt;
      color: #334155;
      line-height: 1.5;
      margin-bottom: 15px;
    }
    .experience-card {
      margin-bottom: 14px;
      border-left: 3px solid #4f46e5;
      padding-left: 10px;
    }
    .card-title {
      font-weight: 700;
      font-size: 10pt;
      color: #0f172a;
    }
    .card-meta {
      font-size: 8.5pt;
      color: #6366f1;
      font-weight: 500;
      margin-bottom: 4px;
    }
    .card-desc {
      font-size: 9pt;
      color: #475569;
      line-height: 1.45;
      white-space: pre-line;
    }
    .skills-flex {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .skill-badge {
      background: #f5f3ff;
      color: #5b21b6;
      border: 1px solid #ddd6fe;
      padding: 3px 8px;
      border-radius: 12px;
      font-size: 8.5pt;
      font-weight: 600;
    }
    .cert-card {
      background: #f8fafc;
      padding: 8px 12px;
      border-radius: 6px;
      border: 1px solid #f1f5f9;
      margin-bottom: 8px;
    }
    .cert-name {
      font-weight: 600;
      font-size: 9pt;
      color: #0f172a;
    }
    .cert-issuer {
      font-size: 8pt;
      color: #475569;
    }
  `;

  const content = `
    <div class="resume-box">
      <div class="header-banner">
        <h1>${name}</h1>
        <div class="header-contact">
          ${email ? `<span>Email: ${email}</span>` : ''}
          ${phone ? `<span>Phone: ${phone}</span>` : ''}
          ${address ? `<span>Address: ${address}</span>` : ''}
        </div>
      </div>
      
      <div class="body-padding">
        <div class="grid-layout">
          <!-- Left Main Column -->
          <div>
            ${summary ? `
              <div class="column-title">About Me</div>
              <div class="summary-text">${summary}</div>
            ` : ''}

            ${experience && experience.length > 0 ? `
              <div class="column-title">Experience</div>
              ${experience.map(exp => `
                <div class="experience-card">
                  <div class="card-title">${exp.position}</div>
                  <div class="card-meta">${exp.company}${exp.location ? `, ${exp.location}` : ''} | ${exp.startDate || ''} ${exp.endDate ? ` - ${exp.endDate}` : ' - Present'}</div>
                  ${exp.description ? `<div class="card-desc">${exp.description}</div>` : ''}
                </div>
              `).join('')}
            ` : ''}

            ${education && education.length > 0 ? `
              <div class="column-title">Education</div>
              ${education.map(edu => `
                <div class="experience-card">
                  <div class="card-title">${edu.degree}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</div>
                  <div class="card-meta">${edu.school} | ${edu.startDate || ''} ${edu.endDate ? ` - ${edu.endDate}` : ''}</div>
                  ${edu.description ? `<div class="card-desc">${edu.description}</div>` : ''}
                </div>
              `).join('')}
            ` : ''}
          </div>

          <!-- Right Sidebar Column -->
          <div>
            ${skills && skills.length > 0 ? `
              <div class="column-title">Skills</div>
              <div class="skills-flex">
                ${skills.map(skill => `
                  <span class="skill-badge">${typeof skill === 'string' ? skill : (skill.name + (skill.level ? ` (${skill.level})` : ''))}</span>
                `).join('')}
              </div>
            ` : ''}

            ${certifications && certifications.length > 0 ? `
              <div class="column-title">Certifications</div>
              ${certifications.map(cert => `
                <div class="cert-card">
                  <div class="cert-name">${cert.name}</div>
                  <div class="cert-issuer">${cert.issuer}${cert.date ? ` &bull; ${cert.date}` : ''}</div>
                </div>
              `).join('')}
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;

  return buildHtmlShell({ title: `${name} - Resume`, style, content });
}

module.exports = { metadata, render };
