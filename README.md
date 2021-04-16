## Setup

There are two ways to open up the sketches on your computer. The best way is to verify that you have npm installed by running `npm -v` in your terminal of choice. If npm is installed, simply run `npm install`, followed by `npm start`. Your browser should now pop up on http://localhost:3000/, and the sketch will automatically refresh when you change the code!

If you don't have npm installed you may simply open index.html in your browser, but the sketch will not automatically refresh whenever you change the code.

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

If you want more sketches to play around with, you could go to my [main repository](https://github.com/plusk/generative-processing), but keep in mind that not all the sketches therein are completed, documented, or even functional.
