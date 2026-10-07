/**
 * MUHAMMAD HASEEB ZIA — PORTFOLIO CLIENT APPLICATION
 * High-performance vanilla JavaScript with modern reactive patterns.
 * Interacts with /api/portfolio, renders interactive canvas visual, and manages states.
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});


const DEFAULT_PORTFOLIO_STATE = {
  "settings": {
    "site_title": "Muhammad Haseeb Zia | BS Accounting & Finance \u2022 CA Student \u2022 Digital Professional",
    "person_name": "MUHAMMAD HASEEB ZIA",
    "headline": "BS Accounting & Finance Student \u2022 CA Student \u2022 Digital Professional",
    "tagline": "Synthesizing rigorous financial analysis, Chartered Accountancy training, and high-impact digital skills.",
    "hero_intro": "Motivated and detail-oriented BS Accounting & Finance student at Bahauddin Zakariya University with hands-on experience in academic administration, cash management, examination coordination, and data handling. Advancing through CA Second Stage with 11 papers cleared.",
    "email": "m.haseebzia0@gmail.com",
    "phone": "0328-100-1266",
    "location": "Multan, Pakistan",
    "native_city": "Layyah, Punjab, Pakistan",
    "university": "Bahauddin Zakariya University (BZU), Multan",
    "ca_institute": "SKANS School of Accountancy",
    "department": "Department of Commerce",
    "student_portal_roll": "BAFM-26-53",
    "availability_status": "Available for Accounting, Data & Digital Engagements",
    "cv_download_url": "/api/download-cv",
    "about_title": "Architecting Value Through Numbers, Integrity & Digital Craft",
    "about_p1": "I am Muhammad Haseeb Zia, currently based in Multan, Pakistan. My academic and professional journey is defined by a deep dual focus on finance and digital proficiency. I am actively pursuing my BS in Accounting & Finance (1st Semester, 2026) at Bahauddin Zakariya University (BZU) in Multan, alongside my professional Chartered Accountancy (CA) qualification at SKANS School of Accountancy, where I have successfully cleared Stage 1 (PRC) and am advancing through Stage 2 (CAF).",
    "about_p2": "Prior to university, I built a foundation of academic discipline in Layyah, completing my Matriculation at Government Model High School with an outstanding 1085/1100 marks and my F.Sc. Pre-Medical at Zakariya High School with 842/1100 marks. My professional trajectory gained significant operational depth at My Academy in Layyah, where I served as Academy Head, leading academic administration and institutional operations, as well as an Examination Invigilator and Class Moderator enforcing academic integrity and scheduling.",
    "about_p3": "Complementing my analytical and financial foundation is hands-on expertise in digital execution: high-accuracy data entry, advanced Microsoft Excel modeling, professional Microsoft Word document layout, video editing, and IT problem-solving. Whether conducting financial analysis or streamlining complex data workflows, I bring precision, ethical focus, and modern productivity.",
    "years_active": "2021 \u2013 Present",
    "profile_image_url": "/assets/profile.png"
  },
  "education": [
    {
      "id": 9,
      "degree": "CA \u2013 Second Stage (In Progress)",
      "institution": "SKANS School of Accountancy",
      "location": "Pakistan",
      "period": "Active Track",
      "status": "11 Papers Passed",
      "score": "11 papers passed; 2 papers attempted, results awaited",
      "description": "Rigorous Chartered Accountancy qualification covering financial accounting, quantitative methods, business economics, and corporate frameworks.",
      "sort_order": 1,
      "created_at": "2026-10-07 07:40:20"
    },
    {
      "id": 10,
      "degree": "BS Accounting & Finance",
      "institution": "Bahauddin Zakariya University, Multan",
      "location": "Multan, Pakistan",
      "period": "2026 \u2013 Present",
      "status": "1st Semester",
      "score": "Roll No: BAFM-26-53",
      "description": "Undergraduate curriculum within the Department of Commerce focusing on financial reporting, cost accounting, business mathematics, microeconomics, and analytical finance.",
      "sort_order": 2,
      "created_at": "2026-10-07 07:40:20"
    },
    {
      "id": 11,
      "degree": "F.Sc. Pre-Medical",
      "institution": "Zakariya High School, Layyah",
      "location": "Layyah, Pakistan",
      "period": "2024",
      "status": "Completed",
      "score": "842 / 1100 (76.55%)",
      "description": "Higher secondary education in pre-medical sciences (biology, chemistry, physics), developing disciplined study habits and analytical reasoning.",
      "sort_order": 3,
      "created_at": "2026-10-07 07:40:20"
    },
    {
      "id": 12,
      "degree": "Matriculation (Science)",
      "institution": "Government Model High School, Layyah",
      "location": "Layyah, Pakistan",
      "period": "2021",
      "status": "Completed",
      "score": "1085 / 1100 (98.64%) \u2014 Distinction",
      "description": "Secondary school education with exceptional academic distinction across science, mathematics, English, and Urdu.",
      "sort_order": 4,
      "created_at": "2026-10-07 07:40:20"
    }
  ],
  "experience": [
    {
      "id": 9,
      "role": "Cashier",
      "organization": "PC WORLD, Layyah",
      "location": "Layyah, Pakistan",
      "period": "Mar 2023 \u2013 Jun 2024",
      "badge": "Cash & Sales Operations",
      "responsibilities": "Handled cash transactions, customer payments, and accurate change.\nSupported checkout service and maintained daily sales registers and cash records.\nReconciled daily cash balances with sales receipts.",
      "sort_order": 1,
      "created_at": "2026-10-07 07:40:20"
    },
    {
      "id": 10,
      "role": "Cashier",
      "organization": "AFFORD, Layyah",
      "location": "Layyah, Pakistan",
      "period": "Aug 2024 \u2013 Dec 2025",
      "badge": "Billing & Financial Operations",
      "responsibilities": "Processed customer purchases and payments with high billing accuracy.\nManaged cash handling, point-of-sale entries, and daily cash balancing.\nEnsured transaction integrity and assisted in daily reconciliations.",
      "sort_order": 2,
      "created_at": "2026-10-07 07:40:20"
    },
    {
      "id": 11,
      "role": "Academy Head",
      "organization": "My Academy, Layyah",
      "location": "Layyah, Pakistan",
      "period": "~6 Months",
      "badge": "Academic Administration",
      "responsibilities": "Managed daily academic activities, student matters, scheduling, and discipline.\nCoordinated academic tasks, student communications, and instructor logistics.\nSupported academic scheduling while demonstrating leadership and teamwork.",
      "sort_order": 3,
      "created_at": "2026-10-07 07:40:20"
    },
    {
      "id": 12,
      "role": "Examination Invigilator / Class Moderator",
      "organization": "My Academy, Layyah",
      "location": "Layyah, Pakistan",
      "period": "~6 Months",
      "badge": "Oversight & Assessment (Classes 8th, 9th & 10th)",
      "responsibilities": "Conducted and supervised send-up and formal examinations for Classes 8th, 9th & 10th.\nManaged weekly and monthly student assessments and attendance records.\nPrepared mark sheets and maintained comprehensive examination logs.",
      "sort_order": 4,
      "created_at": "2026-10-07 07:40:20"
    },
    {
      "id": 13,
      "role": "Freelancer",
      "organization": "Independent Remote Work",
      "location": "Multan & Remote",
      "period": "Continuous",
      "badge": "Digital & Data Execution",
      "responsibilities": "Completed online assignments on time and developed digital-work and data-handling skills.\nDelivered spreadsheet modeling in Microsoft Excel and formatted documentation in Microsoft Word.\nProvided verified data entry and multimedia editing for client requirements.",
      "sort_order": 5,
      "created_at": "2026-10-07 07:40:20"
    }
  ],
  "skills": [
    {
      "id": 1,
      "category": "OFFICE & PRODUCTIVITY",
      "name": "Microsoft Word",
      "level_label": "Advanced",
      "icon_name": "file-text",
      "description": "Executive document layout, academic formatting, templates, and corporate styling.",
      "sort_order": 1,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 2,
      "category": "OFFICE & PRODUCTIVITY",
      "name": "Microsoft Excel",
      "level_label": "Advanced",
      "icon_name": "table",
      "description": "Complex formulas, financial worksheets, structured data ledgers, and numerical reconciliation.",
      "sort_order": 2,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 3,
      "category": "DIGITAL",
      "name": "Data Entry",
      "level_label": "High Precision",
      "icon_name": "database",
      "description": "High-speed keyboard entry, data verification, numeric data handling, and structured database hygiene.",
      "sort_order": 3,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 4,
      "category": "DIGITAL",
      "name": "Computer & IT Skills",
      "level_label": "Proficient",
      "icon_name": "cpu",
      "description": "Hardware & software troubleshooting, OS management, digital productivity tools, and technical research.",
      "sort_order": 4,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 5,
      "category": "DIGITAL",
      "name": "Video Editing",
      "level_label": "Skilled",
      "icon_name": "video",
      "description": "Social media video editing, pacing, cuts, audio synchronization, and visual assembly.",
      "sort_order": 5,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 6,
      "category": "PROFESSIONAL",
      "name": "Communication",
      "level_label": "Bilingual",
      "icon_name": "message-square",
      "description": "Clear interpersonal articulation, formal academic writing, and prompt professional correspondence.",
      "sort_order": 6,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 7,
      "category": "PROFESSIONAL",
      "name": "Leadership",
      "level_label": "Demonstrated",
      "icon_name": "shield",
      "description": "Institutional leadership, academic supervision, team guidance, and decisive accountability.",
      "sort_order": 7,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 8,
      "category": "PROFESSIONAL",
      "name": "Teamwork",
      "level_label": "Collaborative",
      "icon_name": "users",
      "description": "Cross-functional coordination, classroom moderation, conflict resolution, and peer mentoring.",
      "sort_order": 8,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 9,
      "category": "PROFESSIONAL",
      "name": "Time Management",
      "level_label": "Disciplined",
      "icon_name": "clock",
      "description": "Concurrent balancing of university academics, CA qualification papers, and administrative responsibilities.",
      "sort_order": 9,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 10,
      "category": "LANGUAGES",
      "name": "Urdu",
      "level_label": "Native Fluency",
      "icon_name": "globe",
      "description": "Native linguistic command across written, spoken, and formal administrative discourse.",
      "sort_order": 10,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 11,
      "category": "LANGUAGES",
      "name": "English",
      "level_label": "Professional Working",
      "icon_name": "book-open",
      "description": "Fluent academic and commercial proficiency in written documentation and professional dialogue.",
      "sort_order": 11,
      "created_at": "2026-10-07 06:47:55"
    }
  ],
  "services": [
    {
      "id": 1,
      "title": "Data Entry & Processing",
      "description": "Fast, reliable, and verified data entry services for spreadsheets, forms, and administrative databases with zero errors.",
      "icon_name": "database",
      "deliverables": "High-accuracy data transcription;Duplicate removal & data cleaning;Excel & CSV structuring;Database population",
      "sort_order": 1,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 2,
      "title": "Microsoft Word Document Work",
      "description": "Polished typography, corporate styling, thesis/academic layouts, syllabus structuring, and print-ready document design.",
      "icon_name": "file-text",
      "deliverables": "Executive corporate formatting;Table of contents & cross-references;Institutional reports & letters;Custom template creation",
      "sort_order": 2,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 3,
      "title": "Microsoft Excel Worksheets",
      "description": "Financial spreadsheets, automated calculation models, double-entry bookkeeping templates, and data reconciliation.",
      "icon_name": "table",
      "deliverables": "Accounting calculation templates;Formula automation (SUMIFS, VLOOKUP, XLOOKUP);Budget & expense trackers;Clean data visualization",
      "sort_order": 3,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 4,
      "title": "Video Editing",
      "description": "Engaging digital video edits for educational content, social media clips, presentation videos, and online branding.",
      "icon_name": "video",
      "deliverables": "Timeline cuts & trimming;Audio sync & background sound balancing;Subtitles, titles & lower-thirds;Clean transitions & pacing",
      "sort_order": 4,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 5,
      "title": "Digital & Computer Assistance",
      "description": "Reliable tech assistance, digital asset organization, technical research, and virtual administrative support.",
      "icon_name": "cpu",
      "deliverables": "Web & tech research assistance;File structuring & folder systems;Computer troubleshooting & software setup;Virtual academic support",
      "sort_order": 5,
      "created_at": "2026-10-07 06:47:55"
    }
  ],
  "projects": [
    {
      "id": 1,
      "title": "Academic Record & Attendance Management System",
      "description": "Structured data ledger and examination record system designed for institutional attendance tracking, mark compilation, and grading.",
      "category": "Administration & Education",
      "technologies": "Microsoft Excel, Data Verification, Microsoft Word",
      "image_url": "/assets/project-academic.svg",
      "live_url": "#",
      "github_url": "#",
      "is_featured": 1,
      "is_placeholder": 1,
      "sort_order": 1,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 2,
      "title": "Financial Accounting Model & Double-Entry Ledger",
      "description": "A comprehensive financial spreadsheet model with trial balance calculation, income statement generator, and expense categorization.",
      "category": "Accounting & Finance",
      "technologies": "Microsoft Excel, Financial Analysis, Accounting Standards",
      "image_url": "/assets/project-finance.svg",
      "live_url": "#",
      "github_url": "#",
      "is_featured": 1,
      "is_placeholder": 1,
      "sort_order": 2,
      "created_at": "2026-10-07 06:47:55"
    },
    {
      "id": 3,
      "title": "Educational & Commercial Video Showcase",
      "description": "A curated reel demonstrating multi-track timeline editing, audio enhancement, smooth transitions, and subtitle synchronization.",
      "category": "Video & Digital Media",
      "technologies": "Video Editing, Audio Sync, Digital Media",
      "image_url": "/assets/project-video.svg",
      "live_url": "#",
      "github_url": "#",
      "is_featured": 1,
      "is_placeholder": 1,
      "sort_order": 3,
      "created_at": "2026-10-07 06:47:55"
    }
  ]
};

let portfolioState = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_STATE));

async function initApp() {
  initHeroCanvas();
  initNavigation();
  initContactForm();
  await loadPortfolioData();
  initScrollAnimations();
}

/**
 * 1. Fetch Portfolio Data from Backend API
 */
