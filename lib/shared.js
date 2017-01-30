var Storage = require('./storage');
var Calories = require('./shared_calories');
var foodStorage = "food-calories";
var exerciseStorage = "exercise-calories";
var dailyExerciseStorage = "daily-exercise";
var breakfastStorage = "daily-breakfast";
var lunchStorage = "daily-lunch";
var dinnerStorage = "daily-dinner";
var snackStorage = "daily-snack";

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

// Clear contents
function clearContents(nameId, caloriesId, nameWarningId, caloriesWarningId){
  $(`#${nameId}`).val('');
  $(`#${caloriesId}`).val('');
  $(`#${nameWarningId}`).empty();
  $(`#${caloriesWarningId}`).empty();
}

// Clear checkboxes
function clearCheckboxes(checkboxClass){
  $(`.${checkboxClass}`).prop('checked', false);
}

// Add to Meal Logs
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
    // updateAllMeals();
  });

  clearCheckboxes('food-checkbox');
  Calories.addCalories(bodyId, calorieId);
  Calories.totalCaloriesConsumed();
  Calories.totalCaloriesRemaining();
}

// Delete from log
function deleteDaily(self, tableId, storageId){
  var rowIndex = $(self).parent().parent()[0].rowIndex;
  var name = $(`#${tableId}`)[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $(`#${tableId}`)[0].rows[rowIndex].cells[1].innerHTML;

  var storage = new Storage(storageId, name, calories);
  storage.delete();
  // updateAllMeals();

  $(`#${tableId}`)[0].deleteRow(rowIndex);
}

// Filter tables
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

// Update daily logs
function updateDaily(storageID, oldName, oldCalories, newName, newCalories){
  var dailyExercises = JSON.parse(localStorage.getItem(storageID));
  dailyExercises.forEach(function(element){
    if(element.name == oldName && element.calories == oldCalories){
      element.name = newName
      element.calories = newCalories

      var dailyExercisesJSON = JSON.stringify(dailyExercises);
      localStorage.setItem(storageID, dailyExercisesJSON);
    }
  });
}

function updateDailyMeals(oldName, oldCalories, newName, newCalories){
  updateDaily(breakfastStorage, oldName, oldCalories, newName, newCalories);
  updateDaily(lunchStorage, oldName, oldCalories, newName, newCalories);
  updateDaily(dinnerStorage, oldName, oldCalories, newName, newCalories);
  updateDaily(snackStorage, oldName, oldCalories, newName, newCalories);
}

// Shared Functions
function formatTodayDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd='0'+dd
  }
  if(mm<10) {
      mm='0'+mm
  }
  today = mm+'/'+dd+'/'+yyyy;
  return today;
}



module.exports = {
  displayItems: displayItems,
  addToTable: addToTable,
  clearContents: clearContents,
  clearCheckboxes: clearCheckboxes,
  addToMeals: addToMeals,
  deleteDaily: deleteDaily,
  filterTable: filterTable,
  updateDaily: updateDaily,
  updateDailyMeals: updateDailyMeals,
  formatTodayDate: formatTodayDate
}
