const dirTree = require("directory-tree");
const fs = require('fs');
const capitalize = require('capitalize')


let imports = [];
imports.push("import Router from 'svelte-navaid/Router.svelte';");
imports.push("import Route from 'svelte-navaid/Route.svelte';");

let currentDirPath = null;
let options = null;

let components = "";

module.exports = function (dir, opts) {
    options = opts;

    console.log("> generating router for", options.dir)

    paths = [];

    const tree = dirTree(options.dir, { extensions: /\.svelte/ });

    components += `<Router>\n`
    process(tree)
    components += "</Router>\n"

    writeFile();
}

function process(child) {
    if(child.type === 'file') {
        processFile(child);
    } else if(child.type === 'directory') {
        console.log("found dir", child.path)
        
        child.children.forEach(child => {
            process(child);
        });
    }
}

function processFile(child) {
    let route = child.path.replace(options.dir, "");
    if(route.endsWith("index.svelte")) {
        route = route.replace("index.svelte", "");
    }
    route = "/" + route;
    route = route.replace(".svelte", "")

    let importPath = child.path.replace("src/", "./");
    let importName = importPath.replace("./routes/", "");
    importName = importName.replace(/\//g, ' ');
    importName = importName.replace('.svelte', '');
    importName = capitalize.words(importName).replace(/ /g, '');

    imports.push(`import ${importName} from '${importPath}'`);
    components += `<Route path="${route}" component={${importName}} />\n`

    console.log("found file", child.path, importName)
}

function writeFile() {
    let content = "<script>\n";

    imports.forEach(i => {
        content += i + "\n"
    });

    content += "</script>\n"
    content += components;

    fs.writeFile(options.output, content, function (err) {
        if (err) return console.log(err);

        console.log('file content written');
    });
}