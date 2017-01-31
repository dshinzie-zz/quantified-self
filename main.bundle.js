/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Food = __webpack_require__(7);
	var Exercise = __webpack_require__(2);
	var Storage = __webpack_require__(3);
	var Shared = __webpack_require__(4);
	var Calories = __webpack_require__(5);
	var SharedStorage = __webpack_require__(6);

	var foodStorage = "food-calories";
	var exerciseStorage = "exercise-calories";
	var dailyExerciseStorage = "daily-exercise";
	var breakfastStorage = "daily-breakfast";
	var lunchStorage = "daily-lunch";
	var dinnerStorage = "daily-dinner";
	var snackStorage = "daily-snack";

	//Diary Exercises
	$('#add-selected-exercise').on('click', function () {
	  var checkedExercises = $('#diary-exercise-body > tr').filter(':has(:checkbox:checked)');
	  var deleteButton = "<td><i class='material-icons delete-btn'>delete</i></td>";
	  var newRow = checkedExercises.clone().append(deleteButton);

	  $('#daily-exercise-body > tr:first').before(newRow);
	  $('#daily-exercise-table tbody tr td label').parent().remove();

	  checkedExercises.each(function () {
	    var name = $(this).find('td:nth-child(1)').text();
	    var calories = $(this).find('td:nth-child(2)').text();
	    var storage = new Storage(dailyExerciseStorage, name, calories);
	    storage.store();

	    // Update new global storage
	    var currentDay = $('#date-header').text();
	    SharedStorage.updateDayLog(currentDay, 'dailyExercise', storage);
	    // SharedStorage.updateMasterStorage('dailyExercise', dailyExerciseStorage);
	  });
	  Shared.clearCheckboxes('exercise-checkbox');
	  Calories.addCalories('daily-exercise-body', 'exercise-total-calories');
	  Calories.totalCaloriesBurned();
	  Calories.totalCaloriesRemaining();
	});

	// Delete Daily Exercise
	$('#daily-exercise-table').on('click', '.delete-btn', function (row) {
	  var rowIndex = $(this).parent().parent()[0].rowIndex;
	  var name = $('#daily-exercise-table')[0].rows[rowIndex].cells[0].innerHTML;
	  var calories = $('#daily-exercise-table')[0].rows[rowIndex].cells[1].innerHTML;

	  var storage = new Storage(dailyExerciseStorage, name, calories);
	  storage.delete();
	  // SharedStorage.updateMasterStorage('dailyExercise', dailyExerciseStorage);
	  var currentDay = $('#date-header').text();
	  SharedStorage.deleteDayLog(currentDay, 'dailyExercise', storage);

	  $('#daily-exercise-table')[0].deleteRow(rowIndex);
	  Calories.addCalories('daily-exercise-body', 'exercise-total-calories');
	});

	// Delete Daily Breakfast
	$('#breakfast-table').on('click', '.delete-btn', function (row) {

	  SharedStorage.deleteDaily(this, 'breakfast-table', breakfastStorage, 'breakfast');
	  Calories.addCalories('breakfast-body', 'breakfast-total-calories');
	  Calories.updateRemaining('breakfast', 400);
	});

	// Delete Daily Lunch
	$('#lunch-table').on('click', '.delete-btn', function (row) {

	  SharedStorage.deleteDaily(this, 'lunch-table', lunchStorage, 'lunch');
	  Calories.addCalories('lunch-body', 'lunch-total-calories');
	  Calories.updateRemaining('lunch', 600);
	});

	// Delete Daily Dinner
	$('#dinner-table').on('click', '.delete-btn', function (row) {
	  SharedStorage.deleteDaily(this, 'dinner-table', dinnerStorage, 'dinner');
	  Calories.addCalories('dinner-body', 'dinner-total-calories');
	  Calories.updateRemaining('dinner', 800);
	});

	// Delete Daily Snack
	$('#snack-table').on('click', '.delete-btn', function (row) {

	  SharedStorage.deleteDaily(this, 'snack-table', snackStorage, 'dinner');
	  Calories.addCalories('snack-body', 'snack-total-calories');
	  Calories.updateRemaining('snack', 200);
	});

	//Diary foods- breakfast
	$('#add-breakfast').on('click', function () {
	  Shared.addToMeals('breakfast-body', 'breakfast-total-calories');
	  Calories.updateRemaining('breakfast', 400);
	});

	//Diary foods- lunch
	$('#add-lunch').on('click', function () {
	  Shared.addToMeals('lunch-body', 'lunch-total-calories');
	  Calories.updateRemaining('lunch', 600);
	});

	//Diary foods- dinner
	$('#add-dinner').on('click', function () {
	  Shared.addToMeals('dinner-body', 'dinner-total-calories');
	  Calories.updateRemaining('dinner', 800);
	});

	//Diary foods- snack
	$('#add-snack').on('click', function () {
	  Shared.addToMeals('snack-body', 'snack-total-calories');
	  Calories.updateRemaining('snack', 200);
	});

	//Diary date
	function setDateHeader() {
	  var todaysDate = new Date();
	  document.getElementById('date-header').innerHTML = todaysDate.toLocaleDateString();;
	}

	// Filter Exercise
	$("#diary-food-filter").keyup(function () {
	  Shared.filterTable($(this), "diary-food-body");
	});

	$("#diary-exercise-filter").keyup(function () {
	  Shared.filterTable($(this), "diary-exercise-body");
	});

	// Change dates
	function changeDates() {
	  var date = new Date();

	  $("#next-day").on("click", function (e) {
	    date.setDate(date.getDate() + 1);
	    document.getElementById('date-header').innerHTML = date.toLocaleDateString();
	    displayDayAndCalories();
	  });

	  $("#previous-day").on("click", function (e) {
	    date.setDate(date.getDate() - 1);
	    document.getElementById('date-header').innerHTML = date.toLocaleDateString();
	    displayDayAndCalories();
	  });
	}

	function displayDayAndCalories() {
	  SharedStorage.getToday();
	  SharedStorage.displayAllLogs();
	  Calories.displayAllCalories();
	  Calories.updateRemaining('snack', 200);
	  Calories.updateRemaining('breakfast', 400);
	  Calories.updateRemaining('lunch', 600);
	  Calories.updateRemaining('dinner', 800);

	  // totals table
	  Calories.totalCaloriesConsumed();
	  Calories.totalCaloriesBurned();
	  Calories.totalCaloriesRemaining();
	}

	$(document).ready(function () {
	  Shared.displayItems(foodStorage, "food-table");
	  Shared.displayItems(exerciseStorage, "exercise-table");

	  // diary
	  Shared.displayItems(foodStorage, "diary-food-table");
	  Shared.displayItems(exerciseStorage, "diary-exercise-table");

	  setDateHeader();
	  displayDayAndCalories();

	  changeDates();
	});

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";

	class Exercise {
	  constructor(name, calories) {
	    this.name = name;
	    this.calories = calories;
	  }

	  store() {
	    var currentExercises = this.getStorage();
	    currentExercises.push({ name: this.name, calories: this.calories });

	    var exercisesJSON = JSON.stringify(currentExercises);
	    localStorage.setItem("exercise-calories", exercisesJSON);
	  }

	  update(oldName, oldCalories) {
	    var currentExercises = this.getStorage();
	    var newName = this.name;
	    var newCalories = this.calories;

	    for (var i = 0; i < currentExercises.length; i++) {
	      if (currentExercises[i].name == oldName && currentExercises[i].calories == oldCalories) {
	        currentExercises[i].name = newName;
	        currentExercises[i].calories = newCalories;

	        var exercisesJSON = JSON.stringify(currentExercises);
	        localStorage.setItem("exercise-calories", exercisesJSON);
	      }
	    }
	  }

	  delete() {
	    var currentExercises = this.getStorage();
	    var nameDelete = this.name;
	    var caloriesDelete = this.calories;

	    currentExercises.forEach(function (element) {
	      if (element.name == nameDelete && element.calories == caloriesDelete) {
	        currentExercises.splice(currentExercises.indexOf(element), 1);

	        var exercisesJSON = JSON.stringify(currentExercises);
	        localStorage.setItem("exercise-calories", exercisesJSON);
	      }
	    });
	  }

	  getStorage() {
	    var currentExercises = localStorage.getItem("exercise-calories");
	    if (currentExercises === null) {
	      currentExercises = '[]';
	    }
	    return JSON.parse(currentExercises);
	  }
	}

	module.exports = Exercise;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	class Storage {
	  constructor(storageId, name = null, calories = null) {
	    this.name = name;
	    this.calories = calories;
	    this.storageId = storageId;
	  }

	  store() {
	    var meal = this.getStorage();
	    meal.push({ name: this.name, calories: this.calories });

	    var mealJSON = JSON.stringify(meal);
	    localStorage.setItem(this.storageId, mealJSON);
	  }

	  delete() {
	    var meal = this.getStorage();
	    var nameDelete = this.name;
	    var caloriesDelete = this.calories;
	    var storageId = this.storageId;

	    meal.forEach(function (element) {
	      if (element.name == nameDelete && element.calories == caloriesDelete) {
	        meal.splice(meal.indexOf(element), 1);

	        var mealJSON = JSON.stringify(meal);
	        localStorage.setItem(storageId, mealJSON);
	      }
	    });
	  }

	  getStorage() {
	    var meal = localStorage.getItem(this.storageId);
	    if (meal === null) {
	      meal = '[]';
	    }
	    return JSON.parse(meal);
	  }

	  setEmptyStorage() {
	    var meal = localStorage.getItem(this.storageId);
	    if (meal === null) {
	      meal = '[]';
	    }
	    localStorage.setItem(this.storageId, meal);
	  }
	}

	module.exports = Storage;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Storage = __webpack_require__(3);
	var Calories = __webpack_require__(5);

	var foodStorage = "food-calories";
	var exerciseStorage = "exercise-calories";
	var dailyExerciseStorage = "daily-exercise";
	var breakfastStorage = "daily-breakfast";
	var lunchStorage = "daily-lunch";
	var dinnerStorage = "daily-dinner";
	var snackStorage = "daily-snack";

	// Display Table
	function displayItems(storageId, tableId) {
	  var storage = new Storage(storageId, '', '');
	  storage.setEmptyStorage();

	  JSON.parse(localStorage.getItem(storageId)).forEach(function (element) {
	    addToTable(tableId, element.name, element.calories);
	  });
	}

	// Add Item Table to Page
	function addToTable(tableId, name, calories) {
	  var rowIndex = $(`#${tableId} > tbody > tr`).length;
	  var checkBoxFood = `<td><input type='checkbox' class='filled-in food-checkbox' id='food-${rowIndex}'/><label for='food-${rowIndex}'></label></td>`;
	  var checkBoxExercise = `<td><input type='checkbox' class='filled-in exercise-checkbox' id='exercise-${rowIndex}'/><label for='exercise-${rowIndex}'></label></td>`;
	  var deleteButton = "<td><i class='material-icons delete-btn'>delete</i></td>";
	  var itemData = `<tr><td class='edit-cell'>${name}</td><td class='edit-cell'>${calories}</td>${deleteButton}</tr>`;
	  var diaryFoodData = `<tr><td>${name}</td><td>${calories}</td>${checkBoxFood}</tr>`;
	  var diaryExerciseData = `<tr><td>${name}</td><td>${calories}</td>${checkBoxExercise}</tr>`;

	  if (tableId.includes("diary-food")) {
	    $(`#${tableId} > tbody > tr:first`).before(diaryFoodData);
	  } else if (tableId.includes("diary-exercise")) {
	    $(`#${tableId} > tbody > tr:first`).before(diaryExerciseData);
	  } else {
	    $(`#${tableId} > tbody > tr:first`).before(itemData);
	  }
	}

	// Clear contents
	function clearContents(nameId, caloriesId, nameWarningId, caloriesWarningId) {
	  $(`#${nameId}`).val('');
	  $(`#${caloriesId}`).val('');
	  $(`#${nameWarningId}`).empty();
	  $(`#${caloriesWarningId}`).empty();
	}

	// Clear checkboxes
	function clearCheckboxes(checkboxClass) {
	  $(`.${checkboxClass}`).prop('checked', false);
	}

	// Add to Meal Logs
	function addToMeals(bodyId, calorieId) {
	  var checkedFoods = $('#diary-food-body > tr').filter(':has(:checkbox:checked)');
	  var deleteButton = "<td><i class='material-icons delete-btn'>delete</i></td>";
	  var newRow = checkedFoods.clone().append(deleteButton);

	  $(`#${bodyId} > tr:first`).before(newRow);
	  $(`#${bodyId} tr td input`).remove();
	  $(`#${bodyId} tr td label`).parent().remove();

	  checkedFoods.each(function () {
	    var name = $(this).find('td:nth-child(1)').text();
	    var calories = $(this).find('td:nth-child(2)').text();
	    var storageId;
	    var storageKey;

	    if (bodyId.includes("breakfast")) {
	      storageId = breakfastStorage;
	      storageKey = 'breakfast';
	    } else if (bodyId.includes("lunch")) {
	      storageId = lunchStorage;
	      storageKey = 'lunch';
	    } else if (bodyId.includes("dinner")) {
	      storageId = dinnerStorage;
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
	function filterTable(self, bodyId) {
	  var rows = $(`#${bodyId}`).find("tr").hide();

	  if (self[0].value.length) {
	    var data = self[0].value.split(" ");

	    $.each(data, function (index, value) {
	      rows.filter(function () {
	        return $(this).text().toLowerCase().indexOf(value.toLowerCase()) > -1;
	      }).show();
	    });
	  } else {
	    rows.show();
	  }
	}

	// Format Date
	function formatTodayDate() {
	  var today = new Date();
	  var dd = today.getDate();
	  var mm = today.getMonth() + 1;
	  var yyyy = today.getFullYear();

	  if (dd < 10) {
	    dd = '0' + dd;
	  }
	  if (mm < 10) {
	    mm = '0' + mm;
	  }
	  today = mm + '/' + dd + '/' + yyyy;
	  return today;
	}

	// Clear Tables for appending for other days
	function clearTable(tableId) {
	  $(`#${tableId} tbody tr td`).remove();
	}

	// Clear all tables
	function clearAllTables() {
	  clearTable('breakfast-table');
	  clearTable('lunch-table');
	  clearTable('dinner-table');
	  clearTable('snack-table');
	  clearTable('daily-exercise-table');
	}

	function updateDayLog(currentDay, storageKey, storage) {
	  // var newStorage = storage;
	  var todaysLog = JSON.parse(localStorage.getItem(currentDay));

	  if (storageKey == 'breakfast') {
	    todaysLog[0][storageKey].push({ name: storage.name, calories: storage.calories });
	  }
	  if (storageKey == 'lunch') {
	    todaysLog[1][storageKey].push({ name: storage.name, calories: storage.calories });
	  }
	  if (storageKey == 'dinner') {
	    todaysLog[2][storageKey].push({ name: storage.name, calories: storage.calories });
	  }
	  if (storageKey == 'snack') {
	    todaysLog[3][storageKey].push({ name: storage.name, calories: storage.calories });
	  }
	  if (storageKey == 'dailyExercise') {
	    todaysLog[4][storageKey].push({ name: storage.name, calories: storage.calories });
	  }

	  localStorage.setItem(currentDay, JSON.stringify(todaysLog));
	}

	function deleteDayLog(currentDay, storageKey, storage) {
	  var todaysLog = JSON.parse(localStorage.getItem(currentDay));
	  if (storageKey == 'breakfast') {
	    var log = todaysLog[0][storageKey];
	    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
	  }
	  if (storageKey == 'lunch') {
	    var log = todaysLog[1][storageKey];
	    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
	  }
	  if (storageKey == 'dinner') {
	    var log = todaysLog[2][storageKey];
	    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
	  }
	  if (storageKey == 'snack') {
	    var log = todaysLog[3][storageKey];
	    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
	  }
	  if (storageKey == 'dailyExercise') {
	    var log = todaysLog[4][storageKey];
	    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
	  }
	}

	function deleteIndividual(currentDay, storageKey, storage, log, todaysLog) {
	  for (var i = 0; i < log.length; i++) {
	    if (log[i].name == storage.name && log[i].calories == storage.calories) {
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
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	function addCalories(table, calorieID) {
	  var sum = 0;
	  var cells = document.querySelectorAll(`#${table} tr td:nth-of-type(2)`);

	  for (var i = 0; i < cells.length; i++) {
	    sum += parseFloat(cells[i].firstChild.data);
	  }
	  document.getElementById(`${calorieID}`).innerHTML = sum;
	  totalCaloriesConsumed();
	  totalCaloriesBurned();
	  totalCaloriesRemaining();
	}

	function displayAllCalories() {
	  addCalories('daily-exercise-body', 'exercise-total-calories');
	  addCalories('breakfast-body', 'breakfast-total-calories');
	  addCalories('lunch-body', 'lunch-total-calories');
	  addCalories('dinner-body', 'dinner-total-calories');
	  addCalories('snack-body', 'snack-total-calories');
	}

	function updateRemaining(meal, calories) {
	  var totalCalories = $(`#${meal}-total-calories`).html();
	  var newRemaining = calories - Number(totalCalories);

	  if (newRemaining < 0) {
	    $(`#${meal}-remaining-calories`).addClass('red-text');
	  } else {
	    $(`#${meal}-remaining-calories`).removeClass('red-text').addClass('green-text');
	  }

	  document.getElementById(`${meal}-remaining-calories`).innerHTML = newRemaining.toString();
	}

	function totalCaloriesConsumed() {
	  var breakfastTotal = Number($('#breakfast-total-calories').html());
	  var lunchTotal = Number($('#lunch-total-calories').html());
	  var dinnerTotal = Number($('#dinner-total-calories').html());
	  var snackTotal = Number($('#snack-total-calories').html());
	  var totalConsumed = breakfastTotal + lunchTotal + dinnerTotal + snackTotal;
	  document.getElementById('total-consumed-calories').innerHTML = totalConsumed.toString();
	}

	function totalCaloriesBurned() {
	  var exerciseTotal = $('#exercise-total-calories').html();

	  if (exerciseTotal > 0) {
	    $('#total-burned-calories').addClass('green-text');
	    $('#exercise-total-calories').addClass('green-text');
	  }

	  document.getElementById('total-burned-calories').innerHTML = exerciseTotal;
	}

	function totalCaloriesRemaining() {
	  var totalGoal = 2000;
	  var totalConsumed = Number($('#total-consumed-calories').html());
	  var totalBurned = Number($('#exercise-total-calories').html());
	  var totalRemaining = totalGoal - totalConsumed + totalBurned;

	  if (totalRemaining < 0) {
	    $('#total-remaining-calories').addClass('red-text');
	  } else {
	    $('#total-remaining-calories').removeClass('red-text').addClass('green-text');
	  }

	  document.getElementById('total-remaining-calories').innerHTML = totalRemaining.toString();
	}

	module.exports = {
	  addCalories: addCalories,
	  displayAllCalories: displayAllCalories,
	  updateRemaining: updateRemaining,
	  totalCaloriesConsumed: totalCaloriesConsumed,
	  totalCaloriesBurned: totalCaloriesBurned,
	  totalCaloriesRemaining: totalCaloriesRemaining
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Shared = __webpack_require__(4);
	var Storage = __webpack_require__(3);
	var foodStorage = "food-calories";
	var exerciseStorage = "exercise-calories";
	var dailyExerciseStorage = "daily-exercise";
	var breakfastStorage = "daily-breakfast";
	var lunchStorage = "daily-lunch";
	var dinnerStorage = "daily-dinner";
	var snackStorage = "daily-snack";

	function displayAllLogs() {
	  var todaysDate = $('#date-header').text();
	  var todayParse = JSON.parse(localStorage.getItem(todaysDate));

	  Shared.clearAllTables();

	  var todayBreakfast = todayParse[0].breakfast;
	  for (var i = 0; i < todayBreakfast.length; i++) {
	    if (todayBreakfast.length > 0) {
	      Shared.addToTable('breakfast-table', todayBreakfast[i].name, todayBreakfast[i].calories);
	    }
	  }

	  var todayLunch = todayParse[1].lunch;
	  for (var i = 0; i < todayLunch.length; i++) {
	    if (todayLunch.length > 0) {
	      Shared.addToTable('lunch-table', todayLunch[i].name, todayLunch[i].calories);
	    }
	  }

	  var todayDinner = todayParse[2].dinner;
	  for (var i = 0; i < todayDinner.length; i++) {
	    if (todayDinner.length > 0) {
	      Shared.addToTable('dinner-table', todayDinner[i].name, todayDinner[i].calories);
	    }
	  }

	  var todaySnack = todayParse[3].snack;
	  for (var i = 0; i < todaySnack.length; i++) {
	    if (todaySnack.length > 0) {
	      Shared.addToTable('snack-table', todaySnack[i].name, todaySnack[i].calories);
	    }
	  }

	  var todayExercise = todayParse[4].dailyExercise;
	  for (var i = 0; i < todayExercise.length; i++) {
	    if (todayExercise.length > 0) {
	      Shared.addToTable('daily-exercise-table', todayExercise[i].name, todayExercise[i].calories);
	    }
	  }
	}

	function updateMasterStorage(storageKey, oldName, oldCalories, newName, newCalories) {
	  var currentDay;
	  for (var i = 0; i < localStorage.length; i++) {
	    if (localStorage.key(i).includes('/')) {
	      currentDay = localStorage.key(i);
	      var todaysLog = JSON.parse(localStorage.getItem(currentDay));

	      if (storageKey == 'breakfast') {
	        var log = todaysLog[0][storageKey];
	        if (log.length > 0) {
	          updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog);
	        }
	      }
	      if (storageKey == 'lunch') {
	        var log = todaysLog[1][storageKey];
	        if (log.length > 0) {
	          updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog);
	        }
	      }
	      if (storageKey == 'dinner') {
	        var log = todaysLog[2][storageKey];
	        if (log.length > 0) {
	          updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog);
	        }
	      }
	      if (storageKey == 'snack') {
	        var log = todaysLog[3][storageKey];
	        if (log.length > 0) {
	          updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog);
	        }
	      }
	      if (storageKey == 'dailyExercise') {
	        var log = todaysLog[4][storageKey];
	        if (log.length > 0) {
	          updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog);
	        }
	      }
	    }
	  }
	}

	function updateMasterIndividual(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog) {
	  for (var i = 0; i < log.length; i++) {
	    if (log[i].name == oldName && log[i].calories == oldCalories) {
	      log[i].name = newName;
	      log[i].calories = newCalories;
	      localStorage.setItem(currentDay, JSON.stringify(todaysLog));
	    }
	  }
	}

	function updateAllMeals(oldName, oldCalories, newName, newCalories) {
	  updateMasterStorage('breakfast', oldName, oldCalories, newName, newCalories);
	  updateMasterStorage('lunch', oldName, oldCalories, newName, newCalories);
	  updateMasterStorage('dinner', oldName, oldCalories, newName, newCalories);
	  updateMasterStorage('snack', oldName, oldCalories, newName, newCalories);
	}

	function updateDayLog(currentDay, storageKey, storage) {
	  // var newStorage = storage;
	  var todaysLog = JSON.parse(localStorage.getItem(currentDay));

	  if (storageKey == 'breakfast') {
	    todaysLog[0][storageKey].push({ name: storage.name, calories: storage.calories });
	  }
	  if (storageKey == 'lunch') {
	    todaysLog[1][storageKey].push({ name: storage.name, calories: storage.calories });
	  }
	  if (storageKey == 'dinner') {
	    todaysLog[2][storageKey].push({ name: storage.name, calories: storage.calories });
	  }
	  if (storageKey == 'snack') {
	    todaysLog[3][storageKey].push({ name: storage.name, calories: storage.calories });
	  }
	  if (storageKey == 'dailyExercise') {
	    todaysLog[4][storageKey].push({ name: storage.name, calories: storage.calories });
	  }

	  localStorage.setItem(currentDay, JSON.stringify(todaysLog));
	}

	function deleteDayLog(currentDay, storageKey, storage) {
	  var todaysLog = JSON.parse(localStorage.getItem(currentDay));
	  if (storageKey == 'breakfast') {
	    var log = todaysLog[0][storageKey];
	    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
	  }
	  if (storageKey == 'lunch') {
	    var log = todaysLog[1][storageKey];
	    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
	  }
	  if (storageKey == 'dinner') {
	    var log = todaysLog[2][storageKey];
	    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
	  }
	  if (storageKey == 'snack') {
	    var log = todaysLog[3][storageKey];
	    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
	  }
	  if (storageKey == 'dailyExercise') {
	    var log = todaysLog[4][storageKey];
	    deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
	  }
	}

	function deleteIndividual(currentDay, storageKey, storage, log, todaysLog) {
	  for (var i = 0; i < log.length; i++) {
	    if (log[i].name == storage.name && log[i].calories == storage.calories) {
	      log.splice(log.indexOf(log[i]), 1);
	      localStorage.setItem(currentDay, JSON.stringify(todaysLog));
	    }
	  }
	}

	function setEmptyValues() {
	  var currentDay = $('#date-header').text();
	  var todayJSON = JSON.parse(localStorage.getItem(currentDay));
	  // create initial storage
	  if (todayJSON.length == 0) {
	    todayJSON = [{ breakfast: [] }, { lunch: [] }, { dinner: [] }, { snack: [] }, { dailyExercise: [] }];
	  }

	  // create intial keys
	  if (todayJSON[0].breakfast == null) {
	    todayJSON[0].breakfast = [];
	  }
	  if (todayJSON[1].lunch == null) {
	    todayJSON[1].lunch = [];
	  }
	  if (todayJSON[2].dinner == null) {
	    todayJSON[2].dinner = [];
	  }
	  if (todayJSON[3].snack == null) {
	    todayJSON[3].snack = [];
	  }
	  if (todayJSON[4].dailyExercise == null) {
	    todayJSON[4].dailyExercise = [];
	  }

	  localStorage.setItem(currentDay, JSON.stringify(todayJSON));
	}

	function getToday() {
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

	function updateToday(storageId, meal) {
	  var todaysDate = $('#date-header').text();
	  var mealJSON = JSON.parse(localStorage.getItem(storageId));
	  var todayParse = JSON.parse(localStorage.getItem(todaysDate));
	  var mealArray = [];

	  for (var i = 0; i < todayParse.length; i++) {
	    for (var storageMeal in todayParse[i]) {
	      mealArray.push(storageMeal);
	    }
	  }

	  if (mealArray.indexOf(meal) > -1) {
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
	function updateDaily(storageID, oldName, oldCalories, newName, newCalories) {
	  var dailyMeal = JSON.parse(localStorage.getItem(storageID));
	  dailyMeal.forEach(function (element) {
	    if (element.name == oldName && element.calories == oldCalories) {
	      element.name = newName;
	      element.calories = newCalories;

	      var dailyMealJSON = JSON.stringify(dailyMeal);
	      localStorage.setItem(storageID, dailyMealJSON);
	    }
	  });
	}

	function updateDailyMeals(oldName, oldCalories, newName, newCalories) {
	  updateDaily(breakfastStorage, oldName, oldCalories, newName, newCalories);
	  updateDaily(lunchStorage, oldName, oldCalories, newName, newCalories);
	  updateDaily(dinnerStorage, oldName, oldCalories, newName, newCalories);
	  updateDaily(snackStorage, oldName, oldCalories, newName, newCalories);
	}

	// Delete from log
	function deleteDaily(self, tableId, storageId, storageKey) {
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
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	class Food {
	  constructor(name, calories) {
	    this.name = name;
	    this.calories = calories;
	  }

	  store() {
	    var currentFoods = this.getStorage();
	    currentFoods.push({ name: this.name, calories: this.calories });

	    var foodsJSON = JSON.stringify(currentFoods);
	    localStorage.setItem("food-calories", foodsJSON);
	  }

	  update(oldName, oldCalories) {
	    var currentFoods = this.getStorage();
	    var newName = this.name;
	    var newCalories = this.calories;

	    for (var i = 0; i < currentFoods.length; i++) {
	      if (currentFoods[i].name == oldName && currentFoods[i].calories == oldCalories) {
	        currentFoods[i].name = newName;
	        currentFoods[i].calories = newCalories;

	        var foodsJSON = JSON.stringify(currentFoods);
	        localStorage.setItem("food-calories", foodsJSON);
	      }
	    }
	  }

	  delete() {
	    var currentFoods = this.getStorage();
	    var nameDelete = this.name;
	    var caloriesDelete = this.calories;

	    currentFoods.forEach(function (element) {
	      if (element.name == nameDelete && element.calories == caloriesDelete) {
	        currentFoods.splice(currentFoods.indexOf(element), 1);

	        var foodsJSON = JSON.stringify(currentFoods);
	        localStorage.setItem("food-calories", foodsJSON);
	      }
	    });
	  }

	  getStorage() {
	    var currentFoods = localStorage.getItem("food-calories");
	    if (currentFoods === null) {
	      currentFoods = '[]';
	    }
	    return JSON.parse(currentFoods);
	  }
	}

	module.exports = Food;

/***/ }
/******/ ]);