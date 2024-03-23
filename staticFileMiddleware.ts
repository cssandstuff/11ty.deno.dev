import { Context, send } from "https://deno.land/x/oak@14.2.0/mod.ts";

async function pathExists(path: string) {
  try {
    const stats = await Deno.lstat(path);
    return stats.size > 0 && stats;
  } catch (e) {
    if (e && e instanceof Deno.errors.NotFound) {
      return false;
      //req.respond({ body: "Not-found-o", status: 404})
    } else {
      throw e;
      //req.respond({ body: "Crashed-o", status: 500})
    }
  }
}

export const staticFileMiddleware = async (ctx: Context, next: Function) => {
  const path = `${Deno.cwd()}/_site${ctx.request.url.pathname}`;

  const pathType = (await pathExists(path)) as unknown as Deno.FileInfo;

  // console.log("MOO");
  // console.log(pathType);
  // console.log(pathType.isFile);
  // console.log(pathType.isDirectory);

  if (pathType?.isFile) {
    await send(ctx, ctx.request.url.pathname, {
      root: `${Deno.cwd()}/_site`,
    });
  } else if (pathType?.isDirectory) {
    const withExtension = `${ctx.request.url.pathname}index.html`;

    await send(ctx, withExtension, {
      root: `${Deno.cwd()}/_site`,
    });
  } else {
    await next();
  }
};
