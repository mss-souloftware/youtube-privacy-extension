chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ hideTitles: false, hideChannels: false, hideSubscribe: false });
  });
  