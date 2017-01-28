"use strict";

var Food = require('./foods');
var Exercise = require('./exercises');

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
    clearContents("food-name", "food-calories", "food-warning", "calories-warning");
  }
});

// Filter Food
$("#food-filter").keyup(function() {
  var rows = $("#food-body").find("tr").hide();

  if (this.value.length) {
    var data = this.value.split(" ");

    $.each(data, function (index, value) {
      rows.filter(function(){
        return $(this).text().toLowerCase().indexOf(value.toLowerCase()) > -1;
      }).show();
    });
  } else {
    rows.show();
  }
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
    clearContents("exercise-name", "exercise-calories", "exercise-warning", "exercise-calories-warning");
  }
});

// Filter Exercise
$("#exercise-filter").keyup(function () {
  var rows = $("#exercise-body").find("tr").hide();

  if (this.value.length) {
    var data = this.value.split(" ");

    $.each(data, function (index, value) {
      rows.filter(function(){
        return $(this).text().toLowerCase().indexOf(value.toLowerCase()) > -1;
      }).show();
    });
  } else {
    rows.show();
  }
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
  $('#daily-exercise-table tbody tr td input').remove();
})

// Shared Functions
// Display Table
function displayItems(storageId, tableId){
  JSON.parse(localStorage.getItem(storageId)).forEach(function(element){
    addToTable(tableId, element.name, element.calories);
  });
}

// Add Item Table to Page
function addToTable(tableId, name, calories){
  var rowIndex = $(`#${tableId} > tbody > tr`).length
  var checkBoxFood = `<td><input type='checkbox' class='filled-in' id='food-${rowIndex}'/><label for='food-${rowIndex}'></label></td>`;
  var checkBoxExercise = `<td><input type='checkbox' class='filled-in' id='exercise-${rowIndex}'/><label for='exercise-${rowIndex}'></label></td>`;
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


$(document).ready(function(){
  displayItems("food-calories", "food-table");
  displayItems("exercise-calories", "exercise-table");

  // diary
  displayItems("food-calories", "diary-food-table");
  displayItems("exercise-calories", "diary-exercise-table");
})
