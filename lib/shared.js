var Storage = require('./storage');
// var SharedStorage = require('./shared_storage');
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
    var storageKey;

    if(bodyId.includes("breakfast")){
      storageId = breakfastStorage;
      storageKey = 'breakfast';
    } else if(bodyId.includes("lunch")) {
      storageId = lunchStorage;
      storageKey = 'lunch';
    } else if(bodyId.includes("dinner")){
      storageId = dinnerStorage
      storageKey = 'dinner';
    } else {
      storageId = snackStorage;
      storageKey = 'snack';
    }

    var storage = new Storage(storageId, name, calories);
    storage.store();

    var currentDay = $('#date-header').text();
    updateDayLog(currentDay, storageKey, storage);
  });

  clearCheckboxes('food-checkbox');
  Calories.addCalories(bodyId, calorieId);
  Calories.totalCaloriesConsumed();
  Calories.totalCaloriesRemaining();
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

// Format Date
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

function updateAllMeals(){
  updateMasterStorage('breakfast', breakfastStorage);
  updateMasterStorage('lunch', lunchStorage);
  updateMasterStorage('dinner', dinnerStorage);
  updateMasterStorage('snack', snackStorage);
}

// Clear Tables for appending for other days
function clearTable(tableId){
  $(`#${tableId} tbody tr td`).remove();
}

// Clear all tables
function clearAllTables(){
  clearTable('breakfast-table');
  clearTable('lunch-table');
  clearTable('dinner-table');
  clearTable('snack-table');
  clearTable('daily-exercise-table');
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

module.exports = {
  displayItems: displayItems,
  addToTable: addToTable,
  clearContents: clearContents,
  clearCheckboxes: clearCheckboxes,
  addToMeals: addToMeals,
  filterTable: filterTable,
  formatTodayDate: formatTodayDate,
  clearTable: clearTable,
  clearAllTables: clearAllTables
}
