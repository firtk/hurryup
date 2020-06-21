chrome.browserAction.setTitle({ title:'Save and close all tabs.'});
if (localStorage.getItem('flag') == 1)
{   
    // If tabs has saved previously, change icon and hover text.
    chrome.browserAction.setIcon({path:"images/load.png"});
    chrome.browserAction.setTitle({ title:'Load all tabs from previous save.'});
} 

chrome.browserAction.onClicked.addListener(function(tab) {
    flag = localStorage.getItem('flag'); // flag = 0 => save , flag = 1 => load
    if (flag == null) 
    {
        // First time usage setting.
        flag = 0;
    }

    if (flag == 0)
    {
        // Save all tab urls and close them.
        var urls = [];
        var queryObj = {};
        if (localStorage.getItem('multiple_window') == 'true')
        {
            // Support multiple window
            queryObj = {};
        }
        else
        {
            // Only current window
            queryObj = {currentWindow: true};
        }
        chrome.tabs.query(queryObj, function (tabs) {
            if (localStorage.getItem('open_url') == 'true')
            {
                // Open the requested url.
                // Urls must be declared in manifest for scroll feature work.
                var openUrl = localStorage.getItem('open_url_input');
                chrome.tabs.create({ url: openUrl }, tab => {
                chrome.tabs.executeScript(tab.id, { code: "window.scrollBy(0,1000);" }) // Scroll down the page little bit.
                });
            }

            for (var i = 0; i < tabs.length; i++)
            {
                urls.push(tabs[i].url);
                chrome.tabs.remove(tabs[i].id);
            }
            localStorage.setItem('myUrl', JSON.stringify(urls));
            localStorage.setItem('flag', 1);

            chrome.browserAction.setIcon({path:"images/load.png"});
            chrome.browserAction.setTitle({ title:'Load all tabs from previous save.'});
        });
    }

    else if (flag == 1)
    {
        // Open previously saved urls.
        var retrievedData = localStorage.getItem('myUrl');
        var retrieveUrls = JSON.parse(retrievedData);
        console.log(retrieveUrls.length);
        for (var i = 0; i < retrieveUrls.length; i++)
        {
            chrome.tabs.create({url: retrieveUrls[i]});
        }
        localStorage.setItem('flag', 0);

        chrome.browserAction.setIcon({path:"images/save.png"});
        chrome.browserAction.setTitle({ title:'Save and close all tabs.'});
    } 
});
