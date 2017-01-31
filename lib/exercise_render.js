"use strict"

var jQuery = require('jquery');
window.$ = jQuery;
var Exercise = require('./exercises');
var Storage = require('./storage');
var Shared = require('./shared');
var SharedStorage = require('./shared_storage');
var exerciseStorage = "exercise-calories";
var dailyExerciseStorage = "daily-exercise";

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

// Exercises
$(document).ready(function(){
  // Add Exercise
  $("#add-exercise").on("click", function(e){
    e.preventDefault();

    var $eName = $('#exercise-name').val();
    var $eCalories = $('#exercise-calories').val();
    var validExercise = validateExercise($eName, $eCalories);

    if(validExercise){
      Shared.addToTable('exercise-table', $eName, $eCalories);
      var exercise = new Exercise($eName, $eCalories);
      exercise.store();
      Shared.clearContents("exercise-name", exerciseStorage, "exercise-warning", "exercise-calories-warning");
    }
  });

  // Filter Exercise
  $("#exercise-filter").keyup(function() {
    Shared.filterTable($(this), "exercise-body");
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

        // SharedStorage.updateDaily(dailyExerciseStorage, oldName, oldCalories, newName, newCalories);
        SharedStorage.updateMasterStorage('dailyExercise', oldName, oldCalories, newName, newCalories);
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

});
