# Video Optimization Guide for Hosting KZN Website

## Current Video Issues

The current videos on the website have the following issues:
- Large file sizes (ranging from 974KB to 1.4MB)
- Potentially low resolution or quality
- Not optimized for web delivery

## Optimization Recommendations

### 1. Use the Optimization Script

A batch script (`optimize-videos.bat`) has been created to help optimize the videos. This script requires FFmpeg to be installed on your system.

#### How to use the script:

1. Install FFmpeg from [ffmpeg.org](https://ffmpeg.org/download.html)
2. Open Command Prompt in the videos folder
3. Run `optimize-videos.bat`
4. The script will create an "optimized" folder with the processed videos
5. Review the optimized videos and replace the originals if satisfied

### 2. Manual Optimization Guidelines

If you prefer to optimize videos manually or need to create new videos, follow these guidelines:

#### Recommended Video Settings:

- **Resolution**: 1280x720 (720p) is ideal for web
- **Codec**: H.264 (MP4)
- **Bitrate**: 1-2 Mbps for 720p
- **Audio**: AAC codec, 128 Kbps
- **Duration**: Keep videos under 30 seconds for better performance
- **File size**: Aim for under 1MB per video

#### Tools for Manual Optimization:

- **FFmpeg** (command line): Powerful and free
- **Handbrake** (GUI): User-friendly alternative to FFmpeg
- **Adobe Media Encoder**: Professional option if available

### 3. Best Practices for Web Videos

- Use MP4 format with H.264 codec for maximum compatibility
- Include the `playsinline` attribute for better mobile experience
- Use `preload="metadata"` for most videos and `preload="auto"` only for the first video
- Keep videos short and focused
- Consider using a video CDN for larger videos

## Implementation Notes

The website has been updated with the following improvements:

1. Added `preload` attributes to optimize loading
2. Added `playsinline` attribute for better mobile playback
3. Implemented lazy loading in the JavaScript code
4. Added visibility detection to pause videos when not visible

These changes will significantly improve the video performance on the website, but optimizing the actual video files will provide the biggest improvement in quality and loading speed.