---
title: Home
---

WebC is an awesome way to get started with web components and this is a quick starter site created for testing.
{{ meta.siteName }}
{{title}}

{% renderTemplate "webc" %}
<c-hello>YO!</c-hello>
<button hx-get="/about/slim"
    hx-trigger="click"
    hx-target="#content"
    hx-swap="outerHTML"
    hx-push-url="/about/"
>
    Go to Abouts
</button>
<button hx-get="/about/slim"
    hx-trigger="click"
    hx-target="#content"
    hx-swap="outerHTML"
    hx-push-url="true"
>
    Go to About same push url
</button>
<button hx-get="/about/slim"
    hx-trigger="click"
    hx-target="#content"
    hx-swap="outerHTML"
    hx-push-url="false"
>
    Go to About no push
</button>
<a href="/about/">About plain</a>
<a href="/about/slim" hx-push-url="/about/">About push slim</a>
<a href="/about/slim" hx-push-url="/about/slim">About same</a>
<a hx-get="/about/slim" href="/about/" hx-push-url="/about/">About get slim</a>
{% endrenderTemplate %}