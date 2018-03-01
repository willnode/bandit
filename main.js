
var input, cmd, head, data = {
    text: localStorage["bandit-text"] || '',
    cmd: localStorage["bandit-cmd"] || '$',
    autoExec: !!localStorage["bandit-autoexec"],
    setCMD: (c) => {
        localStorage["bandit-cmd"] = data.cmd = c;
        if (localStorage["bandit-autoexec"] = data.autoExec)
            data.goAll();
    },
    menu: {
        encode: window.encode,
        decode: window.decode,
        template: window.template,
    },
    goAll: () => {
        window.$ = data.text;
        localStorage["bandit-text"] = data.text = eval(`(${data.cmd || '$'})`);

        // a hacky way to record undo
        input.focus();
        input.select();
        document.execCommand("insertText", false, data.text);
        input.select();
        data.save();
    },
    goPerLine: () => {

    },
    goSelected: () => {

    },
    undo: () => {
        input.focus();
        document.execCommand("undo");
    },
    copy: () => {
        input.focus();
        if (input.selectionStart === input.selectionEnd)
            input.select();
        document.execCommand("copy");
    },
    save: () => {
        localStorage["bandit-text"] = data.text;
    },
    popout: () => {
        window.open('/index.html', '_blank');
    }
}

var app = new Vue({
    el: '#app',
    data: data,
})

input = document.getElementById('text');
head = document.getElementById('head');

function syncSize () {
   head.style.width = input.style.width;
   localStorage["bandit-width"] = input.style.width;
   localStorage["bandit-height"] = input.style.height;
}

new MutationObserver(syncSize).observe(input, {
    attributes: true,
    attributeFilter: ["style"]
})

input.style.width = localStorage["bandit-width"] || '500px';
input.style.height = localStorage["bandit-height"] || '7em';
