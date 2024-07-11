function applyHideSettings() {
    chrome.storage.sync.get(['hideTitles', 'hideChannels', 'hideSubscribe'], function (result) {
      if (result.hideTitles) {
        document.querySelectorAll('h1.title').forEach(el => el.style.display = 'none');
      } else {
        document.querySelectorAll('h1.title').forEach(el => el.style.display = '');
      }
  
      if (result.hideChannels) {
        document.querySelectorAll('ytd-channel-name').forEach(el => el.style.display = 'none');
      } else {
        document.querySelectorAll('ytd-channel-name').forEach(el => el.style.display = '');
      }
  
      if (result.hideSubscribe) {
        document.querySelectorAll('ytd-subscribe-button-renderer').forEach(el => el.style.display = 'none');
      } else {
        document.querySelectorAll('ytd-subscribe-button-renderer').forEach(el => el.style.display = '');
      }
    });
  }
  
  applyHideSettings();
  