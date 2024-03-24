import { Context, send } from "https://deno.land/x/oak@14.2.0/mod.ts";

async function pathExists(path: string) {
  try {
    // could check for path with extension
    // const withExtension = `${path}.html`;
    let stats = await Deno.lstat(path);

    return stats.size > 0 && stats;
  } catch (e) {
    if (e && e instanceof Deno.errors.NotFound) {
      return false;
      //req.respond({ body: "Not-found-o", status: 404})
    } else {
      //return false;
      //throw e;
      //req.respond({ body: "Crashed-o", status: 500})
    }
  }
}

function hasTrailingSlash(str: string) {
  return str.endsWith('/');
}

export const staticFileMiddleware = async (ctx: Context, next: Function) => {
  const path = `${Deno.cwd()}/_site${ctx.request.url.pathname}`;
  console.log("PATH");
  console.log(path);

  const pathType = (await pathExists(path)) as unknown as Deno.FileInfo;

  console.log("EXISTS?");
  console.log(pathType);
  console.log(pathType.isFile);
  console.log(pathType.isDirectory);

  if (pathType?.isFile) {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/_site`,
    });
  } else if (pathType?.isDirectory) {

    // dont want urls without trailing slashes thanks.
    if(!hasTrailingSlash(ctx.request.url.pathname)){
      return await next();
    }

    const withExtension =  `${ctx.request.url.pathname}index.html`;

    console.log(withExtension);

    await send(ctx, withExtension, {
      root: `${Deno.cwd()}/_site`,
    });
  } else {
    await next();
  }
};
