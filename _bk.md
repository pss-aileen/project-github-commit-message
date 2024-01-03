    "test": "echo \"Error: no test specified\" && exit 1",
    "build:css": "postcss src/css/style.css -o dist/css/styls.css",
    "build:html": "cp src/index.html dist/index.html",
    "build:js": "mkdir dist/js && cp src/js/main.js dist/js/main.js",
    "build": "npm run build:css && npm run build:html && npm run build:js",
    "start": "live-server dist"