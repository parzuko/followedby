(async () => {
    const src = chrome.extension.getURL("src/app.js");
    const contentScript = await import(src);
    contentScript.main();
})();
