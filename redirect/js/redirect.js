var onMessageHandler = function(message){
  // Ensure it is run only once, as we will try to message twice
  chrome.runtime.onMessage.removeListener(onMessageHandler);

  if (message.type == 'POST') {
    // code from https://stackoverflow.com/a/7404033/934239
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", message.url);
    for(var key in message.data) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", message.data[key]);
        form.appendChild(hiddenField);
    }
    document.body.appendChild(form);
    form.submit();
  } else if (message.type == 'GET') {
      window.location.replace(message.url);
  }
}

chrome.runtime.onMessage.addListener(onMessageHandler);
