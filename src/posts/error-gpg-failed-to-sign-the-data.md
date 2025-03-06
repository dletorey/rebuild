---
title: "error: gpg failed to sign the data"
description: "So every year around this time I get an error when trying to commit some changes in git."
tags: ["GPG", "Code", "Git", "Commit"]
date: 2025-03-06
---
## The Problem

So every year around this time I get an error when trying to commit some changes in git. and I then start wondering what I have done wrong. Today I went to another repository to check that it wasn't just in one repo. There it was again, so this must be something else. Then I remembered _this has happened before_. The problem is I have no idea how to fix it, it is just one of those things I do once a year and then search for a solution.

### What happens

So this occurs when I try and commit something to a [git repo](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository) a place where I store the code I write.

```sh
git commit -m "my commit message aka what I have just done"
```

Each year I get the following error message:

```sh
error: gpg failed to sign the data
fatal: failed to write commit object
```
My first thoughts are always:

> Oh shit what have I done now?

Yet today, I was kinda thinking "I think I've seen this before". But I still don't know what to do.

## The solution

So now that I have worked out the it is my **GPG Key** that has expired I need to 