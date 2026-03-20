import React from 'react';

const COMPANIES = [
  'TechNova', 'PixelForge', 'CloudBase', 'DataSync', 'CodeCraft',
  'NetWave', 'ByteShift', 'QuantumLeap', 'DevSphere', 'AppVista',
  'CyberEdge', 'InnoLogic', 'FlexiCode', 'SkyStack', 'CoreAxis',
  'BluePrint', 'ZenithAI', 'PulseIO', 'GridMind', 'NexaSoft'
];

const LOCATIONS = [
  'San Francisco, CA', 'Remote', 'New York, NY', 'Austin, TX',
  'Seattle, WA', 'London, UK', 'Berlin, DE', 'Toronto, CA',
  'Bangalore, IN', 'Singapore'
];

const TAGS_POOL = [
  'React', 'Node.js', 'Python', 'Full-time', 'Remote', 'Hybrid',
  'JavaScript', 'TypeScript', 'AWS', 'Docker', 'Go', 'Rust',
  'GraphQL', 'MongoDB', 'PostgreSQL', 'Kubernetes'
];

const SALARY_RANGES = [
  '$70K - $95K', '$85K - $110K', '$95K - $130K', '$110K - $150K',
  '$120K - $160K', '$80K - $105K', '$100K - $140K'
];

function getSeededValue(id, array) {
  return array[id % array.length];
}

function getSeededTags(id) {
  const tags = [];
  const count = 2 + (id % 3);
  for (let i = 0; i < count; i++) {
    tags.push(TAGS_POOL[(id * 3 + i * 7) % TAGS_POOL.length]);
  }
  return [...new Set(tags)];
}

function getInitials(name) {
  return name.split(/(?=[A-Z])/).map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function JobCard({ job, isSaved, onToggleSave }) {
  const company = getSeededValue(job.id, COMPANIES);
  const location = getSeededValue(job.id + 3, LOCATIONS);
  const tags = getSeededTags(job.id);
  const salary = getSeededValue(job.id + 5, SALARY_RANGES);
  const initials = getInitials(company);

  return (
    <div className="job-card" style={{ animationDelay: `${(job.id % 10) * 0.05}s` }}>
      <div className="job-card__header">
        <div className="job-card__avatar">{initials}</div>
        <div className="job-card__meta">
          <div className="job-card__company">{company} • {location}</div>
          <div className="job-card__role">{job.title}</div>
        </div>
      </div>

      <div className="job-card__tags">
        {tags.map((tag, index) => (
          <span key={index} className="job-card__tag">{tag}</span>
        ))}
      </div>

      <p className="job-card__description">{job.body}</p>

      <div className="job-card__footer">
        <div className="job-card__salary">
          {salary} <span>/year</span>
        </div>
        <button
          className={`btn-save ${isSaved ? 'btn-save--remove' : 'btn-save--save'}`}
          onClick={() => onToggleSave(job.id)}
        >
          {isSaved ? '✕ Remove' : '♡ Save Job'}
        </button>
      </div>
    </div>
  );
}

export default JobCard;
