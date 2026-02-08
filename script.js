// Estado de la aplicación
let reports = [];
let filteredReports = [];
let currentLang = 'es';

// ============================
// UTILIDADES DE TRADUCCIÓN
// ============================

// Obtener traducción con reemplazo de placeholders
function t(key, ...args) {
    let translation = translations[currentLang]?.[key] || key;
    args.forEach((arg, index) => {
        translation = translation.replace(`{${index}}`, arg);
    });
    return translation;
}

// Aplicar traducciones a elementos de la interfaz
function applyTranslations() {
    // Traducir elementos con data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });
    
    // Traducir placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });
    
    // Traducir títulos/tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        element.title = t(key);
    });
}

// ============================
// GESTIÓN DE IDIOMA
// ============================

function loadLanguage() {
    currentLang = localStorage.getItem('language') || 'es';
    applyTranslations();
    updateLangIcon();
    updateLanguageMenu();
}

function toggleLanguage() {
    const menu = document.getElementById('languageMenu');
    menu.classList.toggle('show');
}

function selectLanguage(lang) {
    if (currentLang !== lang) {
        currentLang = lang;
        localStorage.setItem('language', currentLang);
        applyTranslations();
        updateLangIcon();
        updateLanguageMenu();
        renderReports();
    }
    // Cerrar el menú
    document.getElementById('languageMenu').classList.remove('show');
}

function updateLangIcon() {
    const flag = document.querySelector('.lang-flag');
    if (!flag) return;
    
    const flags = {
        es: '🇪🇸',
        en: '🇬🇧',
        fr: '🇫🇷'
    };
    
    flag.textContent = flags[currentLang] || '🌐';
}

