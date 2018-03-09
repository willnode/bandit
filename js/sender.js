var httpWords = ['GET', 'POST', 'HEAD', 'PUT', 'DELETE', 'CONNECT', 'OPTIONS']

var data = {
    input: localStorage['bandit-xhr'] || '',
    proxyUrl: localStorage['bandit-proxy'] || '',
    showProxy: localStorage['bandit-proxyShow'] || false,
    enableProxy: localStorage['bandit-proxyEnable'] || true,
    cleanProxy: localStorage['bandit-proxyClean'] || false,
    showBlobOut: false,
    send: () => send(data.enableProxy ? data.proxyUrl : ''),
    popout: () => {
        var url = parse(data.input).url;
        if (window.opened && !window.opened.closed) {
            opened.location = url;
            opened.focus();
        }
        else
            window.opened = window.open(url, '_blank', undefined, true);
        save();
    },
    blobout: () => window.open(obj, '_blank'),
}

save = function () {
    localStorage['bandit-xhr'] = data.input;
    localStorage['bandit-proxy'] = data.proxyUrl;
    localStorage['bandit-proxyShow'] = data.showProxy;
    localStorage['bandit-proxyEnable'] = data.enableProxy;
    localStorage['bandit-proxyClean'] = data.cleanProxy;
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
        url = section[0].trim().replace(/ HTTP\/\d\.\d$/, "");
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

String.prototype.split2 = function (sep) {
    var split = this.split(sep);
    return [split[0], split.length > 1 ? split.slice(1).join(sep) : ''];
}

var send = (proxy) => {
    save();
    var req = parse(data.input);
    if (!req) return;

    data.showBlobOut = false;

    var xhr = window.xhr = new XMLHttpRequest();
    xhr.open(req.method, (proxy || '') + req.url);
    if (data.proxyUrl && data.enableProxy) {
        if (data.cleanProxy)
            xhr.setRequestHeader('x--custom', 'yes');
        if (req.head)
            for (const head in req.head)
                xhr.setRequestHeader('x--' + head, req.head[head]);
    } else if (req.head) {
        for (const head in req.head)
            xhr.setRequestHeader(head, req.head[head]);
    }

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status !== 0)
                data.showBlobOut = true;

            var head;
            try {
                if (!(head = xhr.getResponseHeader('x-raw-head')))
                    throw 'e';
                var heads = JSON.parse(head);
                head = "";
                Object.keys(heads).forEach(k => head += k + ': ' + heads[k] + '\n');
            } catch (e) {
                head = xhr.getAllResponseHeaders();
            }

            reqHead.innerText = `${xhr.status} ${xhr.statusText}\n${head}`;
            var type = xhr.getResponseHeader('content-type') || '*/*';
            mount(xhr.response, type);
            reqBody.innerText = xhr.response;
        }
    }
    xhr.send(req.body);
}

function mount(obj, type) {
    if (window.obj)
        URL.revokeObjectURL(window.obj);
    return window.obj = URL.createObjectURL(new Blob(typeof obj === 'string' ? [obj] : obj, { type: type || `*/*` }));
}
