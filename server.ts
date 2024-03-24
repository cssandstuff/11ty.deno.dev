import { Application, Router, Response, Status } from "https://deno.land/x/oak@14.2.0/mod.ts";
import { staticFileMiddleware } from "./staticFileMiddleware.ts";

const app = new Application();

const router = new Router();
router
  // .get("/", (ctx) => {
  //   ctx.response.body = "Home";
  // })
  // .get("/about", (ctx) => {
  //   ctx.response.body = "About";
  // });

app.use(staticFileMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
app.use((ctx) => {
  ctx.response.body = "nuppers";
  ctx.response.status = Status.NotFound;
});

app.addEventListener("listen", () => {
  console.log("💖Server started");
});

await app.listen({ port: 8000 });
