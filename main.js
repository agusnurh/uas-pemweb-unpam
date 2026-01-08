// ========================================
// LOADING SCREEN
// ========================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 500);
});

// ========================================
// THEME SWITCHER (DARK/LIGHT MODE)
// ========================================
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle?.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Reinitialize Lucide icons after theme change
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('svg');
    
    if (navMenu.classList.contains('active')) {
        icon.setAttribute('data-lucide', 'x');
    } else {
        icon.setAttribute('data-lucide', 'menu');
    }
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        const icon = mobileMenuToggle?.querySelector('svg');
        if (icon) {
            icon.setAttribute('data-lucide', 'menu');
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    });
});

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// ========================================
// ACTIVE NAV LINK ON SCROLL
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNav);

// ========================================
// BACK TO TOP BUTTON
// ========================================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn?.classList.add('visible');
    } else {
        backToTopBtn?.classList.remove('visible');
    }
});

backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for empty hash
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// CODE COPY FUNCTIONALITY
// ========================================
function initCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach((block) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'code-block-wrapper';
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-code-btn';
        copyBtn.innerHTML = '<i data-lucide="copy"></i><span>Copy</span>';
        
        // Wrap code block
        block.parentNode.insertBefore(wrapper, block.parentNode);
        wrapper.appendChild(block.parentNode);
        wrapper.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', async () => {
            const code = block.textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                copyBtn.innerHTML = '<i data-lucide="check"></i><span>Copied!</span>';
                copyBtn.classList.add('copied');
                
                setTimeout(() => {
                    copyBtn.innerHTML = '<i data-lucide="copy"></i><span>Copy</span>';
                    copyBtn.classList.remove('copied');
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    });
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Initialize code copy buttons when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeCopyButtons);
} else {
    initCodeCopyButtons();
}

// ========================================
// CODE PLAYGROUND (LIVE PREVIEW)
// ========================================
function initCodePlayground() {
    const playgrounds = document.querySelectorAll('.code-playground');
    
    playgrounds.forEach(playground => {
        const editor = playground.querySelector('.playground-editor');
        const preview = playground.querySelector('.playground-preview');
        const runBtn = playground.querySelector('.run-code-btn');
        const resetBtn = playground.querySelector('.reset-code-btn');
        
        if (!editor || !preview) return;
        
        const originalCode = editor.value;
        
        // Run code
        const runCode = () => {
            const code = editor.value;
            const iframe = preview.querySelector('iframe');
            
            if (iframe) {
                iframe.srcdoc = code;
            }
        };
        
        // Run button
        runBtn?.addEventListener('click', runCode);
        
        // Reset button
        resetBtn?.addEventListener('click', () => {
            editor.value = originalCode;
            runCode();
        });
        
        // Auto-run on load
        runCode();
        
        // Optional: Run on Ctrl+Enter
        editor.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                e.preventDefault();
                runCode();
            }
        });
    });
}

// Initialize playground when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodePlayground);
} else {
    initCodePlayground();
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    // Sample search data - you can expand this
    const searchData = [
        {
            title: 'Pengenalan Web',
            url: 'pertemuan/pertemuan-1.html',
            keywords: ['html', 'web', 'www', 'http', 'server', 'client', 'browser']
        },
        {
            title: 'Basic Tag HTML',
            url: 'pertemuan/pertemuan-2.html',
            keywords: ['tag', 'head', 'body', 'meta', 'title', 'html struktur']
        },
        {
            title: 'Format Teks & Karakter Khusus',
            url: 'pertemuan/pertemuan-3.html',
            keywords: ['font', 'bold', 'italic', 'marquee', 'karakter', 'entity']
        }
    ];
    
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length === 0) {
            searchResults.style.display = 'none';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.keywords.some(keyword => keyword.includes(query))
        );
        
        if (results.length > 0) {
            searchResults.innerHTML = results.map(item => `
                <a href="${item.url}" class="search-result-item">
                    <i data-lucide="file-text"></i>
                    <span>${item.title}</span>
                </a>
            `).join('');
            searchResults.style.display = 'block';
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        } else {
            searchResults.innerHTML = `
                <div class="search-no-results">
                    <i data-lucide="search-x"></i>
                    <p>Tidak ada hasil ditemukan</p>
                </div>
            `;
            searchResults.style.display = 'block';
            
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Initialize search when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearch);
} else {
    initSearch();
}

// ========================================
// PROGRESS BAR (FOR READING PROGRESS)
// ========================================
function initProgressBar() {
    const progressBar = document.getElementById('reading-progress');
    
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize progress bar when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProgressBar);
} else {
    initProgressBar();
}

// ========================================
// PRINT FUNCTION
// ========================================
function printPage() {
    window.print();
}

// Add print button event listener if exists
const printBtn = document.getElementById('print-btn');
printBtn?.addEventListener('click', printPage);

// ========================================
// SIDEBAR NAVIGATION (FOR MATERI PAGES) - UPDATED
// ========================================
function initSidebarNav() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (!sidebar) return;
    
    // Toggle dari button di dalam sidebar (close button)
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Toggle dari button di navbar mobile
    if (mobileSidebarToggle) {
        mobileSidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            
            // Update icon
            const icon = mobileSidebarToggle.querySelector('svg');
            if (icon) {
                if (sidebar.classList.contains('active')) {
                    icon.setAttribute('data-lucide', 'x');
                } else {
                    icon.setAttribute('data-lucide', 'menu');
                }
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }
        });
    }
    
    // Close sidebar when clicking a link
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('active');
                // Reset icon
                const icon = mobileSidebarToggle?.querySelector('svg');
                if (icon) {
                    icon.setAttribute('data-lucide', 'menu');
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }
            }
        });
    });
}

// Initialize sidebar nav when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebarNav);
} else {
    initSidebarNav();
}

// ========================================
// INITIALIZE ALL LUCIDE ICONS ON PAGE LOAD
// ========================================
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

console.log('🚀 Website Pemrograman Web 1 loaded successfully!');