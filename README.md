# Disclamer

This Chrome extension was fully vibe-coded as an attempt to bring some of the useful features from Zen to Brave browser (which supports vertical tabs). I'll be checking your issues and try to make it better.

# Tab Manager & Logger Chrome Extension

A Chrome extension that intelligently detects tabs opened via the "New Tab" button and automatically moves them to the beginning of the tab bar with smart scrolling, while logging all tab events for debugging and monitoring purposes.

> **📁 Extension Location**: The actual Chrome extension files are located in the `extension/` directory. Load that directory in Chrome, not the root project directory.

## Features

- 🔍 **Smart New Tab Detection** - Uses multiple criteria to detect tabs opened via New Tab button (vs links, duplicates, etc.)
- 📌 **Selective Auto-reorder** - Only moves tabs that were opened via New Tab button to the first position
- 🚀 **Intelligent Auto-scroll** - Automatically scrolls to show moved tabs, respects pinned tabs
- 🎯 **Perfect Workflow** - New Tab button → Move to front → Scroll to show → Activate
- 📊 **Detailed Logging** - Shows detection criteria, scoring, and reasoning for each tab
- 🆕 Logs when new tabs are created (with detection analysis and movement tracking)
- ✅ Logs when tabs finish loading
- 🔄 Logs when tabs are activated/switched  
- ❌ Logs when tabs are closed
- 🎨 Enhanced popup interface with testing instructions

## Installation

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in top right)
4. Click "Load unpacked" and select the `extension/` directory (not the root directory)
5. The extension should now appear in your extensions list

## Usage

1. After installation, open the Developer Tools (F12)
2. Navigate to the Console tab
3. Perform tab actions (open, close, switch tabs)
4. View the logged events in the console

## How Auto-Scroll Works

When you have many tabs open and create a new tab:

1. **Normal behavior**: New tab appears at the end, often not visible
2. **With this extension**: 
   - New tab is moved to position 0 (first tab)
   - Tab is automatically activated (focused)
   - Chrome scrolls the tab bar to show the new tab
   - You immediately see and can use the new tab

This is especially useful when you have 10+ tabs open and the tab bar requires scrolling to see all tabs.

## How New Tab Detection Works

The extension uses a scoring system with 4 criteria to detect if a tab was opened via the "New Tab" button:

### Detection Criteria (scored out of 4):

1. **New Tab URL** - URL is `chrome://newtab/`, `about:blank`, or similar new tab page
2. **Is Active** - Tab is immediately active (New Tab button behavior) 
3. **Has No Opener** - No `openerTabId` (not opened from another tab/link)
4. **New Tab Title** - Title is "New Tab", empty, or similar

### Scoring:
- **3-4/4**: Detected as New Tab button → Tab gets moved to front
- **0-2/4**: Not detected as New Tab button → Tab stays in place

### Examples:
- **Ctrl+T / New Tab button**: ✅ Typically scores 4/4 and gets moved
- **Right-click link → Open in new tab**: ❌ Usually scores 1-2/4, stays in place
- **Ctrl+Click link**: ❌ Usually scores 1/4, stays in place
- **Duplicate tab**: ❌ Usually scores 0-1/4, stays in place

The console shows the detailed scoring for each new tab, so you can see exactly why tabs are or aren't being moved.

## Project Structure

```
tabs-extension/
├── extension/              # Chrome extension files (load this directory)
│   ├── manifest.json       # Extension configuration
│   ├── background.js       # Service worker handling tab events
│   ├── popup.html          # Extension popup interface
│   └── icons/              # Extension icons
│       ├── icon16.png      # 16x16 toolbar icon
│       ├── icon48.png      # 48x48 management page icon
│       └── icon128.png     # 128x128 web store icon
├── generate-icons.js       # Icon generation utility
├── package.json           # Node.js dependencies for development
├── package-lock.json      # Dependency lock file
├── node_modules/          # Node.js dependencies
└── README.md              # This file
```

## Chrome Extension Documentation Links

### Official Documentation
- **[Chrome Extensions Overview](https://developer.chrome.com/docs/extensions/)** - Main documentation hub
- **[Getting Started Guide](https://developer.chrome.com/docs/extensions/mv3/getstarted/)** - Step-by-step tutorial
- **[Manifest File Format](https://developer.chrome.com/docs/extensions/mv3/manifest/)** - Complete manifest.json reference

### Manifest V3 (Current Version)
- **[Migrating to Manifest V3](https://developer.chrome.com/docs/extensions/migrating/)** - Migration guide from V2
- **[Service Workers in Extensions](https://developer.chrome.com/docs/extensions/mv3/service_workers/)** - Background scripts
- **[Permissions](https://developer.chrome.com/docs/extensions/mv3/declare_permissions/)** - Permission system

### APIs Used in This Project
- **[chrome.tabs API](https://developer.chrome.com/docs/extensions/reference/tabs/)** - Tab management and events
- **[chrome.tabs.onCreated](https://developer.chrome.com/docs/extensions/reference/tabs/#event-onCreated)** - New tab events
- **[chrome.tabs.onUpdated](https://developer.chrome.com/docs/extensions/reference/tabs/#event-onUpdated)** - Tab update events
- **[chrome.tabs.onActivated](https://developer.chrome.com/docs/extensions/reference/tabs/#event-onActivated)** - Tab switch events
- **[chrome.tabs.onRemoved](https://developer.chrome.com/docs/extensions/reference/tabs/#event-onRemoved)** - Tab close events

### Development & Debugging
- **[Debugging Extensions](https://developer.chrome.com/docs/extensions/mv3/tut_debugging/)** - Debug techniques
- **[Extension DevTools](https://developer.chrome.com/docs/extensions/how-to/devtools/extend-devtools/)** - DevTools integration
- **[Testing Extensions](https://developer.chrome.com/docs/extensions/mv3/test/)** - Testing strategies

### Architecture & Best Practices
- **[Architecture Overview](https://developer.chrome.com/docs/extensions/mv3/architecture-overview/)** - Extension architecture
- **[Security](https://developer.chrome.com/docs/extensions/mv3/security/)** - Security best practices
- **[Performance](https://developer.chrome.com/docs/extensions/mv3/performance/)** - Performance optimization

### Publishing & Distribution
- **[Chrome Web Store](https://chrome.google.com/webstore/devconsole/)** - Developer console
- **[Publishing Guide](https://developer.chrome.com/docs/webstore/publish/)** - How to publish
- **[Store Policies](https://developer.chrome.com/docs/webstore/program-policies/)** - Compliance requirements

### Advanced Topics
- **[Content Scripts](https://developer.chrome.com/docs/extensions/mv3/content_scripts/)** - Inject scripts into pages
- **[Cross-Origin Requests](https://developer.chrome.com/docs/extensions/mv3/xhr/)** - Making HTTP requests
- **[Storage API](https://developer.chrome.com/docs/extensions/reference/storage/)** - Local data storage
- **[Message Passing](https://developer.chrome.com/docs/extensions/mv3/messaging/)** - Communication between components

### Community & Resources
- **[Chrome Extension Samples](https://github.com/GoogleChrome/chrome-extensions-samples)** - Official examples
- **[Stack Overflow - Chrome Extensions](https://stackoverflow.com/questions/tagged/google-chrome-extension)** - Q&A
- **[Chrome Developers YouTube](https://www.youtube.com/c/GoogleChromeDevelopers)** - Video tutorials

## Development Notes

- This extension uses Manifest V3 (latest version)
- Service workers replace background pages in V3
- All tab events are logged with timestamps and detailed information
- The extension requires the "tabs" permission to access tab events

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
