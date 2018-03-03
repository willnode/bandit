var httpWords = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS']
var input = document.getElementById('text');
var reqCors = document.getElementById('cors');
var reqHead = document.getElementById('res-head');
var reqBody = document.getElementById('res-body');
var reqPop = document.getElementById('pop');

function parse(word) {
    word = word.replace(/\r/g, '');
    var i = 0; var fullbody = false;
    // first line is url and the mode
    var mode = (word.match(/^(\w*) /) || [''])[1];
    if (fullbody = httpWords.includes(mode))
        i += mode.length;
    else
        mode = 'GET';

    var url = '', head = undefined, body = undefined;
    if (fullbody) {
        // parse just like usual HTTP request
        var section = word.substr(i).split('\n', 2);
        url = section[0].trim();
        var section2 = (section[1] || '').split('\n\n', 2);
        head = section2.length > 0 ? section2[0] : undefined;
        body = section2.length > 1 ? section2[1] : undefined;
    } else {
        // URL on first paragraph, HTTP header in second. Separated by a blank line.
        var section = word.substr(i).split('\n\n', 2);
        url = section[0].trim().replace(/\n/gm, '');
        head = section.length > 1 ? section[1] : undefined;
    }

    if (!url) return null;

    if (head) {
        var heads = {};
        head.trim().split('\n').forEach(x => {
            var section = x.match(/^(.+)\:(.*)/);
            heads[section[1].trim()] = section[2].trim();
        })
        head = heads;
    }

    return {
        method: mode,
        url: url,
        head: head,
        body: body,
    };
}

function mount(obj, type) {
    if (window.obj)
        URL.revokeObjectURL(window.obj);
    return window.obj = URL.createObjectURL(new Blob(typeof obj === 'string' ? [obj] : obj, { type: type || `*/*` }));
}

var send = (cors) => {
    var req = parse(input.value);
    if (!req) return;

    reqCors.classList.add('hidden');
    reqPop.classList.add('hidden');

    var xhr = new XMLHttpRequest();
    xhr.open(req.method, (cors || '') + req.url);
    for (const head in req.head)
        xhr.setRequestHeader(head, req.head[head]);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 0) {
                reqCors.classList.remove('hidden');
                reqPop.classList.add('hidden');
            } else
                reqPop.classList.remove('hidden');
            reqHead.innerText = `${xhr.status} ${xhr.statusText}\n${xhr.getAllResponseHeaders()}`;
            var type = xhr.getResponseHeader('content-type') || '*/*';
            mount(xhr.response, type);
            reqBody.innerText = xhr.response;
        }
    }
    xhr.send(req.body);
}

document.getElementById('xhr').onclick = () => send();

reqCors.onclick = () => {
    var proxy = localStorage['cors'] || '';
    if (!proxy)
        proxy = prompt("Enter CORS proxy URL\nYou can edit this later via localStorage", "");
    if (!proxy) return;

    send(localStorage['cors'] = proxy.slice(-1) === '/' ? proxy : proxy + '/');

}

reqPop.onclick = () => {
    window.open(obj, '_blank');
}
