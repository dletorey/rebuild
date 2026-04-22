---
title: "Animating a mobile menu"
description: ""
tags: ["HTML", "CSS", "SVG", "JavaScript", "Animation", "Menu", "Navigation", "transitions"]
date: "2020-11-24"
oldUrl: "/blog/animating-a-mobile-menu"
---
While designing my new site, I am first focussing on mobile first strategy, I want to learn and showcase ideas.

So I have decided that I want to animate the menu on mobile to make best use of the screen. Here is a small video of what I'm trying to achieve.

<video controls="" width="722"><source src="/images/animate-menu/mobile-menu-animation.mp4" type="video/mp4"></video>

## Logo starting point

![Logo position when the menu is closed](/images/animate-menu/logo-starting-point.jpg)

### HTML

```html
<header>
  <svg>…</svg>
</header>
```

### CSS

```css
header {
  position: relative;
  top: 0px;
  left 0;
  height: 45px;
  width: 100%;
  background-color: #D0021B;
  padding: 5px;
  margin: 0 0 0 27px;
}
svg {
  position: absolute;
  top: 1px;
  left: -30px;
  z-index: 10;
}
header svg {
  transform: rotate(90deg);
}
```

### Explanation

I want the header to start half way through the circle in the logo hence the margin-left of 27px. As the header has this margin then the svg needs a left position of -30px. I want the Logo to be on top of the header so gave it a z-index of 10. I have also set the svg in the header to rotate 90º clockwise.

## Logo ending point

![Logo position when the menu is open](/images/animate-menu/logo-ending-point.jpg)

### HTML

```html
<header class="open">
  <svg>…</svg>
</header>
```

### CSS

```css
header {
  position: relative;
  top: 0px;
  left 0;
  height: 45px;
  width: 100%;
  background-color: #D0021B;
  padding: 5px;
  margin: 0 0 0 27px;
}
svg {
  position: absolute;
  top: 1px;
  left: -30px;
  z-index: 10;
}
header.open svg {
  transform-origin: 28px 28px;
  transform: rotate(0deg);
}
```

### Explanation

When the menu is open, the header has a `class="open"` and the logo will be in a horizontal position. It needs to rotate 90º anti-clockwise hence `transform: rotate(0deg)` which is going from 90º to 0º. As I want the rotation to happen in the centre of the circle in the logo I need to move the place where it rotates around, aka the origin, `transform-origin: 28px 28px`. With out this the default is to rotate in the centre of the image/svg.

## Menu open state

![Menu in the open state](/images/animate-menu/menu-open.jpg)

### HTML

```html
<header>
  <button class="hidden" name="menu">Menu☰</button>
  <nav id="menu">
    <ul>
      <li>Ethos</li>
      <li>Services</li>
      <li>Work</li>
      <li>Case Studies</li>
      <li>Blog</li>
      <li>Contact</li>
      <li><a href="#">Close X</a></li>
    </ul>
  </nav>
</header>
```

### CSS

```css
button.hidden {
  color: #D0021B;
}
nav {
  margin-top: -40px;
  margin-left: -32px;
}
nav ul {
  background-color: #D0021B;
  color: #FAF9F9;
  font-family: 'Courier New';
  Font-weight: 700;
  font-size: 2em;
  list-style: none;
  margin: 23px 0 0 -27px;
  padding: 35px 10px 10px 33px;
  border-radius: 0 0 23px 0;
}
nav ul a {
  color: #FAF9F9;
}
nav ul a:hover {
  background-color: #FAf9f9;
  color: #D0021B;
} 
```

### Explanation

This is all pretty simple the margin top and left are to position the menu around the header. The button is hidden while the menu is open.

## Menu hidden state

![Menu in the closed state](/images/animate-menu/menu-closed.jpg)

### HTML

```html
<header>
  <button name="menu">Menu☰</button>
  <nav class="hidden" id="menu">
    <ul>
      <li>Ethos</li>
      <li>Services</li>
      <li>Work</li>
      <li>Case Studies</li>
      <li>Blog</li>
      <li>Contact</li>
      <li><a href="#">Close X</a></li>
    </ul>
  </nav>
</header>
```

### CSS

```css
button {
  background-color: #D0021B;
  color: #FAF9F9;
  font-family: 'Courier New';
  font-size: 2em;
  Font-weight: 700;
  text-decoration: underline;
  border: none;
  margin: 5px 0 0 30px;
  cursor: pointer;
}
nav.hidden {
  max-height: 0;
}
```

### Explanation

In this instance the button is displayed and the nav hidden, this is done by setting the `max-height: 0;`. I am displaying the word "Menu" as I don't think that the 3 horizontal lines (☰), aka hamburger menu, is good enough for accessibility purposes.

## Click/touch interaction and recognition

### HTML

