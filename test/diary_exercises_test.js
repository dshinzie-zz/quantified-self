var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
var expect = require('chai').expect;

test.describe('testing diary exercises', function() {
  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  })

  test.afterEach(function() {
    driver.quit();
  })

  test.it('shows a table of created exercises', function(){
    driver.get('http://localhost:8080/exercises.html');
    createExercise(driver, 'running', '200');
    createExercise(driver, 'jogging', '400');

    driver.get("http://localhost:8080/index.html");

    driver.findElement({css: "#diary-exercise-table"})
    .getTagName()
    .then(function(tagName){
      assert.equal(tagName, 'table');
    });
  });

  test.it('shows a table of with name, calories and checkbox', function(){
    driver.get('http://localhost:8080/exercises.html');
    createExercise(driver, 'running', '200');
    createExercise(driver, 'jogging', '400');

    driver.get("http://localhost:8080/index.html");

    driver.findElement({css: '#diary-exercise-table > tbody > tr:nth-child(1) > td:nth-child(1)'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, 'jogging');
    });

    driver.findElement({css: '#diary-exercise-table > tbody > tr:nth-child(1) > td:nth-child(2)'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, '400');
    });

    driver.findElement({css: "#diary-exercise-table > tbody > tr:nth-child(1) > td:nth-child(3) > input[type='checkbox']"})
    .getTagName()
    .then(function(tagName){
      assert.equal(tagName, 'input');
    });
  });

  test.it('allows me to filter a exercise', function(){
    driver.get('http://localhost:8080/exercises.html');
    createExercise(driver, 'running', '200');
    createExercise(driver, 'jogging', '400');

    driver.get("http://localhost:8080/index.html");

    var filterBox = driver.findElement({css: '#diary-exercise-filter'});

    filterBox.sendKeys("jo");

    driver.findElement({css: '#diary-exercise-table tbody tr td:nth-of-type(1)'})
    .getText().then(function(event){
      assert.equal(event, 'jogging');
    });
  });

  function createExercise(driver, nameKeys, calorieKeys){
    var name = driver.findElement({id: 'exercise-name'});
    var calories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'add-exercise'});

    name.sendKeys(nameKeys);
    calories.sendKeys(calorieKeys);
    submitButton.click();
  }

});
