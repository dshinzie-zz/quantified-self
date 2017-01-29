"use strict";

var Food = require('./foods');
var Exercise = require('./exercises');
var Storage = require('./storage');


var foodStorage = "food-calories";
var exerciseStorage = "exercise-calories";
var dailyExerciseStorage = "daily-exercise";
var breakfastStorage = "daily-breakfast";
var lunchStorage = "daily-lunch";
var dinnerStorage = "daily-dinner";
var snackStorage = "daily-snack";


// Food Rendering
// Add Food
$("#add-food").on("click", function(e) {
  e.preventDefault();

  var $fName = $("#food-name").val();
  var $fCalories = $("#food-calories").val();
  var validFood = validateFood($fName, $fCalories);

  if(validFood){
    addToTable('food-table', $fName, $fCalories);
    var food = new Food($fName, $fCalories);
    food.store();
    clearContents("food-name", foodStorage, "food-warning", "calories-warning");
  }
});

// Filter Food
$("#food-filter").keyup(function() {
  filterTable($(this), "food-body");
});

// Edit Food
$('#food-table').on('click', '.edit-cell', function(e){
  $(this).attr("contenteditable", "true");
  var rowIndex = $(this).parent()[0].rowIndex;
  var oldName = $('#food-table')[0].rows[rowIndex].cells[0].innerHTML;
  var oldCalories = $('#food-table')[0].rows[rowIndex].cells[1].innerHTML;

  $(this).on('blur keydown', function(e){
    if(e.keyCode == 13 || e.type == 'blur'){
      $(this).attr("contenteditable", "false");

      var newName = $('#food-table')[0].rows[rowIndex].cells[0].innerHTML;
      var newCalories = $('#food-table')[0].rows[rowIndex].cells[1].innerHTML;

      var food = new Food(newName, newCalories);
      food.update(oldName, oldCalories);
    }
  });
});

// Delete Food
$('#food-table').on('click', '.delete-btn', function(row){
  var rowIndex = $(this).parent().parent()[0].rowIndex;
  var name = $('#food-table')[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $('#food-table')[0].rows[rowIndex].cells[1].innerHTML;

  var food = new Food(name, calories);
  food.delete();

  $('#food-table')[0].deleteRow(rowIndex);
});

// Validate Food
function validateFood(food, calories){
  if (food.trim() == '') {
    $('#food-warning').append("Please enter a food name.");
    return false;
  } else if (calories.trim() == ''){
    $('#calories-warning').append("Please enter a calorie amount.");
    return false;
  } else {
    return true;
  }
}


// Exercises
// Add Exercise
$("#add-exercise").on("click", function(e){
  e.preventDefault();

  var $eName = $('#exercise-name').val();
  var $eCalories = $('#exercise-calories').val();
  var validExercise = validateExercise($eName, $eCalories);

  if(validExercise){
    addToTable('exercise-table', $eName, $eCalories);
    var exercise = new Exercise($eName, $eCalories);
    exercise.store();
    clearContents("exercise-name", exerciseStorage, "exercise-warning", "exercise-calories-warning");
  }
});

// Filter Exercise
$("#exercise-filter").keyup(function() {
  filterTable($(this), "exercise-body");
});

// Edit Exercise
$('#exercise-table').on('click', '.edit-cell', function(e){
  $(this).attr("contenteditable", "true");
  var rowIndex = $(this).parent()[0].rowIndex;
  var oldName = $('#exercise-table')[0].rows[rowIndex].cells[0].innerHTML;
  var oldCalories = $('#exercise-table')[0].rows[rowIndex].cells[1].innerHTML;

  $(this).on('blur keydown', function(e){
    if(e.keyCode == 13 || e.type == 'blur'){
      $(this).attr("contenteditable", "false");

      var newName = $('#exercise-table')[0].rows[rowIndex].cells[0].innerHTML;
      var newCalories = $('#exercise-table')[0].rows[rowIndex].cells[1].innerHTML;

      var exercise = new Exercise(newName, newCalories);
      exercise.update(oldName, oldCalories);
    }
  });
});

// Delete Exercise
$('#exercise-table').on('click', '.delete-btn', function(row){
  var rowIndex = $(this).parent().parent()[0].rowIndex;
  var name = $('#exercise-table')[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $('#exercise-table')[0].rows[rowIndex].cells[1].innerHTML;

  var exercise = new Exercise(name, calories);
  exercise.delete();

  $('#exercise-table')[0].deleteRow(rowIndex);
});

// Validate Exercise
function validateExercise(exercise, calories){
  if (exercise.trim() == '') {
    $('#exercise-warning').append("Please enter an exercise name.");
    return false;
  } else if (calories.trim() == '') {
    $('#exercise-calories-warning').append("Please enter a calorie amount.");
    return false;
  } else {
    return true;
  }
}

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

  $('#daily-exercise-table')[0].deleteRow(rowIndex);
  addCalories('daily-exercise-body', 'exercise-total-calories');
  totalCaloriesBurned();
  totalCaloriesRemaining();
});

