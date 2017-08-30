# \<ozone-edit-video\>

Template application to develop polymer-typeScript webComponents

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
> bower install --save taktik/ozone-edit-video

- step 2: import where you need
```typescript
import 'my-template' // import webComponent
import {MyTemplate} from 'bower_components/ozone-edit-video/dist/src/ozone-edit-video' // import type
```


## Install an configure this module in a JavaScript project

```html
<script type="text/javascript" src="bower_components/ozone-edit-video/dist/ozone-edit-video.js"></script></body>
```
Alternatively, you can use html import
```html
<link rel="import" href="bower_components/ozone-edit-video/dist/index.html">
```