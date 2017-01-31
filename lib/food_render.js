"use strict"

var jQuery = require('jquery');
window.$ = jQuery;
var Food = require('./foods');
var Storage = require('./storage');
var Shared = require('./shared');
var foodStorage = "food-calories";
var SharedStorage = require('./shared_storage');

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

$(document).ready(function(){
  // Add Food
  $("#add-food").on("click", function(e) {
    e.preventDefault();

    var $fName = $("#food-name").val();
    var $fCalories = $("#food-calories").val();
    var validFood = validateFood($fName, $fCalories);

    if(validFood){
      Shared.addToTable('food-table', $fName, $fCalories);
      var food = new Food($fName, $fCalories);
      food.store();
      Shared.clearContents("food-name", foodStorage, "food-warning", "calories-warning");
    }
  });

  // Filter Food
  $("#food-filter").keyup(function() {
    Shared.filterTable($(this), "food-body");
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

        // SharedStorage.updateDailyMeals(oldName, oldCalories, newName, newCalories);
        SharedStorage.updateAllMeals(oldName, oldCalories, newName, newCalories);

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
});
