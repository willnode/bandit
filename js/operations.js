window.encode = {
    "Encryption": {
        "Base64": `btoa($)`,
        "SHA1": `sha1($)`,
        "MD5": `md5($)`,
        "ROT13": `rot13($)`,
    },
    "URI": {
        "Full": `[...$].map(x => '%' + x.charCodeAt(0).toString(16)).join('')`,
        "Legacy": `escape($)`,
        "URI": `encodeURI($)`,
        "URI Component": `encodeURIComponent($)`,
    },
    "HTML": {
        "Minimum": `$.replace(/[&<>"'\`=\\/]/g, s => entityMap[s])`,
        "Digit": `[...$].map(x => '&#' + x.charCodeAt(0).toString()).join('')`,
        "Hex": `[...$].map(x => '&#x' + x.charCodeAt(0).toString(16).padStart(2, "0")).join('')`,
    },
    "Javascript": {
        "JSON": `JSON.stringify($)`,
        "Hex": `[...$].map(x => '\\\\x' + x.charCodeAt(0).toString(16).padStart(2, "0")).join('')`,
        "Unicode": `[...$].map(x => '\\\\u' + x.charCodeAt(0).toString(16).padStart(4, "0")).join('')`,
        "Numbers": `'[' + [...$].map(x => x.charCodeAt(0).toString()).join(', ') + ']'`,
    }
};

window.decode = {
    "Base64": `atob($)`,
    "URI": {
        "Unescape": `unescape($)`,
        "URI": `decodeURI($)`,
        "URI Component": `decodeURIComponent($)`,
    },
    "HTML": `new DOMParser().parseFromString($, 'text/html').documentElement.textContent`,
    "Javascript": {
        "JSON": "JSON.parse($)",
        "Unslash": `eval('"' + $.replace(/"/g, '\\\\"') + '"')`,
        "CSV Numbers": `String.fromCharCode(...$.replace(/[^0-9,]/g, '').split(','))`,
    }
};

window.template = {
    "String": {
        "Reverse": `[...$].reverse().join('')`,
        "Upper Case": `$.toUpperCase()`,
        "Lower Case": `$.toLowerCase()`,
        "Tab to Spaces": `$.replace(/\\t/g, '    ')`,
    },
    "Multilines": {
        "Join lines":`$.replace(/\\n/g, '')`,
        "JSON Beautify":`JSON.stringify(JSON.parse($), null, 2)`,
        "Split URL Params":`$.replace(/([\\?&])/g, '\\n$1')`,
        "Split URL Paths":`$.replace(/([\\/#])//g, '\\n$1')`,
    },
    "URI": {
        "Data URI Embed HTML":`"data:text/html;charset='utf-8', " + $`,
        "Javascript URI":`"javascript:" + $`,
        "Directory Traversal": `''.padStart(10*3, '../') + $`,
    },
    "XSS": {
        "Script Tag": `'<script>alert(' + JSON.stringify($ || 'XSS') + ')</script>'`,
        "Image Tag": `'<img src="x" onerror=\\'alert(' + JSON.stringify($ || 'XSS') + ')\\'>'`,
        "Symbols Sanitization Test": `'\\'"</>\\\\;:|&^,'`,
        "String.fromCharCode":`'String.fromCharCode(' + [...($ || 'XSS')].map(x => x.charCodeAt(0).toString()).join(', ') + ')'`
    },
    "SQLi": {
        "UNION SELECT":`'UNION SELECT ' + new Array(10).fill().map((_, i) => i).join(',')`,
    },
    "Payload": {
        "AAAAA": `''.padStart(512, 'A')`,
        "Lorem Ipsum": `''.padStart(512, loremIpsum)`,
        "Numbers": `JSON.stringify(new Array(512).fill().map((_, i) => i))`,
    }
};
