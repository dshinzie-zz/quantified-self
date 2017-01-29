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

  test.it('shows a table of created foods', function(){
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

  test.it('shows a table of with name, calories and checkbox', function(){
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

  test.it('allows me to filter a food', function(){
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

  function createFood(driver, nameKeys, calorieKeys){
    var name = driver.findElement({id: 'food-name'});
    var calories = driver.findElement({id: 'food-calories'});
    var submitButton = driver.findElement({id: 'add-food'});

    name.sendKeys(nameKeys);
    calories.sendKeys(calorieKeys);
    submitButton.click();
  }

});
