# Script para generar automáticamente reports-index.json
# Escanea la carpeta reports y lista todos los archivos .json
# Ejecutar: .\generate-index.ps1

$REPORTS_DIR = ".\reports"
$INDEX_FILE = ".\reports\reports-index.json"
$EXCLUDED_FILES = @("reports-index.json", "template.json")

Write-Host "🔍 Escaneando carpeta reports..." -ForegroundColor Cyan

# Obtener todos los archivos .json excepto los excluidos
$reportFiles = Get-ChildItem -Path $REPORTS_DIR -Filter "*.json" | 
    Where-Object { $EXCLUDED_FILES -notcontains $_.Name } |
    Sort-Object Name |
    Select-Object -ExpandProperty Name

# Crear el objeto de índice
$index = @{
    reports = $reportFiles
    lastUpdated = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    totalReports = $reportFiles.Count
} | ConvertTo-Json -Depth 10

# Escribir el archivo
$index | Out-File -FilePath $INDEX_FILE -Encoding UTF8

Write-Host "✅ reports-index.json generado exitosamente!" -ForegroundColor Green
Write-Host "📊 Total de informes: $($reportFiles.Count)" -ForegroundColor Yellow
Write-Host "📄 Informes encontrados:" -ForegroundColor White
$reportFiles | ForEach-Object { Write-Host "   - $_" -ForegroundColor Gray }
