import { Context } from './deps.ts';

const kv = await Deno.openKv();
//await kv.delete(["likes"]);

type Like = {
  value: {
    likes: number;
  }
}

type Device = {
  value: {
    device: string;
  }
}

async function checkAlreadyLiked (ctx: Context){
  const currentLikes = await kv.get(["likes"]) as Like;
  let likes = currentLikes?.value?.likes ?? 0;
  
  let alreadyLiked = false;
  const device = ctx.request.ip+ctx.request.userAgent.ua
  const lastDevice = await getLastDevice();
  

  if(device === lastDevice){
    alreadyLiked = true;
  }

  return {likes, alreadyLiked, device}
}

export async function getLikes(ctx: Context) {
  console.log("here");


  const checkLiked = await checkAlreadyLiked(ctx);
  const likes = checkLiked.likes;
  const alreadyLiked = checkLiked.alreadyLiked;

  console.log(likes, alreadyLiked);

  return {likes, alreadyLiked};
}

export async function getLastDevice() {
 const currentLikes = await kv.get(["likes"]) as Device;
 const currentDevice = currentLikes?.value?.device;
 return (currentDevice);
}

export async function updateLikes(ctx: Context) {

  const checkLiked = await checkAlreadyLiked(ctx);
  let likes = checkLiked.likes;
  const device = checkLiked.device;


  if(checkLiked.alreadyLiked===true){
    console.log("nah bro, same!");
    likes = likes-1;
  }else{

    likes = likes+1;
    kv.set(["likes"], {"likes": likes, "device": device });
  }

  return likes
}




