# 🚀 Guía de Inicio Rápido

## Para empezar en menos de 5 minutos

### 1. Probar localmente

Abre `index.html` con tu navegador. ¡Eso es todo! No necesitas servidor local.

### 2. Agregar tu primer informe

1. Crea un archivo en `reports/` llamado `mi-informe.json`:
```json
{
  "title": "My First Report",
  "source": "My Organization",
  "description": "This is a test cybersecurity report",
  "url": "https://example.com",
  "cve": "",
  "categories": ["Test", "Demo"],
  "date": "20-01-2024"
}
```

2. Genera el índice:

**Opción A: Con Node.js**
```bash
npm run generate-index
```

**Opción B: Con PowerShell (Windows)**
```powershell
.\generate-index.ps1
```

3. Recarga la web y verás tu nuevo informe

### 3. Desplegar en GitHub Pages

1. Sube el proyecto a GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git push -u origin main
```

2. En GitHub, ve a Settings → Pages
3. Selecciona rama `main` y carpeta `/ (root)`
4. Visita tu URL: `https://tu-usuario.github.io/tu-repositorio`

### 4. Configurar permisos para GitHub Actions

Para que el workflow automático funcione:

1. En tu repositorio de GitHub, ve a **Settings → Actions → General**
2. En "Workflow permissions", selecciona **"Read and write permissions"**
3. Marca la casilla **"Allow GitHub Actions to create and approve pull requests"**
4. Clic en **Save**

Ahora cada vez que hagas push de un archivo JSON a `reports/`, GitHub Actions generará el índice automáticamente.

### 5. Agregar más informes (después del despliegue)

1. Crea tu archivo JSON en `reports/`
2. Haz commit y push:
```bash
git add reports/tu-nuevo-informe.json
git commit -m "Add new report"
git push
```

3. ¡GitHub Actions generará el índice automáticamente!
4. Espera 1-2 minutos y visita tu web para ver el cambio

## 🎯 Flujo de trabajo recomendado

```
Crear informe JSON → Push a GitHub → GitHub Actions genera índice → ¡Listo!
```

No necesitas generar el índice manualmente si usas GitHub Pages con el workflow configurado.

## 🆘 Problemas comunes

**El workflow no se ejecuta**
- Verifica los permisos en Settings → Actions → General
- Asegúrate de que el archivo esté en `reports/*.json`
- No modifiques directamente `reports-index.json`

**Los cambios no aparecen en la web**
- Espera 1-2 minutos para que GitHub Pages se actualice
- Limpia la caché del navegador (Ctrl + Shift + R)

**"npm: command not found"**
- Usa el script de PowerShell en su lugar: `.\generate-index.ps1`
- O instala Node.js desde https://nodejs.org

## 📚 Recursos adicionales

- [README.md](README.md): Documentación completa
- [DEPLOY.md](DEPLOY.md): Guía detallada de despliegue
- [.github/README.md](.github/README.md): Documentación de GitHub Actions
