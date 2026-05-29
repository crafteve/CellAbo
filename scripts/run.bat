@echo off
chcp 65001 >nul
cd /d "%~dp0.."
echo Compiling...
javac scripts\GenerateTextures.java -d scripts
if %ERRORLEVEL% neq 0 (
    echo Compilation failed.
    pause
    exit /b %ERRORLEVEL%
)
echo Running...
java -cp scripts GenerateTextures
pause
