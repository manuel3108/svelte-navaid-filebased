# svelte-navaid-filebased
Is a really basic file-based router. Uses [Navaid](https://github.com/lukeed/navaid) as one of the smallest available routers. Currently only works with pure svelte (no sapper), but should easily be converted to whatever you want.

## Get started
```
npm i svelte-navaid-filebased
```

In your `src/` folder create a folder called routes. This is where this package will start putting the routes together.

Put this in your `package.json`
```
"generate": "svelte-navaid-filebased"
```
and run
```
npm run generate
```

You should see that in the folder you just created (`src/routes`) a new file called `Routes.svelte` will be created.

In your `App.svelte`:
```HTML
<script>
    .... <!-- Other imports -->

    import Routes from './Routes.svelte'
</script>

<!-- Maybe put your navbar here -->

<!-- Create your site layout -->
<main>
	<Routes /> <!-- This is where your different pages will be displayed-->
</main>
```

Thats it! All the configuration we need is done. So lets start creating our first page!

In `src/routes` create a file `index.svelte` and put in some text. Rerun `npm run generate` to update the routes, and start your dev server. You should already see the text you tiped in.

## How it works
All files called `index.svelte` will be mapped to the route `/` of the current directory. So if you have a file `pages/edit/index.svelte` the route for this file will be `pages/edit`

Can I have access to the url params? Sure. Just create a file `pages/edit/[pageid].svelte` (where `[...]` are important). The in your component write
```HTML
<script>
    ..... <!-- Imports -->
    export let params;
    ..... <!-- other code -->
</script>
```
With `params.pageid` you will get access to the urlparam.

## Dev-mode
With the option `-D` the package will start in dev mode. This means, that every time you create / move / remove a file in `src/routes` it will automatically generate the new routes. In most of the cases you do not even need to restart your server.
But i know, you don't like to start your server and this package one after the other. So lets make a few modifications to our `package.json`:
First lets install `npm install npm-run-all`
Now paste this into your `package.json`
```
"dev": "run-p dev:routes dev:svelte",
"dev:svelte": "rollup -c -w",
"dev:routes": "svelte-navaid-filebased -D",
```
and run `npm run dev`.
Done! your Routes will autogenrate when you make changes to your files.


## Options
Here are the few available options:
```
svelte-navaid-filebased -h


  Description
    Generates a Router based on a folder-structure

  Usage
    $ genrate [dir] [options]

  Options
    -d, --dir         the location of the routes directory  (default src/routes/)
    -b, --basepath    the location of the routes directory  (default /)
    -o, --output      the file where the routes should be written to  (default src/Routes.svelte)
    -D, --dev         enable dev mode and watch dir
    -v, --version     Displays current version
    -h, --help        Displays this message
```

## Contributions
Contributions welcome. Just open a Pull-Request or Issue!

## License
MIT