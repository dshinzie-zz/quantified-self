# Quantified Self Webpack

## General Info

### Introduction

Access this application at [dshinzie.github.io/quantified-self](dshinzie.github.io/quantified-self)

Quantified Self is a application that tracks exercise and meal calories for each day to help users achieve a healthier life.

Users can add new exercises and meals as well as add either to their daily log.

### Technical Specifications

Quantified-Self is written in JavaScript, HTML, and CSS.
Libraries used include JQuery and Lodash.
All daily information is stored through the browser's local storage.

The diary is located at `/index.html`, exercise management is located at `/exercises.html`, and food management is located at `/foods.html`.

The application is run on NodeJS and is using Webpack to bundle files.

## Getting Started

### Initial Setup


1. Clone this repository

  ```shell
  git clone git@github.com:dshinzie/quantified-self.git
  ```

2. Install the dependencies of the starter kit

  ```shell
  npm install
  ```

3. Build the application
  ```shell
  npm run build
  ```

4. To see your code in action, you need to fire up a development server. Use the command:
```shell
npm start
```


## Testing

The test suite is written using Mocha, Chai and Selenium.

To run all of your tests:

```js
npm test
```
