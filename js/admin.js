/**
 * MUHAMMAD HASEEB ZIA — ADMIN DASHBOARD JAVASCRIPT
 * Secure management client for Projects, Skills, Experience, Education, Messages & Site Settings.
 */

const AUTH_TOKEN_KEY = 'hz_portfolio_token';

let currentAdminUser = null;
let currentTab = 'overview';

document.addEventListener('DOMContentLoaded', () => {
  initAdmin();
});

async function initAdmin() {
  initTabs();
  initModals();
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    const valid = await verifyToken(token);
    if (valid) {
      showDashboard();
      return;
    }
  }
  showLogin();
}

/**
 * 1. Auth Management
 */
async function verifyToken(token) {
  try {
    const res = await fetch('/api/auth/verify', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const json = await res.json();
    if (json.success && json.authenticated) {
      currentAdminUser = json.user;
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

function showLogin() {
  document.getElementById('admin-login-screen').style.display = 'flex';
  document.getElementById('admin-dashboard-screen').style.display = 'none';
  setupLoginForm();
}

function showDashboard() {
  document.getElementById('admin-login-screen').style.display = 'none';
  document.getElementById('admin-dashboard-screen').style.display = 'block';
  
  if (currentAdminUser) {
    const nameEl = document.getElementById('admin-user-display');
    if (nameEl) nameEl.textContent = currentAdminUser.full_name || currentAdminUser.username || 'Admin';
  }

  // Setup Logout
  document.getElementById('admin-logout-btn')?.addEventListener('click', handleLogout);

  // Load Initial Tab
  loadTab(currentTab);
}

function setupLoginForm() {
  const form = document.getElementById('admin-login-form');
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorEl = document.getElementById('login-error-msg');
    const submitBtn = document.getElementById('login-submit-btn');

    errorEl.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.textContent = 'Verifying...';

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success && data.token) {
        localStorage.setItem(AUTH_TOKEN_KEY, data.token);
        currentAdminUser = data.user;
        showDashboard();
      } else {
        errorEl.textContent = data.error || 'Invalid credentials';
        errorEl.style.display = 'block';
      }
    } catch (err) {
      errorEl.textContent = 'Unable to reach backend server.';
      errorEl.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In to Dashboard';
    }
  };
}

function handleLogout() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  currentAdminUser = null;
  showLogin();
}

function getAuthHeaders() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
}

/**
 * 2. Tab Navigation
 */
function initTabs() {
  const tabs = document.querySelectorAll('.admin-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-tab');
      currentTab = target;
      
      document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.remove('active'));
      const pane = document.getElementById(`tab-pane-${target}`);
      if (pane) pane.classList.add('active');

      loadTab(target);
    });
  });
}

function loadTab(tabName) {
  switch (tabName) {
    case 'overview':
      loadOverview();
      break;
    case 'projects':
      loadProjects();
      break;
    case 'skills':
      loadSkills();
      break;
    case 'experience':
      loadExperience();
      break;
    case 'education':
      loadEducation();
      break;
    case 'messages':
      loadMessages();
      break;
    case 'settings':
      loadSettings();
      break;
  }
}

/**
 * 3. Overview Tab
 */
async function loadOverview() {
  try {
    const res = await fetch('/api/admin/overview', { headers: getAuthHeaders() });
    const json = await res.json();
    if (json.success && json.data) {
      const d = json.data;
      document.getElementById('ov-projects').textContent = d.projects_count;
      document.getElementById('ov-skills').textContent = d.skills_count;
      document.getElementById('ov-exp').textContent = d.experience_count;
      document.getElementById('ov-edu').textContent = d.education_count;
      document.getElementById('ov-msgs-total').textContent = d.messages_total;
      document.getElementById('ov-msgs-unread').textContent = d.messages_unread;
      
      const badge = document.getElementById('unread-msg-badge');
      if (badge) {
        badge.textContent = d.messages_unread;
        badge.style.display = d.messages_unread > 0 ? 'inline-flex' : 'none';
      }
    }
  } catch (e) {
    console.error('Error loading overview:', e);
  }
}

/**
 * 4. Projects Management
 */