async function loadPortfolioData() {
  try {
    const res = await fetch('/api/portfolio');
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      portfolioState = json.data;
      renderPortfolio();
    }
  } catch (err) {
    console.warn('API data fetch failed, rendering bundled default content:', err); renderPortfolio();
  }
}

function renderPortfolio() {
  renderSettings();
  renderEducation();
  renderExperience();
  renderSkills('ALL');
  renderServices();
  renderProjects();
}

/**
 * 2. Render Settings & Identity
 */
function renderSettings() {
  const s = portfolioState.settings || {};
  
  if (s.person_name) {
    document.querySelectorAll('.js-person-name').forEach(el => el.textContent = s.person_name);
  }
  if (s.headline) {
    document.querySelectorAll('.js-headline').forEach(el => el.textContent = s.headline);
  }
  if (s.hero_intro) {
    const el = document.getElementById('hero-intro-text');
    if (el) el.textContent = s.hero_intro;
  }
  if (s.email) {
    document.querySelectorAll('.js-contact-email').forEach(el => {
      el.textContent = s.email;
      if (el.tagName === 'A') el.href = `mailto:${s.email}`;
    });
  }
  if (s.phone) {
    document.querySelectorAll('.js-contact-phone').forEach(el => {
      el.textContent = s.phone;
      if (el.tagName === 'A') el.href = `tel:${s.phone.replace(/[\s-]/g, '')}`;
    });
  }
  if (s.location) {
    document.querySelectorAll('.js-contact-location').forEach(el => el.textContent = s.location);
  }
  if (s.about_p1 && document.getElementById('about-p1')) {
    document.getElementById('about-p1').textContent = s.about_p1;
  }
  if (s.about_p2 && document.getElementById('about-p2')) {
    document.getElementById('about-p2').textContent = s.about_p2;
  }
  if (s.about_p3 && document.getElementById('about-p3')) {
    document.getElementById('about-p3').textContent = s.about_p3;
  }
}