// Delete Daily Breakfast
$('#breakfast-table').on('click', '.delete-btn', function(row){
  deleteDaily(this, 'breakfast-table', breakfastStorage);
  addCalories('breakfast-body', 'breakfast-total-calories');
  updateRemaining('breakfast', 400);
});

// Delete Daily Lunch
$('#lunch-table').on('click', '.delete-btn', function(row){
  deleteDaily(this, 'lunch-table', lunchStorage);
  addCalories('lunch-body', 'lunch-total-calories');
  updateRemaining('lunch', 600);
});

// Delete Daily Dinner
$('#dinner-table').on('click', '.delete-btn', function(row){
  deleteDaily(this, 'dinner-table', dinnerStorage);
  addCalories('dinner-body', 'dinner-total-calories');
  updateRemaining('dinner', 800);
});

// Delete Daily Snack
$('#snack-table').on('click', '.delete-btn', function(row){
  deleteDaily(this, 'snack-table', snackStorage);
  addCalories('snack-body', 'snack-total-calories');
  updateRemaining('snack', 200);
});

//Diary foods- breakfast
$('#add-breakfast').on('click', function(){
  addToMeals('breakfast-body', 'breakfast-total-calories');
  updateRemaining('breakfast', 400);
})

//Diary foods- lunch
$('#add-lunch').on('click', function(){
  addToMeals('lunch-body', 'lunch-total-calories');
  updateRemaining('lunch', 600);
})

//Diary foods- dinner
$('#add-dinner').on('click', function(){
  addToMeals('dinner-body', 'dinner-total-calories');
  updateRemaining('dinner', 800);
})

//Diary foods- snack
$('#add-snack').on('click', function(){
  addToMeals('snack-body', 'snack-total-calories');
  updateRemaining('snack', 200);
})

//Diary date
function setDateHeader(){
  var todaysDate = new Date();
  document.getElementById('date-header').innerHTML = todaysDate;
}

// Filter Exercise
$("#diary-food-filter").keyup(function() {
  filterTable($(this), "diary-food-body");
});

$("#diary-exercise-filter").keyup(function() {
  filterTable($(this), "diary-exercise-body");
});

// Shared Functions
// Display Table
function displayItems(storageId, tableId){
  var storage = new Storage(storageId, '', '');
  storage.setEmptyStorage();

  JSON.parse(localStorage.getItem(storageId)).forEach(function(element){
    addToTable(tableId, element.name, element.calories);
  });
}

// Add Item Table to Page
function addToTable(tableId, name, calories){
  var rowIndex = $(`#${tableId} > tbody > tr`).length
  var checkBoxFood = `<td><input type='checkbox' class='filled-in food-checkbox' id='food-${rowIndex}'/><label for='food-${rowIndex}'></label></td>`;
  var checkBoxExercise = `<td><input type='checkbox' class='filled-in exercise-checkbox' id='exercise-${rowIndex}'/><label for='exercise-${rowIndex}'></label></td>`;
  var deleteButton = "<td><i class='material-icons delete-btn'>delete</i></td>";
  var itemData = `<tr><td class='edit-cell'>${name}</td><td class='edit-cell'>${calories}</td>${deleteButton}</tr>`;
  var diaryFoodData = `<tr><td>${name}</td><td>${calories}</td>${checkBoxFood}</tr>`;
  var diaryExerciseData = `<tr><td>${name}</td><td>${calories}</td>${checkBoxExercise}</tr>`;

  if(tableId.includes("diary-food")){
    $(`#${tableId} > tbody > tr:first`).before(diaryFoodData);
  } else if(tableId.includes("diary-exercise")){
    $(`#${tableId} > tbody > tr:first`).before(diaryExerciseData);
  } else {
    $(`#${tableId} > tbody > tr:first`).before(itemData);
  }
}

function clearContents(nameId, caloriesId, nameWarningId, caloriesWarningId){
  $(`#${nameId}`).val('');
  $(`#${caloriesId}`).val('');
  $(`#${nameWarningId}`).empty();
  $(`#${caloriesWarningId}`).empty();
}

function addToMeals(bodyId, calorieId){
  var checkedFoods = $('#diary-food-body > tr').filter(':has(:checkbox:checked)')
  var deleteButton = "<td><i class='material-icons delete-btn'>delete</i></td>";
  var newRow = checkedFoods.clone().append(deleteButton);

  $(`#${bodyId} > tr:first`).before(newRow);
  $(`#${bodyId} tr td input`).remove();
  $(`#${bodyId} tr td label`).parent().remove();

  checkedFoods.each(function(){
    var name = $(this).find('td:nth-child(1)').text();
    var calories = $(this).find('td:nth-child(2)').text();
    var storageId;

    if(bodyId.includes("breakfast")){
      storageId = breakfastStorage;
    } else if(bodyId.includes("lunch")) {
      storageId = lunchStorage;
    } else if(bodyId.includes("dinner")){
      storageId = dinnerStorage
    } else {
      storageId = snackStorage;
    }

    var storage = new Storage(storageId, name, calories);
    storage.store();
  });

  clearCheckboxes('food-checkbox');
  addCalories(bodyId, calorieId);
  totalCaloriesConsumed();
  totalCaloriesRemaining();
}

