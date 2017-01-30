var Shared = require('./shared');
var Storage = require('./storage');
var foodStorage = "food-calories";
var exerciseStorage = "exercise-calories";
var dailyExerciseStorage = "daily-exercise";
var breakfastStorage = "daily-breakfast";
var lunchStorage = "daily-lunch";
var dinnerStorage = "daily-dinner";
var snackStorage = "daily-snack";


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

function updateMasterStorage(storageKey, oldName, oldCalories, newName, newCalories){
  var currentDay;
  for(var i = 0; i < localStorage.length; i++){
    if(localStorage.key(i).includes('/')){
      currentDay = localStorage.key(i);
      var todaysLog = JSON.parse(localStorage.getItem(currentDay));

      if(storageKey == 'breakfast') {
        var log = todaysLog[0][storageKey]
        if(log.length > 0) { updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog); }
      }
      if(storageKey == 'lunch') {
        var log = todaysLog[1][storageKey]
        if(log.length > 0) { updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog); }
      }
      if(storageKey == 'dinner') {
        var log = todaysLog[2][storageKey]
        if(log.length > 0) { updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog); }
      }
      if(storageKey == 'snack') {
        var log = todaysLog[3][storageKey]
        if(log.length > 0) { updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog); }
      }
      if(storageKey == 'dailyExercise') {
        var log = todaysLog[4][storageKey]
        if(log.length > 0) { updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog); }
      }
    }
  }
}

function updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog){
  for(var i = 0; i < log.length; i++){
    if(log[i].name == oldName && log[i].calories == oldCalories){
      log[i].name = newName;
      log[i].calories = newCalories;
      localStorage.setItem(currentDay, JSON.stringify(todaysLog));
    }
  }
}

function updateAllMeals(oldName, oldCalories, newName, newCalories){
  updateMasterStorage('breakfast', oldName, oldCalories, newName, newCalories);
  updateMasterStorage('lunch', oldName, oldCalories, newName, newCalories);
  updateMasterStorage('dinner', oldName, oldCalories, newName, newCalories);
  updateMasterStorage('snack', oldName, oldCalories, newName, newCalories);
}

function updateDayLog(currentDay, storageKey, storage){
  // var newStorage = storage;
  var todaysLog = JSON.parse(localStorage.getItem(currentDay));

  if(storageKey == 'breakfast') { todaysLog[0][storageKey].push({ name: storage.name, calories: storage.calories }); }
  if(storageKey == 'lunch') { todaysLog[1][storageKey].push({ name: storage.name, calories: storage.calories }); }
  if(storageKey == 'dinner') { todaysLog[2][storageKey].push({ name: storage.name, calories: storage.calories }); }
  if(storageKey == 'snack') { todaysLog[3][storageKey].push({ name: storage.name, calories: storage.calories }); }
  if(storageKey == 'dailyExercise') { todaysLog[4][storageKey].push({ name: storage.name, calories: storage.calories }); }

  localStorage.setItem(currentDay, JSON.stringify(todaysLog));
}

function deleteDayLog(currentDay, storageKey, storage){
  var todaysLog = JSON.parse(localStorage.getItem(currentDay));
  if(storageKey == 'breakfast') {
    var log = todaysLog[0][storageKey];
    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
  }
  if(storageKey == 'lunch') {
    var log = todaysLog[1][storageKey];
    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
  }
  if(storageKey == 'dinner') {
    var log = todaysLog[2][storageKey];
    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
  }
  if(storageKey == 'snack') {
    var log = todaysLog[3][storageKey];
    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
  }
  if(storageKey == 'dailyExercise') {
    var log = todaysLog[4][storageKey];
    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
  }
}

function deleteIndividual(currentDay, storageKey, storage, log, todaysLog){
  for(var i = 0; i < log.length; i++){
    if(log[i].name == storage.name && log[i].calories == storage.calories){
      log.splice(log.indexOf(log[i]), 1);
      localStorage.setItem(currentDay, JSON.stringify(todaysLog));
    }
  }
}

