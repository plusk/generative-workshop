## Web version (work in progress)

https://editor.p5js.org/plusk/sketches/fiG373hTv

## Setup

First you need the files for the workshop, which you can get by clicking the greeen "Code" dropdown and selecting "Download ZIP". After the folder is finished downloading, unzip the folder and open a terminal of your choice. Verify that you have npm installed by running `npm -v`. If npm is installed, simply run `npm install`, and when that is finished, run `npm start`. Your browser should now pop up on http://localhost:3000/, and the sketch will automatically refresh when you change the code!

## Tweaking the sketches

You select which sketch you want to play around with by adjusting the `src` attribute of the `<script>` tag on line 23 of `index.html`. All the sketches are located in the `sketches/` folder.

The sketches are listed here in ascending complexity:

- **base.js** is a base template that can be modified to be anything you want
- **bokeh.js** spawns random shapes of random sizes on the canvas
- **recursion.js** uses recursion to place shapes of varying sizes in a grid
- **chords.js** draws a line between two points on a circle, using Perlin noise to move the points around on the circle
- **layers.js** makes a blobby shape with Perlin noise, coloring the layers of the blob with a gradient
- **perlin.js** moves tiny lines over a Perlin noise flow field, adjusting the angle of the movement with the value of the noise

Each sketch has around 10-50 lines of config at the top of the file where parameters can be tweaked to your liking. You don't need to understand the code underneath the config to play around with the sketches, but you're free to explore to your heart's content! Don't be afraid to change the code itself if you want it to behave differently.

## Color palettes

Lines 7 and 8 of every sketch decides which color palette will be used. You can see a list of all the palettes in the file called `palettes.json`. If `RANDOM_PALETTE` is set to `true` then you can see which palette is currently in use by opening the console in [Chrome DevTools](https://developer.chrome.com/docs/devtools/open/) or [Firefox Developer Tools](https://developer.mozilla.org/en-US/docs/Tools), depending on which browser you prefer. This can be useful if you try out random palettes and see one you like, and you want to use that one specifically.

## Bonus

If you want to make sketches of your own, copy `base.js` and start writing your own code! Look to [some examples](https://p5js.org/examples/) and look through the [documentation](https://p5js.org/reference/) when in doubt. However, the most important part of making your own stuff is inspiration! Look at all the cool stuff other people make, then try to make it yourself. Here is some inspiration:

Specific artists:
- [Tyler Hobbs](https://www.instagram.com/tylerxhobbs/)
- [Anders Hoff](https://inconvergent.net/)
- [Matt DesLauriers](https://www.instagram.com/mattdesl_art/)
- [gengeomergence](https://www.instagram.com/gengeomergence/)
- [unordered.list](https://www.instagram.com/unordered.list/)
- [Kenny Vaden](https://www.instagram.com/kenny.vaden/)
- [Kjetil Golid](https://www.instagram.com/kgolid/)
- [Caleb Ogg](https://www.instagram.com/iso.hedron/)
- [shvembldr](https://www.instagram.com/shvembldr/)
- [Yann Le Gall](https://www.instagram.com/ylegall/)
- [geometrieva](https://www.instagram.com/geometrieva.stuff/)

General inspo pages:
- [/r/generative](https://www.reddit.com/r/generative/top/?t=all) on Reddit
- [#generativeart](https://www.instagram.com/explore/tags/generativeart/) on Instagram
- [#creativecoding](https://www.instagram.com/explore/tags/creativecoding/) on Instagram

If you want more sketches to play around with, you could go to my [main repository](https://github.com/plusk/generative-processing), but keep in mind that not all the sketches therein are completed, documented, or even functional.
