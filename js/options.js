// I am using localStorage instead of chrome.storage.local because i dont want to deal with it asynchronously.

function save_options() 
{
    // Multiple window support option
    var multi_window = document.getElementById('multiple_window').checked;
    localStorage.setItem('multiple_window', multi_window.toString());

    // Open new page and scroll down little bit option
    var open_url = document.getElementById('open_url').checked;
    localStorage.setItem("open_url", open_url.toString());
    if (open_url)
    {
    var url = document.getElementById('open_url_input').value;
    localStorage.setItem("open_url_input", url);
    }

    // Show saved text to user.
    document.getElementById('status').textContent="Saved";
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options()
{
    // Restore Multiple window support option
    var multi_window = localStorage.getItem('multiple_window');
    document.getElementById('multiple_window').checked = (multi_window == 'true');

    // Restore Open new page and scroll down little bit option
    var open_url = localStorage.getItem('open_url');
    document.getElementById('open_url').checked = (open_url == 'true');
    var openUrlData = localStorage.getItem('open_url_input');
    document.getElementById('open_url_input').value = openUrlData;
    open_url_input_state();

}

function open_url_input_state()
{
    if (document.getElementById('open_url').checked)
    {
        document.getElementById('open_url_input').disabled = false;
    }
    else
    {
        document.getElementById('open_url_input').disabled = true;
    }

}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
document.getElementById('open_url').addEventListener('change', open_url_input_state);
