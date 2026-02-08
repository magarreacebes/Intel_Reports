// Sistema de traducciones para la interfaz
const translations = {
    es: {
        // Sidebar
        filters: 'Filtros',
        searchPlaceholder: 'Buscar informes...',
        lastUpdate: 'Última Actualización',
        all: 'Todo',
        last3days: 'Últimos 3 días',
        lastWeek: 'Última semana',
        lastMonth: 'Último mes',
        source: 'Fuente',
        showMore: 'Mostrar más',
        categories: 'Categorías',
        
        // Header
        reports: 'Informes',
        
        // Report meta
        sourceLabel: 'Fuente:',
        viewFullReport: 'Ver informe completo',
        
        // Empty states
        noReportsFound: 'No se encontraron informes',
        noReportsDescription: 'Intenta ajustar los filtros',
        errorLoadingReports: 'Error al cargar informes',
        errorMessage: 'No se pudieron cargar los informes. Asegúrate de que la carpeta "reports" existe.',
        
        // Date formatting
        today: 'Hoy',
        yesterday: 'Ayer',
        daysAgo: 'Hace {0} días',
        weeksAgo: 'Hace {0} semanas',
        monthsAgo: 'Hace {0} meses',
        
        // Tooltips
        changeTheme: 'Cambiar tema',
        changeLanguage: 'Cambiar idioma'
    },
    
    en: {
        // Sidebar
        filters: 'Filters',
        searchPlaceholder: 'Search reports...',
        lastUpdate: 'Last Update',
        all: 'All',
        last3days: 'Last 3 days',
        lastWeek: 'Last week',
        lastMonth: 'Last month',
        source: 'Source',
        showMore: 'Show more',
        categories: 'Categories',
        
        // Header
        reports: 'Reports',
        
        // Report meta
        sourceLabel: 'Source:',
        viewFullReport: 'View full report',
        
        // Empty states
        noReportsFound: 'No reports found',
        noReportsDescription: 'Try adjusting the filters',
        errorLoadingReports: 'Error loading reports',
        errorMessage: 'Could not load reports. Make sure the "reports" folder exists.',
        
        // Date formatting
        today: 'Today',
        yesterday: 'Yesterday',
        daysAgo: '{0} days ago',
        weeksAgo: '{0} weeks ago',
        monthsAgo: '{0} months ago',
        
        // Tooltips
        changeTheme: 'Change theme',
        changeLanguage: 'Change language'
    },
    
    fr: {
        // Sidebar
        filters: 'Filtres',
        searchPlaceholder: 'Rechercher des rapports...',
        lastUpdate: 'Dernière mise à jour',
        all: 'Tous',
        last3days: '3 derniers jours',
        lastWeek: 'Dernière semaine',
        lastMonth: 'Dernier mois',
        source: 'Source',
        showMore: 'Afficher plus',
        categories: 'Catégories',
        
        // Header
        reports: 'Rapports',
        
        // Report meta
        sourceLabel: 'Source:',
        viewFullReport: 'Voir le rapport complet',
        
        // Empty states
        noReportsFound: 'Aucun rapport trouvé',
        noReportsDescription: 'Essayez d\'ajuster les filtres',
        errorLoadingReports: 'Erreur de chargement',
        errorMessage: 'Impossible de charger les rapports. Assurez-vous que le dossier "reports" existe.',
        
        // Date formatting
        today: 'Aujourd\'hui',
        yesterday: 'Hier',
        daysAgo: 'Il y a {0} jours',
        weeksAgo: 'Il y a {0} semaines',
        monthsAgo: 'Il y a {0} mois',
        
        // Tooltips
        changeTheme: 'Changer le thème',
        changeLanguage: 'Changer la langue'
    }
};

// Función auxiliar para obtener idiomas disponibles
function getAvailableLanguages() {
    return Object.keys(translations);
}

// Exportar si se usa como módulo
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, getAvailableLanguages };
}
