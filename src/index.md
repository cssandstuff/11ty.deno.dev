---
title: 11ty
---

Hi! thanks for checking this out, I&rsquo;ve also written [a little bit of background](https://cssandstuff.com/writing/pairing-eleventy-with-htmx-and-deno/) about this project as well as some help [getting deno working with 11ty](https://cssandstuff.com/writing/eleventy-with-a-basic-deno-static-server-setup/).

## 11ty

Now that Eleventy supports ESM (from version 3.x), it means we can use it in places we couldn't previously.

## Deno

Deno is a fast, secure and great alternative to Node and now supports most of the node ecosystem, so it seems like a great time to try and bring the two together in a starter project, and that's exactly what this is. You can host statically on Deno, but then there's room to do server stuff too if you want.

## Htmx

Not really necessary to get you running on deno.deploy, but I like what this project sets out to achieve and it pairs great with Eleventy so that you can request pages without full page reloads. (pretty easily done with minimal changes to your templates).


