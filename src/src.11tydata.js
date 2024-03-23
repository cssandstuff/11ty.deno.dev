const environmentVars = () => {
  if ( Deno.env.get("LAYOUT") === "slim"){
    return { 
      layout: "nolayout.njk",
      permalink: "/slim.html"
    }
  }
  else {
    return { 
      layout: "layout.njk",
      permalink: "/"
    }
  }
};

export default environmentVars