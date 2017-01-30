"use strict";

var Food = require('./foods');
var Exercise = require('./exercises');
var Storage = require('./storage');
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

  $('#daily-exercise-body > tr:first').before(newRow);
  $('#daily-exercise-table tbody tr td label').parent().remove();

  checkedExercises.each(function(){
    var name = $(this).find('td:nth-child(1)').text();
    var calories = $(this).find('td:nth-child(2)').text();
    var storage = new Storage(dailyExerciseStorage, name, calories);
    storage.store();
    updateMasterStorage('dailyExercise', dailyExerciseStorage);

  });
  clearCheckboxes('exercise-checkbox');
  addCalories('daily-exercise-body', 'exercise-total-calories');
  totalCaloriesBurned();
  totalCaloriesRemaining();
});

// Delete Daily Exercise
$('#daily-exercise-table').on('click', '.delete-btn', function(row){
  var rowIndex = $(this).parent().parent()[0].rowIndex;
  var name = $('#daily-exercise-table')[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $('#daily-exercise-table')[0].rows[rowIndex].cells[1].innerHTML;

  var storage = new Storage(dailyExerciseStorage, name, calories);
  storage.delete();
  updateMasterStorage('dailyExercise', dailyExerciseStorage);

  $('#daily-exercise-table')[0].deleteRow(rowIndex);
  addCalories('daily-exercise-body', 'exercise-total-calories');
  totalCaloriesBurned();
  totalCaloriesRemaining();
});

// Delete Daily Breakfast
$('#breakfast-table').on('click', '.delete-btn', function(row){
  Shared.deleteDaily(this, 'breakfast-table', breakfastStorage);
  Calories.addCalories('breakfast-body', 'breakfast-total-calories');
});

// Delete Daily Lunch
$('#lunch-table').on('click', '.delete-btn', function(row){
  Shared.deleteDaily(this, 'lunch-table', lunchStorage);
  Calories.addCalories('lunch-body', 'lunch-total-calories');
});

// Delete Daily Dinner
$('#dinner-table').on('click', '.delete-btn', function(row){
  Shared.deleteDaily(this, 'dinner-table', dinnerStorage);
  Calories.addCalories('dinner-body', 'dinner-total-calories');
});

// Delete Daily Snack
$('#snack-table').on('click', '.delete-btn', function(row){
  Shared.deleteDaily(this, 'snack-table', snackStorage);
  Calories.addCalories('snack-body', 'snack-total-calories');
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
  // var todaysDate = new Date();
  var todaysDate = Shared.formatTodayDate();
  document.getElementById('date-header').innerHTML = todaysDate;
}

// Filter Exercise
$("#diary-food-filter").keyup(function() {
  Shared.filterTable($(this), "diary-food-body");
});

$("#diary-exercise-filter").keyup(function() {
  Shared.filterTable($(this), "diary-exercise-body");
});



$(document).ready(function(){
  Shared.displayItems(foodStorage, "food-table");
  Shared.displayItems(exerciseStorage, "exercise-table");

  // diary
  Shared.displayItems(foodStorage, "diary-food-table");
  Shared.displayItems(exerciseStorage, "diary-exercise-table");

  // daily dairy
  // displayItems(dailyExerciseStorage, "daily-exercise-table");
  // displayItems(breakfastStorage, "breakfast-table");
  // displayItems(lunchStorage, "lunch-table");
  // displayItems(dinnerStorage, "dinner-table");
  // displayItems(snackStorage, "snack-table");

  setDateHeader();
  SharedStorage.getToday();
  SharedStorage.displayAllLogs();

  // Calories
  Calories.displayAllCalories();
  Calories.updateRemaining('snack', 200);
  Calories.updateRemaining('breakfast', 400);
  Calories.updateRemaining('lunch', 600);
  Calories.updateRemaining('dinner', 800);

  // totals table
  Calories.totalCaloriesConsumed();
  Calories.totalCaloriesBurned();
  Calories.totalCaloriesRemaining();
});
