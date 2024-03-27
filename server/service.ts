import { Context } from "./deps.ts";

const kv = await Deno.openKv();
//await kv.delete(["likes"]);
//localStorage.clear();

type Like = {
  value: {
    likes: number;
  }
}

async function checkAlreadyLiked (ctx: Context){
  const currentLikes = await kv.get(["likes"]) as Like;
  const likes = currentLikes?.value?.likes ?? 0;
  
  let alreadyLiked = false;
  const device = ctx.request.ip+ctx.request.userAgent.ua
  console.log(sessionStorage.getItem(device));
  console.log(sessionStorage);

  const locallyLiked = sessionStorage.getItem(device);
  if(locallyLiked === "alreadyLiked"){
    alreadyLiked = true;
  }

  return {likes, alreadyLiked}
}

export async function getLikes(ctx: Context) {

  const checkLiked = await checkAlreadyLiked(ctx);
  const likes = checkLiked.likes;
  const alreadyLiked = checkLiked.alreadyLiked;

  return {likes, alreadyLiked};
}

// export async function getLastDevice() {
//  const likes = await kv.get(["likes"]) as Like;
//  const lastDevice = likes?.value?.device;
//  console.log(likes);
//  return (lastDevice);
// }

export async function updateLikes(ctx: Context) {

  const checkLiked = await checkAlreadyLiked(ctx);
  let likes = checkLiked.likes;
  const device = ctx.request.ip+ctx.request.userAgent.ua


  if(checkLiked.alreadyLiked===true){
    console.log("nah bro, same!");
    likes = likes-1;
  }else{

    likes = likes+1;
    kv.set(["likes"], {"likes": likes });
    sessionStorage.setItem(device, "alreadyLiked");

  }

  return likes
}




