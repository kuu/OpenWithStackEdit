chrome.browserAction.onClicked.addListener(function (tab) {
  if (tab.url) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", tab.url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var tMarkdown = HTML2Markdown(xhr.responseText);
        var tBlobURL = URL.createObjectURL(new Blob([tMarkdown], { type: 'plain/text', endings: 'native' }));
        if (tBlobURL) {
          var tOpenURL = 'https://stackedit.io?content=' + tBlobURL;
          chrome.tabs.create({url: tOpenURL, active: true})
        }
      }
    };
    xhr.send();
  }
});
