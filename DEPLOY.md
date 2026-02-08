# Guía de Despliegue en GitHub Pages

## 📋 Pasos para publicar tu web

### 1. Crear repositorio en GitHub

1. Ve a [GitHub](https://github.com) e inicia sesión
2. Haz clic en el botón "+" en la esquina superior derecha
3. Selecciona "New repository"
4. Nombra tu repositorio (ej: `cybersecurity-reports`)
5. Hazlo público o privado según prefieras
6. NO inicialices con README (ya tienes uno)

### 2. Subir tu proyecto

Abre PowerShell en la carpeta del proyecto y ejecuta:

```powershell
# Inicializar git (si aún no lo has hecho)
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Sistema de informes de ciberseguridad"

# Conectar con tu repositorio (reemplaza con tu URL)
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git

# Subir los archivos
git branch -M main
git push -u origin main
```

### 3. Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, busca **Pages**
4. En "Source", selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
5. Haz clic en **Save**
6. Espera unos minutos

GitHub te mostrará la URL donde estará disponible tu web:
```
https://TU-USUARIO.github.io/TU-REPOSITORIO/
```

### 4. Verificar que funciona

- Accede a la URL proporcionada por GitHub
- Verifica que los informes se cargan correctamente
- Prueba los filtros y la búsqueda
- Cambia entre modo claro y oscuro

## 🔄 Agregar nuevos informes

Una vez desplegado, para agregar nuevos informes:

1. Crea el archivo JSON del informe en `reports/`
2. Actualiza `reports/reports-index.json`
3. Sube los cambios a GitHub:

```powershell
git add reports/
git commit -m "Agregar nuevo informe: [nombre del informe]"
git push
```

Los cambios se reflejarán en tu web en 1-2 minutos.

## 🛠️ Solución de Problemas

### Los informes no se cargan

- **Problema**: Error de CORS o archivos no encontrados
- **Solución**: Asegúrate de que:
  - Los archivos estén en la carpeta `reports/`
  - Los nombres en `reports-index.json` coincidan exactamente
  - El JSON está bien formateado (sin comas al final)

### La página se ve incorrecta

- **Problema**: CSS o JS no se cargan
- **Solución**: 
  - Verifica que `styles.css` y `script.js` estén en la raíz
  - Limpia el caché del navegador (Ctrl + Shift + R)

### GitHub Pages no se actualiza

- **Problema**: Los cambios no se reflejan
- **Solución**:
  - Espera 2-5 minutos después de hacer push
  - Verifica que el commit se subió correctamente
  - Limpia el caché del navegador

## 📝 Notas Importantes

- ✅ Los archivos JSON deben tener codificación UTF-8
- ✅ Los nombres de archivo no deben tener espacios ni caracteres especiales
- ✅ La fecha debe estar en formato `YYYY-MM-DD`
- ✅ Las URLs deben incluir `http://` o `https://`
- ✅ **Contenido en inglés**: Todos los informes JSON deben estar en inglés únicamente
- ✅ **Traducciones en translations.js**: Solo la interfaz se traduce, no el contenido

## 🎨 Personalización Adicional

### Cambiar dominio personalizado

1. En Settings → Pages, ve a "Custom domain"
2. Ingresa tu dominio (ej: `informes.tudominio.com`)
3. Configura el DNS de tu dominio según las instrucciones

### Habilitar HTTPS

GitHub Pages habilita HTTPS automáticamente. Solo marca la casilla "Enforce HTTPS" en la configuración de Pages.

## 🤝 Colaboración

Para permitir que otros contribuyan:

1. Ve a Settings → Collaborators
2. Agrega colaboradores por su usuario de GitHub
3. Ellos podrán agregar informes directamente al repositorio
