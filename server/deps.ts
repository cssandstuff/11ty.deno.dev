// Main dependencies for Deno all listed in one file
export { Application, Context, Router, Response, Status, send } from "https://deno.land/x/oak@14.2.0/mod.ts";
export { staticFileRoutes } from "../server/staticFileRoutes.ts";
export { viewEngine, etaEngine, oakAdapter }
  from "https://deno.land/x/view_engine@v10.6.0/mod.ts"

