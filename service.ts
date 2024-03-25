const kv = await Deno.openKv();
//await kv.delete(["likes", "count"]);

export async function getLikes() {
  // console.log("KV")
  // console.log(await kv.get(["likes", "count"]));
  const currentLikes = await kv.get(["likes", "count"]);
  const likesValue = currentLikes?.value?.likes ?? 0;
  //console.log(likesValue)
  return (likesValue);
}

export async function updateLikes() {
  let likes = await getLikes() as unknown as number ?? 0;
  // console.log("update likes");
  // console.log(likes);
  likes = likes+1;
  //console.log(likes);
  kv.set(["likes","count"], {"likes": likes});
  return likes
}




