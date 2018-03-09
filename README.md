# Bandit v0.4.0 🐱‍👤

**[👉 Try in your Browser](//wellosoft.net/bandit/#immersive)**

This is a chrome extension similar to Hackbar, but with different design aimed for flexibility.

Suitable for Pentesting website and API manipulations.

Because this extension don't much using Chrome-specific features, you can also **[👉 try it right in the browser](//wellosoft.net/bandit/#immersive)**.

## Install

1. Clone this repo `git clone https://github.com/willnode/bandit`
2. Open Google Chrome extension page `chrome://extensions`
3. Turn on `developer mode`, click `load unpacked extension` and point to the cloned repo
4. Extension will appear as the ninja icon 🐱‍👤

## Features

+ Open as popup or [website](//wellosoft.net/bandit/#immersive)
+ [Lots of options for string manipulations](js/operations.js)
+ A dedicated page for [testing XHR/web request](send.html)

More info about features:

## String Manipulations

**[👉 open in browser](https://wellosoft.net/bandit/#immersive)**

Do many string operations, like:

+ Encode and decoding (HTML/JS/Base64/Hex etc.)
+ Cryptograhy encoding (MD5/SHA1/SHA256 etc.)
+ Payloads and injection (XSS/SQLi/Paths etc.)
+ Some funny things (reverse/case switches/punny code etc.)
+ [Many more](js/operations.js) or just write the JS operation for whatever you want.

## Advanced XHR

**[👉 open in browser](https://wellosoft.net/bandit/send.html)**

The XHR tool can be used to emulate HTTP Request to any endpoint. The UX is super simple, you just have to type the HTTP request like:

```
GET https://api.github.com/users/willnode/repos HTTP/1.1
Accept: Application/JSON
```

The click `SEND AS XHR`. Not just GET, but also support POST, OPTIONS, etc.

For simplicity, the tool also understands:

```
https://api.github.com
/users
/willnode
/repos

Accept: Application/JSON
```

which is an identical request.

#### XHR Proxy

To bypass browser restriction (e.g. CORS and Cache Control), you need to run **[a proxy that dedicated for this tool](https://github.com/willnode/bandit-proxy)**

After the server run, you can request:

```
GET https://google.com/ HTTP/1.1
Accept: Application/JSON
User-Agent: Googlebot
Cookie: just=acookie
```

And it'll request as is while returting the whole body + unsanitized HTTP Header. No kidding.
