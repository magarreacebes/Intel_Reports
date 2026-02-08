/**
 * Script para generar automáticamente el reports-index.json
 * Escanea la carpeta reports y lista todos los archivos .json
 * Ejecutar: node generate-index.js
 */

const fs = require('fs');
const path = require('path');

const REPORTS_DIR = './reports';
const INDEX_FILE = './reports/reports-index.json';
const EXCLUDED_FILES = ['reports-index.json', 'template.json'];

function generateReportsIndex() {
    try {
        // Leer todos los archivos en la carpeta reports
        const files = fs.readdirSync(REPORTS_DIR);
        
        // Filtrar solo archivos .json y excluir archivos especiales
        const reportFiles = files
            .filter(file => {
                return file.endsWith('.json') && !EXCLUDED_FILES.includes(file);
            })
            .sort(); // Ordenar alfabéticamente
        
        // Crear el objeto de índice
        const index = {
            reports: reportFiles,
            lastUpdated: new Date().toISOString(),
            totalReports: reportFiles.length
        };
        
        // Escribir el archivo index
        fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
        
        console.log('✅ reports-index.json generado exitosamente!');
        console.log(`📊 Total de informes: ${reportFiles.length}`);
        console.log('📄 Informes encontrados:');
        reportFiles.forEach(file => console.log(`   - ${file}`));
        
    } catch (error) {
        console.error('❌ Error al generar el índice:', error.message);
        process.exit(1);
    }
}

// Ejecutar
generateReportsIndex();
