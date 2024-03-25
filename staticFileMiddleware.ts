import { Context, send } from "https://deno.land/x/oak@14.2.0/mod.ts";

async function pathExists(path: string) {
  try {
    // could check for path with extension
    // const withExtension = `${path}.html`;
    // console.log("path exists function");
    // console.log(path);

    const stats = await Deno.lstat(path);
    // console.log("stats:");
    // console.log(stats);
    return (stats.isDirectory || stats.isFile) && stats;
  } catch (e) {
    if (e && e instanceof Deno.errors.NotFound) {
      console.log("no file or folder routes");
      return false;
      //req.respond({ body: "Not-found-o", status: 404})
    } else {
      console.log("lonely");
      //return false;
      //throw e;
      //req.respond({ body: "Crashed-o", status: 500})
    }
  }
}

function hasTrailingSlash(str: string) {
  return str.endsWith("/");
}

export const staticFileMiddleware = async (ctx: Context, next: Function) => {
  const path = `${Deno.cwd()}/_site${ctx.request.url.pathname}`;
  // console.log("PATH");
  // console.log(path);

  const pathType = (await pathExists(path)) as unknown as Deno.FileInfo;

  // console.log("EXISTS?");
  // console.log(pathType);
  // console.log(pathType.isFile);
  // console.log(pathType.isDirectory);

  if (pathType?.isFile) {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/_site`,
    });
  } else if (pathType?.isDirectory) {
    // dont want urls without trailing slashes thanks.
    if (!hasTrailingSlash(ctx.request.url.pathname)) {
      return await next();
    }

    const withExtension = `${ctx.request.url.pathname}index.html`;

    // console.log(withExtension);

    await send(ctx, withExtension, {
      root: `${Deno.cwd()}/_site`,
    });
  } else {
    await next();
  }
};
