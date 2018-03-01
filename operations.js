window.encode = {
    "Encryption": {
        "Base64": `btoa($)`,
        "SHA1": `sha1($)`,
        "MD5": `md5($)`,
        "ROT13": `rot13($)`,
    },
    "URI": {
        "Full": `escapeall($)`,
        "Escape": `escape($)`,
        "URI": `encodeURI($)`,
        "URI Component": `encodeURIComponent($)`,
    },
    "String": `'"' + $.replace(/"/g, '\\"') + '"'`,
};

window.decode = {
    "Base64": ``,
    "URI": {
        "Escape": `escape($)`,
        "URI": `encodeURI($)`,
        "URI Component": `encodeURIComponent($)`,
    },
    "String": `'"' + $.replace(/"/g, '\\"') + '"'`,
};

window.template = {
    "String.fromCharCode": `$`,
};
