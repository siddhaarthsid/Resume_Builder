import React from 'react';

function TemplateSelector({ templates, selectedTemplateId, onSelect, profileData }) {
  
  // Sample data to show if user details are empty
  const sampleResumeData = {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '(555) 234-5678',
    address: 'Austin, TX',
    dob: '1995-08-12',
    summary: 'Detail-oriented logistics team leader with 5+ years of experience in warehouse operations, and team coordination. Proven track record of optimizing supply chain efficiency.',
    skills: ['Forklift Certified', 'OSHA 10 Safety', 'Inventory Management', 'Team Leadership'],
    education: [
      { school: 'Austin Community College', degree: 'Associate of Applied Science', fieldOfStudy: 'Logistics', startDate: '2018', endDate: '2020', description: 'Graduated with Honors.' }
    ],
    experience: [
      { company: 'Apex Distribution', position: 'Logistics Team Lead', location: 'Austin, TX', startDate: '2021', endDate: 'Present', description: 'Coordinated shift operations for a team of 15 crew members.\nMaintained 100% compliance with OSHA safety standards.' }
    ],
    certifications: [
      { name: 'OSHA-10 Card', issuer: 'OSHA / Dept of Labor', date: '2021' }
    ]
  };

  // High-Fidelity preview mockup renderer for each card
  const renderQuickPreviewMockup = (templateId, activeData) => {
    // Destructure values with fallbacks to keep it clean
    const { name = 'John Doe', email = 'john@example.com', phone = '', address = '', dob = '', summary = '', skills = [], education = [], experience = [], certifications = [] } = activeData;

    switch (templateId) {
      case 'classic':
        return (
          <div style={{ background: '#ffffff', color: '#1e293b', padding: '15px', fontFamily: 'Inter, sans-serif', fontSize: '9px', textAlign: 'left', minHeight: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <strong style={{ fontSize: '13px', color: '#0f172a' }}>{name}</strong>
              <div style={{ fontSize: '8px', color: '#64748b', display: 'flex', justifyContent: 'center', gap: '5px', flexWrap: 'wrap', marginTop: '2px' }}>
                {email && <span>{email}</span>}
                {phone && <span>• {phone}</span>}
                {address && <span>• {address}</span>}
              </div>
            </div>
            <div style={{ width: '100%', height: '1px', background: '#cbd5e1', marginBottom: '8px' }}></div>
            {summary && <p style={{ margin: '0 0 8px 0', fontStyle: 'italic', color: '#475569' }}>{summary}</p>}
            {experience.length > 0 && (
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 'bold', borderBottom: '1px solid #e2e8f0', paddingBottom: '2px', marginBottom: '4px', textTransform: 'uppercase', fontSize: '8.5px', color: '#1e293b' }}>Experience</div>
                {experience.slice(0, 1).map((exp, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                      <span>{exp.position}</span>
                      <span>{exp.startDate} - {exp.endDate || 'Present'}</span>
                    </div>
                    <div style={{ color: '#475569', fontSize: '8px' }}>{exp.company}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 'modern':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', background: '#ffffff', color: '#1e293b', fontFamily: 'Inter, sans-serif', fontSize: '8.5px', textAlign: 'left', minHeight: '100%' }}>
            <div style={{ background: '#f8fafc', padding: '10px 8px', borderRight: '1px solid #e2e8f0' }}>
              <strong style={{ fontSize: '11px', color: '#0f172a' }}>{name}</strong>
              <div style={{ width: '100%', height: '2px', background: '#0284c7', margin: '4px 0' }}></div>
              <div style={{ fontSize: '7.5px', color: '#64748b', wordBreak: 'break-all' }}>
                {email && <div>{email}</div>}
                {phone && <div>{phone}</div>}
              </div>
            </div>
            <div style={{ padding: '10px 8px' }}>
              {summary && <p style={{ margin: '0 0 8px 0', fontSize: '8px', color: '#334155' }}>{summary}</p>}
              {skills.length > 0 && (
                <div>
                  <strong style={{ color: '#0284c7', textTransform: 'uppercase', fontSize: '8px', borderBottom: '1px solid #e2e8f0', display: 'block', paddingBottom: '2px', marginBottom: '4px' }}>Skills</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {skills.map((s, i) => (
                      <span key={i} style={{ background: '#e0f2fe', color: '#0369a1', padding: '1px 4px', borderRadius: '3px', fontSize: '7px' }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      case 'minimal':
        return (
          <div style={{ background: '#ffffff', color: '#27272a', padding: '15px', fontFamily: 'Inter, sans-serif', fontSize: '8.5px', textAlign: 'left', minHeight: '100%' }}>
            <strong style={{ fontSize: '13px', color: '#09090b' }}>{name}</strong>
            <div style={{ fontSize: '8px', color: '#71717a', display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '2px', marginBottom: '8px' }}>
              {email && <span>{email}</span>}
              {phone && <span>| {phone}</span>}
            </div>
            <div style={{ width: '100%', height: '1px', background: '#e4e4e7', marginBottom: '8px' }}></div>
            {summary && <p style={{ margin: '0 0 8px 0', color: '#3f3f46' }}>{summary}</p>}
          </div>
        );
      case 'creative':
        return (
          <div style={{ background: '#ffffff', color: '#334155', fontFamily: 'Inter, sans-serif', fontSize: '8.5px', textAlign: 'left', minHeight: '100%' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)', color: '#ffffff', padding: '12px 10px' }}>
              <strong style={{ fontSize: '13px', color: '#ffffff' }}>{name}</strong>
              <div style={{ fontSize: '7.5px', color: '#e0e7ff', marginTop: '2px' }}>{email}</div>
            </div>
            <div style={{ padding: '10px 8px' }}>
              {summary && <p style={{ margin: '0 0 6px 0', fontSize: '8px' }}>{summary}</p>}
            </div>
          </div>
        );
      case 'executive':
        return (
          <div style={{ background: '#ffffff', color: '#1e293b', fontFamily: 'Georgia, serif', fontSize: '8.5px', textAlign: 'left', minHeight: '100%' }}>
            <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '12px 10px' }}>
              <strong style={{ fontSize: '13px', color: '#ffffff', fontFamily: 'Outfit, sans-serif' }}>{name}</strong>
              <div style={{ fontSize: '7.5px', color: '#cbd5e1', marginTop: '2px' }}>{email} &bull; {phone} &bull; DOB: {dob || 'N/A'}</div>
            </div>
            <div style={{ padding: '10px 8px' }}>
              {summary && <p style={{ margin: '0 0 6px 0', fontStyle: 'italic', fontSize: '8px' }}>{summary}</p>}
            </div>
          </div>
        );
      case 'technical':
        return (
          <div style={{ background: '#ffffff', color: '#0f172a', padding: '15px', fontFamily: 'Inter, sans-serif', fontSize: '8.5px', textAlign: 'left', minHeight: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0284c7', paddingBottom: '4px', marginBottom: '8px' }}>
              <div>
                <strong style={{ fontSize: '12px', color: '#0f172a' }}>{name}</strong>
                <div style={{ color: '#0284c7', fontSize: '8px', fontWeight: 'bold' }}>Technical Professional</div>
              </div>
              <div style={{ fontSize: '7px', color: '#475569', textAlign: 'right' }}>
                <div>{phone}</div>
                <div>DOB: {dob || 'N/A'}</div>
              </div>
            </div>
            {summary && <p style={{ margin: '0 0 6px 0', fontSize: '7.5px' }}>{summary}</p>}
          </div>
        );
      case 'compact':
        return (
          <div style={{ background: '#ffffff', color: '#1f2937', padding: '12px', fontFamily: 'Inter, sans-serif', fontSize: '8.5px', lineHeight: '1.3', textAlign: 'left', minHeight: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1.5px solid #374151', paddingBottom: '3px', marginBottom: '6px' }}>
              <strong style={{ fontSize: '11px', color: '#111827' }}>{name}</strong>
              <span style={{ fontSize: '7px', color: '#4b5563' }}>{phone}</span>
            </div>
            {summary && <p style={{ margin: '0 0 4px 0', fontSize: '7.5px' }}>{summary}</p>}
          </div>
        );
      default:
        return <div style={{ padding: '15px' }}>📄 Preview not available</div>;
    }
  };

  // Determine active dataset to inject into previews
  const activeData = profileData && profileData.name ? profileData : sampleResumeData;

  return (
    <div className="animate-fade-in">
      <h2 style={{ marginBottom: '10px', textAlign: 'center', color: 'var(--primary)' }}>🎨 Choose a Resume Design</h2>
      <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '30px' }}>
        Select a template layout to load your details automatically. Click a template card to select it.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '25px' }}>
        {templates.map((tpl) => {
          const isSelected = selectedTemplateId === tpl.id;
          
          return (
            <div 
              key={tpl.id}
              className="glass-card"
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--primary)' : 'var(--surface-border)',
                borderWidth: isSelected ? '2px' : '1px',
                transform: isSelected ? 'scale(1.02)' : 'none',
                boxShadow: isSelected ? '0 4px 20px hsl(var(--primary-hue), 60%, 40%, 0.15)' : 'var(--shadow-md)',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                padding: '15px',
                background: '#ffffff',
                transition: 'all var(--transition-fast)'
              }}
              onClick={() => onSelect(tpl.id)}
            >
              {/* High-Fidelity Interactive Preview rendered inside the card */}
              <div style={{
                height: '190px',
                overflowY: 'auto',
                border: '1px solid var(--surface-border)',
                borderRadius: 'var(--radius-sm)',
                background: '#ffffff',
                boxShadow: 'inset 0 0 8px rgba(0,0,0,0.05)',
                position: 'relative'
              }}>
                {renderQuickPreviewMockup(tpl.id, activeData)}
              </div>
              
              {/* Details & Selection Badge */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.05rem', margin: 0, color: 'var(--text-primary)' }}>{tpl.name}</h3>
                  {isSelected ? (
                    <span style={{ 
                      backgroundColor: 'var(--primary)', 
                      color: '#ffffff', 
                      fontSize: '0.75rem', 
                      padding: '2px 8px', 
                      borderRadius: '10px',
                      fontWeight: '700'
                    }}>
                      ✓ Active
                    </span>
                  ) : (
                    <div 
                      style={{ 
                        width: '10px', 
                        height: '10px', 
                        borderRadius: '50%', 
                        background: tpl.thumbnailColor || 'var(--primary)' 
                      }}
                    />
                  )}
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4', margin: 0 }}>
                  {tpl.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TemplateSelector;
