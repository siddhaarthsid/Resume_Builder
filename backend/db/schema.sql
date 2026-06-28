-- SQL Schema for Resume Builder Module
-- Run this in your Neon PostgreSQL database console to set up tables

-- Table 1: resume_profiles
-- Stores the user's structured resume profile details and repeatable sections as JSONB.
-- One profile per user_id.
CREATE TABLE IF NOT EXISTS resume_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE, -- Mock Host Application User ID association
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    address VARCHAR(255),
    dob VARCHAR(100),
    summary TEXT,
    education JSONB DEFAULT '[]'::jsonb,
    experience JSONB DEFAULT '[]'::jsonb,
    skills JSONB DEFAULT '[]'::jsonb,
    certifications JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table 2: resumes
-- Stores metadata for each generated PDF resume, including user consent for job matching (consent_job_matching).
-- consent_job_matching is stored per resume, not per user.
CREATE TABLE IF NOT EXISTS resumes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    profile_id INTEGER NOT NULL REFERENCES resume_profiles(id) ON DELETE CASCADE,
    template_id VARCHAR(50) NOT NULL,
    consent_job_matching BOOLEAN DEFAULT FALSE NOT NULL,
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for performance and privacy check (job matching portal)
CREATE INDEX IF NOT EXISTS idx_resumes_consent_job_matching ON resumes (consent_job_matching) WHERE consent_job_matching = TRUE;