/**
 * 3. Render Education Timeline
 */
function renderEducation() {
  const container = document.getElementById('education-timeline-container');
  if (!container || !portfolioState.education?.length) return;

  container.innerHTML = portfolioState.education.map(item => `
    <div class="timeline-item">
      <div class="timeline-node"></div>
      <div class="timeline-card">
        <div class="timeline-card-header">
          <div>
            <h3 class="timeline-degree">${escapeHtml(item.degree)}</h3>
            <div class="timeline-institution">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
              </svg>
              ${escapeHtml(item.institution)} • <span style="color: var(--text-dim); font-size: 0.875rem;">${escapeHtml(item.location || '')}</span>
            </div>
          </div>
          <span class="timeline-period">${escapeHtml(item.period)}</span>
        </div>
        <div class="timeline-status-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          ${escapeHtml(item.status || item.score || 'Verified')}
        </div>
        ${item.score && item.status !== item.score ? `<div style="font-size: 0.8125rem; font-weight: 700; color: var(--accent-blue-light); margin-bottom: 8px;">Key Metric: ${escapeHtml(item.score)}</div>` : ''}
        <p class="timeline-desc">${escapeHtml(item.description)}</p>
      </div>
    </div>
  `).join('');
}

/**
 * 4. Render Professional Experience Cards
 */
