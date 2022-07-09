(async () => {
    const src = chrome.runtime.getURL("src/app.js");
    await import(src);
})();
