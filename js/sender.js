var httpWords = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS']

var data = {
    input: localStorage['bandit-xhr'] || '',
    showcors: false,
    showblobout: false,
    send: () => send(),
    popout: () => {
        var url = parse(localStorage['bandit-xhr'] = data.input).url;
        if (window.opened && !window.opened.closed) {
            opened.location = url;
            opened.focus();
        }
        else
            window.opened = window.open(url, '_blank', undefined, true);
    },
    blobout: () => window.open(obj, '_blank'),
    cors: () => {
        var proxy = localStorage['bandit-cors'] || '';
        if (!proxy)
            proxy = prompt("Enter CORS proxy URL\nYou can edit this later via localStorage", "");
        if (!proxy) return;

        send(localStorage['bandit-cors'] = proxy.slice(-1) === '/' ? proxy : proxy + '/');
    }
}

new Vue({
    el: '#body',
    data: data
});

var reqHead = document.getElementById('res-head');
var reqBody = document.getElementById('res-body');

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
        var section = word.substr(i).split2('\n');
        var section2 = section[1].split2('\n\n');
        url = section[0].trim();
        head = section2[0];
        body = section2[1];
    } else {
        // URL on first paragraph, HTTP header in second. Separated by a blank line.
        var section = word.substr(i).split2('\n\n');
        url = section[0].trim().replace(/\n/gm, '');
        head = section[1].trim();
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

String.prototype.split2 = function(sep) {
    var split = this.split(sep);
    return [split[0], split.length > 1 ? split.slice(1).join(sep) : ''];
}

function mount(obj, type) {
    if (window.obj)
        URL.revokeObjectURL(window.obj);
    return window.obj = URL.createObjectURL(new Blob(typeof obj === 'string' ? [obj] : obj, { type: type || `*/*` }));
}

var send = (cors) => {
    var req = parse(localStorage['bandit-xhr'] = data.input);
    if (!req) return;

    data.showcors = false; data.showblobout = false;

    var xhr = new XMLHttpRequest();
    xhr.open(req.method, (cors || '') + req.url);
    if (req.head)
        for (const head in req.head)
           xhr.setRequestHeader(head, req.head[head]);

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 0) {
                data.showcors = true;
                if (localStorage['auto-cors'] && !cors)
                    data.cors();
            }
            else
                data.showblobout = true;

            reqHead.innerText = `${xhr.status} ${xhr.statusText}\n${xhr.getAllResponseHeaders()}`;
            var type = xhr.getResponseHeader('content-type') || '*/*';
            mount(xhr.response, type);
            reqBody.innerText = xhr.response;
        }
    }
    xhr.send(req.body);
}