async function loadProjects() {
  const tbody = document.getElementById('projects-table-body');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px;">Loading projects...</td></tr>`;

  try {
    const res = await fetch('/api/projects');
    const json = await res.json();
    if (json.success && json.data) {
      if (json.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-dim);">No projects found. Click "Add Project" to create one.</td></tr>`;
        return;
      }
      tbody.innerHTML = json.data.map(p => `
        <tr>
          <td style="font-weight: 700; color: var(--text-main);">${escapeHtml(p.title)}</td>
          <td><span class="tech-tag">${escapeHtml(p.category)}</span></td>
          <td><span style="font-size:0.8125rem; color: var(--text-muted);">${escapeHtml(p.technologies)}</span></td>
          <td>
            <button class="btn btn-sm ${p.is_featured ? 'btn-primary' : 'btn-secondary'}" onclick="toggleProjectFeatured(${p.id})">
              ${p.is_featured ? '★ Featured' : '☆ Standard'}
            </button>
          </td>
          <td>
            ${p.is_placeholder ? '<span style="color:#FBBF24; font-size:0.75rem;">Coming Soon</span>' : '<span style="color:#34D399; font-size:0.75rem;">Published</span>'}
          </td>
          <td>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm" onclick="editProjectModal(${p.id})">Edit</button>
              <button class="btn btn-sm" style="background:#7F1D1D; color:#FCA5A5; border:1px solid #991B1B;" onclick="deleteProject(${p.id})">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--accent-rose);">Error loading projects</td></tr>`;
  }
}

async function toggleProjectFeatured(id) {
  try {
    const res = await fetch(`/api/projects/${id}/featured`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      loadProjects();
      showToast('Project featured status updated', 'success');
    }
  } catch (e) {
    showToast('Failed to toggle featured status', 'error');
  }
}
window.toggleProjectFeatured = toggleProjectFeatured;

async function deleteProject(id) {
  if (!confirm('Are you sure you want to delete this project?')) return;
  try {
    const res = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      loadProjects();
      showToast('Project deleted successfully', 'success');
    }
  } catch (e) {
    showToast('Failed to delete project', 'error');
  }
}
window.deleteProject = deleteProject;

function openAddProjectModal() {
  document.getElementById('project-modal-title').textContent = 'Add New Project';
  document.getElementById('project-form').reset();
  document.getElementById('project-id-input').value = '';
  openModal('admin-project-modal');
}
window.openAddProjectModal = openAddProjectModal;

async function editProjectModal(id) {
  try {
    const res = await fetch('/api/projects');
    const json = await res.json();
    const proj = json.data?.find(p => p.id === id);
    if (!proj) return;

    document.getElementById('project-modal-title').textContent = 'Edit Project';
    document.getElementById('project-id-input').value = proj.id;
    document.getElementById('proj-title').value = proj.title;
    document.getElementById('proj-category').value = proj.category;
    document.getElementById('proj-desc').value = proj.description;
    document.getElementById('proj-tech').value = proj.technologies;
    document.getElementById('proj-image').value = proj.image_url || '';
    document.getElementById('proj-live').value = proj.live_url || '';
    document.getElementById('proj-github').value = proj.github_url || '';
    document.getElementById('proj-featured').checked = Boolean(proj.is_featured);
    document.getElementById('proj-placeholder').checked = Boolean(proj.is_placeholder);
    document.getElementById('proj-sort').value = proj.sort_order || 0;

    openModal('admin-project-modal');
  } catch (e) {
    showToast('Failed to load project details', 'error');
  }
}
window.editProjectModal = editProjectModal;

/**
 * 5. Skills Management
 */
