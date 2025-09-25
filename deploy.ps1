# Exit on error
$ErrorActionPreference = "Stop"

# Build the project
Write-Host "Building the project..." -ForegroundColor Green
npm run build

# Create a temporary directory for deployment
$TEMP_DIR = "../deploy-temp"

Write-Host "Setting up deployment directory..." -ForegroundColor Green
if (Test-Path $TEMP_DIR) {
    Remove-Item -Recurse -Force $TEMP_DIR
}
New-Item -ItemType Directory -Path $TEMP_DIR | Out-Null

# Copy the built files to the temp directory
Write-Host "Copying built files..." -ForegroundColor Green
Copy-Item -Path ".\dist\*" -Destination $TEMP_DIR -Recurse -Force

# Create a .nojekyll file to bypass Jekyll processing
Set-Content -Path "$TEMP_DIR\.nojekyll" -Value ""

# Create a simple README.md
@"
# Humsafar

This is the deployed version of Humsafar.
"@ | Out-File -FilePath "$TEMP_DIR\README.md" -Encoding utf8

Write-Host "`nDeployment files are ready in $TEMP_DIR" -ForegroundColor Green
Write-Host "`nTo deploy to GitHub Pages, run the following commands:" -ForegroundColor Yellow
Write-Host "  cd $TEMP_DIR" -ForegroundColor Cyan
Write-Host "  git init" -ForegroundColor Cyan
Write-Host "  git add ." -ForegroundColor Cyan
Write-Host "  git commit -m 'Deploy to GitHub Pages'" -ForegroundColor Cyan
Write-Host "  git branch -M gh-pages" -ForegroundColor Cyan
Write-Host "  git remote add origin https://github.com/humsafar290524/frontend.git" -ForegroundColor Cyan
Write-Host "  git push -f origin gh-pages" -ForegroundColor Cyan

Write-Host "`nAfter deploying, your site should be available at: https://humsafar290524.github.io/frontend/" -ForegroundColor Green
