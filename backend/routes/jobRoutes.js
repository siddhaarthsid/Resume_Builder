const express = require('express');
const router = express.Router();
const db = require('../db/db');
const auth = require('../middleware/auth');

/**
 * GET /api/jobs/matches
 * Simulates a job-matching service database lookup.
 * Queries ONLY resumes that opted-in (consent_job_matching = true) at the database layer.
 * Joins with the latest profile details to return candidate profiles.
 */
router.get('/matches', auth, async (req, res, next) => {
  try {
    // Privacy is enforced at the query layer: WHERE r.consent_job_matching = TRUE
    const queryText = `
      SELECT DISTINCT ON (rp.user_id)
        rp.id AS profile_id,
        rp.user_id,
        rp.name,
        rp.email,
        rp.phone,
        rp.address,
        rp.dob,
        rp.summary,
        rp.skills,
        rp.education,
        rp.experience,
        rp.certifications,
        r.generated_at,
        r.template_id
      FROM resumes r
      JOIN resume_profiles rp ON r.profile_id = rp.id
      WHERE r.consent_job_matching = TRUE
      ORDER BY rp.user_id, r.generated_at DESC
    `;
    
    const result = await db.query(queryText);
    
    // We return matched candidates
    res.json({
      success: true,
      matchesCount: result.rows.length,
      candidates: result.rows
    });
  } catch (error) {
    console.error('[Job Routes] Error fetching job matches:', error);
    next(error);
  }
});

module.exports = router;
