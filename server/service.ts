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

export async function getLikes() {
  const currentLikes = await kv.get(["likes"]) as Like;
  const likesValue = currentLikes?.value?.likes ?? 0;
  return (likesValue);
}

export async function getLastDevice() {
 const currentLikes = await kv.get(["likes"]) as Device;
 const currentDevice = currentLikes?.value?.device;
 return (currentDevice);
}

export async function updateLikes(ctx: Context) {
  let likes = await getLikes() as unknown as number ?? 0;
  likes = likes+1;
  const device = ctx.request.ip+ctx.request.userAgent.ua
  const lastDevice = await getLastDevice();

  if(device !== lastDevice){
    kv.set(["likes"], {"likes": likes, "device" :device });
  }else{
    console.log("nah bro, same!");
    return likes-1;
  }

  return likes
}




