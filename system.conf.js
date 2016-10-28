System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "systemjs": "node_modules/systemjs/dist/system.js",
    "traceur": "node_modules/traceur/bin/traceur.js",
    "github:*": "/github/*"
  },

  map: {
    "gtmsportswear/js-local-storage-manager": "github:gtmsportswear/js-local-storage-manager@1.0.2"
  }
});
