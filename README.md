# iTowns - Elevation data

This application aims at providing examples that use [iTowns][itowns], [geotiff.js][geotiff.js] and
[3DTilesRendererJS][3DTilesRendererJS] to display elevation data in different formats.

> [!CAUTION]
> This project is an experimentation and is not intended to receive contributions, nor to be
> depended on as is.


## How to use the examples

You can find some examples published on the web. Each examples - published or not - can be used by
following these steps:

1. Cloning this repository,
2. Running from the cloned folder in a terminal :

```bash
npm install
npm start
```

3. Heading to `http://localhost:{{ port }}/html/{ the name of the example }.html` in a web browser.
   The port defaults to `8080` but it can vary if other processes run on this port of your computer.
   The full url of the application should be outputed in your terminal.

All the javascript/typescript code for each examples can be found in [`src/entries`][entries]
directory. The rest of the [`src`][src] directory contains code that could be added within
[iTowns][itowns].


## Simple 3D Tiles viewer

You can find the example published [here][example-3DTiles] or you can follow the [local use
instructions][local-use-instructions] and head to `3d-tiles.html` file in a web browser.

To use this example, you will need to serve the 3D Tiles data you wish to visualise via `http`. You
can use any web server you are used to, or follow the following instructions :

1. Open a terminal and `cd` into the directory containing the your tileset.
2. Type the following command :

```bash
npx http-server
```

Your data should now be published and you can display it by entering the full URL of your tileset
file in the example input menu.


## What's next

A fair bit of work is still needed to add more examples. Some of which are being worked on and
should be merged soon if not already :

- [ ] An example to visualise geotiff elevation data as a color texture ;
- [ ] An example to visualise ortho-images and geotiff elevation data as a terrain deformation ;
- [ ] An example to process and visualise COG data.

This list should be enriched as new examples start being worked on.



[itowns]: https://github.com/iTowns/itowns
[geotiff.js]: https://github.com/geotiffjs/geotiff.js
[3DTilesRendererJS]: https://github.com/NASA-AMMOS/3DTilesRendererJS
[entries]: src/entries/
[src]: src/
[example-3DTiles]: https://mgermerie.github.io/itowns-geotiff/public/html/3d-tiles.html
[local-use-instructions]: #how-to-use-the-examples 

