var Shared = require('./shared');
var Storage = require('./storage');
var GlobalStorage = require('./global_storage');

var dailyExerciseStorage = "daily-exercise";
var breakfastStorage = "daily-breakfast";
var lunchStorage = "daily-lunch";
var dinnerStorage = "daily-dinner";
var snackStorage = "daily-snack";

// Set Page Date
function getToday(){
  var todaysDate = $('#date-header').text();
  var globalStorage = new GlobalStorage(todaysDate);
  globalStorage.setInitialStorage();

  globalStorage.updateFromDaily(breakfastStorage, 'breakfast');
  globalStorage.updateFromDaily(lunchStorage, 'lunch');
  globalStorage.updateFromDaily(dinnerStorage, 'dinner');
  globalStorage.updateFromDaily(snackStorage, 'snack');
  globalStorage.updateFromDaily(dailyExerciseStorage, 'dailyExercise');
}

// Display data from storage
function displayAllLogs(){
  var todaysDate = $('#date-header').text();
  var todayParse = JSON.parse(localStorage.getItem(todaysDate));

  Shared.clearAllTables();

  var todayBreakfast = todayParse[0].breakfast;
  for(var i = todayBreakfast.length - 1; i >= 0; i--){
    if(todayBreakfast.length > 0) {
      Shared.addToTable('breakfast-table', todayBreakfast[i].name, todayBreakfast[i].calories);
    }
  }
  var todayLunch = todayParse[1].lunch;
  for(var i = todayLunch.length - 1; i >= 0; i--){
    if(todayLunch.length > 0) {
      Shared.addToTable('lunch-table', todayLunch[i].name, todayLunch[i].calories);
    }
  }
  var todayDinner = todayParse[2].dinner;
  for(var i = todayDinner.length - 1; i >= 0; i--){
    if(todayDinner.length > 0) {
      Shared.addToTable('dinner-table', todayDinner[i].name, todayDinner[i].calories);
    }
  }
  var todaySnack = todayParse[3].snack;
  for(var i = todaySnack.length - 1; i >= 0; i--){
    if(todaySnack.length > 0) {
      Shared.addToTable('snack-table', todaySnack[i].name, todaySnack[i].calories);
    }
  }
  var todayExercise = todayParse[4].dailyExercise;
  for(var i = todayExercise.length - 1; i >= 0; i--){
    if(todayExercise.length > 0) {
      Shared.addToTable('daily-exercise-table', todayExercise[i].name, todayExercise[i].calories);
    }
  }
}

// Update all meal storage
function updateAllMeals(oldName, oldCalories, newName, newCalories){
  var globalStorage = new GlobalStorage();
  globalStorage.updateAll('breakfast', oldName, oldCalories, newName, newCalories);
  globalStorage.updateAll('lunch', oldName, oldCalories, newName, newCalories);
  globalStorage.updateAll('dinner', oldName, oldCalories, newName, newCalories);
  globalStorage.updateAll('snack', oldName, oldCalories, newName, newCalories);
}

// Delete from log
function deleteFromMeals(self, tableId, storageId, storageKey, logIndex){
  var rowIndex = $(self).parent().parent()[0].rowIndex;
  var name = $(`#${tableId}`)[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $(`#${tableId}`)[0].rows[rowIndex].cells[1].innerHTML;

  var storage = new Storage(storageId, name, calories);
  storage.delete();

  var currentDay = $('#date-header').text();
  var globalStorage = new GlobalStorage(currentDay);
  globalStorage.deleteDayLog(storageKey, storage, rowIndex);

  $(`#${tableId}`)[0].deleteRow(rowIndex);
  globalStorage.updateIds(currentDay, `${storageKey}-body`, storageKey, logIndex);
}

module.exports = {
  displayAllLogs,
  getToday,
  updateAllMeals,
  deleteFromMeals
}
