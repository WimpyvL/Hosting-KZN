@echo off
echo Video Optimization Script
echo ========================

REM Check if ffmpeg is installed
where ffmpeg >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo FFmpeg is not installed. Please install FFmpeg to use this script.
    echo You can download it from: https://ffmpeg.org/download.html
    pause
    exit /b 1
)

REM Create optimized folder if it doesn't exist
if not exist "optimized" mkdir optimized

REM Optimize videos
for %%f in (*.mp4) do (
    echo Processing %%f...
    ffmpeg -i "%%f" -c:v libx264 -crf 23 -preset medium -vf "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2" -c:a aac -b:a 128k -movflags +faststart "optimized\%%f"
    echo Completed %%f
    echo.
)

echo All videos have been optimized and saved to the "optimized" folder.
echo Please review the optimized videos before replacing the originals.
pause