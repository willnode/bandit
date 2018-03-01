
var input, cmd, head, data = {
    text: '',
    cmd: '$',
    autoExec: false,
    setCMD: (c) => {
        data.cmd = c;
        if (data.autoExec)
            data.go();
    },
    menu: {
        encode: window.encode,
        decode: window.decode,
        template: window.template,
    },
    go: () => {
        window.$ = data.text;
        data.text = eval(`(${data.cmd || '$'})`);

        // a hacky way to record undo
        input.focus();
        input.select();
        document.execCommand("insertText", false, data.text);
        input.select();
    }
}

var app = new Vue({
    el: '#app',
    data: data,
})

input = document.getElementById('text');
head = document.getElementById('head');

new MutationObserver(() => head.style.width = input.style.width
).observe(input, {
    attributes: true,
    attributeFilter: ["style"]
})
