
var input, cmd, head, data = {
    text: '',
    cmd: '$',
    menu: {
        encode: window.encode,
        decode: window.decode,
        template: window.template,
    },
    go: () => {
        window.$ = data.text;
        data.text = eval(`(${data.cmd || '$'})`);
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
