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

  test.it('should allow me to delete a food', function() {

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

});
