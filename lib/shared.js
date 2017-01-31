var Storage = require('./storage');
var GlobalStorage = require('./global_storage');
var Calories = require('./shared_calories');

var breakfastStorage = "daily-breakfast";
var lunchStorage = "daily-lunch";
var dinnerStorage = "daily-dinner";
var snackStorage = "daily-snack";

// Display Table
function displayItems(storageId, tableId){
  var storage = new Storage(storageId, '', '');
  storage.setEmptyStorage();

  renderObjectsToTable(JSON.parse(localStorage.getItem(storageId)), tableId);
}

function sortTable(storageId, tableId) {
  // clear table
  $('#' + tableId + ' > tbody > tr').empty();
  var storage = new Storage(storageId, '', '');
  storage.setEmptyStorage();

  var items = JSON.parse(localStorage.getItem(storageId));

  //get sort attribute
  var sort = $('#' + tableId).data('sort');
  if (sort === 'asc') {
    items = _.orderBy(items, function(i) { return parseInt(i.calories); }, 'desc');
    $('#' + tableId).data('sort', 'desc');
  } else if (sort === 'desc') {
    $('#' + tableId).data('sort', null);
  } else {
    items = _.orderBy(items, function(i) { return parseInt(i.calories); }, 'asc');
    $('#' + tableId).data('sort', 'asc');
  }

  renderObjectsToTable(items, tableId);
}

function renderObjectsToTable(elements, tableId) {
  elements.forEach(function(element){
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
    var globalStorage = new GlobalStorage(currentDay);
    globalStorage.updateDayLog(storageKey, storage);
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

module.exports = {
  displayItems: displayItems,
  sortTable: sortTable,
  addToTable: addToTable,
  clearContents: clearContents,
  clearCheckboxes: clearCheckboxes,
  addToMeals: addToMeals,
  filterTable: filterTable,
  clearTable: clearTable,
  clearAllTables: clearAllTables
}
