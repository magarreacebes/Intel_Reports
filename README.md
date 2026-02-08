# Sistema de Informes de Ciberseguridad

Web dinámica para visualizar y filtrar informes de ciberseguridad que se cargan automáticamente desde archivos JSON.

## 🚀 Características

- ✅ Carga dinámica de informes desde archivos JSON
- 🤖 Generación automática del índice con scripts Node.js/PowerShell
- ☁️ Automatización con GitHub Actions (CI/CD)
- 🔍 Búsqueda en tiempo real por título, descripción, fuente y categorías
- 🏷️ Filtrado por fuente y categorías
- 📅 Filtrado por fecha de actualización
- 🌙 Modo oscuro/claro
- 🌍 Soporte multiidioma (Español/Inglés/Francés)
- 📱 Diseño responsive

## 🌐 Arquitectura Multiidioma

**Sistema limpio y escalable:**
- **Contenido en inglés**: Los informes JSON siempre están en inglés
- **Interfaz traducida**: El sistema traduce solo la interfaz (botones, labels, fechas)
- **Fácil de extender**: Agrega nuevos idiomas editando `translations.js`
- **Sin duplicación**: La información se almacena una sola vez

## 📁 Estructura del Proyecto

```
WebPorfolio/
├── .github/
│   └── workflows/
│       └── generate-index.yml  # GitHub Actions workflow
├── index.html                  # Página principal
├── styles.css                  # Estilos
├── script.js                   # Lógica de la aplicación
├── translations.js             # Sistema de traducciones (interfaz)
├── generate-index.js           # Script Node.js para generar índice
├── generate-index.ps1          # Script PowerShell para generar índice
├── package.json                # Configuración NPM
├── reports/                    # Carpeta de informes (solo inglés)
│   ├── reports-index.json      # Índice de todos los informes (auto-generado)
│   ├── informe-1.json          # Informe individual
│   ├── informe-2.json
│   └── template.json           # Plantilla
├── README.md
└── DEPLOY.md                   # Guía de despliegue
```

## ➕ Cómo Agregar un Nuevo Informe

### Paso 1: Crear el archivo JSON del informe

Crea un nuevo archivo en la carpeta `reports/` con el siguiente formato **(solo en inglés)**:

```json
{
  "title": "Report Title",
  "source": "Source Name",
  "description": "Detailed report description",
  "url": "https://link-to-full-report.com",
  "cve": "CVE-2024-12345",
  "categories": ["Malware", "APT", "Ransomware"],
  "date": "2024-01-15"
}
```

**Campos:**
- `title` (required): Report title in English
- `source` (required): Organization that published the report
- `description` (required): Summary or description in English
- `url` (optional): Link to the full report
- `cve` (optional): Associated CVE if applicable
- `categories` (required): Array of categories/tags in English
- `date` (required): Date in YYYY-MM-DD format

**Categorías sugeridas (en inglés):**
- APT
- Malware
- Ransomware
- Phishing
- Vulnerability
- Web Security
- Critical Infrastructure
- Espionage
- Supply Chain
- Data Breach
- Zero-Day
- Healthcare
- etc.

### Paso 2: Actualizar el índice (3 opciones)

**Opción A: Automático con GitHub Actions (Recomendado)** ⭐

Si has desplegado el proyecto en GitHub, el índice se genera automáticamente:

1. Sube tu nuevo archivo JSON a `reports/`
2. Haz commit y push a la rama `main`
3. GitHub Actions ejecutará el script y actualizará el índice
4. ¡Listo! No necesitas hacer nada más

**Opción B: Manual con Node.js**

```bash
# Instalar dependencias (solo la primera vez)
npm install

# Generar el índice
npm run generate-index
```

**Opción C: Manual con PowerShell (Windows)**

```powershell
# Ejecutar el script de PowerShell
.\generate-index.ps1
```

El script escaneará automáticamente todos los archivos `.json` en la carpeta `reports/` y actualizará `reports-index.json`.

### Paso 3: ¡Listo!

La web cargará automáticamente el nuevo informe la próxima vez que se acceda o se actualice la página.

## 🤖 Automatización del Índice

El proyecto incluye herramientas para generar automáticamente el archivo `reports-index.json` escaneando la carpeta `reports/`.

### Scripts Disponibles

**`generate-index.js`** (Node.js)
- Escanea todos los archivos `.json` en `reports/`
- Excluye automáticamente `reports-index.json` y `template.json`
- Genera el índice con metadatos (fecha de actualización, total de informes)
- Ejecución: `npm run generate-index`

**`generate-index.ps1`** (PowerShell)
- Funcionalidad idéntica a la versión de Node.js
- Nativo para Windows (no requiere Node.js)
- Salida con colores en la consola
- Ejecución: `.\generate-index.ps1`

**GitHub Actions Workflow** (`.github/workflows/generate-index.yml`)
- Se ejecuta automáticamente al hacer push de archivos JSON a `reports/`
- Genera el índice y hace commit automáticamente
- Activación manual disponible desde la pestaña "Actions" en GitHub
- No requiere intervención del usuario

### ¿Cuándo usar cada opción?

- **GitHub Actions**: Ideal para trabajo colaborativo o cuando el repositorio está en GitHub
- **Node.js** (`npm run generate-index`): Para desarrolladores con Node.js instalado
- **PowerShell** (`.\generate-index.ps1`): Para usuarios de Windows sin Node.js

## 🌐 Desplegar en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` y la carpeta `/ (root)`
4. GitHub generará una URL pública para tu web
5. El workflow de GitHub Actions generará el índice automáticamente en cada push

**Nota**: Si usas GitHub Pages, el workflow de GitHub Actions se encargará de mantener el índice actualizado. Solo necesitas subir los archivos JSON nuevos.

## 🎨 Personalización

### Cambiar idioma

La web soporta español, inglés y francés. El usuario puede cambiar el idioma haciendo clic en el botón de bandera (🇪🇸/🇬🇧/🇫🇷) en la parte superior derecha del panel de filtros.

**Para agregar un nuevo idioma:**

1. Edita `translations.js`
2. Añade un nuevo objeto con las traducciones:

```javascript
pt: {
    filters: 'Filtros',
    searchPlaceholder: 'Pesquisar relatórios...',
    // ... resto de traducciones
}
```

3. Añade la bandera en `updateLangIcon()` en `script.js`
4. ¡Listo! El sistema cicla automáticamente entre todos los idiomas disponibles

### Cambiar colores de las categorías

Edita el archivo `script.js` en la función `getTagClass()` para agregar nuevas categorías con colores personalizados.

### Modificar el diseño

Edita `styles.css` para personalizar colores, fuentes y estilos. Las variables CSS están definidas en `:root` para facilitar la personalización.

## 📝 Notas

- Los informes se cargan dinámicamente al abrir la página
- Los filtros se generan automáticamente basados en fuentes y categorías
- El tema (claro/oscuro) y el idioma se guardan en localStorage
- **Contenido siempre en inglés** - Solo la interfaz se traduce
- Sistema escalable: Fácil de añadir nuevos idiomas en `translations.js`

## 🛠️ Tecnologías

- HTML5
- CSS3 (con variables CSS para temas)
- JavaScript (ES6+)
- Font Awesome para iconos
