[![Build Status](https://travis-ci.org/taktik/ozone-video-player.svg?branch=master)](https://travis-ci.org/taktik/ozone-video-player)

# \<ozone-video-player\>

WebComponent that play video from Ozone.

# usage

## Install

Install form github

npm install  ozone-video-player --save

## use pre bundle version

Then include bundle element in your javaScript

```html
<script type="text/javascript" src="node_modules/ozone-video-player/build/index.js"></script>

<ozone-video-player></ozone-video-player>
```


Add conf.ozone.json at root of your project. You can adapt conf.ozone.json from this repo.


## Build with webpack

See webpack.config.js

## API

### Attribute
Attribute are javaScript properties accessible from the dom.

* hidden

> hidden: Default is false. True when set.
> hide element and pause the player.

* videoUrl

> videoUrl: string
> Url to play a video directly

### Properties

Only accesible for JavaScript

* player

> player: ClapprPlayer
> Interface to Clappr player element


### Methode

* loadOzoneVideo

> loadOzoneVideo(data?: Video): Promise<void>
> Load video from Ozone.
> Parameters is an Ozone Video Object

* loadVideoUrl
> loadVideoUrl(url: string): Promise<void>
> Load a video from an url.


# Contribution guide

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Install Dependency

```
$ npm install
$ bower install
```

## Build your package

```
$ npm run start
```
Or watch demo on change
```
$ npm run demo
```
