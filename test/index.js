// var assert    = require('chai').assert;
// var webdriver = require('selenium-webdriver');
// var test      = require('selenium-webdriver/testing');
// var expect = require('chai').expect;
//
// test.describe('testing diary', function() {
//   var driver;
//   this.timeout(10000);
//
//   test.beforeEach(function() {
//     driver = new webdriver.Builder()
//       .forBrowser('chrome')
//       .build();
//   })
//
//   test.afterEach(function() {
//     driver.quit();
//   })
//
//   test.xit('shows a table of all exercises', function(){
//     driver.get('http://localhost:8080/exercises.html');
//
//     createExercise(driver, 'jumping', '100');
//
//     driver.get("http://localhost:8080/index.html");
//     driver.executeScript("return window.localStorage.getItem('exercise-calories');")
//     .then(function(exercisesCalories){
//       assert.equal(exercisesCalories, JSON.stringify([{name: 'jumping', calories: '100'}]));
//       driver.sleep(3000);
//     });
//   })
//
//   test.xit('adds a selected exercise to table', function(){
//
//     driver.get('http://localhost:8080/index.html');
//     var calArray = JSON.stringify([{name: 'running', calories: '100'}]);
//     driver.executeScript("window.localStorage.setItem('exercise-calories', '" + calArray + "');");
//
//     driver.sleep(3000);
//
//     var exerciseCheckbox = driver.findElement({css: 'diary-exercise-table tbody tr td:nth-of-type(3)'}).click();
//     var addSelectedButton = driver.findElement({id: 'add-selected-exercise'});
//
//     addSelectedButton.click();
//     driver.findElement({css: 'daily-exercise-table tbody tr td:nth-of-type(1)'})
//     .getText()
//     .then(function(textValue){
//       assert.equal(textValue, 'running')
//     });
//
//
//   });
//
//   function createExercise(driver, nameKeys, calorieKeys){
//     var name = driver.findElement({id: 'exercise-name'});
//     var calories = driver.findElement({id: 'exercise-calories'});
//     var submitButton = driver.findElement({id: 'add-exercise'});
//
//     name.sendKeys(nameKeys);
//     calories.sendKeys(calorieKeys);
//     submitButton.click();
//   }
//
// });