function updateLanguageMenu() {
    const options = document.querySelectorAll('.language-option');
    options.forEach(option => {
        const lang = option.getAttribute('data-lang');
        if (lang === currentLang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// ============================
// GESTIÓN DE TEMA
// ============================
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

// Cambiar tema
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

// Actualizar icono del tema
function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ============================
// CARGA DE INFORMES
// ============================

async function loadReportsFromJSON() {
    try {
        const indexResponse = await fetch('reports/reports-index.json');
        if (!indexResponse.ok) {
            throw new Error('Could not load reports index');
        }
        
        const index = await indexResponse.json();
        const reportPromises = index.reports.map(filename => 
            fetch(`reports/${filename}`)
                .then(response => response.json())
                .catch(error => {
                    console.error(`Error loading ${filename}:`, error);
                    return null;
                })
        );
        
        const loadedReports = await Promise.all(reportPromises);
        
        reports = loadedReports
            .filter(report => report !== null)
            .map((report, index) => ({
                id: index + 1,
                title: report.title,
                source: report.source,
                description: report.description,
                url: report.url || '',
                cve: report.cve || '',
                categories: report.categories || [],
                date: report.date ? parseSpanishDate(report.date) : new Date()
            }));
        
        filteredReports = [...reports];
        renderReports();
        renderFilters();
        
    } catch (error) {
        console.error('Error loading reports:', error);
        showError(t('errorMessage'));
    }
}

// Mostrar mensaje de error
function showError(message) {
    const container = document.getElementById('reportsList');
    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>${t('errorLoadingReports')}</h3>
            <p>${message}</p>
        </div>
    `;
}

// ============================
// UTILIDADES
// ============================

// Parsear fecha en formato español dd-mm-yyyy
function parseSpanishDate(dateString) {
    if (!dateString) return new Date();
    
    // Si ya es un objeto Date, devolverlo
    if (dateString instanceof Date) return dateString;
    
    // Parsear formato dd-mm-yyyy
    const parts = dateString.split('-');
    if (parts.length === 3) {
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Los meses en JS son 0-indexed
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
    }
    
    // Fallback a parseado estándar
    return new Date(dateString);
}

function formatDate(date) {
    const now = new Date();
    const dateObj = parseSpanishDate(date);
    const diffTime = Math.abs(now - dateObj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return t('today');
    if (diffDays === 1) return t('yesterday');
    if (diffDays <= 7) return t('daysAgo', diffDays);
    if (diffDays <= 30) return t('weeksAgo', Math.floor(diffDays / 7));
    return t('monthsAgo', Math.floor(diffDays / 30));
}

function getTagClass(tag) {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('malware')) return 'tag-malware';
    if (tagLower.includes('apt')) return 'tag-apt';
    if (tagLower.includes('ransomware')) return 'tag-ransomware';
    if (tagLower.includes('phishing')) return 'tag-phishing';
    if (tagLower.includes('vulnerability')) return 'tag-vulnerability';
    return 'tag-default';
}

// Resaltar términos de búsqueda en el texto
function highlightText(text, searchTerm) {
    if (!searchTerm || searchTerm.trim() === '') return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// ============================
// RENDERIZADO
// ============================
function renderReports() {
    const container = document.getElementById('reportsList');
    const count = document.getElementById('reportCount');
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    
    count.textContent = filteredReports.length;
    
    if (filteredReports.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-alt"></i>
                <h3>${t('noReportsFound')}</h3>
                <p>${t('noReportsDescription')}</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredReports.map(report => {
        const title = highlightText(report.title, searchTerm);
        const description = highlightText(report.description, searchTerm);
        const cve = report.cve ? highlightText(report.cve, searchTerm) : '';
        
        return `
        <div class="report-card" data-id="${report.id}">
            <div class="report-header">
                <div class="report-source">
                    <div class="report-source-logo">${report.source}</div>
                </div>
                <div class="report-content">
                    <h3 class="report-title">
                        <i class="fas fa-shield-alt"></i>
                        ${title}
                    </h3>
                    <div class="report-meta">
                        <span><i class="fas fa-building"></i> ${t('sourceLabel')} ${report.source}</span>
                        <span><i class="fas fa-clock"></i> ${formatDate(report.date)}</span>
                        ${report.cve ? `<span class="cve-badge">${cve}</span>` : ''}
                    </div>
                    <p class="report-description">${description}</p>
                    ${report.url ? `<a href="${report.url}" target="_blank" style="color: var(--primary-color); font-size: 14px;"><i class="fas fa-external-link-alt"></i> ${t('viewFullReport')}</a>` : ''}
                    ${report.categories.length > 0 ? `
                        <div class="report-tags">
                            ${report.categories.map(tag => {
                                const highlightedTag = highlightText(tag, searchTerm);
                                return `<span class="tag ${getTagClass(tag)}">${highlightedTag}</span>`;
                            }).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    }).join('');
}

// Renderizar filtros
function renderFilters() {
    const sourceFilters = document.getElementById('sourceFilters');
    const categoryFilters = document.getElementById('categoryFilters');
    
    // Fuentes únicas
    const sources = [...new Set(reports.map(r => r.source))];
    sourceFilters.innerHTML = sources.slice(0, 5).map(source => {
        const count = reports.filter(r => r.source === source).length;
        return `
            <div class="filter-item">
                <label>
                    <input type="checkbox" value="${source}" class="source-filter">
                    ${source}
                </label>
                <span class="filter-count">${count}</span>
            </div>
        `;
    }).join('');
    
    // Categorías únicas
    const categories = [...new Set(reports.flatMap(r => r.categories))];
    categoryFilters.innerHTML = categories.map(category => {
        const count = reports.filter(r => r.categories.includes(category)).length;
        return `
            <div class="filter-item">
                <label>
                    <input type="checkbox" value="${category}" class="category-filter">
                    ${category}
                </label>
                <span class="filter-count">${count}</span>
            </div>
        `;
    }).join('');
}

// ============================
// FILTROS
// ============================
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedSources = Array.from(document.querySelectorAll('.source-filter:checked')).map(cb => cb.value);
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
    const timeFilter = document.querySelector('.time-btn.active').dataset.filter;
    
    filteredReports = reports.filter(report => {
        // Búsqueda mejorada: título, descripción, fuente, CVE y categorías
        const matchesSearch = !searchTerm || 
            report.title.toLowerCase().includes(searchTerm) ||
            report.description.toLowerCase().includes(searchTerm) ||
            report.source.toLowerCase().includes(searchTerm) ||
            (report.cve && report.cve.toLowerCase().includes(searchTerm)) ||
            report.categories.some(cat => cat.toLowerCase().includes(searchTerm));
        
        // Fuente
        const matchesSource = selectedSources.length === 0 || selectedSources.includes(report.source);
        
        // Categoría
        const matchesCategory = selectedCategories.length === 0 || 
            selectedCategories.some(cat => report.categories.includes(cat));
        
        // Tiempo
        let matchesTime = true;
        if (timeFilter !== 'all') {
            const days = parseInt(timeFilter);
            const reportDate = parseSpanishDate(report.date);
            const now = new Date();
            const diffDays = Math.ceil((now - reportDate) / (1000 * 60 * 60 * 24));
            matchesTime = diffDays <= days;
        }
        
        return matchesSearch && matchesSource && matchesCategory && matchesTime;
    });
    
    // Ordenar por fecha
    filteredReports.sort((a, b) => parseSpanishDate(b.date) - parseSpanishDate(a.date));
    
    renderReports();
}

// ============================
// INICIALIZACIÓN
// ============================
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadLanguage();
    loadReportsFromJSON();
    
    // Event listeners
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    
    // Opciones de idioma
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = option.getAttribute('data-lang');
            selectLanguage(lang);
        });
    });
    
    // Cerrar menú de idiomas al hacer clic fuera
    document.addEventListener('click', (e) => {
        const languageSelector = document.querySelector('.language-selector');
        const languageMenu = document.getElementById('languageMenu');
        
        if (languageSelector && !languageSelector.contains(e.target)) {
            languageMenu.classList.remove('show');
        }
    });
    
    // Filtros de tiempo
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        });
    });
    
    // Filtros de fuente y categoría
    document.getElementById('sourceFilters').addEventListener('change', applyFilters);
    document.getElementById('categoryFilters').addEventListener('change', applyFilters);
});
