System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "systemjs": "node_modules/systemjs/dist/system.js",
    "traceur": "node_modules/traceur/dist/commonjs/traceur.min.js",
    "github:*": "github/github/*"
  },

  map: {
    "traceur": "github:jmcriffey/bower-traceur@0.0.93",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.93"
  }
});