async function loadSkills() {
  const tbody = document.getElementById('skills-table-body');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 24px;">Loading skills...</td></tr>`;

  try {
    const res = await fetch('/api/skills');
    const json = await res.json();
    if (json.success && json.data) {
      tbody.innerHTML = json.data.map(s => `
        <tr>
          <td><span class="tech-tag">${escapeHtml(s.category)}</span></td>
          <td style="font-weight: 700; color: var(--text-main);">${escapeHtml(s.name)}</td>
          <td><span style="color:var(--accent-blue-light); font-weight:600;">${escapeHtml(s.level_label)}</span></td>
          <td style="font-size:0.8125rem; color:var(--text-muted);">${escapeHtml(s.description || '')}</td>
          <td>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm" onclick="editSkillModal(${s.id})">Edit</button>
              <button class="btn btn-sm" style="background:#7F1D1D; color:#FCA5A5; border:1px solid #991B1B;" onclick="deleteSkill(${s.id})">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--accent-rose);">Error loading skills</td></tr>`;
  }
}

function openAddSkillModal() {
  document.getElementById('skill-modal-title').textContent = 'Add Skill';
  document.getElementById('skill-form').reset();
  document.getElementById('skill-id-input').value = '';
  openModal('admin-skill-modal');
}
window.openAddSkillModal = openAddSkillModal;

async function editSkillModal(id) {
  try {
    const res = await fetch('/api/skills');
    const json = await res.json();
    const skill = json.data?.find(s => s.id === id);
    if (!skill) return;

    document.getElementById('skill-modal-title').textContent = 'Edit Skill';
    document.getElementById('skill-id-input').value = skill.id;
    document.getElementById('skill-cat').value = skill.category;
    document.getElementById('skill-name').value = skill.name;
    document.getElementById('skill-level').value = skill.level_label;
    document.getElementById('skill-icon').value = skill.icon_name || 'check';
    document.getElementById('skill-desc').value = skill.description || '';
    document.getElementById('skill-sort').value = skill.sort_order || 0;

    openModal('admin-skill-modal');
  } catch (e) {
    showToast('Failed to load skill details', 'error');
  }
}
window.editSkillModal = editSkillModal;

async function deleteSkill(id) {
  if (!confirm('Are you sure you want to delete this skill?')) return;
  try {
    const res = await fetch(`/api/skills/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      loadSkills();
      showToast('Skill deleted successfully', 'success');
    }
  } catch (e) {
    showToast('Failed to delete skill', 'error');
  }
}
window.deleteSkill = deleteSkill;

/**
 * 6. Experience Management
 */
async function loadExperience() {
  const tbody = document.getElementById('experience-table-body');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 24px;">Loading experience...</td></tr>`;

  try {
    const res = await fetch('/api/experience');
    const json = await res.json();
    if (json.success && json.data) {
      tbody.innerHTML = json.data.map(exp => `
        <tr>
          <td style="font-weight: 700; color: var(--text-main);">${escapeHtml(exp.role)}</td>
          <td>${escapeHtml(exp.organization)}</td>
          <td><span class="tech-tag">${escapeHtml(exp.period)}</span></td>
          <td style="font-size:0.8125rem; color: var(--text-muted);">${escapeHtml(exp.location || '')}</td>
          <td>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm" onclick="editExpModal(${exp.id})">Edit</button>
              <button class="btn btn-sm" style="background:#7F1D1D; color:#FCA5A5; border:1px solid #991B1B;" onclick="deleteExperience(${exp.id})">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--accent-rose);">Error loading experience</td></tr>`;
  }
}

function openAddExpModal() {
  document.getElementById('exp-modal-title').textContent = 'Add Experience Role';
  document.getElementById('exp-form').reset();
  document.getElementById('exp-id-input').value = '';
  openModal('admin-exp-modal');
}
window.openAddExpModal = openAddExpModal;

async function editExpModal(id) {
  try {
    const res = await fetch('/api/experience');
    const json = await res.json();
    const item = json.data?.find(x => x.id === id);
    if (!item) return;

    document.getElementById('exp-modal-title').textContent = 'Edit Experience Role';
    document.getElementById('exp-id-input').value = item.id;
    document.getElementById('exp-role').value = item.role;
    document.getElementById('exp-org').value = item.organization;
    document.getElementById('exp-location').value = item.location || '';
    document.getElementById('exp-period').value = item.period;
    document.getElementById('exp-badge').value = item.badge || '';
    document.getElementById('exp-resp').value = item.responsibilities;
    document.getElementById('exp-sort').value = item.sort_order || 0;

    openModal('admin-exp-modal');
  } catch (e) {
    showToast('Failed to load experience details', 'error');
  }
}
window.editExpModal = editExpModal;

async function deleteExperience(id) {
  if (!confirm('Are you sure you want to delete this experience entry?')) return;
  try {
    const res = await fetch(`/api/experience/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      loadExperience();
      showToast('Experience entry deleted', 'success');
    }
  } catch (e) {
    showToast('Failed to delete experience', 'error');
  }
}
window.deleteExperience = deleteExperience;

/**
 * 7. Education Management
 */
async function loadEducation() {
  const tbody = document.getElementById('education-table-body');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 24px;">Loading education...</td></tr>`;

  try {
    const res = await fetch('/api/education');
    const json = await res.json();
    if (json.success && json.data) {
      tbody.innerHTML = json.data.map(edu => `
        <tr>
          <td style="font-weight: 700; color: var(--text-main);">${escapeHtml(edu.degree)}</td>
          <td>${escapeHtml(edu.institution)}</td>
          <td><span class="tech-tag">${escapeHtml(edu.period)}</span></td>
          <td><span style="color:#34D399; font-size:0.8125rem;">${escapeHtml(edu.status || edu.score || '')}</span></td>
          <td>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm" onclick="editEduModal(${edu.id})">Edit</button>
              <button class="btn btn-sm" style="background:#7F1D1D; color:#FCA5A5; border:1px solid #991B1B;" onclick="deleteEducation(${edu.id})">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color: var(--accent-rose);">Error loading education</td></tr>`;
  }
}

function openAddEduModal() {
  document.getElementById('edu-modal-title').textContent = 'Add Education Qualification';
  document.getElementById('edu-form').reset();
  document.getElementById('edu-id-input').value = '';
  openModal('admin-edu-modal');
}
window.openAddEduModal = openAddEduModal;

async function editEduModal(id) {
  try {
    const res = await fetch('/api/education');
    const json = await res.json();
    const item = json.data?.find(x => x.id === id);
    if (!item) return;

    document.getElementById('edu-modal-title').textContent = 'Edit Education Qualification';
    document.getElementById('edu-id-input').value = item.id;
    document.getElementById('edu-degree').value = item.degree;
    document.getElementById('edu-inst').value = item.institution;
    document.getElementById('edu-location').value = item.location || '';
    document.getElementById('edu-period').value = item.period;
    document.getElementById('edu-status').value = item.status || '';
    document.getElementById('edu-score').value = item.score || '';
    document.getElementById('edu-desc').value = item.description || '';
    document.getElementById('edu-sort').value = item.sort_order || 0;

    openModal('admin-edu-modal');
  } catch (e) {
    showToast('Failed to load education details', 'error');
  }
}
window.editEduModal = editEduModal;

async function deleteEducation(id) {
  if (!confirm('Are you sure you want to delete this education entry?')) return;
  try {
    const res = await fetch(`/api/education/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      loadEducation();
      showToast('Education entry deleted', 'success');
    }
  } catch (e) {
    showToast('Failed to delete education', 'error');
  }
}
window.deleteEducation = deleteEducation;

/**
 * 8. Messages Management
 */
async function loadMessages() {
  const tbody = document.getElementById('messages-table-body');
  if (!tbody) return;
  tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px;">Loading messages...</td></tr>`;

  try {
    const res = await fetch('/api/messages', { headers: getAuthHeaders() });
    const json = await res.json();
    if (json.success && json.data) {
      if (json.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 24px; color: var(--text-dim);">No contact messages received yet.</td></tr>`;
        return;
      }
      tbody.innerHTML = json.data.map(m => `
        <tr style="${m.is_read ? 'opacity: 0.75;' : 'background: rgba(59, 130, 246, 0.05);'}">
          <td style="font-weight: 700; color: var(--text-main);">${escapeHtml(m.name)}</td>
          <td><a href="mailto:${escapeHtml(m.email)}" style="color:var(--accent-blue-light); text-decoration:none;">${escapeHtml(m.email)}</a></td>
          <td><strong>${escapeHtml(m.subject)}</strong></td>
          <td style="font-size:0.8125rem; color: var(--text-dim);">${new Date(m.created_at).toLocaleDateString()}</td>
          <td>
            <button class="btn btn-sm ${m.is_read ? 'btn-secondary' : 'btn-outline-blue'}" onclick="toggleMessageRead(${m.id})">
              ${m.is_read ? 'Read' : '● Unread'}
            </button>
          </td>
          <td>
            <div style="display:flex; gap:8px;">
              <button class="btn btn-secondary btn-sm" onclick="viewMessageModal(${m.id})">View</button>
              <button class="btn btn-sm" style="background:#7F1D1D; color:#FCA5A5; border:1px solid #991B1B;" onclick="deleteMessage(${m.id})">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  } catch (e) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color: var(--accent-rose);">Error loading messages</td></tr>`;
  }
}

async function toggleMessageRead(id) {
  try {
    const res = await fetch(`/api/messages/${id}/read`, {
      method: 'PATCH',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      loadMessages();
      loadOverview();
    }
  } catch (e) {
    showToast('Failed to update read status', 'error');
  }
}
window.toggleMessageRead = toggleMessageRead;

async function deleteMessage(id) {
  if (!confirm('Are you sure you want to delete this message?')) return;
  try {
    const res = await fetch(`/api/messages/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    if (res.ok) {
      loadMessages();
      loadOverview();
      showToast('Message deleted', 'success');
    }
  } catch (e) {
    showToast('Failed to delete message', 'error');
  }
}
window.deleteMessage = deleteMessage;

async function viewMessageModal(id) {
  try {
    const res = await fetch('/api/messages', { headers: getAuthHeaders() });
    const json = await res.json();
    const msg = json.data?.find(m => m.id === id);
    if (!msg) return;

    // Auto mark as read
    if (!msg.is_read) {
      toggleMessageRead(id);
    }

    const content = document.getElementById('view-message-content');
    content.innerHTML = `
      <div style="margin-bottom: 16px; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
        <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim); margin-bottom: 4px;">Subject</div>
        <h3 style="font-size: 1.25rem; color: var(--text-main);">${escapeHtml(msg.subject)}</h3>
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim);">From</div>
          <div style="font-weight: 600; color: var(--text-main);">${escapeHtml(msg.name)}</div>
          <a href="mailto:${escapeHtml(msg.email)}" style="font-size: 0.875rem; color: var(--accent-blue-light);">${escapeHtml(msg.email)}</a>
        </div>
        <div>
          <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-dim);">Received</div>
          <div style="font-size: 0.875rem; color: var(--text-body);">${new Date(msg.created_at).toLocaleString()}</div>
        </div>
      </div>
      <div style="background: var(--bg-deep); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 18px; font-size: 0.9375rem; color: var(--text-body); line-height: 1.7; white-space: pre-wrap;">${escapeHtml(msg.message)}</div>
      <div style="margin-top: 20px; display: flex; justify-content: flex-end; gap: 12px;">
        <a href="mailto:${escapeHtml(msg.email)}?subject=Re: ${encodeURIComponent(msg.subject)}" class="btn btn-primary btn-sm">
          Reply via Email &rarr;
        </a>
      </div>
    `;
    openModal('admin-view-message-modal');
  } catch (e) {
    showToast('Failed to view message', 'error');
  }
}
window.viewMessageModal = viewMessageModal;

/**
 * 9. Settings Management
 */
async function loadSettings() {
  try {
    const res = await fetch('/api/settings');
    const json = await res.json();
    if (json.success && json.data) {
      const s = json.data;
      document.getElementById('set-person-name').value = s.person_name || '';
      document.getElementById('set-headline').value = s.headline || '';
      document.getElementById('set-tagline').value = s.tagline || '';
      document.getElementById('set-hero-intro').value = s.hero_intro || '';
      document.getElementById('set-email').value = s.email || '';
      document.getElementById('set-phone').value = s.phone || '';
      document.getElementById('set-location').value = s.location || '';
      document.getElementById('set-about-p1').value = s.about_p1 || '';
      document.getElementById('set-about-p2').value = s.about_p2 || '';
      document.getElementById('set-about-p3').value = s.about_p3 || '';
    }
  } catch (e) {
    showToast('Failed to load settings', 'error');
  }
}

async function saveSettings(e) {
  e.preventDefault();
  const btn = document.getElementById('save-settings-btn');
  btn.disabled = true;
  btn.textContent = 'Saving Settings...';

  const payload = {
    person_name: document.getElementById('set-person-name').value.trim(),
    headline: document.getElementById('set-headline').value.trim(),
    tagline: document.getElementById('set-tagline').value.trim(),
    hero_intro: document.getElementById('set-hero-intro').value.trim(),
    email: document.getElementById('set-email').value.trim(),
    phone: document.getElementById('set-phone').value.trim(),
    location: document.getElementById('set-location').value.trim(),
    about_p1: document.getElementById('set-about-p1').value.trim(),
    about_p2: document.getElementById('set-about-p2').value.trim(),
    about_p3: document.getElementById('set-about-p3').value.trim()
  };

  try {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    if (res.ok) {
      showToast('Site settings updated successfully!', 'success');
    } else {
      showToast('Failed to update settings', 'error');
    }
  } catch (e) {
    showToast('Error saving settings', 'error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Save All Changes';
  }
}
window.saveSettings = saveSettings;

/**
 * 10. Forms Submission Wiring
 */
function initModals() {
  // Project Form
  document.getElementById('project-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('project-id-input').value;
    const payload = {
      title: document.getElementById('proj-title').value.trim(),
      category: document.getElementById('proj-category').value.trim(),
      description: document.getElementById('proj-desc').value.trim(),
      technologies: document.getElementById('proj-tech').value.trim(),
      image_url: document.getElementById('proj-image').value.trim(),
      live_url: document.getElementById('proj-live').value.trim(),
      github_url: document.getElementById('proj-github').value.trim(),
      is_featured: document.getElementById('proj-featured').checked ? 1 : 0,
      is_placeholder: document.getElementById('proj-placeholder').checked ? 1 : 0,
      sort_order: parseInt(document.getElementById('proj-sort').value || 0)
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/projects/${id}` : '/api/projects';

    try {
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        closeModals();
        loadProjects();
        showToast(id ? 'Project updated' : 'Project added', 'success');
      } else {
        showToast('Error saving project', 'error');
      }
    } catch (e) {
      showToast('Failed to save project', 'error');
    }
  });

  // Skill Form
  document.getElementById('skill-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('skill-id-input').value;
    const payload = {
      category: document.getElementById('skill-cat').value.trim(),
      name: document.getElementById('skill-name').value.trim(),
      level_label: document.getElementById('skill-level').value.trim(),
      icon_name: document.getElementById('skill-icon').value.trim(),
      description: document.getElementById('skill-desc').value.trim(),
      sort_order: parseInt(document.getElementById('skill-sort').value || 0)
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/skills/${id}` : '/api/skills';

    try {
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        closeModals();
        loadSkills();
        showToast(id ? 'Skill updated' : 'Skill added', 'success');
      }
    } catch (e) {
      showToast('Failed to save skill', 'error');
    }
  });

  // Experience Form
  document.getElementById('exp-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('exp-id-input').value;
    const payload = {
      role: document.getElementById('exp-role').value.trim(),
      organization: document.getElementById('exp-org').value.trim(),
      location: document.getElementById('exp-location').value.trim(),
      period: document.getElementById('exp-period').value.trim(),
      badge: document.getElementById('exp-badge').value.trim(),
      responsibilities: document.getElementById('exp-resp').value.trim(),
      sort_order: parseInt(document.getElementById('exp-sort').value || 0)
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/experience/${id}` : '/api/experience';

    try {
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        closeModals();
        loadExperience();
        showToast(id ? 'Experience updated' : 'Experience added', 'success');
      }
    } catch (e) {
      showToast('Failed to save experience', 'error');
    }
  });

  // Education Form
  document.getElementById('edu-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edu-id-input').value;
    const payload = {
      degree: document.getElementById('edu-degree').value.trim(),
      institution: document.getElementById('edu-inst').value.trim(),
      location: document.getElementById('edu-location').value.trim(),
      period: document.getElementById('edu-period').value.trim(),
      status: document.getElementById('edu-status').value.trim(),
      score: document.getElementById('edu-score').value.trim(),
      description: document.getElementById('edu-desc').value.trim(),
      sort_order: parseInt(document.getElementById('edu-sort').value || 0)
    };

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/education/${id}` : '/api/education';

    try {
      const res = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        closeModals();
        loadEducation();
        showToast(id ? 'Education entry updated' : 'Education added', 'success');
      }
    } catch (e) {
      showToast('Failed to save education entry', 'error');
    }
  });

  // Settings Form
  document.getElementById('settings-form')?.addEventListener('submit', saveSettings);

  // Close modals on backdrop or X
  document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close')) {
        closeModals();
      }
    });
  });
}

function openModal(id) {
  document.getElementById(id)?.classList.add('open');
}

function closeModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('open'));
}
window.closeModals = closeModals;

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
  }, 3500);
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
