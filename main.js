var $ = x => document.getElementById(x);

$('go').onclick = () => {
    window.$1 = $('text').value
    $('text').value = eval(`(${$('cmd').value || '$1'})`);
}

new MutationObserver(() => {
    $('head').style.width = $('text').style.width;
}).observe($('text'), {
    attributes: true, attributeFilter: [ "style" ]
   })

