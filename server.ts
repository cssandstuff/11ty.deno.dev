import { oakAdapter, etaEngine, viewEngine, Application, Router, staticFileMiddleware, Status } from "./deps.ts";
import { getLikes, updateLikes } from "./service.ts";

const app = new Application();

app.use(
  viewEngine(oakAdapter, etaEngine, {
    viewRoot: "./src/views"
  })
);

// deno-lint-ignore no-explicit-any
async function updateLikesHandler(ctx: any) {
  const likes = await updateLikes(ctx);
  ctx.render("likes.html", {likes: likes});
}

// deno-lint-ignore no-explicit-any
async function getLikesHandler(ctx: any) {
  const likes = await getLikes();
  ctx.render("likes.html", {likes: likes});
}

const router = new Router();
router
  .get("/likes.html", getLikesHandler)
  .post("/likes.html", updateLikesHandler)


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
