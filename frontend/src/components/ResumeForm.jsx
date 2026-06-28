import React, { useState, useEffect } from 'react';

function ResumeForm({ data, onChange, activeTab, setActiveTab }) {
  const [skillsText, setSkillsText] = useState(data.skills ? data.skills.join(', ') : '');

  // Sync external profile data updates into the local skills text state
  useEffect(() => {
    const parentSkillsJoined = data.skills ? data.skills.join(', ') : '';
    // Normalize spaces and empty values to check if they actually differ
    const parsedCurrent = skillsText.split(',').map(s => s.trim()).filter(Boolean).join(', ');
    const parsedParent = data.skills ? data.skills.map(s => s.trim()).filter(Boolean).join(', ') : '';
    if (parsedParent !== parsedCurrent) {
      setSkillsText(parentSkillsJoined);
    }
  }, [data.skills]);

  // Helper to update root level fields
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  // Helper to handle and format phone number to exactly 10 digits formatting: (XXX) XXX-XXXX
  const handlePhoneChange = (e) => {
    let val = e.target.value.replace(/\D/g, ''); // strip non-digits
    if (val.length > 10) val = val.substring(0, 10); // cap at 10 digits
    
    // Format as (XXX) XXX-XXXX
    let formatted = '';
    if (val.length > 6) {
      formatted = `(${val.substring(0, 3)}) ${val.substring(3, 6)}-${val.substring(6)}`;
    } else if (val.length > 3) {
      formatted = `(${val.substring(0, 3)}) ${val.substring(3)}`;
    } else if (val.length > 0) {
      formatted = `(${val}`;
    } else {
      formatted = '';
    }
    
    onChange({ ...data, phone: formatted });
  };

  const isPhoneValid = !data.phone || data.phone.replace(/\D/g, '').length === 10;

  // Generic helper to update nested array items (education, experience, certifications)
  const handleArrayItemChange = (section, index, field, value) => {
    const updatedArray = [...data[section]];
    updatedArray[index] = { ...updatedArray[index], [field]: value };
    onChange({ ...data, [section]: updatedArray });
  };

  const addArrayItem = (section, defaultObj) => {
    onChange({ ...data, [section]: [...data[section], defaultObj] });
  };

  const removeArrayItem = (section, index) => {
    const updatedArray = data[section].filter((_, idx) => idx !== index);
    onChange({ ...data, [section]: updatedArray });
  };

  // Skill specific helpers
  const handleSkillsChange = (e) => {
    const value = e.target.value;
    setSkillsText(value); // Update local state immediately to preserve typing (commas/spaces)
    
    const skillsArray = value.split(',').map(s => s.trim()).filter(Boolean);
    onChange({ ...data, skills: skillsArray });
  };

  // Tab configurations
  const tabs = [
    { id: 'personal', label: '👤 Personal Info' },
    { id: 'experience', label: '💼 Experience' },
    { id: 'education', label: '🎓 Education' },
    { id: 'skills', label: '🛠️ Skills' },
    { id: 'certifications', label: '📜 Certifications' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Professional Tab Navigation */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '8px',
        borderBottom: '2px solid var(--surface-border)',
        paddingBottom: '10px',
        marginBottom: '10px'
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: isActive ? 'var(--primary)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid ' + (isActive ? 'var(--primary)' : 'var(--surface-border)'),
                padding: '10px 18px',
                borderRadius: 'var(--radius-sm)',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.9rem'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div style={{ minHeight: '350px' }}>
        
        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <section className="glass-card animate-fade-in">
            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>👤 Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '15px' }}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input 
                  type="text" 
                  name="name" 
                  className="form-input" 
                  value={data.name || ''} 
                  onChange={handleFieldChange} 
                  placeholder="Enter Name"
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input 
                  type="email" 
                  name="email" 
                  className="form-input" 
                  value={data.email || ''} 
                  onChange={handleFieldChange} 
                  placeholder="Enter Email Address"
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number *</label>
                <input 
                  type="tel" 
                  name="phone" 
                  className="form-input" 
                  value={data.phone || ''} 
                  onChange={handlePhoneChange} 
                  placeholder="Enter Phone Number" 
                  style={{
                    borderColor: isPhoneValid ? 'var(--surface-border)' : 'var(--error)'
                  }}
                />
                {!isPhoneValid && (
                  <span style={{ color: 'var(--error)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                    Must be exactly 10 digits
                  </span>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input 
                  type="date" 
                  name="dob" 
                  className="form-input" 
                  value={data.dob || ''} 
                  onChange={handleFieldChange} 
                />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Address / Location</label>
                <input 
                  type="text" 
                  name="address" 
                  className="form-input" 
                  value={data.address || ''} 
                  onChange={handleFieldChange} 
                  placeholder="Enter Address / Location" 
                />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '10px' }}>
              <label className="form-label">Professional Summary</label>
              <textarea 
                name="summary" 
                className="form-textarea" 
                value={data.summary || ''} 
                onChange={handleFieldChange} 
                placeholder="Enter Professional Summary"
              />
            </div>
          </section>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <section className="glass-card animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: 'var(--primary)' }}>💼 Work Experience</h3>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => addArrayItem('experience', { company: '', position: '', location: '', startDate: '', endDate: '', description: '' })}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                + Add Position
              </button>
            </div>
            
            {data.experience.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', border: '2px dashed var(--surface-border)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '15px' }}>
                  No work experience added yet. Add your career history here!
                </p>
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => addArrayItem('experience', { company: '', position: '', location: '', startDate: '', endDate: '', description: '' })}
                >
                  + Add Your First Job
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {data.experience.map((exp, idx) => (
                  <div key={idx} style={{ padding: '20px', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', position: 'relative', background: '#ffffff', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Job #{idx + 1} Details</h4>
                      <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => removeArrayItem('experience', idx)}
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                      <div className="form-group">
                        <label className="form-label">Job Title</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={exp.position || ''} 
                          onChange={(e) => handleArrayItemChange('experience', idx, 'position', e.target.value)} 
                          placeholder="Enter Job Title" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Company Name</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={exp.company || ''} 
                          onChange={(e) => handleArrayItemChange('experience', idx, 'company', e.target.value)} 
                          placeholder="Enter Company Name" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Location</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={exp.location || ''} 
                          onChange={(e) => handleArrayItemChange('experience', idx, 'location', e.target.value)} 
                          placeholder="Enter Location" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Start Date</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={exp.startDate || ''} 
                          onChange={(e) => handleArrayItemChange('experience', idx, 'startDate', e.target.value)} 
                          placeholder="Enter Start Date" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Date</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={exp.endDate || ''} 
                          onChange={(e) => handleArrayItemChange('experience', idx, 'endDate', e.target.value)} 
                          placeholder="Enter End Date" 
                        />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0, marginTop: '10px' }}>
                      <label className="form-label">Job Description / Responsibilities</label>
                      <textarea 
                        className="form-textarea" 
                        value={exp.description || ''} 
                        onChange={(e) => handleArrayItemChange('experience', idx, 'description', e.target.value)} 
                        placeholder="Enter Job Description" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <section className="glass-card animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: 'var(--primary)' }}>🎓 Education</h3>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => addArrayItem('education', { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' })}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                + Add Education
              </button>
            </div>
            
            {data.education.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', border: '2px dashed var(--surface-border)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '15px' }}>
                  No education entries added yet.
                </p>
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => addArrayItem('education', { school: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '', description: '' })}
                >
                  + Add Your Education
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {data.education.map((edu, idx) => (
                  <div key={idx} style={{ padding: '20px', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', position: 'relative', background: '#ffffff', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Education #{idx + 1} Details</h4>
                      <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => removeArrayItem('education', idx)}
                        style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                      <div className="form-group">
                        <label className="form-label">Degree / Certificate</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={edu.degree || ''} 
                          onChange={(e) => handleArrayItemChange('education', idx, 'degree', e.target.value)} 
                          placeholder="Enter Degree / Certificate" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Field of Study</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={edu.fieldOfStudy || ''} 
                          onChange={(e) => handleArrayItemChange('education', idx, 'fieldOfStudy', e.target.value)} 
                          placeholder="Enter Field of Study" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">School / Institution</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={edu.school || ''} 
                          onChange={(e) => handleArrayItemChange('education', idx, 'school', e.target.value)} 
                          placeholder="Enter School / Institution" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Start Date</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={edu.startDate || ''} 
                          onChange={(e) => handleArrayItemChange('education', idx, 'startDate', e.target.value)} 
                          placeholder="Enter Start Date" 
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">End Date</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={edu.endDate || ''} 
                          onChange={(e) => handleArrayItemChange('education', idx, 'endDate', e.target.value)} 
                          placeholder="Enter End Date" 
                        />
                      </div>
                    </div>
                    <div className="form-group" style={{ marginBottom: 0, marginTop: '10px' }}>
                      <label className="form-label">Details / Honors (Optional)</label>
                      <textarea 
                        className="form-textarea" 
                        value={edu.description || ''} 
                        onChange={(e) => handleArrayItemChange('education', idx, 'description', e.target.value)} 
                        placeholder="Enter Details / Honors" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <section className="glass-card animate-fade-in">
            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>🛠️ Professional Skills</h3>
            <div className="form-group">
              <label className="form-label">Skills (separated by commas)</label>
              <textarea 
                className="form-textarea" 
                value={skillsText} 
                onChange={handleSkillsChange} 
                placeholder="Enter skills separated by commas..."
                style={{ minHeight: '150px' }}
              />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.4' }}>
                💡 <strong>Pro Tip:</strong> List both hard skills (e.g., project management, data analysis, coding) and soft skills (e.g., leadership, client relations, active listening) separated by commas. We will format them neatly inside your resume.
              </p>
            </div>
          </section>
        )}

        {/* Certifications Tab */}
        {activeTab === 'certifications' && (
          <section className="glass-card animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: 'var(--primary)' }}>📜 Certifications & Licenses</h3>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '' })}
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                + Add Certification
              </button>
            </div>
            
            {data.certifications.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0', border: '2px dashed var(--surface-border)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: '15px' }}>
                  No certifications added yet. Click "+ Add Certification" to list your achievements.
                </p>
                <button 
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => addArrayItem('certifications', { name: '', issuer: '', date: '' })}
                >
                  + Add Certification
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '15px' }}>
                {data.certifications.map((cert, idx) => (
                  <div key={idx} style={{ padding: '15px', border: '1px solid var(--surface-border)', borderRadius: 'var(--radius-md)', position: 'relative', background: '#ffffff', boxShadow: 'var(--shadow-sm)' }}>
                    <button 
                      type="button" 
                      className="btn btn-danger"
                      onClick={() => removeArrayItem('certifications', idx)}
                      style={{ position: 'absolute', top: '10px', right: '10px', padding: '3px 8px', fontSize: '0.7rem' }}
                    >
                      Remove
                    </button>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Certification Name</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={cert.name || ''} 
                          onChange={(e) => handleArrayItemChange('certifications', idx, 'name', e.target.value)} 
                          placeholder="Enter Certification Name" 
                          style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Issuing Authority</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={cert.issuer || ''} 
                          onChange={(e) => handleArrayItemChange('certifications', idx, 'issuer', e.target.value)} 
                          placeholder="Enter Issuing Authority" 
                          style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" style={{ fontSize: '0.75rem' }}>Date Issued / Expiry</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={cert.date || ''} 
                          onChange={(e) => handleArrayItemChange('certifications', idx, 'date', e.target.value)} 
                          placeholder="Enter Date" 
                          style={{ padding: '8px 12px', fontSize: '0.9rem' }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>

    </div>
  );
}

export default ResumeForm;
