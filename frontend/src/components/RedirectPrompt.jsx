import React from 'react';

function RedirectPrompt({ isOpen, onAccept, onDecline }) {
  if (!isOpen) return null;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(9, 9, 11, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
        padding: '20px',
        animation: 'fadeInOverlay 0.2s ease-out'
      }}
    >
      <div 
        className="glass-card animate-fade-in"
        style={{
          maxWidth: '480px',
          width: '100%',
          textAlign: 'center',
          padding: '40px 30px',
          border: '1px solid hsl(var(--primary-hue), 50%, 30%)',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 0 40px hsl(var(--primary-hue), 60%, 40%, 0.25)'
        }}
      >
        <div style={{ fontSize: '3.5rem', marginBottom: '20px' }}>🚀</div>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '12px' }}>Download Started!</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1rem', lineHeight: '1.5' }}>
          Want job recommendations based on this resume? Continue to the job matching portal.
        </p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={onDecline}
            style={{ flex: 1, padding: '12px' }}
          >
            No, Thanks
          </button>
          
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={onAccept}
            style={{ flex: 1, padding: '12px' }}
          >
            Yes, Match Jobs!
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default RedirectPrompt;
