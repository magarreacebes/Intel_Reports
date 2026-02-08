# Sistema de Informes de Ciberseguridad

Web dinámica para visualizar y filtrar informes de ciberseguridad que se cargan automáticamente desde archivos JSON.

## 🚀 Características

- ✅ Carga dinámica de informes desde archivos JSON
- 🔍 Búsqueda en tiempo real por título, descripción, fuente y categorías
- 🏷️ Filtrado por fuente y categorías
- 📅 Filtrado por fecha de actualización
- 🌙 Modo oscuro/claro
- 📱 Diseño responsive

## 📁 Estructura del Proyecto

```
WebPorfolio/
├── index.html              # Página principal
├── styles.css              # Estilos
├── script.js               # Lógica de la aplicación
└── reports/                # Carpeta de informes
    ├── reports-index.json  # Índice de todos los informes
    ├── informe-1.json      # Informe individual
    ├── informe-2.json      # Informe individual
    └── template.json       # Plantilla para nuevos informes
```

## ➕ Cómo Agregar un Nuevo Informe

### Paso 1: Crear el archivo JSON del informe

Crea un nuevo archivo en la carpeta `reports/` con el siguiente formato:

```json
{
  "titulo": "Título del informe",
  "fuente": "Nombre de la fuente (ej: Unit 42, Darktrace)",
  "descripcion": "Descripción detallada del informe de ciberseguridad",
  "url": "https://enlace-al-informe-completo.com",
  "cve": "CVE-2024-12345",
  "categorias": ["Malware", "APT", "Ransomware"],
  "fecha": "2024-01-15"
}
```

**Campos:**
- `titulo` (obligatorio): Título del informe
- `fuente` (obligatorio): Organización o fuente que publicó el informe
- `descripcion` (obligatorio): Resumen o descripción del contenido
- `url` (opcional): Enlace al informe completo
- `cve` (opcional): CVE asociado si aplica
- `categorias` (obligatorio): Array de categorías/tags
- `fecha` (obligatorio): Fecha en formato YYYY-MM-DD

**Categorías sugeridas:**
- APT
- Malware
- Ransomware
- Phishing
- Vulnerability / Vulnerabilidad
- Web Security
- Critical Infrastructure
- Espionage
- NGINX, macOS, etc. (tecnologías específicas)

### Paso 2: Actualizar el índice

Edita el archivo `reports/reports-index.json` y añade el nombre de tu nuevo archivo:

```json
{
  "reports": [
    "informe-existente-1.json",
    "informe-existente-2.json",
    "tu-nuevo-informe.json"
  ]
}
```

### Paso 3: ¡Listo!

La web cargará automáticamente el nuevo informe la próxima vez que se acceda o se actualice la página.

## 🌐 Desplegar en GitHub Pages

1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` y la carpeta `/ (root)`
4. GitHub generará una URL pública para tu web

## 🎨 Personalización

### Cambiar colores de las categorías

Edita el archivo `script.js` en la función `getTagClass()` para agregar nuevas categorías con colores personalizados.

### Modificar el diseño

Edita `styles.css` para personalizar colores, fuentes y estilos. Las variables CSS están definidas en `:root` para facilitar la personalización.

## 📝 Notas

- Los informes se cargan dinámicamente al abrir la página
- Los filtros se generan automáticamente basándose en las fuentes y categorías de los informes
- El tema (claro/oscuro) se guarda en el navegador del usuario

## 🛠️ Tecnologías

- HTML5
- CSS3 (con variables CSS para temas)
- JavaScript (ES6+)
- Font Awesome para iconos