function renderExperience() {
  const container = document.getElementById('experience-cards-container');
  if (!container || !portfolioState.experience?.length) return;

  container.innerHTML = portfolioState.experience.map(item => {
    const bullets = (item.responsibilities || '').split('\n').filter(b => b.trim());
    return `
      <div class="experience-card card-glow">
        <span class="exp-badge">${escapeHtml(item.badge || 'Professional Role')}</span>
        <h3 class="exp-role">${escapeHtml(item.role)}</h3>
        <div class="exp-org">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--accent-blue-light)">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>${escapeHtml(item.organization)}</span>
        </div>
        <div style="font-size: 0.8125rem; color: var(--text-dim); margin-bottom: 12px; display: flex; justify-content: space-between;">
          <span>📍 ${escapeHtml(item.location || 'Layyah, Pakistan')}</span>
          <span>🗓️ ${escapeHtml(item.period)}</span>
        </div>
        <ul class="exp-bullet-list">
          ${bullets.map(b => `<li class="exp-bullet-item">${escapeHtml(b.replace(/^[•\-\*]\s*/, ''))}</li>`).join('')}
        </ul>
      </div>
    `;
  }).join('');
}

/**
 * 5. Render Skills Matrix with Interactive Filter
 */
function renderSkills(activeCategory = 'ALL') {
  const container = document.getElementById('skills-grid-container');
  if (!container || !portfolioState.skills?.length) return;

  let skills = portfolioState.skills;
  if (activeCategory !== 'ALL') {
    skills = skills.filter(s => s.category.toUpperCase().includes(activeCategory.toUpperCase()));
  }

  container.innerHTML = skills.map(skill => `
    <div class="skill-card card-glow">
      <div class="skill-card-top">
        <div class="skill-icon">
          ${getSkillIconSvg(skill.icon_name || 'check')}
        </div>
        <span class="skill-tier">${escapeHtml(skill.level_label || 'Proficient')}</span>
      </div>
      <h3 class="skill-name">${escapeHtml(skill.name)}</h3>
      <p class="skill-desc">${escapeHtml(skill.description || '')}</p>
    </div>
  `).join('');
}

