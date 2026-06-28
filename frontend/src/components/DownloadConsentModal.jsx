import React, { useState } from 'react';

function DownloadConsentModal({ profileData, templateId, onDownloadComplete }) {
  const [consent, setConsent] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  // Client-side simulation of template rendering for instantaneous live preview
  const renderLivePreview = () => {
    const { name = 'John Doe', email = 'john.doe@example.com', phone = '555-1234', address = 'Dallas, TX', dob = '', summary = 'Professional summary goes here...', education = [], experience = [], skills = [], certifications = [] } = profileData;

    switch (templateId) {
      case 'classic':
        return (
          <div style={{ padding: '30px', background: '#ffffff', color: '#1e293b', border: '1px solid #cbd5e1', borderRadius: '4px', fontFamily: 'Inter, sans-serif', minHeight: '500px', fontSize: '12px' }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0f172a', margin: '0 0 5px 0' }}>{name || 'Your Name'}</h2>
              <div style={{ fontSize: '11px', color: '#475569', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                {email && <span>{email}</span>}
                {phone && <span>• {phone}</span>}
                {address && <span>• {address}</span>}
              </div>
            </div>
            {summary && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px', color: '#1e293b' }}>Summary</div>
                <div style={{ color: '#334155', lineHeight: '1.4' }}>{summary}</div>
              </div>
            )}
            {experience.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px', color: '#1e293b' }}>Experience</div>
                {experience.map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: '#0f172a' }}>
                      <span>{exp.position}</span>
                      <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </div>
                    <div style={{ fontStyle: 'italic', color: '#475569', marginBottom: '3px' }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                    <div style={{ color: '#334155', fontSize: '11px', whiteSpace: 'pre-line' }}>{exp.description}</div>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px', color: '#1e293b' }}>Education</div>
                {education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: '#0f172a' }}>
                      <span>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                      <span>{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div style={{ color: '#475569' }}>{edu.school}</div>
                    {edu.description && <div style={{ color: '#64748b', fontSize: '11px' }}>{edu.description}</div>}
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px', color: '#1e293b' }}>Skills</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {skills.map((skill, idx) => (
                    <span key={idx} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', color: '#334155' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px', color: '#1e293b' }}>Certifications</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {certifications.map((cert, idx) => (
                    <div key={idx} style={{ borderLeft: '2px solid #cbd5e1', paddingLeft: '8px' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>{cert.name}</div>
                      <div style={{ color: '#64748b', fontSize: '10px' }}>{cert.issuer} {cert.date && `• ${cert.date}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'modern':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', background: '#ffffff', color: '#1e293b', border: '1px solid #cbd5e1', borderRadius: '4px', fontFamily: 'Inter, sans-serif', minHeight: '500px', fontSize: '11px' }}>
            {/* Sidebar */}
            <div style={{ background: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '20px 15px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', lineHeight: '1.2', borderBottom: '3px solid #0284c7', paddingBottom: '8px', margin: '0 0 5px 0' }}>{name || 'Your Name'}</h2>
              </div>
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#0284c7', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '6px' }}>Contact</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', color: '#475569' }}>
                  {email && <div><strong>Email:</strong><br/>{email}</div>}
                  {phone && <div><strong>Phone:</strong><br/>{phone}</div>}
                  {address && <div><strong>Address:</strong><br/>{address}</div>}
                </div>
              </div>
              {skills.length > 0 && (
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#0284c7', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '6px' }}>Skills</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {skills.map((skill, idx) => (
                      <span key={idx} style={{ background: '#e0f2fe', border: '1px solid #bae6fd', padding: '3px 6px', borderRadius: '4px', color: '#0369a1', fontWeight: '500' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {certifications.length > 0 && (
                <div>
                  <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', color: '#0284c7', borderBottom: '1px solid #cbd5e1', paddingBottom: '2px', marginBottom: '6px' }}>Certifications</div>
                  {certifications.map((cert, idx) => (
                    <div key={idx} style={{ marginBottom: '6px' }}>
                      <div style={{ fontWeight: '600', color: '#0f172a' }}>{cert.name}</div>
                      <div style={{ color: '#64748b', fontSize: '9px' }}>{cert.issuer}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Main Content */}
            <div style={{ padding: '20px 15px 20px 0' }}>
              {summary && (
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '2px solid #0284c7', paddingBottom: '3px', marginBottom: '6px' }}>Summary</div>
                  <div style={{ color: '#334155', lineHeight: '1.4' }}>{summary}</div>
                </div>
              )}
              {experience.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '2px solid #0284c7', paddingBottom: '3px', marginBottom: '6px' }}>Work Experience</div>
                  {experience.map((exp, idx) => (
                    <div key={idx} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0f172a' }}>
                        <span>{exp.position}</span>
                        <span style={{ fontSize: '10px', color: '#64748b' }}>{exp.startDate} - {exp.endDate || 'Present'}</span>
                      </div>
                      <div style={{ color: '#0284c7', fontWeight: '500', marginBottom: '2px' }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                      <div style={{ color: '#475569', whiteSpace: 'pre-line' }}>{exp.description}</div>
                    </div>
                  ))}
                </div>
              )}
              {education.length > 0 && (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '2px solid #0284c7', paddingBottom: '3px', marginBottom: '6px' }}>Education</div>
                  {education.map((edu, idx) => (
                    <div key={idx} style={{ marginBottom: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0f172a' }}>
                        <span>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                        <span style={{ fontSize: '10px', color: '#64748b' }}>{edu.startDate} - {edu.endDate}</span>
                      </div>
                      <div style={{ color: '#0284c7', fontWeight: '500' }}>{edu.school}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div style={{ padding: '30px', background: '#ffffff', color: '#27272a', border: '1px solid #e4e4e7', borderRadius: '4px', fontFamily: 'Inter, sans-serif', minHeight: '500px', fontSize: '11px' }}>
            <div style={{ borderBottom: '1px solid #e4e4e7', paddingBottom: '12px', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#09090b', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>{name || 'Your Name'}</h2>
              <div style={{ fontSize: '10px', color: '#71717a', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {email && <span>{email}</span>}
                {phone && <span>| {phone}</span>}
                {address && <span>| {address}</span>}
              </div>
            </div>
            {summary && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#09090b', marginBottom: '6px' }}>Summary</div>
                <div style={{ color: '#3f3f46', lineHeight: '1.4' }}>{summary}</div>
              </div>
            )}
            {experience.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#09090b', marginBottom: '6px' }}>Experience</div>
                {experience.map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: '#09090b' }}>
                      <span>{exp.position}</span>
                      <span style={{ fontWeight: '500', color: '#71717a' }}>{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </div>
                    <div style={{ color: '#71717a', fontSize: '10px' }}>{exp.company} {exp.location && `• ${exp.location}`}</div>
                    <div style={{ color: '#3f3f46', whiteSpace: 'pre-line' }}>{exp.description}</div>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#09090b', marginBottom: '6px' }}>Education</div>
                {education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: '#09090b' }}>
                      <span>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                      <span style={{ fontWeight: '500', color: '#71717a' }}>{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div style={{ color: '#71717a', fontSize: '10px' }}>{edu.school}</div>
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#09090b', marginBottom: '6px' }}>Skills</div>
                <div style={{ color: '#3f3f46' }}>{skills.join(', ')}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#09090b', marginBottom: '6px' }}>Certifications</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {certifications.map((cert, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span><strong>{cert.name}</strong> - {cert.issuer}</span>
                      <span style={{ color: '#71717a' }}>{cert.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'creative':
        return (
          <div style={{ background: '#ffffff', color: '#334155', border: '1px solid #e2e8f0', borderRadius: '8px', fontFamily: 'Inter, sans-serif', minHeight: '500px', fontSize: '11px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)', color: '#ffffff', padding: '25px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', margin: '0 0 5px 0' }}>{name || 'Your Name'}</h2>
              <div style={{ display: 'flex', gap: '15px', fontSize: '10px', color: '#c7d2fe', flexWrap: 'wrap' }}>
                {email && <span>Email: {email}</span>}
                {phone && <span>Phone: {phone}</span>}
                {address && <span>Address: {address}</span>}
              </div>
            </div>
            <div style={{ padding: '20px', display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '20px' }}>
              <div>
                {summary && (
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#312e81', borderBottom: '2px solid #e0e7ff', paddingBottom: '3px', marginBottom: '6px' }}>About Me</div>
                    <div style={{ lineHeight: '1.4' }}>{summary}</div>
                  </div>
                )}
                {experience.length > 0 && (
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#312e81', borderBottom: '2px solid #e0e7ff', paddingBottom: '3px', marginBottom: '6px' }}>Experience</div>
                    {experience.map((exp, idx) => (
                      <div key={idx} style={{ marginBottom: '10px', borderLeft: '2px solid #4f46e5', paddingLeft: '8px' }}>
                        <div style={{ fontWeight: '700', color: '#0f172a' }}>{exp.position}</div>
                        <div style={{ fontSize: '9.5px', color: '#6366f1', fontWeight: '500', marginBottom: '2px' }}>{exp.company} {exp.location && `| ${exp.location}`} • {exp.startDate} - {exp.endDate || 'Present'}</div>
                        <div style={{ whiteSpace: 'pre-line' }}>{exp.description}</div>
                      </div>
                    ))}
                  </div>
                )}
                {education.length > 0 && (
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#312e81', borderBottom: '2px solid #e0e7ff', paddingBottom: '3px', marginBottom: '6px' }}>Education</div>
                    {education.map((edu, idx) => (
                      <div key={idx} style={{ marginBottom: '8px', borderLeft: '2px solid #4f46e5', paddingLeft: '8px' }}>
                        <div style={{ fontWeight: '700', color: '#0f172a' }}>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</div>
                        <div style={{ fontSize: '9.5px', color: '#6366f1', fontWeight: '500' }}>{edu.school} • {edu.startDate} - {edu.endDate}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {skills.length > 0 && (
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#312e81', borderBottom: '2px solid #e0e7ff', paddingBottom: '3px', marginBottom: '6px' }}>Skills</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {skills.map((skill, idx) => (
                        <span key={idx} style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', color: '#5b21b6', padding: '2px 6px', borderRadius: '10px', fontSize: '9.5px', fontWeight: '600' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {certifications.length > 0 && (
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#312e81', borderBottom: '2px solid #e0e7ff', paddingBottom: '3px', marginBottom: '6px' }}>Certifications</div>
                    {certifications.map((cert, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '6px', borderRadius: '4px', border: '1px solid #f1f5f9', marginBottom: '6px' }}>
                        <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '10px' }}>{cert.name}</div>
                        <div style={{ color: '#475569', fontSize: '9px' }}>{cert.issuer}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'executive':
        return (
          <div style={{ padding: '30px', background: '#ffffff', color: '#1e293b', border: '1px solid #cbd5e1', borderRadius: '4px', fontFamily: 'Georgia, serif', minHeight: '500px', fontSize: '11px', textAlign: 'left' }}>
            <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '20px', borderRadius: '4px', marginBottom: '15px' }}>
              <h2 style={{ margin: '0 0 5px 0', fontFamily: 'Outfit, sans-serif', fontSize: '20px', color: '#ffffff' }}>{name || 'Your Name'}</h2>
              <div style={{ fontSize: '10px', color: '#cbd5e1', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {email && <span>✉ {email}</span>}
                {phone && <span>📞 {phone}</span>}
                {address && <span>📍 {address}</span>}
                {dob && <span>🎂 DOB: {dob}</span>}
              </div>
            </div>
            {summary && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '2px solid #1e3a8a', paddingBottom: '3px', marginBottom: '6px', color: '#1e3a8a', fontFamily: 'Outfit, sans-serif' }}>Executive Summary</div>
                <div style={{ color: '#334155', lineHeight: '1.5', fontStyle: 'italic' }}>{summary}</div>
              </div>
            )}
            {experience.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '2px solid #1e3a8a', paddingBottom: '3px', marginBottom: '6px', color: '#1e3a8a', fontFamily: 'Outfit, sans-serif' }}>Professional History</div>
                {experience.map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0f172a' }}>
                      <span>{exp.position}</span>
                      <span style={{ fontWeight: 'normal', color: '#64748b', fontSize: '10px' }}>{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </div>
                    <div style={{ fontWeight: '600', color: '#475569', fontSize: '10px' }}>{exp.company} {exp.location && `• ${exp.location}`}</div>
                    <div style={{ color: '#334155', whiteSpace: 'pre-line', marginTop: '3px' }}>{exp.description}</div>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '2px solid #1e3a8a', paddingBottom: '3px', marginBottom: '6px', color: '#1e3a8a', fontFamily: 'Outfit, sans-serif' }}>Academic Background</div>
                {education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0f172a' }}>
                      <span>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                      <span style={{ fontWeight: 'normal', color: '#64748b', fontSize: '10px' }}>{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div style={{ color: '#475569' }}>{edu.school}</div>
                    {edu.description && <div style={{ color: '#64748b', fontSize: '10px' }}>{edu.description}</div>}
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
              <div style={{ marginBottom: '15px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '2px solid #1e3a8a', paddingBottom: '3px', marginBottom: '6px', color: '#1e3a8a', fontFamily: 'Outfit, sans-serif' }}>Core Competencies</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {skills.map((skill, idx) => (
                    <span key={idx} style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', padding: '3px 8px', borderRadius: '4px', color: '#1e293b', fontWeight: '500' }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '2px solid #1e3a8a', paddingBottom: '3px', marginBottom: '6px', color: '#1e3a8a', fontFamily: 'Outfit, sans-serif' }}>Professional Credentials</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {certifications.map((cert, idx) => (
                    <div key={idx} style={{ borderLeft: '3px solid #1e3a8a', paddingLeft: '8px', background: '#f8fafc', padding: '6px' }}>
                      <div style={{ fontWeight: '700', color: '#0f172a' }}>{cert.name}</div>
                      <div style={{ color: '#64748b', fontSize: '9px' }}>{cert.issuer} {cert.date && `• ${cert.date}`}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'technical':
        return (
          <div style={{ padding: '30px', background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: '4px', fontFamily: 'Inter, sans-serif', minHeight: '500px', fontSize: '11px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0284c7', paddingBottom: '10px', marginBottom: '15px' }}>
              <div>
                <h2 style={{ margin: '0 0 3px 0', fontSize: '22px', fontWeight: '800', color: '#0f172a' }}>{name || 'Your Name'}</h2>
                <span style={{ color: '#0284c7', fontWeight: 'bold', fontSize: '11px' }}>Technical Professional</span>
              </div>
              <div style={{ textAlign: 'right', fontSize: '10px', color: '#475569', lineHeight: '1.4' }}>
                {email && <div>✉ {email}</div>}
                {phone && <div>📞 {phone}</div>}
                {address && <div>📍 {address}</div>}
                {dob && <div>🎂 DOB: {dob}</div>}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
              <div>
                {summary && (
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px' }}>Professional Summary</div>
                    <div style={{ color: '#334155', lineHeight: '1.4' }}>{summary}</div>
                  </div>
                )}
                {experience.length > 0 && (
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px' }}>Work Experience</div>
                    {experience.map((exp, idx) => (
                      <div key={idx} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0f172a' }}>
                          <span>{exp.position}</span>
                          <span style={{ fontSize: '10px', color: '#64748b' }}>{exp.startDate} - {exp.endDate || 'Present'}</span>
                        </div>
                        <div style={{ color: '#0284c7', fontWeight: '600', marginBottom: '2px' }}>{exp.company} {exp.location && `| ${exp.location}`}</div>
                        <div style={{ color: '#334155', whiteSpace: 'pre-line' }}>{exp.description}</div>
                      </div>
                    ))}
                  </div>
                )}
                {education.length > 0 && (
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '6px' }}>Education</div>
                    {education.map((edu, idx) => (
                      <div key={idx} style={{ marginBottom: '8px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0f172a' }}>
                          <span>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                          <span style={{ fontSize: '10px', color: '#64748b' }}>{edu.startDate} - {edu.endDate}</span>
                        </div>
                        <div style={{ color: '#0284c7', fontWeight: '600' }}>{edu.school}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                {skills.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '8px' }}>Skills & Tools</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {skills.map((skill, idx) => (
                        <span key={idx} style={{ backgroundColor: '#eff6ff', color: '#1e40af', padding: '3px 8px', borderRadius: '4px', fontSize: '10px', border: '1px solid #bfdbfe', fontWeight: '600' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {certifications.length > 0 && (
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: '#0f172a', borderBottom: '1px solid #e2e8f0', paddingBottom: '3px', marginBottom: '8px' }}>Certifications</div>
                    {certifications.map((cert, idx) => (
                      <div key={idx} style={{ marginBottom: '8px' }}>
                        <strong style={{ fontSize: '10px', color: '#0f172a' }}>{cert.name}</strong>
                        <div style={{ color: '#64748b', fontSize: '9px' }}>{cert.issuer} {cert.date && `• ${cert.date}`}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'compact':
        return (
          <div style={{ padding: '25px', background: '#ffffff', color: '#1f2937', border: '1px solid #cbd5e1', borderRadius: '4px', fontFamily: 'Inter, sans-serif', minHeight: '500px', fontSize: '10px', lineHeight: '1.35', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1.5px solid #374151', paddingBottom: '5px', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#111827' }}>{name || 'Your Name'}</h3>
              <div style={{ fontSize: '9px', color: '#4b5563', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {email && <span>{email}</span>}
                {phone && <span>&bull; {phone}</span>}
                {address && <span>&bull; {address}</span>}
                {dob && <span>&bull; DOB: {dob}</span>}
              </div>
            </div>
            {summary && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '2px', marginBottom: '4px', color: '#111827' }}>Summary</div>
                <div>{summary}</div>
              </div>
            )}
            {experience.length > 0 && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '2px', marginBottom: '4px', color: '#111827' }}>Experience</div>
                {experience.map((exp, idx) => (
                  <div key={idx} style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <span>{exp.position} &bull; {exp.company}</span>
                      <span style={{ fontWeight: 'normal', color: '#4b5563', fontSize: '9px' }}>{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </div>
                    {exp.location && <div style={{ fontStyle: 'italic', color: '#4b5563', fontSize: '9px' }}>{exp.location}</div>}
                    <div style={{ color: '#374151', whiteSpace: 'pre-line' }}>{exp.description}</div>
                  </div>
                ))}
              </div>
            )}
            {education.length > 0 && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '2px', marginBottom: '4px', color: '#111827' }}>Education</div>
                {education.map((edu, idx) => (
                  <div key={idx} style={{ marginBottom: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <span>{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`} &bull; {edu.school}</span>
                      <span style={{ fontWeight: 'normal', color: '#4b5563', fontSize: '9px' }}>{edu.startDate} - {edu.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {skills.length > 0 && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '2px', marginBottom: '4px', color: '#111827' }}>Skills</div>
                <div>{skills.join(', ')}</div>
              </div>
            )}
            {certifications.length > 0 && (
              <div>
                <div style={{ fontSize: '10px', fontWeight: '700', textTransform: 'uppercase', borderBottom: '1px solid #d1d5db', paddingBottom: '2px', marginBottom: '4px', color: '#111827' }}>Certifications</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                  {certifications.map((cert, idx) => (
                    <div key={idx}>
                      <strong>{cert.name}</strong> ({cert.issuer} &bull; {cert.date})
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      default:
        return <div>Invalid Template Preview</div>;
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      console.log(`[Frontend] Triggering PDF generation. Template: ${templateId}, Consent: ${consent}`);
      
      const response = await fetch('/api/resume/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          templateId,
          consentJobMatching: consent
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate resume. Please try again.');
      }

      // Download file binary as Blob
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `${profileData.name ? profileData.name.replace(/\s+/g, '_') : 'resume'}_${templateId}.pdf`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      window.URL.revokeObjectURL(downloadUrl);
      console.log('[Frontend] Resume downloaded successfully.');

      // Download is complete - fire callback to show Redirect Prompt
      onDownloadComplete();
    } catch (err) {
      console.error('[Frontend] Error downloading PDF:', err);
      setError(err.message || 'An unexpected error occurred during PDF generation.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
      
      {/* Live Preview Pane */}
      <div>
        <h3 style={{ marginBottom: '15px' }}>👀 Live Preview</h3>
        <div style={{ maxHeight: '600px', overflowY: 'auto', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', padding: '5px', background: '#e2e8f0' }}>
          {renderLivePreview()}
        </div>
      </div>

      {/* Download Action & Consent Options */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '100px' }}>
        <h2>📥 Save & Download</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          Your details are successfully compiled. Click download to generate your high-fidelity, printable PDF.
        </p>

        {error && (
          <div style={{ padding: '12px', background: 'var(--error-light)', border: '1px solid var(--error)', borderRadius: 'var(--radius-sm)', color: '#ff8888', fontSize: '0.9rem' }}>
            ⚠️ {error}
          </div>
        )}

        {/* Consent Checkbox */}
        <div 
          style={{ 
            padding: '15px', 
            background: 'hsl(220, 25%, 8%)', 
            borderRadius: 'var(--radius-sm)', 
            border: '1px solid var(--surface-border)',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start'
          }}
        >
          <input 
            type="checkbox" 
            id="job-matching-consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            style={{ 
              marginTop: '4px', 
              width: '18px', 
              height: '18px', 
              cursor: 'pointer',
              accentColor: 'var(--primary)'
            }}
          />
          <label htmlFor="job-matching-consent" style={{ cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: '1.4' }}>
            <strong>Opt-in:</strong> Allow us to use this resume and its details to suggest matching jobs.
            <br/>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              (Unchecked by default. You can still download your resume if you don't check this.)
            </span>
          </label>
        </div>

        {/* Download Trigger */}
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={handleDownload}
          disabled={isGenerating}
          style={{ width: '100%', padding: '14px', fontSize: '1.1rem' }}
        >
          {isGenerating ? (
            <>
              <span className="loading-spinner" style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', marginRight: '8px' }} />
              Generating PDF...
            </>
          ) : (
            'Download PDF Resume'
          )}
        </button>

        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

    </div>
  );
}

export default DownloadConsentModal;
