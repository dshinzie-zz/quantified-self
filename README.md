# Quantified Self Webpack

## General Info

### Introduction

Access this application at [dshinzie.github.io/quantified-self](https://dshinzie.github.io/quantified-self)


Quantified Self is a application that tracks exercise and meal calories for each day to help users achieve a healthier life.

Users can add new exercises and meals as well as add either to their daily log.

![Diary Header](http://www.awesomescreenshot.com/upload//512645/d288e005-eb3c-4593-5656-079c91a60ac1.png)

### Technical Specifications

Quantified-Self is written in JavaScript, HTML, and CSS.
Libraries used include JQuery and Lodash.
All daily information is stored through the browser's local storage.

The diary is located at `/index.html`, exercise management is located at `/exercises.html`, and food management is located at `/foods.html`.

The application is run on NodeJS and is using Webpack to bundle files.

## Getting Started

### Initial Setup

Before beginning, make sure NodeJS is installed on the machine.

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

### Details

#### Food and Exercise Management
The exercise management is on exercises.html and food management is on foods.html. The user can add foods and exercises with calorie count per item and will see the items displayed in the table on the right after creating each item.

Items can be filtered dynamically by typing in the "Filter by Name" field. Items can be deleted by clicking on the trash can. Items deleted from the table will remain in the diary logs.

Items can also be edited by clicking directly on the food or exercise name text or calorie text. The text will turn into an editable field. Any changes made here in the table will also be reflected in the diary.

![Manage Foods](http://www.awesomescreenshot.com/upload//512645/fc16c3e2-6cc2-4f70-51fc-ce8820f34394.png)

#### The Diary

All the foods and exercises that were created on the management pages will display at the bottom of the diary. To add a food to the daily log, click the checkbox to the right of the item and select which meal to add the food to. To add an exercise, select the checkbox and click add.

The user can filter foods and exercises dynamically using the "Filter by" field above the food and exercise tables.

![Add food and exercise to log](http://www.awesomescreenshot.com/upload//512645/86a0d19a-d0b6-4abc-64bb-173e7ff93ab6.png)

The diary displays a log of all foods eaten and exercises completed for each day. As foods and exercises are added the total calorie and remaining calorie counts will update to show the user how much has been consumed or burned and how many calories are left to eat for the day. 

![Diary Page](http://www.awesomescreenshot.com/upload//512645/a8e509b7-7147-412f-6de4-5728e5bca4e6.png)

## Testing

The test suite is written using Mocha, Chai and Selenium.

To run all of your tests:

```js
npm test
```
