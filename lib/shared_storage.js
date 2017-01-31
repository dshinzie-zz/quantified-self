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

// Update storage with Ids
function updateIds(currentDay, tableId, storageKey){
  var todaysLog = JSON.parse(localStorage.getItem('1/31/2017'));
  todaysLog[4]['dailyExercise'] = [];

  $(`#daily-exercise-body > tr`).each(function(index){
    var name = $(this).find('td:nth-child(1)').text();
    var calories = $(this).find('td:nth-child(2)').text();

    if(name != "" && calories != ""){
      todaysLog[4]['dailyExercise'].push({ name: name, calories: calories, id: index });
      localStorage.setItem('1/31/2017', JSON.stringify(todaysLog));
    }
  });
}

module.exports = {
  displayAllLogs: displayAllLogs,
  getToday: getToday,
  updateAllMeals: updateAllMeals,
  deleteFromMeals: deleteFromMeals,
  updateIds: updateIds
}