function clearCheckboxes(checkboxClass){
  $(`.${checkboxClass}`).prop('checked', false);
}

function addCalories(table, calorieID){
  var sum = 0;
  var cells = document.querySelectorAll(`#${table} tr td:nth-of-type(2)`);

  for (var i = 0; i < cells.length; i++) {
      sum+=parseFloat(cells[i].firstChild.data);
  }
  document.getElementById(`${calorieID}`).innerHTML = sum;
}

function displayAllCalories(){
  addCalories('daily-exercise-body', 'exercise-total-calories');
  addCalories('breakfast-body', 'breakfast-total-calories');
  addCalories('lunch-body', 'lunch-total-calories');
  addCalories('dinner-body', 'dinner-total-calories');
  addCalories('snack-body', 'snack-total-calories');
}

function updateRemaining(meal, calories){
  var totalCalories = $(`#${meal}-total-calories`).html();
  var newRemaining = calories - Number(totalCalories);

  if (newRemaining < 0){
    $(`#${meal}-remaining-calories`).addClass('red-text');
  } else {
    $(`#${meal}-remaining-calories`).removeClass('red-text').addClass('green-text');
  }

  document.getElementById(`${meal}-remaining-calories`).innerHTML = newRemaining.toString();
}

function totalCaloriesConsumed(){
  var breakfastTotal = Number($('#breakfast-total-calories').html());
  var lunchTotal = Number($('#lunch-total-calories').html());
  var dinnerTotal = Number($('#dinner-total-calories').html());
  var snackTotal = Number($('#snack-total-calories').html());
  var totalConsumed = breakfastTotal + lunchTotal + dinnerTotal + snackTotal;
  document.getElementById('total-consumed-calories').innerHTML = totalConsumed.toString();
}

function totalCaloriesBurned(){
  var exerciseTotal = $('#exercise-total-calories').html();

  if (exerciseTotal > 0){
    $('#total-burned-calories').addClass('green-text');
    $('#exercise-total-calories').addClass('green-text');
  }

  document.getElementById('total-burned-calories').innerHTML = exerciseTotal;
}

function totalCaloriesRemaining(){
  var totalGoal = 2000
  var totalConsumed = Number($('#total-consumed-calories').html());
  var totalBurned = Number($('#exercise-total-calories').html());
  var totalRemaining = totalGoal - totalConsumed + totalBurned

  if (totalRemaining < 0){
    $('#total-remaining-calories').addClass('red-text');
  } else {
    $('#total-remaining-calories').removeClass('red-text').addClass('green-text');
  }

  document.getElementById('total-remaining-calories').innerHTML = totalRemaining.toString();
}

function deleteDaily(self, tableId, storageId){
  var rowIndex = $(self).parent().parent()[0].rowIndex;
  var name = $(`#${tableId}`)[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $(`#${tableId}`)[0].rows[rowIndex].cells[1].innerHTML;

  var storage = new Storage(storageId, name, calories);
  storage.delete();

  $(`#${tableId}`)[0].deleteRow(rowIndex);
}

function filterTable(self, bodyId){
  var rows = $(`#${bodyId}`).find("tr").hide();

  if (self[0].value.length) {
    var data = self[0].value.split(" ");

    $.each(data, function (index, value) {
      rows.filter(function(){
        return $(this).text().toLowerCase().indexOf(value.toLowerCase()) > -1;
      }).show();
    });
  } else {
    rows.show();
  }
}

$(document).ready(function(){
  displayItems(foodStorage, "food-table");
  displayItems(exerciseStorage, "exercise-table");

  // diary
  displayItems(foodStorage, "diary-food-table");
  displayItems(exerciseStorage, "diary-exercise-table");

  // daily dairy
  displayItems(dailyExerciseStorage, "daily-exercise-table");
  displayItems(breakfastStorage, "breakfast-table");
  displayItems(lunchStorage, "lunch-table");
  displayItems(dinnerStorage, "dinner-table");
  displayItems(snackStorage, "snack-table");

  // Calories
  displayAllCalories();
  updateRemaining('snack', 200);
  updateRemaining('breakfast', 400);
  updateRemaining('lunch', 600);
  updateRemaining('dinner', 800);
  setDateHeader();

  // totals table
  totalCaloriesConsumed();
  totalCaloriesBurned();
  totalCaloriesRemaining();
});
