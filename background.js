chrome.runtime.onStartup.addListener(function () {
    chrome.storage.local.clear();
});
