import { oakAdapter, etaEngine, viewEngine, Application, Context, Router, staticFileMiddleware, Status } from "./deps.ts";
import { getLikes, updateLikes } from "./service.ts";

const app = new Application();

app.use(
  viewEngine(oakAdapter, etaEngine, {
    viewRoot: "./src/views"
  })
);

async function updateLikesHandler(ctx: Context) {
  const likes = await updateLikes();
  // console.log("likes:");
  // console.log(likes);
  ctx.render("likes.html", {likes: likes});
}

async function getLikesHandler(ctx: Context) {
  const likes = await getLikes();
  ctx.render("likes.html", {likes: likes});
}



const router = new Router();
router
  .get("/likes.html", getLikesHandler)
  .post("/likes.html", updateLikesHandler)
  //.get("/", ctx => ctx.render("index.html"))


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