function getSkillIconSvg(iconName) {
  switch (iconName) {
    case 'file-text':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`;
    case 'table':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>`;
    case 'database':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>`;
    case 'cpu':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`;
    case 'video':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`;
    case 'message-square':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
    case 'shield':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
    case 'users':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    case 'clock':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`;
    case 'globe':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;
    case 'book-open':
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>`;
    default:
      return `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>`;
  }
}

/**
 * 6. Render Services Section
 */
function renderServices() {
  const container = document.getElementById('services-grid-container');
  if (!container || !portfolioState.services?.length) return;

  container.innerHTML = portfolioState.services.map(svc => {
    const deliverables = (svc.deliverables || '').split(';').filter(d => d.trim());
    return `
      <div class="service-card card-glow">
        <div class="service-header">
          <div class="service-icon">
            ${getSkillIconSvg(svc.icon_name || 'database')}
          </div>
          <h3 class="service-title">${escapeHtml(svc.title)}</h3>
        </div>
        <p class="service-desc">${escapeHtml(svc.description)}</p>
        <ul class="service-deliverables">
          ${deliverables.map(item => `
            <li class="deliverable-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>${escapeHtml(item)}</span>
            </li>
          `).join('')}
        </ul>
        <button class="btn btn-secondary btn-sm" onclick="selectServiceForContact('${escapeHtml(svc.title)}')" style="align-self: flex-start; margin-top: auto;">
          Inquire About This Service &rarr;
        </button>
      </div>
    `;
  }).join('');
}

function selectServiceForContact(serviceTitle) {
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  if (subjectInput) {
    subjectInput.value = `Inquiry: ${serviceTitle}`;
  }
  if (messageInput) {
    messageInput.value = `Hello Muhammad Haseeb,\n\nI am interested in your ${serviceTitle} service. Please let me know your availability and how we can collaborate.`;
  }
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      if (document.getElementById('contact-name')) {
        document.getElementById('contact-name').focus();
      }
    }, 500);
  }
}
window.selectServiceForContact = selectServiceForContact;

/**
 * 7. Render Projects / Work Showcase
 */
function renderProjects() {
  const container = document.getElementById('projects-grid-container');
  if (!container || !portfolioState.projects?.length) return;

  container.innerHTML = portfolioState.projects.map(proj => {
    const tags = (proj.technologies || '').split(',').map(t => t.trim()).filter(Boolean);
    return `
      <div class="project-card">
        <div class="project-preview-wrap">
          <img src="${proj.image_url || '/assets/project-academic.svg'}" alt="${escapeHtml(proj.title)}" class="project-preview-img" loading="lazy" />
          <div class="project-badge-bar">
            ${proj.is_placeholder ? `<span class="status-pill-coming">🔒 Case Study Coming Soon</span>` : `<span class="status-pill-coming" style="color:#34D399; border-color: rgba(52, 211, 153, 0.3);">Verified Work</span>`}
            ${proj.is_featured ? `<span class="featured-pill">★ Featured</span>` : `<span></span>`}
          </div>
        </div>
        <div class="project-body">
          <span class="project-category">${escapeHtml(proj.category)}</span>
          <h3 class="project-title">${escapeHtml(proj.title)}</h3>
          <p class="project-desc">${escapeHtml(proj.description)}</p>
          <div class="project-tags">
            ${tags.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
          </div>
          <div class="project-actions">
            <button class="btn btn-secondary btn-sm" onclick="showProjectDetails(${proj.id})">
              Details & Specs
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function showProjectDetails(projId) {
  const proj = portfolioState.projects.find(p => p.id === projId);
  if (!proj) return;

  const modalBackdrop = document.getElementById('project-detail-modal');
  const modalContent = document.getElementById('project-modal-body');
  if (!modalBackdrop || !modalContent) return;

  modalContent.innerHTML = `
    <div style="margin-bottom: 20px;">
      <img src="${proj.image_url || '/assets/project-academic.svg'}" alt="${escapeHtml(proj.title)}" style="width: 100%; border-radius: var(--radius-md); border: 1px solid var(--border-subtle);" />
    </div>
    <div style="font-size: 0.8125rem; text-transform: uppercase; color: var(--accent-blue-light); font-weight: 700; margin-bottom: 6px;">
      ${escapeHtml(proj.category)}
    </div>
    <h2 style="font-size: 1.5rem; color: var(--text-main); margin-bottom: 12px;">${escapeHtml(proj.title)}</h2>
    <p style="font-size: 0.9375rem; color: var(--text-body); line-height: 1.7; margin-bottom: 20px;">${escapeHtml(proj.description)}</p>
    <div style="margin-bottom: 20px;">
      <h4 style="font-size: 0.875rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px;">Technologies & Tools</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${(proj.technologies || '').split(',').map(t => `<span class="tech-tag">${escapeHtml(t.trim())}</span>`).join('')}
      </div>
    </div>
    <div style="background: var(--bg-surface-elevated); border: 1px solid var(--border-accent); border-radius: var(--radius-sm); padding: 16px; font-size: 0.875rem; color: var(--text-muted);">
      ℹ️ <strong>Status Note:</strong> In accordance with strict portfolio veracity, full client deliverables are maintained confidentially or in active development. Detailed case study metrics are managed via the admin system.
    </div>
  `;
  modalBackdrop.classList.add('open');
}
window.showProjectDetails = showProjectDetails;

/**
 * 8. Interactive Hero Canvas: Accounting x Technology x Creativity
 */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;
  let isHovered = false;
  let mouse = { x: 0, y: 0 };

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    width = canvas.width = rect.width * (window.devicePixelRatio || 1);
    height = canvas.height = rect.height * (window.devicePixelRatio || 1);
  };
  resize();
  window.addEventListener('resize', resize);

  // Nodes representation: Financial Ledger points & Network connections
  const nodeCount = 38;
  const nodes = [];

  const icons = ['Σ', '₹', '%', 'Δ', '§', '01', 'λ', '∫', 'PKR', 'CA'];

  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.75,
      vy: (Math.random() - 0.5) * 0.75,
      radius: Math.random() * 3 + 2,
      char: icons[Math.floor(Math.random() * icons.length)],
      isSpecial: Math.random() > 0.65,
      color: Math.random() > 0.3 ? '#3B82F6' : '#60A5FA',
      alpha: Math.random() * 0.6 + 0.3
    });
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    mouse.x = (e.clientX - rect.left) * scaleX;
    mouse.y = (e.clientY - rect.top) * scaleY;
    isHovered = true;
  });

  canvas.addEventListener('mouseleave', () => {
    isHovered = false;
  });

  // Respect prefers-reduced-motion
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaQuery.matches) {
    drawStatic();
    return;
  }

  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#101625';
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = '#60A5FA';
    ctx.font = '16px Space Grotesk, sans-serif';
    ctx.fillText('Accounting × Tech Canvas Active', 40, height / 2);
  }

  let angle = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    angle += 0.005;

    // Draw central golden/blue core rings representing dual disciplines
    const centerX = width / 2;
    const centerY = height / 2;
    const coreRadius = Math.min(width, height) * 0.28;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(angle * 0.4);

    // Orbit Ring 1
    ctx.beginPath();
    ctx.ellipse(0, 0, coreRadius, coreRadius * 0.6, 0.4, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Orbit Ring 2
    ctx.beginPath();
    ctx.ellipse(0, 0, coreRadius * 0.8, coreRadius * 0.4, -0.6, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.restore();

    // Update & Draw Nodes
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 0 || node.x > width) node.vx *= -1;
      if (node.y < 0 || node.y > height) node.vy *= -1;

      // Mouse repulsion / attraction
      if (isHovered) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          node.x -= (dx / dist) * 2;
          node.y -= (dy / dist) * 2;
        }
      }

      // Connect nodes
      for (let j = i + 1; j < nodes.length; j++) {
        const other = nodes[j];
        const dx = other.x - node.x;
        const dy = other.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(other.x, other.y);
          const lineAlpha = (1 - dist / 110) * 0.22;
          ctx.strokeStyle = `rgba(59, 130, 246, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw node circle or math symbol
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.globalAlpha = node.alpha;
      ctx.fill();

      if (node.isSpecial) {
        ctx.fillStyle = '#F8FAFC';
        ctx.font = '10px Space Grotesk, sans-serif';
        ctx.globalAlpha = node.alpha * 0.8;
        ctx.fillText(node.char, node.x + 6, node.y + 4);
      }
      ctx.globalAlpha = 1.0;
    }

    animationFrameId = requestAnimationFrame(render);
  }

  render();
}

/**
 * 9. Navigation Interactions & ScrollSpy
 */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  const sections = document.querySelectorAll('section[id]');

  // Scroll Header Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // ScrollSpy
    let currentId = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else if (href?.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    }
  });

  // Mobile drawer toggle
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.innerHTML = isOpen ? `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ` : `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      `;
    });

    // Close drawer when clicking mobile links
    drawer.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Skills Category Filters
  const filterBtns = document.querySelectorAll('.skills-filter-nav .filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-category') || 'ALL';
      renderSkills(cat);
    });
  });

  // Modal close handlers
  document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close')) {
        document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
      }
    });
  });
}

/**
 * 10. Contact Form Submission & Validation
 */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');
  const banner = document.getElementById('contact-status-banner');

  const clearErrors = () => {
    form.querySelectorAll('.form-error').forEach(err => err.classList.remove('visible'));
    if (banner) {
      banner.className = 'form-status-banner';
      banner.style.display = 'none';
      banner.textContent = '';
    }
  };

  const showError = (fieldId, msg) => {
    const errEl = document.getElementById(`${fieldId}-error`);
    if (errEl) {
      errEl.textContent = msg;
      errEl.classList.add('visible');
    }
  };

  [nameInput, emailInput, subjectInput, messageInput].forEach(inp => {
    if (inp) {
      inp.addEventListener('input', () => {
        const errEl = document.getElementById(`${inp.id}-error`);
        if (errEl) errEl.classList.remove('visible');
      });
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    let hasErrors = false;
    if (!name || name.length < 2) {
      showError('contact-name', 'Please enter your full name (minimum 2 letters).');
      hasErrors = true;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('contact-email', 'Please provide a valid email address.');
      hasErrors = true;
    }
    if (!subject || subject.length < 3) {
      showError('contact-subject', 'Please specify a clear subject.');
      hasErrors = true;
    }
    if (!message || message.length < 10) {
      showError('contact-message', 'Message must contain at least 10 characters.');
      hasErrors = true;
    }

    if (hasErrors) return;

    // Loading State
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon">
        <line x1="12" y1="2" x2="12" y2="6"></line>
        <line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line>
        <line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
      </svg>
      Sending Message...
    `;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json = JSON.stringify({ name, email, subject, message })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        banner.className = 'form-status-banner success';
        banner.textContent = data.message || 'Thank you! Your message has been sent successfully.';
        form.reset();
        showToast('Message sent! Muhammad Haseeb Zia will contact you shortly.', 'success');
      } else {
        banner.className = 'form-status-banner error';
        banner.textContent = data.error || 'Failed to submit message. Please try again.';
        if (data.details) {
          Object.entries(data.details).forEach(([key, msg]) => {
            showError(`contact-${key}`, msg);
          });
        }
      }
    } catch (err) {
      banner.className = 'form-status-banner error';
      banner.textContent = 'Network error. Please check your connection and retry.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHtml;
    }
  });
}

