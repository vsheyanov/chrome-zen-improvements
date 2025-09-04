// Background script for Tab Event Logger extension

console.log('Tab Event Logger extension loaded');

// Listen for when a new tab is created
chrome.tabs.onCreated.addListener((tab) => {
    console.log('🆕 New tab opened!');
    console.log('Tab ID:', tab.id);
    console.log('Tab URL:', tab.url || 'about:blank');
    console.log('Tab Title:', tab.title || 'New Tab');
    console.log('Window ID:', tab.windowId);
    console.log('Tab created at:', new Date().toISOString());
    console.log('---');
});

// Listen for when a tab is updated (e.g., URL changes, loading complete)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
        console.log('✅ Tab finished loading');
        console.log('Tab ID:', tabId);
        console.log('Final URL:', tab.url);
        console.log('Final Title:', tab.title);
        console.log('---');
    }
});

// Listen for when a tab is activated (switched to)
chrome.tabs.onActivated.addListener((activeInfo) => {
    console.log('🔄 Tab activated');
    console.log('Active Tab ID:', activeInfo.tabId);
    console.log('Window ID:', activeInfo.windowId);
    console.log('---');
});

// Listen for when a tab is removed (closed)
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    console.log('❌ Tab closed');
    console.log('Closed Tab ID:', tabId);
    console.log('Window ID:', removeInfo.windowId);
    console.log('Window closing:', removeInfo.isWindowClosing);
    console.log('---');
});
