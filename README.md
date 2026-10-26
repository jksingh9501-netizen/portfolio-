# Manpreet: The Pixel Girl

A responsive portfolio website built with **plain HTML, CSS and JavaScript**. There is no framework or build step, so it's a good project to learn from and customise.

## Open it
1. Download or clone this repository.
2. Open the folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code extension **Live Server** and click **Go Live**.

## Files
- `index.html` - page content and section structure
- `style.css` - colours, layout, responsive styling, project cards and visual effects
- `script.js` - scroll reveals, mouse movement, navigation and project filters
- `assets/` - your images and character renders

## Add the character and photos
Read [assets/README.md](assets/README.md) for the exact filenames. Start with `manpreet-hero.png`, a transparent full-body render of the character, and `hero-skyline.jpg`, the wide hero background.

## What already works
- Home, About, Work, Skills and Contact sections
- Responsive navigation with a mobile menu
- Mouse-driven parallax on devices with a mouse/trackpad
- Scroll-based depth movement
- Scroll-triggered reveal animations
- Work filters for Websites and Graphics
- Reduced-motion preference support
- Semantic HTML, alt text and keyboard-friendly buttons

## Customise the work cards
In `index.html`, find the `project-card` blocks inside `project-grid`. Change each project's title and category. Set `data-category="web"` for websites or `data-category="graphic"` for graphics. Then replace the matching image file in `assets/`.

The current project artwork is a visual placeholder until you add your actual work. Update the sample email and social links in the Contact section before publishing.

## A note about the parallax
The motion is intentionally gentle. The hero title, character, frames and atmospheric layers have different `data-depth` values in `index.html`. In `script.js`, those values control how much each layer moves. Lower values move less; higher values move more.

The stylesheet uses background images with CSS gradient fallbacks, so the layout still displays while you're preparing the final assets.
