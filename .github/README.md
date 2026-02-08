# GitHub Workflows

## generate-index.yml

Este workflow automático genera el índice de informes (`reports/reports-index.json`) cada vez que se agregan, modifican o eliminan archivos JSON en la carpeta `reports/`.

### ¿Cuándo se ejecuta?

- **Automáticamente**: Cuando haces push de cambios a archivos `.json` en `reports/` (excepto `reports-index.json`)
- **Manualmente**: Desde la pestaña "Actions" en GitHub, usando "Run workflow"

### ¿Qué hace?

1. Clona el repositorio
2. Configura Node.js
3. Ejecuta `generate-index.js` para escanear todos los informes
4. Si detecta cambios en `reports-index.json`, hace commit y push automáticamente

### Configuración

No requiere configuración adicional. El workflow usa el bot de GitHub Actions para hacer commits:
- Autor: `github-actions[bot]`
- Mensaje de commit: `"Auto-generate reports index"`

### Permisos requeridos

Asegúrate de que el repositorio tenga permisos de escritura para GitHub Actions:

1. Ve a Settings → Actions → General
2. En "Workflow permissions", selecciona "Read and write permissions"
3. Guarda los cambios

### Verificación

Puedes ver el estado de las ejecuciones en la pestaña "Actions" del repositorio. Cada push a `reports/*.json` aparecerá con un check verde ✅ si se ejecutó correctamente.
