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
	var GlobalStorage = __webpack_require__(4);
	var Shared = __webpack_require__(5);
	var Calories = __webpack_require__(6);
	var SharedStorage = __webpack_require__(8);

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
	  var currentDay = $('#date-header').text();
	  var globalStorage = new GlobalStorage(currentDay);

	  $('#daily-exercise-body > tr:first').before(newRow);
	  $('#daily-exercise-table tbody tr td label').parent().remove();

	  checkedExercises.each(function () {
	    var name = $(this).find('td:nth-child(1)').text();
	    var calories = $(this).find('td:nth-child(2)').text();

	    var storage = new Storage(dailyExerciseStorage, name, calories);
	    storage.store();

	    globalStorage.updateDayLog('dailyExercise', storage);
	  });
	  Shared.clearCheckboxes('exercise-checkbox');
	  Calories.addCalories('daily-exercise-body', 'exercise-total-calories');
	  Calories.totalCaloriesBurned();
	  Calories.totalCaloriesRemaining();

	  globalStorage.updateIds(currentDay, 'daily-exercise-body', 'dailyExercise', 4);
	});

	// Delete Daily Exercise
	$('#daily-exercise-table').on('click', '.delete-btn', function (row) {
	  var rowIndex = $(this).parent().parent()[0].rowIndex;
	  var name = $('#daily-exercise-table')[0].rows[rowIndex].cells[0].innerHTML;
	  var calories = $('#daily-exercise-table')[0].rows[rowIndex].cells[1].innerHTML;

	  var storage = new Storage(dailyExerciseStorage, name, calories);
	  storage.delete();

	  var currentDay = $('#date-header').text();
	  var globalStorage = new GlobalStorage(currentDay);
	  globalStorage.deleteDayLog('dailyExercise', storage, rowIndex);

	  $('#daily-exercise-table')[0].deleteRow(rowIndex);
	  Calories.addCalories('daily-exercise-body', 'exercise-total-calories');
	  globalStorage.updateIds(currentDay, 'daily-exercise-body', 'dailyExercise', 4);
	});

	// Delete Daily Breakfast
	$('#breakfast-table').on('click', '.delete-btn', function (row) {
	  SharedStorage.deleteFromMeals(this, 'breakfast-table', breakfastStorage, 'breakfast', 0);
	  Calories.addCalories('breakfast-body', 'breakfast-total-calories');
	  Calories.updateRemaining('breakfast', 400);
	});

	// Delete Daily Lunch
	$('#lunch-table').on('click', '.delete-btn', function (row) {
	  SharedStorage.deleteFromMeals(this, 'lunch-table', lunchStorage, 'lunch', 1);
	  Calories.addCalories('lunch-body', 'lunch-total-calories');
	  Calories.updateRemaining('lunch', 600);
	});

	// Delete Daily Dinner
	$('#dinner-table').on('click', '.delete-btn', function (row) {
	  SharedStorage.deleteFromMeals(this, 'dinner-table', dinnerStorage, 'dinner', 2);
	  Calories.addCalories('dinner-body', 'dinner-total-calories');
	  Calories.updateRemaining('dinner', 800);
	});

	// Delete Daily Snack
	$('#snack-table').on('click', '.delete-btn', function (row) {
	  SharedStorage.deleteFromMeals(this, 'snack-table', snackStorage, 'snack', 3);
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

	$('#food-calories-table-header').on('click', function (e) {
	  Shared.sortTable(foodStorage, 'diary-food-table');
	});

	$('#exercise-calories-table-header').on('click', function (e) {
	  Shared.sortTable(exerciseStorage, 'diary-exercise-table');
	});

	$(document).ready(function () {
	  Shared.displayItems(foodStorage, "food-table");
	  Shared.displayItems(exerciseStorage, "exercise-table");

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
/***/ function(module, exports) {

	class GlobalStorage {
	  constructor(currentDay = null) {
	    this.currentDay = currentDay;
	  }

	  setInitialStorage() {
	    var todayJSON = JSON.parse(localStorage.getItem(this.currentDay));
	    if (todayJSON == null) {
	      todayJSON = [{ breakfast: [] }, { lunch: [] }, { dinner: [] }, { snack: [] }, { dailyExercise: [] }];
	    }
	    localStorage.setItem(this.currentDay, JSON.stringify(todayJSON));
	  }

	  // Instance Methods
	  updateDayLog(storageKey, storage) {
	    var currentDay = this.currentDay;
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

	  deleteDayLog(storageKey, storage, rowIndex) {
	    var currentDay = this.currentDay;
	    var todaysLog = JSON.parse(localStorage.getItem(currentDay));

	    if (storageKey == 'breakfast') {
	      var log = todaysLog[0][storageKey];
	      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex);
	    }
	    if (storageKey == 'lunch') {
	      var log = todaysLog[1][storageKey];
	      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex);
	    }
	    if (storageKey == 'dinner') {
	      var log = todaysLog[2][storageKey];
	      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex);
	    }
	    if (storageKey == 'snack') {
	      var log = todaysLog[3][storageKey];
	      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex);
	    }
	    if (storageKey == 'dailyExercise') {
	      var log = todaysLog[4][storageKey];
	      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex);
	    }
	  }

	  deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex) {
	    for (var i = 0; i < log.length; i++) {
	      if (log[i].id == rowIndex) {
	        log.splice(log.indexOf(log[i]), 1);
	        localStorage.setItem(currentDay, JSON.stringify(todaysLog));
	      }
	    }
	  }

	  // Class Methods
	  updateFromDaily(storageId, item) {
	    var todaysDate = this.currentDay;
	    var itemJSON = JSON.parse(localStorage.getItem(storageId));
	    var todayParse = JSON.parse(localStorage.getItem(todaysDate));
	    var itemArray = [];

	    for (var i = 0; i < todayParse.length; i++) {
	      for (var storageMeal in todayParse[i]) {
	        itemArray.push(storageMeal);
	      }
	    }

	    if (itemArray.indexOf(item) > -1) {
	      return;
	    } else {
	      var itemObject = {};
	      itemObject[item] = itemJSON;
	      todayParse.push(itemObject);

	      var todayJSON = JSON.stringify(todayParse);
	      localStorage.setItem(todaysDate, todayJSON);
	    }
	  }

	  updateAll(storageKey, oldName, oldCalories, newName, newCalories) {
	    var currentDay;
	    for (var i = 0; i < localStorage.length; i++) {
	      if (localStorage.key(i).includes('/')) {
	        currentDay = localStorage.key(i);
	        var todaysLog = JSON.parse(localStorage.getItem(currentDay));

	        if (storageKey == 'breakfast') {
	          var log = todaysLog[0][storageKey];
	          if (log.length > 0) {
	            this.updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog);
	          }
	        }
	        if (storageKey == 'lunch') {
	          var log = todaysLog[1][storageKey];
	          if (log.length > 0) {
	            this.updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog);
	          }
	        }
	        if (storageKey == 'dinner') {
	          var log = todaysLog[2][storageKey];
	          if (log.length > 0) {
	            this.updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog);
	          }
	        }
	        if (storageKey == 'snack') {
	          var log = todaysLog[3][storageKey];
	          if (log.length > 0) {
	            this.updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog);
	          }
	        }
	        if (storageKey == 'dailyExercise') {
	          var log = todaysLog[4][storageKey];
	          if (log.length > 0) {
	            this.updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog);
	          }
	        }
	      }
	    }
	  }

	  updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog) {
	    for (var i = 0; i < log.length; i++) {
	      if (log[i].name == oldName && log[i].calories == oldCalories) {
	        log[i].name = newName;
	        log[i].calories = newCalories;
	        localStorage.setItem(currentDay, JSON.stringify(todaysLog));
	      }
	    }
	  }

	  updateIds(currentDay, tableBodyId, storageKey, logIndex) {
	    var todaysLog = JSON.parse(localStorage.getItem(currentDay));
	    if (storageKey == "breakfast") {
	      todaysLog[0][storageKey] = [];
	      this.updateIndividual(currentDay, 'breakfast-body', storageKey, 0, todaysLog);
	    };
	    if (storageKey == "lunch") {
	      todaysLog[1][storageKey] = [];
	      this.updateIndividual(currentDay, 'lunch-body', storageKey, 1, todaysLog);
	    };
	    if (storageKey == "dinner") {
	      todaysLog[2][storageKey] = [];
	      this.updateIndividual(currentDay, 'dinner-body', storageKey, 2, todaysLog);
	    };
	    if (storageKey == "snack") {
	      todaysLog[3][storageKey] = [];
	      this.updateIndividual(currentDay, 'snack-body', storageKey, 3, todaysLog);
	    };
	    if (storageKey == "dailyExercise") {
	      todaysLog[4][storageKey] = [];
	      this.updateIndividual(currentDay, 'daily-exercise-body', storageKey, 4, todaysLog);
	    };
	  }

	  updateIndividual(currentDay, tableBodyId, storageKey, logIndex, todaysLog) {
	    $(`#${tableBodyId} > tr`).each(function (index) {
	      var name = $(this).find('td:nth-child(1)').text();
	      var calories = $(this).find('td:nth-child(2)').text();

	      if (name != "" && calories != "") {
	        todaysLog[logIndex][storageKey].push({ name: name, calories: calories, id: index + 1 });
	        localStorage.setItem(currentDay, JSON.stringify(todaysLog));
	      }
	    });
	  }
	}

	module.exports = GlobalStorage;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Storage = __webpack_require__(3);
	var GlobalStorage = __webpack_require__(4);
	var Calories = __webpack_require__(6);

	var breakfastStorage = "daily-breakfast";
	var lunchStorage = "daily-lunch";
	var dinnerStorage = "daily-dinner";
	var snackStorage = "daily-snack";

	// Display Table
	function displayItems(storageId, tableId) {
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
	    items = _.orderBy(items, function (i) {
	      return parseInt(i.calories);
	    }, 'desc');
	    $('#' + tableId).data('sort', 'desc');
	  } else if (sort === 'desc') {
	    $('#' + tableId).data('sort', null);
	  } else {
	    items = _.orderBy(items, function (i) {
	      return parseInt(i.calories);
	    }, 'asc');
	    $('#' + tableId).data('sort', 'asc');
	  }

	  renderObjectsToTable(items, tableId);
	}

	function renderObjectsToTable(elements, tableId) {
	  elements.forEach(function (element) {
	    addToTable(tableId, element.name, element.calories);
	  });
	}

	// Add Item Table to Page
	function addToTable(tableId, name, calories) {
	  var rowIndex = $(`#${tableId} > tbody > tr`).length;
	  var checkBoxFood = `<td><input type='checkbox' class='filled-in food-checkbox' id='food-${rowIndex}'/><label for='food-${rowIndex}'></label></td>`;
	  var checkBoxExercise = `<td><input type='checkbox' class='filled-in exercise-checkbox' id='exercise-${rowIndex}'/><label for='exercise-${rowIndex}'></label></td>`;
	  var deleteButton = "<td class='btn-floating btn-small waves-effect waves-light indigo lighten-1'><i class='material-icons delete-btn'>delete</i></td>";
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
	    var tableBodyID;

	    if (bodyId.includes("breakfast")) {
	      storageId = breakfastStorage;
	      storageKey = 'breakfast';
	      tableBodyID = 'breakfast-body';
	    } else if (bodyId.includes("lunch")) {
	      storageId = lunchStorage;
	      storageKey = 'lunch';
	      tableBodyID = 'lunch-body';
	    } else if (bodyId.includes("dinner")) {
	      storageId = dinnerStorage;
	      storageKey = 'dinner';
	      tableBodyID = 'dinner-body';
	    } else {
	      storageId = snackStorage;
	      storageKey = 'snack';
	      tableBodyID = 'snack-body';
	    }

	    var storage = new Storage(storageId, name, calories);
	    storage.store();

	    var currentDay = $('#date-header').text();
	    var globalStorage = new GlobalStorage(currentDay);
	    globalStorage.updateDayLog(storageKey, storage);
	    globalStorage.updateIds(currentDay, storageKey, storageKey, 4);
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
	};

