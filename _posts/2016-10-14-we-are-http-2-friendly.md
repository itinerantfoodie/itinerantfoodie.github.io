---
layout: post
title: "We are HTTP/2 friendly!"
categories: announce
tags:
  - news
  - announcement
---

We are now using the [next generation](https://http2.github.io/) of web technology.

## What does it mean for you?

When you load up a post with lots of images, you will see that all the images will load up a lot faster as instead of the old way (HTTP/1.1 which is almost 20 years old by the way).

Therefore we can include more images in posts.

Though any stuff not in archive.itinerantfoodie.com will be faster.

### The nitty gritty technical details

In Tech speak instead of loading up each image and resource with an individual connection, everything is fetched over a single connection. Therefore there is less overhead, as each TCP connection has a bit over overhead.

## Any chance of getting old posts to the newer site?

Eventually I will do that. Right now I'm starting with the Cathay Lounge posts, but including more photos
