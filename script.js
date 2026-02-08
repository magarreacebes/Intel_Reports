// Estado de la aplicación
let reports = [];
let filteredReports = [];
let reportToDelete = null;

// Cargar y aplicar tema
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

// Cargar informes desde archivos JSON
async function loadReportsFromJSON() {
    try {
        // Cargar el índice de informes
        const indexResponse = await fetch('reports/reports-index.json');
        if (!indexResponse.ok) {
            throw new Error('No se pudo cargar el índice de informes');
        }
        
        const index = await indexResponse.json();
        const reportPromises = index.reports.map(filename => 
            fetch(`reports/${filename}`)
                .then(response => response.json())
                .catch(error => {
                    console.error(`Error cargando ${filename}:`, error);
                    return null;
                })
        );
        
        const loadedReports = await Promise.all(reportPromises);
        
        // Filtrar nulls y transformar al formato interno
        reports = loadedReports
            .filter(report => report !== null)
            .map((report, index) => ({
                id: index + 1,
                title: report.titulo,
                source: report.fuente,
                description: report.descripcion,
                url: report.url || '',
                cve: report.cve || '',
                tags: report.categorias || [],
                date: report.fecha ? new Date(report.fecha) : new Date()
            }));
        
        filteredReports = [...reports];
        renderReports();
        renderFilters();
        
    } catch (error) {
        console.error('Error cargando informes:', error);
        showError('No se pudieron cargar los informes. Asegúrate de que la carpeta "reports" existe.');
    }
}

// Mostrar mensaje de error
function showError(message) {
    const container = document.getElementById('reportsList');
    container.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-exclamation-triangle"></i>
            <h3>Error al cargar informes</h3>
            <p>${message}</p>
        </div>
    `;
}

// Formatear fecha
function formatDate(date) {
    const now = new Date();
    const diffTime = Math.abs(now - new Date(date));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays <= 7) return `Hace ${diffDays} días`;
    if (diffDays <= 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return `Hace ${Math.floor(diffDays / 30)} meses`;
}

// Obtener clase de color para tag
function getTagClass(tag) {
    const tagLower = tag.toLowerCase();
    if (tagLower.includes('malware')) return 'tag-malware';
    if (tagLower.includes('apt')) return 'tag-apt';
    if (tagLower.includes('ransomware')) return 'tag-ransomware';
    if (tagLower.includes('phishing')) return 'tag-phishing';
    if (tagLower.includes('vulnerability') || tagLower.includes('vulnerabilidad')) return 'tag-vulnerability';
    return 'tag-default';
}

// Renderizar informes
function renderReports() {
    const container = document.getElementById('reportsList');
    const count = document.getElementById('reportCount');
    
    count.textContent = filteredReports.length;
    
    if (filteredReports.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-file-alt"></i>
                <h3>No se encontraron informes</h3>
                <p>Intenta ajustar los filtros o agrega un nuevo informe</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = filteredReports.map(report => `
        <div class="report-card" data-id="${report.id}">
            <div class="report-header">
                <div class="report-source">
                    <div class="report-source-logo">${report.source}</div>
                </div>
                <div class="report-content">
                    <h3 class="report-title">
                        <i class="fas fa-shield-alt"></i>
                        ${report.title}
                    </h3>
                    <div class="report-meta">
                        <span><i class="fas fa-building"></i> Fuente: ${report.source}</span>
                        <span><i class="fas fa-clock"></i> ${formatDate(report.date)}</span>
                        ${report.cve ? `<span class="cve-badge">${report.cve}</span>` : ''}
                    </div>
                    <p class="report-description">${report.description}</p>
                    ${report.url ? `<a href="${report.url}" target="_blank" style="color: var(--primary-color); font-size: 14px;"><i class="fas fa-external-link-alt"></i> Ver informe completo</a>` : ''}
                    ${report.tags.length > 0 ? `
                        <div class="report-tags">
                            ${report.tags.map(tag => `<span class="tag ${getTagClass(tag)}">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Renderizar filtros
function renderFilters() {
    const sourceFilters = document.getElementById('sourceFilters');
    const categoryFilters = document.getElementById('categoryFilters');
    
    // Obtener fuentes únicas
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
    
    // Obtener categorías únicas
    const categories = [...new Set(reports.flatMap(r => r.tags))];
    categoryFilters.innerHTML = categories.map(category => {
        const count = reports.filter(r => r.tags.includes(category)).length;
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

// Aplicar filtros
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const selectedSources = Array.from(document.querySelectorAll('.source-filter:checked')).map(cb => cb.value);
    const selectedCategories = Array.from(document.querySelectorAll('.category-filter:checked')).map(cb => cb.value);
    const timeFilter = document.querySelector('.time-btn.active').dataset.filter;
    
    filteredReports = reports.filter(report => {
        // Filtro de búsqueda
        const matchesSearch = !searchTerm || 
            report.title.toLowerCase().includes(searchTerm) ||
            report.description.toLowerCase().includes(searchTerm) ||
            report.source.toLowerCase().includes(searchTerm) ||
            report.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        // Filtro de fuente
        const matchesSource = selectedSources.length === 0 || selectedSources.includes(report.source);
        
        // Filtro de categoría
        const matchesCategory = selectedCategories.length === 0 || 
            selectedCategories.some(cat => report.tags.includes(cat));
        
        // Filtro de tiempo
        let matchesTime = true;
        if (timeFilter !== 'all') {
            const days = parseInt(timeFilter);
            const reportDate = new Date(report.date);
            const now = new Date();
            const diffDays = Math.ceil((now - reportDate) / (1000 * 60 * 60 * 24));
            matchesTime = diffDays <= days;
        }
        
        return matchesSearch && matchesSource && matchesCategory && matchesTime;
    });
    
    // Ordenar por fecha (más reciente primero)
    filteredReports.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    renderReports();
}

// Nota: La eliminación de informes está deshabilitada en modo JSON
// Los informes deben ser gestionados directamente en los archivos JSON
function deleteReport(id) {
    alert('Para eliminar un informe, debes eliminar el archivo JSON correspondiente de la carpeta "reports" y actualizar el archivo "reports-index.json"');
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    loadReportsFromJSON();
    
    // Toggle de tema
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Búsqueda
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    
    // Filtros de tiempo
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyFilters();
        });
    });
    
    // Filtros de fuente y categoría (delegación de eventos)
    document.getElementById('sourceFilters').addEventListener('change', applyFilters);
    document.getElementById('categoryFilters').addEventListener('change', applyFilters);
});
