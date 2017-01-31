var Shared = require('./shared');
var Storage = require('./storage');
var GlobalStorage = require('./global_storage');

var dailyExerciseStorage = "daily-exercise";
var breakfastStorage = "daily-breakfast";
var lunchStorage = "daily-lunch";
var dinnerStorage = "daily-dinner";
var snackStorage = "daily-snack";

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

function displayAllLogs(){
  var todaysDate = $('#date-header').text();
  var todayParse = JSON.parse(localStorage.getItem(todaysDate));

  Shared.clearAllTables();

  var todayBreakfast = todayParse[0].breakfast;
  for(var i = 0; i < todayBreakfast.length; i++){
    if(todayBreakfast.length > 0) {
      Shared.addToTable('breakfast-table', todayBreakfast[i].name, todayBreakfast[i].calories);
    }
  }

  var todayLunch = todayParse[1].lunch;
  for(var i = 0; i < todayLunch.length; i++){
    if(todayLunch.length > 0) {
      Shared.addToTable('lunch-table', todayLunch[i].name, todayLunch[i].calories);
    }
  }

  var todayDinner = todayParse[2].dinner;
  for(var i = 0; i < todayDinner.length; i++){
    if(todayDinner.length > 0) {
      Shared.addToTable('dinner-table', todayDinner[i].name, todayDinner[i].calories);
    }
  }

  var todaySnack = todayParse[3].snack;
  for(var i = 0; i < todaySnack.length; i++){
    if(todaySnack.length > 0) {
      Shared.addToTable('snack-table', todaySnack[i].name, todaySnack[i].calories);
    }
  }

  var todayExercise = todayParse[4].dailyExercise;
  for(var i = 0; i < todayExercise.length; i++){
    if(todayExercise.length > 0) {
      Shared.addToTable('daily-exercise-table', todayExercise[i].name, todayExercise[i].calories);
    }
  }
}

function updateAllMeals(oldName, oldCalories, newName, newCalories){
  var globalStorage = new GlobalStorage();
  globalStorage.updateAll('breakfast', oldName, oldCalories, newName, newCalories);
  globalStorage.updateAll('lunch', oldName, oldCalories, newName, newCalories);
  globalStorage.updateAll('dinner', oldName, oldCalories, newName, newCalories);
  globalStorage.updateAll('snack', oldName, oldCalories, newName, newCalories);
}

// Delete from log
function deleteFromMeals(self, tableId, storageId, storageKey){
  var rowIndex = $(self).parent().parent()[0].rowIndex;
  var name = $(`#${tableId}`)[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $(`#${tableId}`)[0].rows[rowIndex].cells[1].innerHTML;

  var storage = new Storage(storageId, name, calories);
  storage.delete();

  var currentDay = $('#date-header').text();
  var globalStorage = new GlobalStorage(currentDay);
  globalStorage.deleteDayLog(storageKey, storage);

  $(`#${tableId}`)[0].deleteRow(rowIndex);
}

module.exports = {
  displayAllLogs: displayAllLogs,
  getToday: getToday,
  updateAllMeals: updateAllMeals,
  deleteFromMeals: deleteFromMeals
}
