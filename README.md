# \<ozone-video-player\>

Template application to develop polymer-typeScript webComponents

# usage


## Install an configure this module in a JavaScript project

Install form github

bower install  taktik/ozone-video-player --save

Then include the element in your javaScrip

```html
<script type="text/javascript" src="bower_components/ozone-video-player/dist/ozone-video-player.js"></script></body>

<ozone-video-player></ozone-video-player>
```


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
Or watch on change
```
$ npm run watch
```


## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
index.html

## install & configure this module in an other a typeScript project


- step 1: install dependency

> Install you dependency
> bower install --save taktik/ozone-video-player

- step 2: import where you need
```typescript
import 'my-template' // import webComponent
import {MyTemplate} from '../bower_components/ozone-video-player/src/ozone-video-player' // import type
```

