// ─── Dark Mode Toggle ─────────────────────────────────────────────────────────
(function () {
    var btn = document.getElementById('theme-toggle');

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    var current = document.documentElement.getAttribute('data-theme') || 'light';
    if (btn) btn.textContent = current === 'dark' ? '☀️' : '🌙';

    if (btn) {
        btn.addEventListener('click', function () {
            var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            applyTheme(next);
        });
    }
})();


// ─── Mobile sidebar toggle ────────────────────────────────────────────────────
const hamburger      = document.getElementById('hamburger');
const sidebar        = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');

function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (hamburger)      hamburger.addEventListener('click', openSidebar);
if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);


// ─── Navigation: smooth scroll + active highlight on scroll ───────────────────
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');

    // Shared helper — clears all active states and marks one link active
    function setActiveNav(activeLink) {
        navLinks.forEach(function (link) { link.classList.remove('active'); });
        activeLink.classList.add('active');
    }

    // Smooth scroll when a nav link is clicked
    // On mobile, also close the sidebar after navigating
    navLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setActiveNav(this);
            }
            if (window.innerWidth <= 768) closeSidebar();
        });
    });

    // IntersectionObserver — highlights the nav link for whichever section
    // is currently in the upper portion of the viewport.
    //
    // rootMargin '0px 0px -80% 0px' shrinks the observable area so only the
    // top 20% of the viewport counts as "in view". A section activates its
    // nav link the moment its top edge enters that zone.
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const matchingLink = document.querySelector('.sidebar-nav a[href="#' + id + '"]');
                if (matchingLink) setActiveNav(matchingLink);
            }
        });
    }, {
        rootMargin: '0px 0px -80% 0px',
        threshold: 0
    });

    document.querySelectorAll('section[id]').forEach(function (section) {
        observer.observe(section);
    });
});


// ─── Education & Skills Modals ────────────────────────────────────────────────
const ucBubble       = document.getElementById('uc-bubble');
const cstateBubble   = document.getElementById('cstate-bubble');
const ucModal        = document.getElementById('uc-modal');
const cstateModal    = document.getElementById('cstate-modal');
const ucModalClose   = document.getElementById('uc-modal-close');
const cstateModalClose = document.getElementById('cstate-modal-close');

function animateProgress(fillId, textId, startDate, endDate) {
    const fill = document.getElementById(fillId);
    const text = document.getElementById(textId);
    if (!fill || !text) return;
    const now   = new Date();
    const start = new Date(startDate);
    const end   = new Date(endDate);
    let pct;
    if (now >= end)        pct = 100;
    else if (now <= start) pct = 0;
    else pct = Math.round(((now - start) / (end - start)) * 100);
    fill.style.width = '0%';
    setTimeout(() => {
        fill.style.width    = pct + '%';
        text.textContent    = pct + '% complete';
    }, 120);
}

if (ucBubble && ucModal) {
    ucBubble.addEventListener('click', () => {
        ucModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        animateProgress('uc-progress-fill', 'uc-progress-text', '2024-08-26', '2028-08-21');
    });
}

if (cstateBubble && cstateModal) {
    cstateBubble.addEventListener('click', () => {
        cstateModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        animateProgress('cstate-progress-fill', 'cstate-progress-text', '2022-08-22', '2024-05-10');
    });
}

if (ucModalClose && ucModal) {
    ucModalClose.addEventListener('click', () => {
        ucModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (cstateModalClose && cstateModal) {
    cstateModalClose.addEventListener('click', () => {
        cstateModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

const programmingBubble   = document.getElementById('programming-bubble');
const techBubble          = document.getElementById('tech-bubble');
const languageBubble      = document.getElementById('language-bubble');
const programmingModal    = document.getElementById('programming-modal');
const techModal           = document.getElementById('tech-modal');
const languageModal       = document.getElementById('language-modal');
const programmingModalClose = document.getElementById('programming-modal-close');
const techModalClose      = document.getElementById('tech-modal-close');
const languageModalClose  = document.getElementById('language-modal-close');

if (programmingBubble && programmingModal) {
    programmingBubble.addEventListener('click', () => {
        programmingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (techBubble && techModal) {
    techBubble.addEventListener('click', () => {
        techModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (languageBubble && languageModal) {
    languageBubble.addEventListener('click', () => {
        languageModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (programmingModalClose && programmingModal) {
    programmingModalClose.addEventListener('click', () => {
        programmingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (techModalClose && techModal) {
    techModalClose.addEventListener('click', () => {
        techModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (languageModalClose && languageModal) {
    languageModalClose.addEventListener('click', () => {
        languageModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close any modal when clicking the dark backdrop behind it
window.addEventListener('click', (e) => {
    [ucModal, cstateModal, programmingModal, techModal, languageModal].forEach((modal) => {
        if (modal && e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});


// ─── Footer: auto-updating copyright year ─────────────────────────────────────
const footerCopyright = document.getElementById('footer-copyright');
if (footerCopyright) {
    footerCopyright.innerHTML = '&copy; ' + new Date().getFullYear() + ' Jai Sheng Ong. All Rights Reserved.';
}


// ─── About: "Currently" expand / collapse ─────────────────────────────────────
const moreAboutBtn     = document.getElementById('more-about-btn');
const moreAboutContent = document.getElementById('more-about-content');

if (moreAboutBtn && moreAboutContent) {
    moreAboutBtn.addEventListener('click', () => {
        const isHidden = moreAboutContent.style.display === 'none';
        moreAboutContent.style.display = isHidden ? 'block' : 'none';
        moreAboutBtn.querySelector('p').textContent = isHidden ? 'Click to collapse' : 'Click for details';
    });

    moreAboutBtn.addEventListener('mouseenter', () => {
        moreAboutBtn.style.backgroundColor = 'var(--accent-color)';
        moreAboutBtn.style.color = 'white';
        moreAboutBtn.querySelector('h3').style.color = 'white';
        moreAboutBtn.style.transform = 'translateY(-5px)';
        moreAboutBtn.style.boxShadow = '0 5px 15px var(--shadow-color)';
    });

    moreAboutBtn.addEventListener('mouseleave', () => {
        moreAboutBtn.style.backgroundColor = '';
        moreAboutBtn.style.color = '';
        moreAboutBtn.querySelector('h3').style.color = 'var(--accent-color)';
        moreAboutBtn.style.transform = '';
        moreAboutBtn.style.boxShadow = '';
    });
}
