var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing foods', function() {
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

  test.it('requires a name for adding a food', function(){
    driver.get('http://localhost:8080/foods.html');

    var calories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'add-food'});
    var nameWarning = driver.findElement({id: 'food-warning'});

    calories.sendKeys('100');
    submitButton.click();

    nameWarning.getText().then(function(value) {
      assert.equal(value, 'Please enter a food name.');
    });
  });

  test.it('requires calories for adding a food', function(){
    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'food-name'});
    var submitButton = driver.findElement({id: 'add-food'});
    var caloriesWarning = driver.findElement({id: 'calories-warning'});

    name.sendKeys('apple');
    submitButton.click();

    caloriesWarning.getText().then(function(value) {
      assert.equal(value, 'Please enter a calorie amount.');
    });
  });


  test.it('should allow me to add a name and a calories', function() {

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    name.sendKeys('apple');

    name.getAttribute('value').then(function(value) {
      assert.equal(value, 'apple');
    });

    calories.sendKeys('100');

    calories.getAttribute('value').then(function(value) {
      assert.equal(value, '100');
    });
  });

  test.it('should allow me to create a food', function() {

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'add-food'});

    name.sendKeys('apple');
    calories.sendKeys('100');
    submitButton.click();

    driver.sleep(1000);

    driver.findElement({css: '#food-table tbody tr td:nth-of-type(1)'})
    .getText().then(function(textValue) {
      assert.equal(textValue, "apple");
    });

    driver.findElement({css: '#food-table tbody tr td:nth-of-type(2)'})
    .getText().then(function(textValue) {
      assert.equal(textValue, "100");
    });
  });

  test.it('foods should persist upon browser refresh', function(){
    driver.get('http://localhost:8080/foods.html');

    var calArray = JSON.stringify([{name: 'apple', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('food-calories', '" + calArray + "');");

    driver.get("http://localhost:8080/foods.html");
    driver.executeScript("return window.localStorage.getItem('food-calories');")
    .then(function(foodsCalories){
      assert.equal(foodsCalories, calArray);
    });
  });

  test.it('clears fields and warnings after a food successfully saves', function(){
    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'add-food'});
    var caloriesWarning = driver.findElement({id: 'calories-warning'});

    name.sendKeys('apple');
    submitButton.click();

    caloriesWarning.getText().then(function(value) {
      assert.equal(value, 'Please enter a calorie amount.');
    });

    calories.sendKeys('100');
    submitButton.click();

    name.getText().then(function(value){
      assert.equal(value, '');
    });

    calories.getText().then(function(value){
      assert.equal(value, '');
    });

    caloriesWarning.getText().then(function(value) {
      assert.equal(value, '');
    });
  });

  test.it('should allow me to delete a food', function() {

    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'add-food'});

    name.sendKeys('apple');
    calories.sendKeys('100');
    submitButton.click();

    driver.sleep(1000);

    driver.findElement({css: '#food-table tbody tr td:nth-of-type(3)'})
    .click();

    driver.findElements({css: '#food-table tbody tr td'})
    .then(function(event){
      assert.equal(0, event);
    });
  });

  test.it('allows me to edit a food', function(){
    driver.get('http://localhost:8080/foods.html');

    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'add-food'});

    name.sendKeys('apple');
    calories.sendKeys('100');
    submitButton.click();

    driver.sleep(1000);

    var newName = driver.findElement({css: '#food-table tbody tr td:nth-of-type(1)'});
    newName.click();
    newName.clear();
    newName.sendKeys('orange');
    newName.sendKeys(webdriver.Key.ENTER);

    driver.findElement({css: '#food-table tbody tr td:nth-of-type(1)'})
    .getText().then(function(event){
      assert.equal(event, 'orange')
    });
  });

});