```html
<header>
  <button id="menuButton" onclick="menuToggle()" name="menu">Menu☰</button>
  <nav class="hidden" id="menu">
    <ul>
      <li>Ethos</li>
      <li>Services</li>
      <li>Work</li>
      <li>Case Studies</li>
      <li>Blog</li>
      <li>Contact</li>
      <li><a href="#" onclick="menuToggle()">Close X</a></li>
    </ul>
  </nav>
</header>
```

### JavaScript

```js
const menuButton = document.querySelector("#menuButton"); 
const nav = document.querySelector("#menu"); 
const header = document.querySelector("header");
function menuToggle() {
  menuButton.classList.toggle("hidden");
  nav.classList.toggle("hidden");
  header.classList.toggle("open");
}
```

### Explanation

In the HTML I have added an `id="menuButton"` to make it easy to target in case there are other buttons on the page, and an `onclick` event listener to the button and close link.

In the JavaScript I am setting up 3 variables:

- menuButton
- nav
- header

I have then created a function that targets the 3 variables and toggles the classes on or off depending on their current state. For example if there is no `class="hidden"` then it adds it and if the is a `class="hidden"` then it removes it.

## Animate logo

### CSS

```css
header svg {
  transform-origin: 28px 28px;
  transform: rotate(0deg);
  transition: transform 2s ease;
}
```

### Explanation

To the svg style I have added a `transition` property. This tells it that any transform should take `2s` (seconds) and `ease` (start slowly accelerate end slowly).

## Animate menu

### CSS

```css
nav { 
  max-height: 500px;
  transition: max-height 2s ease;
  overflow: hidden;
  margin-top: -40px;
  margin-left: -32px;
}
nav.hidden {
  max-height: 0;
  transition: max-height 2s ease;
}
```

### Explanation

Here I have added a `max-height: 500px;` to the nav this is an arbitrary value that is larger than the menu will be so that the is a value to transition upon. Then I have a `transition: max-height 2s ease;` which performs the transition on the `max-height` property for `2s` (seconds) and `ease`s.

## Add delays

### CSS

```css
header.open svg { 
  transform-origin: 28px 28px;
  transform: rotate(-90deg);
  transition-delay: 0s;
}
header svg { 
  transform-origin: 28px 28px;
  transform: rotate(0deg);
  transition: transform 2s ease;
  transition-delay: 2s;
}
nav { 
  max-height: 500px;
  transition: max-height 2s ease;
  transition-delay: 2s;
  overflow: hidden;
  margin-top: -40px;
  margin-left: -32px;
}
nav.hidden { 
  max-height: 0;
  transition: max-height 2s ease;
  transition-delay: 0s;
}
```

### Explanation

So here I want the following to happen:

- On menu open:
  - Logo folds up
  - Menu opens down
- on menu close:
  - Menu closes up
  - Logo folds down

The logo folding up should happen immediately, so no delay, `transition-delay: 0s;` when that has complete the menu opens down `transition-delay: 2s;` (this is 2 seconds as that is how long the first part takes).

The menu closing up should happen immediately, so no delay, `transition-delay: 0s;` when that has complete the logo folds down `transition-delay: 2s;`.

## Fallback for no JavaScript, `prefers-reduced-motion` or no `transition` support

It is really important to deal with the following situations:

- The user has set `perfers-reduced-motion`, there are a number of reasons this may be enabled, such as:
  - Users may suffer with a condition where too much motion can induce migraines
  - User may have disabled animations due to performance
- The browser they are using may not support animations
- The browser may have JavaScript disabled

In these, and many other, situations we should provide a fallback

### HTML

```html
<html class="no-js">
  <head> …
    <script>
      document.documentElement.classList.remove("no-js");
    </script>
  </head>
  <body>…</body>
</html>
```

### CSS

```css
@media (prefers-reduced-motion) {
  nav.hidden {
    max-height: 500px;
  }
  header svg {
    transform: rotate(-90deg);
  } 
}
@supports not (transition) {
  nav.hidden {
    max-height: 500px;
  }
}
.no-js nav.hidden {
  max-height: 500px;
}
.no-js header svg {
  transform: rotate(-90deg);
}
```

### Explanation

In the HTML there is a `class="no-js"` applied and removed automatically if JavaScript is enabled, if not I can target this class for `.no-js nav.hidden` & `.no-js header svg`.

The media and supports queries can also be used to see if `prefers-reduced-motion` is enabled or is the browser does not support `transition`.

## Full working example

<p class="codepen" data-height="431" data-border-color="#D0021B" data-active-link-color="#FAF9F9" data-active-tab-color="#D0021B" data-tab-link-color="#D0021B" data-theme-id="dark" data-default-tab="html,result" data-user="code-red-uk" data-slug-hash="XWKvpVQ" style="height: 431px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Code Red Logo Rotate with fallback"> <span>See the Pen <a href="https://codepen.io/code-red-uk/pen/XWKvpVQ"> Code Red Logo Rotate with fallback</a> by Dave Letorey ([@code-red-uk](https://codepen.io/code-red-uk)) on [CodePen](https://codepen.io).</span>

 <script async src="https://static.codepen.io/assets/embed/ei.js"></script>