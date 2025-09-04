// Background script for Tab Manager & Logger extension
// Detects New Tab button clicks and moves only those tabs to the beginning

console.log('Tab Manager & Logger extension loaded');

// Function to detect if a tab was likely opened via "New Tab" button
function detectNewTabButtonClick(tab) {
    // Check multiple indicators that suggest this was a "New Tab" button click:

    // 1. URL is a new tab page (chrome://newtab/, about:blank, etc.)
    const isNewTabURL = !tab.url ||
        tab.url === 'about:blank' ||
        tab.url.startsWith('chrome://newtab/') ||
        tab.url.startsWith('chrome-search://local-ntp/') ||
        tab.url.startsWith('edge://newtab/');

    // 2. Tab is active (New Tab button typically activates the tab immediately)
    const isActive = tab.active;

    // 3. No opener tab ID (not opened from another tab/link)
    const hasNoOpener = !tab.openerTabId;

    // 4. Title is typically "New Tab" or empty
    const isNewTabTitle = !tab.title ||
        tab.title === 'New Tab' ||
        tab.title === 'New tab' ||
        tab.title === '';

    console.log('🔍 New Tab Detection Criteria:');
    console.log('  - New Tab URL:', isNewTabURL, '(' + (tab.url || 'undefined') + ')');
    console.log('  - Is Active:', isActive);
    console.log('  - Has No Opener:', hasNoOpener, '(openerTabId:', tab.openerTabId || 'undefined' + ')');
    console.log('  - New Tab Title:', isNewTabTitle, '(' + (tab.title || 'undefined') + ')');

    // Consider it a "New Tab" button click if most criteria match
    const score = [isNewTabURL, isActive, hasNoOpener, isNewTabTitle].filter(Boolean).length;
    console.log('  - Detection Score:', score + '/4');

    return score >= 3; // Require at least 3 out of 4 criteria
}

// Listen for when a new tab is created
chrome.tabs.onCreated.addListener(async (tab) => {
    console.log('🆕 New tab opened');
    console.log('Tab ID:', tab.id);
    console.log('Tab URL:', tab.url || 'about:blank');
    console.log('Tab Title:', tab.title || 'New Tab');
    console.log('Window ID:', tab.windowId);
    console.log('Original index:', tab.index);
    console.log('Tab created at:', new Date().toISOString());

    // Detect if this was likely opened via "New Tab" button
    const isNewTabButton = detectNewTabButtonClick(tab);
    console.log('🔍 Detected as New Tab button click:', isNewTabButton);

    if (!isNewTabButton) {
        console.log('⏭️ Skipping tab movement - not a New Tab button click');
        console.log('---');
        return;
    }

    console.log('✨ This tab was opened via New Tab button - moving to front');

    try {
        // Move the new tab to the beginning (index 0)
        const movedTab = await chrome.tabs.move(tab.id, { index: 0 });
        console.log('📌 Tab moved to beginning');
        console.log('New index:', movedTab.index);

        // Wait for Chrome to process the move, then scroll to beginning and activate
        setTimeout(async () => {
            try {
                console.log('🔍 Scrolling tab bar to beginning');

                // Get all tabs in the current window
                const tabs = await chrome.tabs.query({ windowId: tab.windowId });
                const pinnedCount = tabs.filter(t => t.pinned).length;
                console.log('📌 Found', pinnedCount, 'pinned tabs in window');

                // Find a different tab to activate first (to force scroll), then our new tab
                const otherTab = tabs.find(t => t.id !== tab.id && !t.pinned);

                if (otherTab) {
                    console.log('📋 Found other non-pinned tab to scroll with:', otherTab.id, 'Our tab:', tab.id);

                    // Activate another tab first to force scroll to non-pinned section
                    await chrome.tabs.update(otherTab.id, { active: true });
                    console.log('🔄 Scrolled to non-pinned section by activating other tab');

                    // Now activate our new tab (should be visible at beginning of non-pinned tabs)
                    await chrome.tabs.update(tab.id, { active: true });
                    console.log('✅ New tab now active at beginning of non-pinned tabs');
                } else {
                    console.log('⚠️ No other non-pinned tabs found, directly activating new tab');
                    await chrome.tabs.update(tab.id, { active: true });
                }

            } catch (scrollError) {
                console.error('❌ Failed to scroll tab bar:', scrollError);
            }
        }, 250); // Single timeout with enough delay for both operations

    } catch (error) {
        console.error('❌ Failed to move tab:', error);
    }

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
