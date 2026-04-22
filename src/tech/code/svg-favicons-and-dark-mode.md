---
title: "SVG Favicons and Dark Mode"
description: ""
tags: ["HTML", "CSS", "SVG", "Light Dark Mode", "prefers-color-scheme"]
date: "2020-11-19"
oldUrl: "/blog/svg-favicons-and-dark-mode"
---

So I've now started building a new site for a company that I am setting up and I wanted to make sure that the favicon is an SVG.

## What is a favicon

A favicon is a small image that sits in the tab of your browser, usually the company logo.

![Example of favicons in pinned tabs of Firefox](/images/dark-mode-favicons/example-of-favicons.jpg) <figcaption> Example of favicons, this shows [BBC](https://www.bbc.co.uk "BBC Home"), [gmail](https://www.gmail.com "Google Mail"), [Github](https://www.github.com "Github") & [Dave Quits](https://quit.letorey.co.uk/ "My Quits Smoking tracker")</figcaption>

## What is an SVG

An SVG is a Scalable Vector Graphic, and more importantly is a text file that uses circles, rectangles, paths, text, etc. This means that the file can be:

- much smaller that a bitmap type image
- Scalable, you can enlarge it without losing definition
- Crisp at any size
- Text inside can be read by screen readers and is selectable

This is great for logos and simple images, although complex images can also be created with SVGs.

## What is Dark Mode

Dark mode is a system setting that allows a user to choose whether to have dark text on light background (Light Mode) or light text on dark background (Dark Mode). This setting can be set at multiple levels:

- Operating System
  - MacOS
  - Windows
  - Android
  - iOS
- Application
  - Twitter
  - Instagram
- Website
  - [Stuff & Nonsense](https://stuffandnonsense.co.uk/blog/redesigning-your-product-and-website-for-dark-mode "Andy Clarke's post on designing for Dark Mode")
  - [Chris Burnell](https://chrisburnell.com/article/the-flip-flop-technique/ "Chris Burnell's post on creating Dark Mode for a site")

### Enabling Dark Mode

<div>
  This is different for each Operating System:
</div>

- [Windows 10+](https://blogs.windows.com/windowsexperience/2016/08/08/windows-10-tip-personalize-your-pc-by-enabling-the-dark-theme/ "Enable Dark Mode Windows 10")
- [Android 11+](https://support.google.com/accessibility/android/answer/6151800?hl=en-GB "Enable Dark Mode Android 11 and above")
- [iOS 11+](https://support.apple.com/en-gb/HT210332 "Enable Dark Mode iOS 11 and above")
- [MacOS Mojave (10.14)](https://support.apple.com/en-gb/HT208976 "Enable Dark Mode MacOS 10.14 and above")

![Light/Dark Mode setting MacOS](/images/dark-mode-favicons/dark-mode-enabling-macos.jpg)
<figcaption> Light/Dark mode switcher MacOS System Preferences > General </figcaption>

### Using Dark Mode on a website

CSS has a media query that checks what color scheme a user prefers  `@media (prefers-color-scheme: dark)` . This allows you to check what the users preference is and load different styles for light or dark.

```css
body {
&nbsp; background-color: white;
  color: black; 
} 
@media (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white;
  }
}
```

This says make the background white and text color black, but if the user prefers a dark color scheme make the background black and the text color white.

This media query has [good support on all modern browsers](https://caniuse.com/mdn-css_at-rules_media_prefers-color-scheme "Can I Use support for @media prefers-color-scheme") and for those that do not support it it will just use the default white background with black text.

## Using SVG as a favicon

At the time of writing [not all browsers support SVG favicons](https://caniuse.com/link-icon-svg "Can I Use support info for SVG favicons"), although this is still not a reason for not doing it. Again browsers are awesome with HTML and CSS, if it doesn't recognise it, it just moves on so we can add a fallback.

```html
<link rel="icon" type="image/svg+xml" href="./images/favicon.svg">
<link rel="<strong>alternate</strong> icon" href="./images/favicon.ico">
<link rel="mask-icon" href="./images/favicon.svg">
```

The first line sets the icon to an SVG.

The second line sets an alternate icon as a ICO for browsers that do not recognise SVGs for favicons.

The third line is for Safari on desktop and iOS as the support SVG favicons is limited to pinned tabs only.

> Safari 9+ has support for "[pinned tab](https://developer.apple.com/library/prerelease/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_9_0.html#//apple_ref/doc/uid/TP40014305-CH9-SW20
)" SVG icons, but this requires an unofficial `rel="mask-icon"` to be set and only works for all-black icons on Pinned Tabs. - [https://caniuse.com/link-icon-svg](https://caniuse.com/link-icon-svg).

## Dark Mode in SVGs

Since we can embed CSS inside `<style></style>` inside an SVG we can also check inside the SVG if the user  `prefers-color-scheme: dark;` .

### Normal SVG

Here we have a normal SVG with the fill set inline:

```html
<svg width="866px" height="866px">
  <title>Company Logo</title>
  <desc>Red Circle with forward slash surrounded by pointy brackets</desc>
  <circle fill="#D0021B" cx="433" cy="433" r="433"></circle>
  <text font-family="Courier New" font-size="200" font-weight="bold" letter-spacing="13.3333333" fill="#FAF9F9">
    </>
  </text>
</svg>
```

In here we are declaring the color of the circle and text inline with fill.

### SVG with a style tag

Here we have an SVG with `<style></style>` tags to declare the fill color:

```html
<svg width="866px" height="866px">
  <style>
    circle {fill: #D0021B;}
    text {fill: #FAF9F9} 
  </style>
  <title>Company Logo</title>
  <desc>Red Circle with forward slash surrounded by pointy brackets</desc>
  <circle cx="433" cy="433" r="433"></circle>
  <text font-family="Courier New" font-size="200" font-weight="bold" letter-spacing="13.3333333">
    </>
  </text>
</svg>
```

In here we are declaring the color of the circle and text in the `<style></style>` tags.

### SVG with a style tag and prefer-color-scheme media query

Here we have a media query within the `<style></style>` tags of the&nbsp;SVG&nbsp;&nbsp;to declare the fill color for users who prefer dark color scheme:

```html
<svg width="866px" height="866px">
  <style>
    circle {fill: #D0021B;}
    text {fill: #FAF9F9} 
    @media (prefers-color-scheme: dark) {
      circle {fill: #FAF9F9;}
      text {fill: #D0021B;} 
    }
  </style>
  <title>Company Logo</title>
  <desc>Red Circle with forward slash surrounded by pointy brackets</desc>
  <circle cx="433" cy="433" r="433"></circle>
  <text font-family="Courier New" font-size="200" font-weight="bold" letter-spacing="13.3333333">
    </>
  </text>
</svg>
```

In here we are declaring the color for  `prefers-color-scheme: dark` of the circle and text in the media query.

### Examples of SVG Favicons in Light and Dark mode

#### Light Mode

![Letorey.co.uk Light Mode favicon in tab](/images/dark-mode-favicons/light-mode-letorey.jpg)
<figcaption> Light mode favicon for letorey.co.uk in a Chrome tab </figcaption>

![Code-Red.uk Light Mode favicon in tab](/images/dark-mode-favicons/light-mode-code-red.jpg)
<figcaption> Light mode favicon for code-red.uk in a Chrome tab </figcaption>

#### Dark Mode

![Letorey.co.uk Dark Mode favicon in tab](/images/dark-mode-favicons/dark-mode-letorey.jpg)
<figcaption> Dark mode favicon for letorey.co.uk in a Chrome tab </figcaption>

![Code-Red.uk Dark Mode favicon in tab](/images/dark-mode-favicons/dark-mode-code-red.jpg)
<figcaption> Dark mode favicon for code-red.uk in a Chrome tab</figcaption>

 [15]: ./?a=2399:images/Dark-mode-favicons/Light-mode-letorey.jpg
 [16]: ./?a=2399:images/Dark-mode-favicons/Light-mode-code-red.jpg
 [17]: ./?a=2399:images/Dark-mode-favicons/Dark-mode-letorey.jpg
 [18]: ./?a=2399:images/Dark-mode-favicons/Dark-mode-code-red.jpg