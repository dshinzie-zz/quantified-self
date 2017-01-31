var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
var expect = require('chai').expect;

test.describe('testing diary foods', function() {
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

  test.xit('shows a table of created foods', function(){
    driver.get('http://localhost:8080/foods.html');
    createFood(driver, 'sandwich', '200');
    createFood(driver, 'burger', '400');

    driver.get("http://localhost:8080/index.html");

    driver.findElement({css: "#diary-food-table"})
    .getTagName()
    .then(function(tagName){
      assert.equal(tagName, 'table');
    });
  });

  test.xit('shows a table of with name, calories and checkbox', function(){
    driver.get('http://localhost:8080/foods.html');
    createFood(driver, 'sandwich', '200');
    createFood(driver, 'burger', '400');

    driver.get("http://localhost:8080/index.html");

    driver.findElement({css: '#diary-food-table > tbody > tr:nth-child(1) > td:nth-child(1)'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, 'burger');
    });

    driver.findElement({css: '#diary-food-table > tbody > tr:nth-child(1) > td:nth-child(2)'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, '400');
    });

    driver.findElement({css: "#diary-food-table > tbody > tr:nth-child(1) > td:nth-child(3) > input[type='checkbox']"})
    .getTagName()
    .then(function(tagName){
      assert.equal(tagName, 'input');
    });
  });

  test.xit('allows me to filter a food', function(){
    driver.get('http://localhost:8080/foods.html');
    createFood(driver, 'sandwich', '200');
    createFood(driver, 'burger', '400');

    driver.get("http://localhost:8080/index.html");

    var filterBox = driver.findElement({css: '#diary-food-filter'});

    filterBox.sendKeys("bu");

    driver.findElement({css: '#diary-food-table tbody tr td:nth-of-type(1)'})
    .getText().then(function(event){
      assert.equal(event, 'burger');
    });
  });

  test.xit('adds a selected food to breakfast', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'sandwich', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('food-calories', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    var foodCheckbox = driver.findElement({css: '#diary-food-body > tr > td:nth-child(3) > label'}).click();
    var addSelectedButton = driver.findElement({id: 'add-breakfast'});

    addSelectedButton.click();
    driver.findElement({css: '#breakfast-body > tr:nth-child(1) > td:nth-child(1)'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, 'sandwich')
    });
  });

  test.xit('adds a selected food to lunch', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'burger', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('food-calories', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    var foodCheckbox = driver.findElement({css: '#diary-food-body > tr > td:nth-child(3) > label'}).click();
    var addSelectedButton = driver.findElement({id: 'add-lunch'});

    addSelectedButton.click();
    driver.findElement({css: '#lunch-body > tr:nth-child(1) > td:nth-child(1)'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, 'burger')
    });
  });

  test.xit('adds a selected food to dinner', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'pasta', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('food-calories', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    var foodCheckbox = driver.findElement({css: '#diary-food-body > tr > td:nth-child(3) > label'}).click();
    var addSelectedButton = driver.findElement({id: 'add-dinner'});

    addSelectedButton.click();
    driver.findElement({css: '#dinner-body > tr:nth-child(1) > td:nth-child(1)'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, 'pasta')
    });
  });

  test.xit('adds a selected food to snack', function(){

    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'candy', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('food-calories', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    var foodCheckbox = driver.findElement({css: '#diary-food-body > tr > td:nth-child(3) > label'}).click();
    var addSelectedButton = driver.findElement({id: 'add-snack'});

    addSelectedButton.click();
    driver.findElement({css: '#snack-body > tr:nth-child(1) > td:nth-child(1)'})
    .getText()
    .then(function(textValue){
      assert.equal(textValue, 'candy')
    });
  });

  test.xit('should allow me to delete an exercise from breakfast', function() {
    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'sandwich', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('food-calories', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    var foodCheckbox = driver.findElement({css: '#diary-food-body > tr > td:nth-child(3) > label'}).click();
    var addSelectedButton = driver.findElement({id: 'add-breakfast'});

    addSelectedButton.click();

    driver.findElement({css: '#breakfast-table tbody tr td:nth-of-type(3)'})
    .click();

    var noFood = driver.findElement({id: "breakfast-body"}).innerHTML;

    expect(noFood).to.be.empty;
  });

  test.xit('should allow me to delete an exercise from lunch', function() {
    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'burger', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('food-calories', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    var foodCheckbox = driver.findElement({css: '#diary-food-body > tr > td:nth-child(3) > label'}).click();
    var addSelectedButton = driver.findElement({id: 'add-lunch'});

    addSelectedButton.click();

    driver.findElement({css: '#lunch-table tbody tr td:nth-of-type(3)'})
    .click();

    var noFood = driver.findElement({id: "lunch-body"}).innerHTML;

    expect(noFood).to.be.empty;
  });

  test.xit('should allow me to delete an exercise from dinner', function() {
    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'pasta', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('food-calories', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    var foodCheckbox = driver.findElement({css: '#diary-food-body > tr > td:nth-child(3) > label'}).click();
    var addSelectedButton = driver.findElement({id: 'add-dinner'});

    addSelectedButton.click();

    driver.findElement({css: '#dinner-table tbody tr td:nth-of-type(3)'})
    .click();

    var noFood = driver.findElement({id: "dinner-body"}).innerHTML;

    expect(noFood).to.be.empty;
  });

  test.xit('should allow me to delete an exercise from snack', function() {
    driver.get('http://localhost:8080/index.html');
    var calArray = JSON.stringify([{name: 'candy', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('food-calories', '" + calArray + "');");

    driver.get('http://localhost:8080/index.html');

    var foodCheckbox = driver.findElement({css: '#diary-food-body > tr > td:nth-child(3) > label'}).click();
    var addSelectedButton = driver.findElement({id: 'add-snack'});

    addSelectedButton.click();

    driver.findElement({css: '#snack-table tbody tr td:nth-of-type(3)'})
    .click();

    var noFood = driver.findElement({id: "snack-body"}).innerHTML;

    expect(noFood).to.be.empty;
  });

  function createFood(driver, nameKeys, calorieKeys){
    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'add-food'});

    name.sendKeys(nameKeys);
    calories.sendKeys(calorieKeys);
    submitButton.click();
  }

});
