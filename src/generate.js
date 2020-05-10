const dirTree = require("directory-tree");
const fs = require('fs');
const capitalize = require('capitalize');
const watch = require('watch');


let imports = [];
let currentDirPath = null;
let options = null;

let components = "";
let contentJS = "";

module.exports = function (dir, opts) {
    options = opts;

    if(options.dev) {
        watch.createMonitor(options.dir, function (monitor) {
            monitor.on("created", function (f, stat) {
                work();
            })
            monitor.on("removed", function (f, stat) {
                work();
            })
        })
        work();
    } else {
        work();
    }
}

function work() {
    imports = [];
    imports.push("\timport Navaid from 'navaid';");
    imports.push("\timport { onDestroy } from 'svelte';");

    contentJS = '\tlet Route;\n\tlet params=undefined\n\tlet uri = location.pathname;\n\n\tfunction track(obj) {\n\t\turi = obj.state || obj.uri || location.pathname;\n\t\tif (window.ga) ga.send(\'pageview\', { dp:uri });\n\t}\n\n\taddEventListener(\'replacestate\', track);\n\taddEventListener(\'pushstate\', track);\n\taddEventListener(\'popstate\', track);';
    contentJS += `\n\n\tconst router = Navaid('${options.basepath}')\n`
    components = "";

    console.log("> generating router for", options.dir)
    
    const tree = dirTree(options.dir, { extensions: /\.svelte/ });

    process(tree)

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
    let paramName = undefined;
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
    
    const fileName = child.name.replace(".svelte", "")
    if(fileName.startsWith("[") && fileName.endsWith("]")) {
        importName = importName.replace("[", '').replace("]", '');
        paramName = fileName.replace("[", '').replace("]", '');

        route = route.replace(fileName, `:${paramName}`)
    }

    importName = capitalize.words(importName).replace(/ /g, '');

    imports.push(`\timport ${importName} from '${importPath}'`);

    if(paramName !== undefined) {
        contentJS += `\t\t.on('${route}', (obj) => {params = obj; Route = ${importName};})\n`
    } else {
        contentJS += `\t\t.on('${route}', () => {params = undefined; Route = ${importName};})\n`
    }

    console.log("found file", child.path)
}

function writeFile() {
    let content = "<script>\n";

    imports.forEach(i => {
        content += i + "\n"
    });

    content += contentJS;
    content += '\t\t.listen();\n\tonDestroy(router.unlisten);\n'
    content += "</script>\n\n"
    content += '{#if params === undefined}\n\t<svelte:component this={Route}/>\n{:else}\n\t<svelte:component this={Route} {params} />\n{/if}'

    fs.writeFile(options.output, content, function (err) {
        if (err) return console.log(err);

        console.log('file content written');
    });
}