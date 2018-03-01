var $ = x => document.getElementById(x);

$('go').onclick = () => {
    window.$1 = $('text').value
    $('text').value = eval(`(${$('cmd').value || '$1'})`);
}

new MutationObserver(() => {
    $('head').style.width = $('text').style.width;
}).observe($('text'), {
    attributes: true, attributeFilter: ["style"]
})

function makeItems(obj) {
    var str = '';
    for (const ctg in obj) {
        const el = obj[ctg];
        if (typeof el === 'object')
        {
            str += `<button class='hov'>${ctg}</button>`;
            str += `<div>`;
            for (const ctg2 in el) {
                const el = obj[ctg2];
                str += `<button data='${ctg}.${ctg2}' onclick='setCMD()'>${ctg2}</button>`;
            }
            str += `</div>`;
        } else {
            str += `<button data='${ctg}' onclick='setCMD()'>${ctg}</button>`;
        }
    }
    return str;
}

(() => {
    $('menu-encode').innerHTML = makeItems(window.encode);
    $('menu-decode').innerHTML = makeItems(window.decode);
})();

function setCMD() {
    console.log(this);
}


