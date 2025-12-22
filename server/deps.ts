// Main dependencies for Deno all listed in one file
export * as uuid from "https://deno.land/std@0.207.0/uuid/mod.ts";
export { installGlobals } from "https://deno.land/x/virtualstorage@0.1.0/mod.ts";
export { Application, Context, Router, Response, Status, send } from "@oak/oak";
export { staticFileRoutes } from "../server/staticFileRoutes.ts";