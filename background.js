chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.clear();
});
