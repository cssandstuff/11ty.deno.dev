import { Context, send } from "./deps.ts";

async function pathExists(path: string) {
  try {
    const stats = await Deno.lstat(path);
    return (stats.isDirectory || stats.isFile) && stats;
  } catch (e) {
    if (e && e instanceof Deno.errors.NotFound) {
      console.log("no file or folder routes");
      return false;
    } else {
      console.log("lonely");
      return false;
    }
  }
}

function hasTrailingSlash(str: string) {
  return str.endsWith("/");
}

export const staticFileRoutes = async (ctx: Context, next: () => void) => {
  ctx.response.headers.set("Accept-Encoding", "gzip, deflate, br, zstd");
  const path = `${Deno.cwd()}/_site${ctx.request.url.pathname}`;
  const pathType = (await pathExists(path)) as unknown as Deno.FileInfo;
  const isHTMXRequest = ctx.request.headers.get("hx-request");
  let newUrl = isHTMXRequest
    ? `${ctx.request.url.pathname}slim.html`
    : ctx.request.url.pathname;

  console.log(ctx.request.url.pathname);
  console.log('isHTMXRequest:', !!isHTMXRequest);
  
  const slim = /slim.html/;
  const isDirectSlimRequest = slim.test(ctx.request.url.pathname) && !isHTMXRequest

  // Want to now redirect deno domain to real domain, hopefully this doesn't have any ill consequences 🙏.
  if (ctx.request.url.host === "cssandstuff.deno.dev") {
    const path = ctx.request.url.pathname;
    ctx.response.redirect(`http://cssandstuff.com${path}`);
  }

  if (isHTMXRequest) {
    // we set the response header to use Vary, so that non-htmx requests are cached separately;
    ctx.response.headers.append("Vary", "HX-Request");
  }

  if (pathType?.isFile && !isDirectSlimRequest) {
    await send(ctx, newUrl, {
      root: `${Deno.cwd()}/_site`,
    });
    console.log("was file");
  } else if (pathType?.isDirectory) {
    // dont want urls without trailing slashes thanks.
    if (!hasTrailingSlash(newUrl) && !isHTMXRequest) {
      console.log("no trailing slash");
      console.log(newUrl);
      console.log(hasTrailingSlash(newUrl));
      // maybe we should add slash and redirect?
      newUrl = `${newUrl}/`;
      ctx.response.redirect(newUrl);
      return;

      //return await next();
    }

    const withExtension = isHTMXRequest ? newUrl : `${newUrl}index.html`;

    await send(ctx, withExtension, {
      root: `${Deno.cwd()}/_site`,
    });
  } else {
    await next();
  }
};
