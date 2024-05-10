import { uuid, Context } from "./deps.ts";

const kv = await Deno.openKv();
await kv.delete(["likes"]);

type Likes = {
  value: {
    likes: number;
  }
}

type UniqueVoters = {
  value: {
    device: string;
  }
}

async function checkAlreadyLiked (ctx: Context){
  const currentLikes = await kv.get(["likes"]) as Likes;
  const likes = currentLikes?.value?.likes ?? 0;

  const uniqueness = ctx.request.headers.get('uniqueness') as string
  const isValid = uuid.v4.validate(uniqueness);

  let alreadyLiked = false;

  // only do KV stuff if we have a valid and unique idendtifier from the client
  if(isValid && uniqueness){
    const myDevice = await kv.get([uniqueness]) as UniqueVoters ?? ""

    if(myDevice?.value?.device === "voted"){
      alreadyLiked = true;
    }
  }

  return {likes, alreadyLiked, uniqueness}
}

export async function getLikes(ctx: Context) {

  const checkLiked = await checkAlreadyLiked(ctx);
  const likes = checkLiked.likes;
  const alreadyLiked = checkLiked.alreadyLiked;

  return {likes, alreadyLiked};
}


export async function updateLikes(ctx: Context) {

  const checkLiked = await checkAlreadyLiked(ctx);
  let likes = checkLiked.likes;

  if(checkLiked.alreadyLiked===true){
    console.log("Oh, you are un-liking :(");
    likes = likes-1;
    kv.set(["likes"], {"likes": likes });
    kv.set([checkLiked.uniqueness], {device: "unvoted" });
  }else{
    likes = likes+1;
    kv.set(["likes"], {"likes": likes });
    kv.set([checkLiked.uniqueness], {device: "voted" });
  }

  return likes
}




