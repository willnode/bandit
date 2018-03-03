var httpWords = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS']
function send(word) {
     word = word.replace(/\r/g, '');
    var i = 0;
    // first line is url and the mode
    var mode = word.match(/^(\w*) /)[1];
    if (!httpWords.includes(mode)) mode = 'GET';
    else i += mode.length;

    var url = word.substr(i).match(/^(.+)(\n[^&\/])?/m)[1];
    i += url.length;
    var head = '', body = undefined;
    url = url.replace(/\n/g, '').trim();
    if (i < word.length) {
        var section = word.substr(i).split('\n\n');
        if (section.length > 0)
            head = section[0];
        if (section.length > 1)
            body = section.slice(1).join('\n\n');
    }

    if (!url) return;
    var xhr = new XMLHttpRequest();
    xhr.open(mode, url, true);
    if (head) {
        head.trim().split('\n').forEach(x => {
            var section = x.match(/^(.+)\:(.*)/);
            xhr.setRequestHeader(section[1].trim(), section[2].trim());
        })
    }
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            console.log(xhr.getAllResponseHeaders());
            console.log(xhr.responseText);
        }
    }
    xhr.send(body);
}
document.getElementById('submit').onclick = () => {
  send( document.getElementById('input').value);
}
