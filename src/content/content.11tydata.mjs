const environmentVars = () => {
  if ( Deno.env.get("LAYOUT") === "slim"){
    return { 
      layout: "nolayout.njk",
      permalink: "/{{ title | slugify }}/slim.html"
    }
  }
  else {
    return { 
      layout: "layout.njk",
      permalink: "/{{ title | slugify }}/"
    }
  }
};

export default environmentVars