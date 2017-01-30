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

  var todayBreakfast = todayParse[0].breakfast;
  for(var i = 0; i < todayBreakfast.length; i++){
    Shared.addToTable('breakfast-table', todayBreakfast[i].name, todayBreakfast[i].calories);
  }
  var todayLunch = todayParse[1].lunch;
  for(var i = 0; i < todayLunch.length; i++){
    Shared.addToTable('lunch-table', todayLunch[i].name, todayLunch[i].calories);
  }
  var todayDinner = todayParse[2].dinner;
  for(var i = 0; i < todayDinner.length; i++){
    Shared.addToTable('dinner-table', todayDinner[i].name, todayDinner[i].calories);
  }
  var todaySnack = todayParse[3].snack;
  for(var i = 0; i < todaySnack.length; i++){
    Shared.addToTable('snack-table', todaySnack[i].name, todaySnack[i].calories);
  }
  var todayExercise = todayParse[4].dailyExercise;
  for(var i = 0; i < todayExercise.length; i++){
    Shared.addToTable('daily-exercise-table', todayExercise[i].name, todayExercise[i].calories);
  }
}

function updateMasterStorage(storageKey, storageId){
  var currentDay;
  for(var i = 0; i < localStorage.length; i++){
    if(localStorage.key(i).includes('/')){
      currentDay = localStorage.key(i);

      var newStorage = JSON.parse(localStorage.getItem(storageId));
      var todaysLog = JSON.parse(localStorage.getItem(currentDay));

      if(storageKey == 'breakfast') { todaysLog[0][storageKey] = newStorage; }
      if(storageKey == 'lunch') { todaysLog[1][storageKey] = newStorage; }
      if(storageKey == 'dinner') { todaysLog[2][storageKey] = newStorage; }
      if(storageKey == 'snack') { todaysLog[3][storageKey] = newStorage; }
      if(storageKey == 'dailyExercise') { todaysLog[4][storageKey] = newStorage; }

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

function updateAllMeals(){
  updateMasterStorage('breakfast', breakfastStorage);
  updateMasterStorage('lunch', lunchStorage);
  updateMasterStorage('dinner', dinnerStorage);
  updateMasterStorage('snack', snackStorage);
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

// Delete from log
function deleteDaily(self, tableId, storageId){
  var rowIndex = $(self).parent().parent()[0].rowIndex;
  var name = $(`#${tableId}`)[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $(`#${tableId}`)[0].rows[rowIndex].cells[1].innerHTML;

  var storage = new Storage(storageId, name, calories);
  storage.delete();
  updateAllMeals();

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
  deleteDaily: deleteDaily
}
