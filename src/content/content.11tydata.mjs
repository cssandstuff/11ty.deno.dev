const multiTemplates = () => {
  if ( Deno.env.get("LAYOUT") === "slim"){
    return { 
      layout: "nolayout.vto",
      permalink: "/{{ title | slugify }}/slim.html"
    }
  }
  else {
    return { 
      layout: "layout.vto",
      permalink: "/{{ title | slugify }}/"
    }
  }
};

export default multiTemplates