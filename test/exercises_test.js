var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');

test.describe('testing exercises', function() {
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

  test.it('requires a name for adding an exercise', function(){
    driver.get('http://localhost:8080/exercises.html');

    var calories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'add-exercise'});
    var nameWarning = driver.findElement({id: 'exercise-warning'});

    calories.sendKeys('100');
    submitButton.click();

    nameWarning.getText().then(function(value) {
      assert.equal(value, 'Please enter an exercise name.');
    });
  });

  test.it('requires calories for adding an exercise', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'exercise-name'});
    var submitButton = driver.findElement({id: 'add-exercise'});
    var caloriesWarning = driver.findElement({id: 'calories-warning'});

    name.sendKeys('running');
    submitButton.click();

    caloriesWarning.getText().then(function(value) {
      assert.equal(value, 'Please enter a calorie amount.');
    });
  });

  test.it('should allow me to add a name and a calories', function() {

    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'exercise-name'});
    var calories = driver.findElement({id: 'exercise-calories'});
    name.sendKeys('running');

    name.getAttribute('value').then(function(value) {
      assert.equal(value, 'running');
    });

    calories.sendKeys('100');

    calories.getAttribute('value').then(function(value) {
      assert.equal(value, '100');
    });
  });

  test.it('should allow me to create an exercise', function() {

    driver.get('http://localhost:8080/exercises.html');

    createExercise(driver, "running", 100);

    driver.findElement({css: '#exercise-table tbody tr td:nth-of-type(1)'})
    .getText().then(function(textValue) {
      assert.equal(textValue, "running");
    });

    driver.findElement({css: '#exercise-table tbody tr td:nth-of-type(2)'})
    .getText().then(function(textValue) {
      assert.equal(textValue, "100");
    });
  });

  test.it('exercises should persist upon browser refresh', function(){
    driver.get('http://localhost:8080/exercises.html');

    var calArray = JSON.stringify([{name: 'running', calories: '100'}]);
    driver.executeScript("window.localStorage.setItem('exercise-calories', '" + calArray + "');");

    driver.get("http://localhost:8080/exercises.html");
    driver.executeScript("return window.localStorage.getItem('exercise-calories');")
    .then(function(exercisesCalories){
      assert.equal(exercisesCalories, calArray);
    });
  });

  test.it('clears fields and warnings after an exercise successfully saves', function(){
    driver.get('http://localhost:8080/exercises.html');

    var name = driver.findElement({id: 'exercise-name'});
    var calories = driver.findElement({id: 'exercise-calories'});
    var submitButton = driver.findElement({id: 'add-exercise'});
    var caloriesWarning = driver.findElement({id: 'calories-warning'});

    name.sendKeys('running');
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

  test.it('should allow me to delete an exercise', function() {
    driver.get('http://localhost:8080/exercises.html');

    createExercise(driver, "run", 200);

    driver.findElement({css: '#exercise-table tbody tr td:nth-of-type(3)'})
    .click();

    driver.findElements({css: '#exercise-table tbody tr td'})
    .then(function(event){
      assert.equal(0, event);
    });
  });

  test.it('allows me to edit an exercise after pressing enter', function(){
    driver.get('http://localhost:8080/exercises.html');

    createExercise(driver, "run", 200);

    var newName = driver.findElement({css: '#exercise-table tbody tr td:nth-of-type(1)'});
    newName.click();
    newName.clear();
    newName.sendKeys('lift');
    newName.sendKeys(webdriver.Key.ENTER);

    driver.findElement({css: '#exercise-table tbody tr td:nth-of-type(1)'})
    .getText().then(function(event){
      assert.equal(event, 'lift');
    });
  });

  test.it('allows me to edit an exercise after clicking out', function(){
    driver.get('http://localhost:8080/exercises.html');

    createExercise(driver, "run", 200);

    var newName = driver.findElement({css: '#exercise-table tbody tr td:nth-of-type(1)'});
    newName.click();
    newName.clear();
    newName.sendKeys('lift');
    driver.findElement({id: 'exercise-name'}).click();

    driver.findElement({css: '#exercise-table tbody tr td:nth-of-type(1)'})
    .getText().then(function(event){
      assert.equal(event, 'lift');
    });
  });

  test.it('allows me to filter an exercise', function(){
    driver.get('http://localhost:8080/exercises.html');
    var filterBox = driver.findElement({css: '#exercise-filter'});

    createExercise(driver, "run", 200);
    createExercise(driver, "jog", 100);

    filterBox.sendKeys("jo");

    driver.findElement({css: '#exercise-table tbody tr td:nth-of-type(1)'})
    .getText().then(function(event){
      assert.equal(event, 'jog');
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
