window.encode = {
    "Encryption": {
        "Base64": `btoa($1)`,
        "SHA1": `btoa($1)`,
        "MD5": `btoa($1)`,
        "ROT13": `btoa($1)`,
    },
    "URI": {
        "Full": ``,
        "Escape": `escape($1)`,
        "URI": `encodeURI($1)`,
        "URI Component": `encodeURIComponent($1)`,
    },
    "String": `'"' + $1.replace(/"/g, '\\"') + '"'`,
}
window.decode = {
    "Base64": ``,
    "URI": {
        "Full": ``,
        "Escape": `escape($1)`,
        "URI": `encodeURI($1)`,
        "URI Component": `encodeURIComponent($1)`,
    },
    "Hex": {

    },
    "String": `'"' + $1.replace(/"/g, '\\"') + '"'`,
}
window.template = {

}

String.fromCharCode()
