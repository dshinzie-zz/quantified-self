"use strict";

var Food = require('./foods');
var Exercise = require('./exercises');
var Storage = require('./storage');
var GlobalStorage = require('./global_storage');
var Shared = require('./shared');
var Calories = require('./shared_calories');
var SharedStorage = require('./shared_storage');

var foodStorage = "food-calories";
var exerciseStorage = "exercise-calories";
var dailyExerciseStorage = "daily-exercise";
var breakfastStorage = "daily-breakfast";
var lunchStorage = "daily-lunch";
var dinnerStorage = "daily-dinner";
var snackStorage = "daily-snack";

//Diary Exercises
$('#add-selected-exercise').on('click', function(){
  var checkedExercises = $('#diary-exercise-body > tr').filter(':has(:checkbox:checked)')
  var deleteButton = "<td><i class='material-icons delete-btn'>delete</i></td>";
  var newRow = checkedExercises.clone().append(deleteButton);
  var currentDay = $('#date-header').text();
  var globalStorage = new GlobalStorage(currentDay);

  $('#daily-exercise-body > tr:first').before(newRow);
  $('#daily-exercise-table tbody tr td label').parent().remove();

  checkedExercises.each(function(){
    var name = $(this).find('td:nth-child(1)').text();
    var calories = $(this).find('td:nth-child(2)').text();

    var storage = new Storage(dailyExerciseStorage, name, calories);
    storage.store();

    globalStorage.updateDayLog('dailyExercise', storage);
  });
  Shared.clearCheckboxes('exercise-checkbox');
  Calories.addCalories('daily-exercise-body', 'exercise-total-calories');
  Calories.totalCaloriesBurned();
  Calories.totalCaloriesRemaining();

  globalStorage.updateIds(currentDay, 'daily-exercise-body', 'dailyExercise', 4);
});

// Delete Daily Exercise
$('#daily-exercise-table').on('click', '.delete-btn', function(row){
  var rowIndex = $(this).parent().parent()[0].rowIndex;
  var name = $('#daily-exercise-table')[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $('#daily-exercise-table')[0].rows[rowIndex].cells[1].innerHTML;

  var storage = new Storage(dailyExerciseStorage, name, calories);
  storage.delete();

  var currentDay = $('#date-header').text();
  var globalStorage = new GlobalStorage(currentDay);
  globalStorage.deleteDayLog('dailyExercise', storage, rowIndex);

  $('#daily-exercise-table')[0].deleteRow(rowIndex);
  Calories.addCalories('daily-exercise-body', 'exercise-total-calories');
});

// Delete Daily Breakfast
$('#breakfast-table').on('click', '.delete-btn', function(row){
  SharedStorage.deleteFromMeals(this, 'breakfast-table', breakfastStorage, 'breakfast');
  Calories.addCalories('breakfast-body', 'breakfast-total-calories');
  Calories.updateRemaining('breakfast', 400);
});

// Delete Daily Lunch
$('#lunch-table').on('click', '.delete-btn', function(row){
  SharedStorage.deleteFromMeals(this, 'lunch-table', lunchStorage, 'lunch');
  Calories.addCalories('lunch-body', 'lunch-total-calories');
  Calories.updateRemaining('lunch', 600);
});

// Delete Daily Dinner
$('#dinner-table').on('click', '.delete-btn', function(row){
  SharedStorage.deleteFromMeals(this, 'dinner-table', dinnerStorage, 'dinner');
  Calories.addCalories('dinner-body', 'dinner-total-calories');
  Calories.updateRemaining('dinner', 800);
});

// Delete Daily Snack
$('#snack-table').on('click', '.delete-btn', function(row){
  SharedStorage.deleteFromMeals(this, 'snack-table', snackStorage, 'snack');
  Calories.addCalories('snack-body', 'snack-total-calories');
  Calories.updateRemaining('snack', 200);
});

//Diary foods- breakfast
$('#add-breakfast').on('click', function(){
  Shared.addToMeals('breakfast-body', 'breakfast-total-calories');
  Calories.updateRemaining('breakfast', 400);
})

//Diary foods- lunch
$('#add-lunch').on('click', function(){
  Shared.addToMeals('lunch-body', 'lunch-total-calories');
  Calories.updateRemaining('lunch', 600);
})

//Diary foods- dinner
$('#add-dinner').on('click', function(){
  Shared.addToMeals('dinner-body', 'dinner-total-calories');
  Calories.updateRemaining('dinner', 800);
})

//Diary foods- snack
$('#add-snack').on('click', function(){
  Shared.addToMeals('snack-body', 'snack-total-calories');
  Calories.updateRemaining('snack', 200);
})

//Diary date
function setDateHeader(){
  var todaysDate = new Date();
  document.getElementById('date-header').innerHTML = todaysDate.toLocaleDateString();;
}

// Filter Exercise
$("#diary-food-filter").keyup(function() {
  Shared.filterTable($(this), "diary-food-body");
});

$("#diary-exercise-filter").keyup(function() {
  Shared.filterTable($(this), "diary-exercise-body");
});

// Change dates
function changeDates(){
  var date = new Date();

  $("#next-day").on("click", function(e){
    date.setDate(date.getDate() + 1);
    document.getElementById('date-header').innerHTML = date.toLocaleDateString();
    displayDayAndCalories();
  });

  $("#previous-day").on("click", function(e){
    date.setDate(date.getDate() - 1);
    document.getElementById('date-header').innerHTML = date.toLocaleDateString();
    displayDayAndCalories();
  });
}

function displayDayAndCalories(){
  SharedStorage.getToday();
  SharedStorage.displayAllLogs();
  Calories.displayAllCalories();
  Calories.updateRemaining('snack', 200);
  Calories.updateRemaining('breakfast', 400);
  Calories.updateRemaining('lunch', 600);
  Calories.updateRemaining('dinner', 800);

  // totals table
  Calories.totalCaloriesConsumed();
  Calories.totalCaloriesBurned();
  Calories.totalCaloriesRemaining();
}

$('#food-calories-table-header').on('click', function(e) {
  Shared.sortTable(foodStorage, 'diary-food-table');
});

$('#exercise-calories-table-header').on('click', function(e) {
  Shared.sortTable(exerciseStorage, 'diary-exercise-table');
});

$(document).ready(function(){
  Shared.displayItems(foodStorage, "food-table");
  Shared.displayItems(exerciseStorage, "exercise-table");

  Shared.displayItems(foodStorage, "diary-food-table");
  Shared.displayItems(exerciseStorage, "diary-exercise-table");

  setDateHeader();
  displayDayAndCalories();
  changeDates();
});
