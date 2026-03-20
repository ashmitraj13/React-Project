import React, { useState, useEffect } from 'react';
import JobCard from './components/JobCard';
import './App.css';

// English job titles to map from API post IDs
const JOB_TITLES = [
  'Senior Frontend Developer',
  'Backend Engineer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Product Designer',
  'Data Scientist',
  'Mobile App Developer',
  'Cloud Solutions Architect',
  'Machine Learning Engineer',
  'QA Automation Engineer',
  'Technical Project Manager',
  'Security Analyst',
  'UI/UX Designer',
  'Site Reliability Engineer',
  'Software Engineer Intern',
  'Database Administrator',
  'Blockchain Developer',
  'Systems Engineer',
  'AI Research Scientist',
  'Platform Engineer',
];

const JOB_DESCRIPTIONS = [
  'Join our team to build modern, responsive web applications using React, TypeScript, and cutting-edge frontend technologies. You will collaborate with designers and backend engineers to ship high-quality features.',
  'Design and implement scalable server-side systems with Node.js and PostgreSQL. You will work on APIs, microservices, and data pipelines that power our core platform.',
  'Work across the entire stack to deliver end-to-end features. From database schema design to pixel-perfect UI, you will own features from concept to production deployment.',
  'Automate infrastructure, manage CI/CD pipelines, and ensure 99.9% uptime for our cloud services. Experience with Docker, Kubernetes, and AWS is a strong plus.',
  'Shape the user experience of our flagship product through research, wireframing, prototyping, and high-fidelity design. Collaborate closely with engineering to bring designs to life.',
  'Analyze large datasets to extract actionable insights and build predictive models. Work with Python, SQL, and modern ML frameworks to solve real business problems.',
  'Build and maintain cross-platform mobile applications using React Native or Flutter. Focus on delivering smooth, performant experiences on both iOS and Android.',
  'Design cloud architectures that are secure, cost-effective, and highly available. Lead migration projects and mentor teams on cloud best practices across AWS and GCP.',
  'Develop and deploy machine learning models at scale. Research new approaches, run experiments, and integrate ML solutions into production systems.',
  'Build robust automated test suites and CI integration to ensure product quality. Champion testing best practices and help the team ship with confidence.',
  'Lead cross-functional engineering teams through agile sprints. Coordinate roadmaps, unblock teams, and ensure projects are delivered on time and within scope.',
  'Monitor and respond to security threats, conduct vulnerability assessments, and implement security best practices across all applications and infrastructure.',
  'Create intuitive, accessible, and delightful user interfaces. Conduct user research, build prototypes, and iterate on designs based on feedback and analytics.',
  'Ensure the reliability and performance of production services. Build monitoring dashboards, automate incident response, and improve system resilience.',
  'A fantastic opportunity for students to gain hands-on experience with modern software development practices. Work alongside senior engineers on real projects.',
  'Manage and optimize database systems for performance, reliability, and security. Handle migrations, backups, replication, and query optimization.',
  'Build decentralized applications and smart contracts on Ethereum and Solana. Strong understanding of Web3 protocols and cryptographic principles required.',
  'Design, build, and maintain core infrastructure systems. Work on networking, storage, and compute platforms that support our engineering teams.',
  'Conduct cutting-edge research in artificial intelligence and natural language processing. Publish papers and translate research breakthroughs into product features.',
  'Build and maintain the internal developer platform. Create tools, SDKs, and services that accelerate engineering productivity across the organization.',
];

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);
  const [viewMode, setViewMode] = useState('all'); // 'all' | 'saved'
  const [loading, setLoading] = useState(true);

  // Fetch jobs from API on mount
  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((res) => res.json())
      .then((data) => {
        // Map posts to job-like objects with English content
        const mappedJobs = data.slice(0, 20).map((post, index) => ({
          id: post.id,
          title: JOB_TITLES[index % JOB_TITLES.length],
          body: JOB_DESCRIPTIONS[index % JOB_DESCRIPTIONS.length],
        }));
        setJobs(mappedJobs);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch jobs:', error);
        setLoading(false);
      });
  }, []);

  // Toggle save/remove
  const handleToggleSave = (jobId) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    );
  };

  // Filter jobs based on search text and view mode
  const getFilteredJobs = () => {
    let filtered = jobs;

    // If viewing saved, only show saved jobs
    if (viewMode === 'saved') {
      filtered = filtered.filter((job) => savedJobs.includes(job.id));
    }

    // Apply search filter by role/title
    if (searchText.trim()) {
      const query = searchText.toLowerCase();
      filtered = filtered.filter((job) =>
        job.title.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const filteredJobs = getFilteredJobs();

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            <line x1="12" y1="12" x2="12" y2="12.01" />
          </svg>
        </div>
        <h1 className="header__title">Job Listing Portal</h1>
        <p className="header__subtitle">
          Discover opportunities, save your favorites, and land your dream role.
        </p>
      </header>

      {/* Controls */}
      <div className="controls">
        <div className="search-wrapper">
          <span className="search-wrapper__icon">🔍</span>
          <input
            id="search-input"
            className="search-input"
            type="text"
            placeholder="Search jobs by role..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <div className="view-toggle">
          <button
            id="btn-all"
            className={`view-toggle__btn ${viewMode === 'all' ? 'view-toggle__btn--active' : ''}`}
            onClick={() => setViewMode('all')}
          >
            All Jobs
          </button>
          <button
            id="btn-saved"
            className={`view-toggle__btn ${viewMode === 'saved' ? 'view-toggle__btn--active' : ''}`}
            onClick={() => setViewMode('saved')}
          >
            Saved
            {savedJobs.length > 0 && (
              <span className="saved-badge">{savedJobs.length}</span>
            )}
          </button>
        </div>
      </div>

      {/* Stats */}
      {!loading && (
        <div className="stats-bar">
          <div className="stat-chip">
            📋 Showing <span className="stat-chip__value">{filteredJobs.length}</span> {filteredJobs.length === 1 ? 'job' : 'jobs'}
          </div>
          <div className="stat-chip">
            ❤️ Saved <span className="stat-chip__value">{savedJobs.length}</span>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="loading">
          <div className="loading__spinner"></div>
          <p className="loading__text">Fetching the latest opportunities...</p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="empty-state">
          <span className="empty-state__emoji">
            {viewMode === 'saved' ? '📌' : '🔎'}
          </span>
          <h2 className="empty-state__title">
            {viewMode === 'saved'
              ? 'No saved jobs yet'
              : 'No matching jobs found'}
          </h2>
          <p className="empty-state__desc">
            {viewMode === 'saved'
              ? 'Start saving jobs you\'re interested in and they\'ll appear here.'
              : 'Try adjusting your search to find what you\'re looking for.'}
          </p>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobs.includes(job.id)}
              onToggleSave={handleToggleSave}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