/**
 * 11. Toast Notifications
 */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' ? '<polyline points="20 6 9 17 4 12"></polyline>' : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'}
    </svg>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 300ms ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
window.showToast = showToast;

/**
 * 12. Scroll Reveal Animations
 */
function initScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section, .card, .timeline-item').forEach(el => {
    el.classList.add('fade-on-scroll');
    observer.observe(el);
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Initialize Hero Photo vs Canvas Switcher
document.addEventListener('DOMContentLoaded', () => {
  const btnPhoto = document.getElementById('btn-toggle-photo');
  const btnCanvas = document.getElementById('btn-toggle-canvas');
  const photoView = document.getElementById('hero-photo-view');
  const canvasView = document.getElementById('hero-canvas-view');

  if (btnPhoto && btnCanvas && photoView && canvasView) {
    btnPhoto.addEventListener('click', () => {
      btnPhoto.classList.add('active');
      btnCanvas.classList.remove('active');
      photoView.style.display = 'block';
      canvasView.style.display = 'none';
    });

    btnCanvas.addEventListener('click', () => {
      btnCanvas.classList.add('active');
      btnPhoto.classList.remove('active');
      photoView.style.display = 'none';
      canvasView.style.display = 'flex';
      // Trigger canvas resize
      const canvas = document.getElementById('hero-canvas');
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * (window.devicePixelRatio || 1);
        canvas.height = rect.height * (window.devicePixelRatio || 1);
      }
    });
  }
});
