---
title: Home
---

WebC is an awesome way to get started with web components and this is a quick starter site created for testing.
{{ meta.siteName }}
{{title}}

{% renderTemplate "webc" %}
<c-hello>YO!</c-hello>
<button data-hx-get="/about/slim.html"
    data-hx-trigger="click"
    data-hx-target="#content"
    data-hx-swap="outerHTML"
    data-hx-push-url="/about/"
>
    Go to Abouts
</button>
<button data-hx-get="/about/slim.html"
    data-hx-trigger="click"
    data-hx-target="#content"
    data-hx-swap="outerHTML"
    data-hx-push-url="true"
>
    Go to About same push url
</button>
<button data-hx-get="/about/slim.html"
    data-hx-trigger="click"
    data-hx-target="#content"
    data-hx-swap="outerHTML"
    data-hx-push-url="false"
>
    Go to About no push
</button>
<a href="/about/">About plain</a>
<a href="/about/slim.html" data-hx-push-url="/about/">About push slim</a>
<a href="/about/slim.html" data-hx-push-url="/about/slim">About same</a>
<a data-hx-get="/about/slim.html" href="/about/" data-hx-push-url="/about/">About get slim</a>
{% endrenderTemplate %}