function setEmptyValues(){
  var currentDay = $('#date-header').text();
  var todayJSON = JSON.parse(localStorage.getItem(currentDay));
  // create initial storage
  if(todayJSON.length == 0) {
    todayJSON = [
      { breakfast: []},
      { lunch: [] },
      { dinner: []} ,
      { snack: [] },
      { dailyExercise: [] }
    ]
  }

  // create intial keys
  if(todayJSON[0].breakfast == null){ todayJSON[0].breakfast = []; }
  if(todayJSON[1].lunch == null){ todayJSON[1].lunch = []; }
  if(todayJSON[2].dinner == null){ todayJSON[2].dinner = []; }
  if(todayJSON[3].snack == null){ todayJSON[3].snack = []; }
  if(todayJSON[4].dailyExercise == null){ todayJSON[4].dailyExercise = []; }

  localStorage.setItem(currentDay, JSON.stringify(todayJSON));
}

function getToday(){
  var todaysDate = $('#date-header').text();
  var storage = new Storage(todaysDate);
  storage.setEmptyStorage();
  setEmptyValues();

  updateToday(breakfastStorage, 'breakfast');
  updateToday(lunchStorage, 'lunch');
  updateToday(dinnerStorage, 'dinner');
  updateToday(snackStorage, 'snack');
  updateToday(dailyExerciseStorage, 'dailyExercise');
}

function updateToday(storageId, meal){
  var todaysDate = $('#date-header').text();
  var mealJSON = JSON.parse(localStorage.getItem(storageId));
  var todayParse = JSON.parse(localStorage.getItem(todaysDate));
  var mealArray = [];

  for(var i = 0; i < todayParse.length; i++) {
    for(var storageMeal in todayParse[i]) {
      mealArray.push(storageMeal);
    }
  }

  if(mealArray.indexOf(meal) > -1){
    return;
  } else {
    var mealObject = {};
    mealObject[meal] = mealJSON;
    todayParse.push(mealObject);

    var todayJSON = JSON.stringify(todayParse);
    localStorage.setItem(todaysDate, todayJSON);
  }
}


// Update daily logs
function updateDaily(storageID, oldName, oldCalories, newName, newCalories){
  var dailyMeal = JSON.parse(localStorage.getItem(storageID));
  dailyMeal.forEach(function(element){
    if(element.name == oldName && element.calories == oldCalories){
      element.name = newName
      element.calories = newCalories

      var dailyMealJSON = JSON.stringify(dailyMeal);
      localStorage.setItem(storageID, dailyMealJSON);
    }
  });
}

function updateDailyMeals(oldName, oldCalories, newName, newCalories){
  updateDaily(breakfastStorage, oldName, oldCalories, newName, newCalories);
  updateDaily(lunchStorage, oldName, oldCalories, newName, newCalories);
  updateDaily(dinnerStorage, oldName, oldCalories, newName, newCalories);
  updateDaily(snackStorage, oldName, oldCalories, newName, newCalories);
}

// Delete from log
function deleteDaily(self, tableId, storageId, storageKey){
  var rowIndex = $(self).parent().parent()[0].rowIndex;
  var name = $(`#${tableId}`)[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $(`#${tableId}`)[0].rows[rowIndex].cells[1].innerHTML;

  var storage = new Storage(storageId, name, calories);
  storage.delete();

  var currentDay = $('#date-header').text();
  deleteDayLog(currentDay, storageKey, storage);

  $(`#${tableId}`)[0].deleteRow(rowIndex);
}

module.exports = {
  displayAllLogs: displayAllLogs,
  updateMasterStorage: updateMasterStorage,
  getToday: getToday,
  updateToday: updateToday,
  updateAllMeals: updateAllMeals,
  updateDaily: updateDaily,
  updateDailyMeals: updateDailyMeals,
  deleteDaily: deleteDaily,
  updateDayLog: updateDayLog,
  deleteDayLog: deleteDayLog
}