/***/ },
/* 6 */
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Shared = __webpack_require__(5);
	var Storage = __webpack_require__(3);
	var GlobalStorage = __webpack_require__(4);

	var dailyExerciseStorage = "daily-exercise";
	var breakfastStorage = "daily-breakfast";
	var lunchStorage = "daily-lunch";
	var dinnerStorage = "daily-dinner";
	var snackStorage = "daily-snack";

	// Set Page Date
	function getToday() {
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
	function displayAllLogs() {
	  var todaysDate = $('#date-header').text();
	  var todayParse = JSON.parse(localStorage.getItem(todaysDate));

	  Shared.clearAllTables();

	  var todayBreakfast = todayParse[0].breakfast;
	  for (var i = todayBreakfast.length - 1; i >= 0; i--) {
	    if (todayBreakfast.length > 0) {
	      Shared.addToTable('breakfast-table', todayBreakfast[i].name, todayBreakfast[i].calories);
	    }
	  }
	  var todayLunch = todayParse[1].lunch;
	  for (var i = todayLunch.length - 1; i >= 0; i--) {
	    if (todayLunch.length > 0) {
	      Shared.addToTable('lunch-table', todayLunch[i].name, todayLunch[i].calories);
	    }
	  }
	  var todayDinner = todayParse[2].dinner;
	  for (var i = todayDinner.length - 1; i >= 0; i--) {
	    if (todayDinner.length > 0) {
	      Shared.addToTable('dinner-table', todayDinner[i].name, todayDinner[i].calories);
	    }
	  }
	  var todaySnack = todayParse[3].snack;
	  for (var i = todaySnack.length - 1; i >= 0; i--) {
	    if (todaySnack.length > 0) {
	      Shared.addToTable('snack-table', todaySnack[i].name, todaySnack[i].calories);
	    }
	  }
	  var todayExercise = todayParse[4].dailyExercise;
	  for (var i = todayExercise.length - 1; i >= 0; i--) {
	    if (todayExercise.length > 0) {
	      Shared.addToTable('daily-exercise-table', todayExercise[i].name, todayExercise[i].calories);
	    }
	  }
	}

	// Update all meal storage
	function updateAllMeals(oldName, oldCalories, newName, newCalories) {
	  var globalStorage = new GlobalStorage();
	  globalStorage.updateAll('breakfast', oldName, oldCalories, newName, newCalories);
	  globalStorage.updateAll('lunch', oldName, oldCalories, newName, newCalories);
	  globalStorage.updateAll('dinner', oldName, oldCalories, newName, newCalories);
	  globalStorage.updateAll('snack', oldName, oldCalories, newName, newCalories);
	}

	// Delete from log
	function deleteFromMeals(self, tableId, storageId, storageKey, logIndex) {
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
	  displayAllLogs: displayAllLogs,
	  getToday: getToday,
	  updateAllMeals: updateAllMeals,
	  deleteFromMeals: deleteFromMeals
	};

/***/ }
/******/ ]);