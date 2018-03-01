
var input, cmd, head, data = {
    text: localStorage["bandit-text"] || '',
    cmd: localStorage["bandit-cmd"] || '$',
    autoExec: !!localStorage["bandit-autoexec"],
    setCMD: (c) => {
        localStorage["bandit-cmd"] = data.cmd = c;
        if (localStorage["bandit-autoexec"] = data.autoExec) {
            if (input.selectionStart === input.selectionEnd)
                data.goAll();
            else
                data.goSelected();

            // a hacky way to close the menu
            data.killTheMenu = true;
            setTimeout(() => data.killTheMenu = false, 300);
        }
    },
    killTheMenu: false,
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
        var txt2 = [];
        var cmd2 = `(${data.cmd || '$'})`;
        data.text.split('\n').forEach(el => {
            window.$ = el;
            txt2.push(eval(cmd2));
        });
        localStorage["bandit-text"] = data.text = txt2.join('\n');

        // a hacky way to record undo
        input.focus();
        input.select();
        document.execCommand("insertText", false, data.text);
        input.select();
        data.save();
    },
    goSelected: () => {
        var start = input.selectionStart;
        window.$ = data.text.substring(start, input.selectionEnd);

        // a hacky way to record undo
        input.focus();
        document.execCommand("insertText", false, eval(`(${data.cmd || '$'})`));
        localStorage["bandit-text"] = data.text = input.value;
        input.selectionStart = start;
        data.save();
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

function syncSize() {
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
