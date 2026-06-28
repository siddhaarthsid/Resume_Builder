import React, { useState, useEffect } from 'react';

function JobPortal() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        console.log('[JobPortal] Loading candidates who consented to job matching...');
        const response = await fetch('/api/jobs/matches');
        
        if (!response.ok) {
          throw new Error('Failed to load job matching candidates. Make sure database is configured.');
        }

        const data = await response.json();
        setCandidates(data.candidates || []);
      } catch (err) {
        console.error('[JobPortal] Error fetching candidates:', err);
        setError(err.message || 'An error occurred while loading job matches.');
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid var(--surface-border)', paddingBottom: '15px' }}>
        <div>
          <h1 style={{ fontSize: '2rem' }}>💼 Job Matching Portal</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Recruiter Dashboard: Matching qualified candidates with top local employers.
          </p>
        </div>
        <div style={{ background: 'hsl(142, 60%, 15%)', color: 'var(--success)', border: '1px solid var(--success)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.875rem', fontWeight: '600' }}>
          🛡️ Privacy Enforced (Database Layer)
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', gap: '15px' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--surface-border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <p style={{ color: 'var(--text-secondary)' }}>Loading matching candidates...</p>
        </div>
      ) : error ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '40px', border: '1px solid var(--surface-border)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>🔌</div>
          <h3>Database Connection Setup Required</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px', marginBottom: '20px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            To fetch real job matches, you need to connect your Neon PostgreSQL database. Fill out the <strong>DATABASE_URL</strong> inside your backend <code>.env</code> file.
          </p>
          <div style={{ background: 'hsl(220, 25%, 8%)', padding: '15px', borderRadius: '6px', textAlign: 'left', display: 'inline-block', maxWidth: '100%', wordBreak: 'break-all' }}>
            <span style={{ color: 'var(--text-secondary)' }}># In your backend/.env:</span><br/>
            <code>DATABASE_URL=postgres://your_neon_username:password@ep-some-cluster.us-east-2.aws.neon.tech/neondb?sslmode=require</code>
          </div>
        </div>
      ) : candidates.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px 40px', border: '1px dotted var(--surface-border)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🤷‍♂️</div>
          <h3>No Consented Candidates Found</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '10px', maxWidth: '450px', marginLeft: 'auto', marginRight: 'auto' }}>
            Only candidates who checked the <strong>"Allow us to use this resume..."</strong> consent box when downloading a resume will appear in this feed.
          </p>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '15px' }}>
            Go back to the builder, fill out your profile, check the consent box, download, and refresh this page!
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '20px' }}>
          {candidates.map((cand) => (
            <div key={cand.profile_id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ fontSize: '1.25rem', margin: 0 }}>{cand.name}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', marginTop: '2px' }}>
                    🎨 Used Template: {cand.template_id}
                  </div>
                </div>
                <div style={{ background: 'var(--surface-border)', color: 'var(--text-secondary)', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px' }}>
                  Generated: {new Date(cand.generated_at).toLocaleDateString()}
                </div>
              </div>

              {/* Bio Summary */}
              {cand.summary && (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.5', fontStyle: 'italic' }}>
                  "{cand.summary}"
                </p>
              )}

              {/* Contact Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.85rem', borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)', padding: '10px 0' }}>
                <div>📧 {cand.email}</div>
                {cand.phone && <div>📞 {cand.phone}</div>}
                {cand.address && <div style={{ gridColumn: 'span 2' }}>📍 {cand.address}</div>}
              </div>

              {/* Skills Tags */}
              {cand.skills && cand.skills.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>Skills</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                    {cand.skills.map((skill, index) => (
                      <span key={index} style={{ background: 'hsl(var(--primary-hue), 20%, 20%)', color: 'hsl(var(--primary-hue), 100%, 85%)', fontSize: '0.75rem', padding: '3px 8px', borderRadius: '4px', border: '1px solid hsl(var(--primary-hue), 20%, 30%)' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Work Experience highlights */}
              {cand.experience && cand.experience.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '6px' }}>Latest Role</div>
                  <div style={{ background: 'hsl(220, 25%, 8%)', padding: '10px', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <div style={{ fontWeight: '600' }}>{cand.experience[0].position}</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>
                      {cand.experience[0].company} {cand.experience[0].location && `| ${cand.experience[0].location}`}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default JobPortal;
