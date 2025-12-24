const multiTemplates = () => {
  if ( Deno.env.get("LAYOUT") === "slim"){
    return { 
      layout: "nolayout.vto",
      permalink: "/slim.html"
    }
  }
  else {
    return { 
      layout: "layout.vto",
      permalink: "/"
    }
  }
};

export default multiTemplates