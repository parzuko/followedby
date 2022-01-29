(async () => {
    const src = chrome.extension.getURL("src/app.js");
    await import(src);
})();
