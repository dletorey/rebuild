---
title: Performance Now 2026
description: The quotes and links I collected from the talks at this years Performance now conference in Amsterdam.
date: '2026-11-20'
album: https://flickr.com/photos/dletorey/albums/72177720336993178
tags: ["PerfNow", "Oosterkerk", "Amsterdam", "Netherlands"]
---

**{{ description }}**

## Day One

### Tammy Everts

#### Performance is a Journey

- [The soft navigations report](https://treo.sh/softnavs)
- [New research: The Core Web Vitals thresholds you trust might be wrong for your site](https://embrace.io/blog/research-core-web-vitals/)

### Scott Jehl

#### Standards from the field

- [How Keith Got Super Into Browsers](https://lolaslab.co/what-the-spec/s01/ep01/)
- Prioritize compatibility when changing or removing features.
- [HTML Video Sources Should Be Responsive](https://www.filamentgroup.com/lab/video-with-sizes/)
- [We're Bringing Responsive Video Back!](https://scottjehl.com/posts/responsive-video/)
- [Video and Audio Element loading=lazy attribute support](https://github.com/whatwg/html/issues/10376)
- [The performance effects of too much lazy loading](https://web.dev/articles/lcp-lazy-loading)

### Martin Michálek

#### Selling Web Performance

- [You will find that the site has slowed down. Before the customers.](https://pagespeed.one/)
- Monitoring is where performance culture starts
- [The Inconvenient Truth: How Web Performance Case Studies Undermine Our Relationship with Business](https://calendar.perfplanet.com/2025/the-inconvenient-truth-how-web-performance-case-studies-undermine-our-relationship-with-business/)
- [Case Study: deNatura.cz & Shoptet - Green Core Web Vitals and a 17% increase in Google traffic](https://pagespeed.one/en/denatura)
- First webperf project is just a trial to test company's performance culture.

### Risko Ruus

#### Performance regression testing

- Sometimes computers just behave like this
- Check what is loaded before you trust the score
- [Software Testing Conferences](https://testingconferences.org/)
- [Risko's Performance now Slides](https://nullp2ike.github.io/perf-now-slides/2)

### Pat Meenan

#### Latest on Web Compression

- This URL is also a dictionary for anything else that has a URL that looks like my URL.
- Do you inline everything and just put it in a dictionary and compress it out? It still needs to be parsed, but it's cached. Fun times, anyway?
- [dictionary-worker](https://github.com/pmeenan/dictionary-worker)
- [Compression Dictionary Transport](https://use-as-dictionary.com/)

### Tim Vereecke

#### Beyond the P75

- [Scalemates](https://www.scalemates.com/)
- Include: `html {overflow-y: scroll; scrollbar-gutter: stable}` to make sure the scroll bar does sneak in and create layout shift
- So, I don't really care about the size of the layout shift. I often care just about was there a layout shift?
- I never optimized, it's just fast by default.
- RUM providers now have official permission to add a Tim mode toggle to the products that will help you get these kinds of amazing results.

### Harry Roberts

#### Well, that’s weird…

- Web performance happens somewhere between you and your visitors.
- A change in audience might explain a change in numbers
- A CDF allows you to view every percentile at once, benchmarking the 75th or the 100th, and you can see all of them.
- [The mean means nothing](https://fzakaria.com/2026/07/27/the-mean-means-nothing)
- Something has to have changed.
- sometimes you're just testing the test itself
- By default, PerformanceEvent Timing entries are exposed when their duration is 104ms or greater
- Sometimes you just can’t trust your data
- So, I guess the takeaway here is don't believe everything you read, especially on [CSSWizardry.com](https://csswizardry.com/)
- Far more than site speed alone is responsible for conversions.

## Day Two

### Annie Sullivan

#### Does AI build fast websites

- [Annie's Performance Now Slides](https://docs.google.com/presentation/d/1lU6jNl1M4rO2ZK-jSH0Obt7knzNvoZQTKqUNWJ66D-k/edit?usp=drivesdk)
- 89% of vibe-coded sites fit static or multi-page HTML (aka a website)
- [Modern Web Guidance](https://developer.chrome.com/docs/modern-web-guidance)

### Aleth Gueguen

#### Go fast go web native

- [AlethGueguen.com](https://alethgueguen.com)
- You can’t beat HTML when you want to put pixels on the screen
- And if you navigate from page-to-page, you will start from the clean state. So, you don't have all the problem of memory leaks, etcetera.
- No spinning up a reader, building, blah, blah, blah. URL data. URL object, blah, blah, blah, blah. No, very simple.
- I really need simple and real take because I want to sleep at night.
- [Workbox](https://developer.chrome.com/docs/workbox/)
- I don't do anything very fancy. Because I don't see the point.

### Max Inden

#### Save a round trip: optimising for IETFS and Happy Eyeballs v3

- [Happy Eyeballs v3 in Firefox](https://datatracker.ietf.org/meeting/127/materials/slides-127-happy-firefox-partial-rollout-report-01)
- [Max's Performance Now Slides](https://mxinden-bot.github.io/slides/15-perfnow/)
- Optimizing for latency makes eyeballs happy and that's why the name, Happy Eyeballs.
- [Save a round trip with HTTP/3](https://savearoundtrip.com/)
- [max-inden.de](https://max-inden.de/)

### Alex Russell

#### Performance war stories

- PLATFORMS ARE COMPETITIONS ...and I want the web to win
- What computers should do at the leading edge. That's not where we play. We play at the trailing edge.
- If you think I'm full of it now, you will think that at the end and I will not dissuade you of that. Okay. We're on the same page.
- Typing on the devil's keyboard through molasses to try to get to a URL, right?
- No one on the executive team was living like their customer. No one understood what it meant to be in the shoes of their users.
- They couldn't tell the team that the new architecture was losing them more money than any of us would ever make in our entire lives. Every month.
- And if the JavaScript didn't save us, and if not yet, we have to JavaScript harder.
- Those of us who worked on browsers told them, and it was nonsense and it was bullshit, and they kept going anyway. You don't have to pay attention to them, you don't have to take them seriously.
- [John Rawls, the veil of ignorance](https://en.wikipedia.org/wiki/Original_position)

### Cliff Crocker

#### Core Mobile Vitals: Building the Missing Standard for Apps

- They've come here because they really do care about users. Whether it's improving standards, accessibility, culture, or just making things faster for users.
- [Performance for Everyone](https://medium.com/pinterest-engineering/performance-for-everyone-21a560260d08)
- [Galaxy Tab A7 (10.4", Wi-Fi)](https://www.samsung.com/uk/business/tablets/galaxy-tab-a/galaxy-tab-a7-t500-sm-t500nzdaeua/)

### Stéphanie Walter

#### Performance as a Design Opportunity

- Content priority comes from understanding your users
- Decide what users see, and when.
- Plan for what goes wrong
- So if you cannot predict it, be on the safe side. Hide the stuff while it refreshes. And then ta-da! We have the data.
- Opportunities in this in betweens. It's an every one of those little in between moments that happens. It's something we need to design.
- [Tools to Design Performance](https://shop.stephaniewalter.design/b/tools-to-design-performance?gi=d3fcfc542b35ffd75996e173d60583cee4e0aee2)
- [Gestalt psychology](https://en.wikipedia.org/wiki/Gestalt_psychology)

### Jeremy Keith

#### Long-term Performance

- There’s absolutely nothing new to learn in this talk. Because anything of value that is in this talk is merely repeating what other speakers have already said.
- [https://goingoffline.adactio.com/](https://goingoffline.adactio.com/)
- It's almost as if your justification for building that single-page app using a rather bloated JavaScript library is retroactive and not really user-centered at all, but more around what you want to develop with.
- That was a great feeling to rip out code and say, hey, browser, you take care of it.
- [Resilient web design](https://resilientwebdesign.com/)
- The eagles among you says smells like progressive enhancement to me. That's what I'm talking about here, it is progress enhancement. And I am just repeating what others have said.
