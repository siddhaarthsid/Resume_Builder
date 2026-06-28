import React, { useState, useEffect, useRef } from 'react';
import ResumeForm from './components/ResumeForm.jsx';
import TemplateSelector from './components/TemplateSelector.jsx';
import DownloadConsentModal from './components/DownloadConsentModal.jsx';
import RedirectPrompt from './components/RedirectPrompt.jsx';

function ResumeBuilder({ onRedirectToJobs }) {
  // Shared States
  const [step, setStep] = useState(1); // 1 = Form, 2 = Template, 3 = Download/Preview
  const [activeFormTab, setActiveFormTab] = useState('personal');
  const FORM_TABS = ['personal', 'experience', 'education', 'skills', 'certifications'];

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    summary: '',
    education: [],
    experience: [],
    skills: [],
    certifications: []
  });
  
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [isRedirectModalOpen, setIsRedirectModalOpen] = useState(false);
  
  // UI Indicators
  const [saveStatus, setSaveStatus] = useState('idle'); // 'idle' | 'saving' | 'saved' | 'error'
  const [isLoading, setIsLoading] = useState(true);
  
  // Autosave tracking refs
  const initialLoadRef = useRef(true);
  const saveTimeoutRef = useRef(null);

  // 1. Fetch available templates and profile data on mount
  useEffect(() => {
    async function loadInitialData() {
      try {
        // Fetch templates
        const templatesRes = await fetch('/api/resume/templates');
        if (templatesRes.ok) {
          const templatesData = await templatesRes.json();
          setTemplates(templatesData);
          if (templatesData.length > 0) {
            setSelectedTemplateId(templatesData[0].id); // default to first template
          }
        }

        // Fetch user profile
        const profileRes = await fetch('/api/resume/profile');
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          // Ensure arrays are initialized if missing
          setProfileData({
            name: profileData.name || '',
            email: profileData.email || '',
            phone: profileData.phone || '',
            address: profileData.address || '',
            summary: profileData.summary || '',
            education: profileData.education || [],
            experience: profileData.experience || [],
            skills: profileData.skills || [],
            certifications: profileData.certifications || []
          });
        }
      } catch (err) {
        console.error('Error loading initial data:', err);
      } finally {
        setIsLoading(false);
        // Turn off initial load flag after small delay to avoid triggering autosave on first load
        setTimeout(() => {
          initialLoadRef.current = false;
        }, 500);
      }
    }

    loadInitialData();
  }, []);

  // 2. Autosave Effect (Debounced Profile Save)
  useEffect(() => {
    // Skip autosave on initial component load or if still loading data
    if (initialLoadRef.current || isLoading) return;

    setSaveStatus('unsaved');

    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set debounce timer to save after 1200ms
    saveTimeoutRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      try {
        const res = await fetch('/api/resume/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(profileData)
        });

        if (res.ok) {
          setSaveStatus('saved');
        } else {
          setSaveStatus('error');
        }
      } catch (err) {
        console.error('Autosave failed:', err);
        setSaveStatus('error');
      }
    }, 1200);

    // Clean up timeout on unmount or profileData change
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [profileData, isLoading]);

  // Form Validation prior to moving to template selection
  const validateFormStep = () => {
    if (!profileData.name.trim()) {
      alert('Please fill out your Full Name.');
      return false;
    }
    if (!profileData.email.trim() || !profileData.email.includes('@')) {
      alert('Please enter a valid Email Address.');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1) {
      const currentIdx = FORM_TABS.indexOf(activeFormTab);
      if (currentIdx < FORM_TABS.length - 1) {
        // Move to the next tab in details filling
        setActiveFormTab(FORM_TABS[currentIdx + 1]);
      } else {
        // Only move to templates from the last section
        if (!validateFormStep()) return;
        setStep(2);
      }
    } else if (step === 2) {
      if (!selectedTemplateId) {
        alert('Please select a template design first.');
        return;
      }
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    if (step === 1) {
      const currentIdx = FORM_TABS.indexOf(activeFormTab);
      if (currentIdx > 0) {
        setActiveFormTab(FORM_TABS[currentIdx - 1]);
      }
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  // Render status badge for autosave
  const renderSaveBadge = () => {
    switch (saveStatus) {
      case 'saving':
        return <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>⏳ Saving draft...</span>;
      case 'saved':
        return <span style={{ color: 'var(--success)', fontSize: '0.85rem', fontWeight: '600' }}>✓ Draft saved</span>;
      case 'error':
        return <span style={{ color: 'var(--error)', fontSize: '0.85rem' }}>⚠️ Error saving draft</span>;
      case 'unsaved':
        return <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontStyle: 'italic' }}>Unsaved changes</span>;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '15px' }}>
        <div style={{ width: '50px', height: '50px', border: '4px solid var(--surface-border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-heading)' }}>Loading your profile data...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Step Indicator Header & Save Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div className="steps-container" style={{ marginBottom: 0 }}>
          <div 
            className={`step-bubble ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}
            onClick={() => step > 1 && setStep(1)}
            style={{ cursor: step > 1 ? 'pointer' : 'default' }}
          >
            1
          </div>
          <div className={`step-line ${step >= 2 ? 'active' : ''}`} />
          <div 
            className={`step-bubble ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}
            onClick={() => step > 2 && setStep(2)}
            style={{ cursor: step > 2 ? 'pointer' : 'default' }}
          >
            2
          </div>
          <div className={`step-line ${step >= 3 ? 'active' : ''}`} />
          <div className={`step-bubble ${step === 3 ? 'active' : ''}`}>
            3
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {renderSaveBadge()}
        </div>
      </div>

      {/* Main Flow Content */}
      <div style={{ minHeight: '450px' }}>
        {step === 1 && (
          <ResumeForm 
            data={profileData} 
            onChange={setProfileData} 
            activeTab={activeFormTab}
            setActiveTab={setActiveFormTab}
          />
        )}
        
        {step === 2 && (
          <TemplateSelector 
            templates={templates} 
            selectedTemplateId={selectedTemplateId} 
            onSelect={setSelectedTemplateId} 
            profileData={profileData}
          />
        )}
        
        {step === 3 && (
          <DownloadConsentModal 
            profileData={profileData} 
            templateId={selectedTemplateId}
            onDownloadComplete={() => setIsRedirectModalOpen(true)}
          />
        )}
      </div>

      {/* Footer Navigation Buttons */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          borderTop: '1px solid var(--surface-border)', 
          paddingTop: '20px', 
          marginTop: '30px' 
        }}
      >
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={handlePrevStep}
          disabled={step === 1 && activeFormTab === 'personal'}
        >
          {step === 1 ? '← Previous Section' : '← Back'}
        </button>

        {step < 3 ? (
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={handleNextStep}
          >
            {step === 1 
              ? (activeFormTab === 'certifications' ? 'Choose Template →' : 'Next Section →') 
              : 'Proceed to Download →'
            }
          </button>
        ) : (
          <div /> // empty block on download step to keep alignment consistent
        )}
      </div>

      {/* Redirect Consent Modal (Post-download prompt) */}
      <RedirectPrompt 
        isOpen={isRedirectModalOpen}
        onAccept={() => {
          setIsRedirectModalOpen(false);
          onRedirectToJobs();
        }}
        onDecline={() => setIsRedirectModalOpen(false)}
      />
      
    </div>
  );
}

export default ResumeBuilder;
