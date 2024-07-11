document.addEventListener('DOMContentLoaded', function () {
    const toggleTitles = document.getElementById('toggle-titles');
    const toggleChannels = document.getElementById('toggle-channels');
    const toggleSubscribe = document.getElementById('toggle-subscribe');
  
    // Initialize toggle states based on storage values
    chrome.storage.sync.get(['hideTitles', 'hideChannels', 'hideSubscribe'], function (result) {
      toggleTitles.checked = result.hideTitles || false;
      toggleChannels.checked = result.hideChannels || false;
      toggleSubscribe.checked = result.hideSubscribe || false;
    });
  
    // Event listeners for toggle changes
    toggleTitles.addEventListener('change', function () {
      chrome.storage.sync.set({ hideTitles: toggleTitles.checked });
      applyChanges();
    });
  
    toggleChannels.addEventListener('change', function () {
      chrome.storage.sync.set({ hideChannels: toggleChannels.checked });
      applyChanges();
    });
  
    toggleSubscribe.addEventListener('change', function () {
      chrome.storage.sync.set({ hideSubscribe: toggleSubscribe.checked });
      applyChanges();
    });
  
    function applyChanges() {
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (tabs.length > 0) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: applyHideSettings
          });
        }
      });
    }
  
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
  });
  