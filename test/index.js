var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
var expect = require('chai').expect;

test.describe('testing diary', function() {
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

  test.xit('shows a table of all exercises', function(){
    driver.get('http://localhost:8080/exercises.html');

    createExercise(driver, 'jumping', '100');

    driver.get("http://localhost:8080/index.html");
    driver.executeScript("return window.localStorage.getItem('exercise-calories');")
    .then(function(exercisesCalories){
      assert.equal(exercisesCalories, JSON.stringify([{name: 'jumping', calories: '100'}]));
      driver.sleep(3000);
    });
  })

  test.xit('adds a selected exercise to table', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'running', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('exercise-calories', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    var exerciseCheckbox = driver.findElement({css: '#diary-exercise-body > tr > td:nth-child(3) > label'}).click();
    var addSelectedButton = driver.findElement({id: 'add-selected-exercise'});

    addSelectedButton.click();
    driver.findElement({css: '#daily-exercise-body > tr:nth-child(1) > td:nth-child(1)'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, 'running')
    });
  });

  test.xit('adds the total calories eaten for breakfast', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'apple', calories: '100'}, {name: 'pear', calories: '50'}]);
    driver.executeScript("window.localStorage.setItem('daily-breakfast', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'breakfast-total-calories'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, '150')
    });
  });

  test.xit('calculates the total remaining calories for breakfast', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'apple', calories: '100'}, {name: 'pear', calories: '50'}]);
    driver.executeScript("window.localStorage.setItem('daily-breakfast', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'breakfast-remaining-calories'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, '250')
    });
  });

  test.xit('adds the total calories eaten for lunch', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'sandwhich', calories: '200'}, {name: 'juice', calories: '150'}]);
    driver.executeScript("window.localStorage.setItem('daily-lunch', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'lunch-total-calories'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, '350')
    });
  });

  test.xit('calculates the total remaining calories for lunch', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'sandwhich', calories: '200'}, {name: 'juice', calories: '150'}]);
    driver.executeScript("window.localStorage.setItem('daily-lunch', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'lunch-remaining-calories'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, '250')
    });
  });

  test.xit('adds the total calories eaten for dinner', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'steak', calories: '600'}, {name: 'peas', calories: '50'}]);
    driver.executeScript("window.localStorage.setItem('daily-dinner', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'dinner-total-calories'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, '650')
    });
  });

  test.xit('calculates the total remaining calories for dinner', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'steak', calories: '600'}, {name: 'peas', calories: '50'}]);
    driver.executeScript("window.localStorage.setItem('daily-dinner', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'dinner-remaining-calories'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, '150')
    });
  });

  test.xit('adds the total calories eaten for snack', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'oreos', calories: '300'}]);
    driver.executeScript("window.localStorage.setItem('daily-snack', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'snack-total-calories'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, '300')
    });
  });

  test.xit('calculates the total remaining calories for snack', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'oreos', calories: '150'}]);
    driver.executeScript("window.localStorage.setItem('daily-snack', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'snack-remaining-calories'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, '50')
    });
  });

  test.xit('adds the total calories burned during exercise', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'running', calories: '100'}, {name: 'walk', calories: '50'}]);
    driver.executeScript("window.localStorage.setItem('daily-exercise', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    driver.findElement({id: 'exercise-total-calories'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, '150')
    });
  });

  test.xit('redirects me to /foods.html when I click on the create new food button', function(){

    driver.get('http://localhost:8080/index.html');

    var newFoodButton = driver.findElement({id: 'create-food'});

    newFoodButton.click().then(function() {
        return driver.getCurrentUrl();
    })
    .then(function(currentUrl) {
        assert.equal(currentUrl, 'http://localhost:8080/foods.html')
    });
  });

  test.xit('redirects me to /exercises.html when I click on the create new food button', function(){

    driver.get('http://localhost:8080/index.html');

    var newFoodButton = driver.findElement({id: 'create-exercise'});

    newFoodButton.click().then(function() {
        return driver.getCurrentUrl();
    })
    .then(function(currentUrl) {
        assert.equal(currentUrl, 'http://localhost:8080/exercises.html')
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
