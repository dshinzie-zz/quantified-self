class GlobalStorage {
  constructor(currentDay = null){
    this.currentDay = currentDay;
  }

  setInitialStorage(){
    var todayJSON = JSON.parse(localStorage.getItem(this.currentDay));
    if(todayJSON == null) {
      todayJSON = [
        { breakfast: []},
        { lunch: [] },
        { dinner: []} ,
        { snack: [] },
        { dailyExercise: [] }
      ];
    }
    localStorage.setItem(this.currentDay, JSON.stringify(todayJSON));
  }

  // Instance Methods
  updateDayLog(storageKey, storage){
    var currentDay = this.currentDay;
    var todaysLog = JSON.parse(localStorage.getItem(currentDay));

    if(storageKey == 'breakfast') { todaysLog[0][storageKey].push({ name: storage.name, calories: storage.calories }); }
    if(storageKey == 'lunch') { todaysLog[1][storageKey].push({ name: storage.name, calories: storage.calories }); }
    if(storageKey == 'dinner') { todaysLog[2][storageKey].push({ name: storage.name, calories: storage.calories }); }
    if(storageKey == 'snack') { todaysLog[3][storageKey].push({ name: storage.name, calories: storage.calories }); }
    if(storageKey == 'dailyExercise') { todaysLog[4][storageKey].push({ name: storage.name, calories: storage.calories }); }

    localStorage.setItem(currentDay, JSON.stringify(todaysLog));
  }

  deleteDayLog(storageKey, storage, rowIndex){
    var currentDay = this.currentDay;
    var todaysLog = JSON.parse(localStorage.getItem(currentDay));

    if(storageKey == 'breakfast') {
      var log = todaysLog[0][storageKey];
      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex);
    }
    if(storageKey == 'lunch') {
      var log = todaysLog[1][storageKey];
      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex);
    }
    if(storageKey == 'dinner') {
      var log = todaysLog[2][storageKey];
      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex);
    }
    if(storageKey == 'snack') {
      var log = todaysLog[3][storageKey];
      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex);
    }
    if(storageKey == 'dailyExercise') {
      var log = todaysLog[4][storageKey];
      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex);
    }
  }

  deleteIndividual(currentDay, storageKey, storage, log, todaysLog, rowIndex){
    for(var i = 0; i < log.length; i++){
      if(log[i].id == rowIndex){
        log.splice(log.indexOf(log[i]), 1);
        localStorage.setItem(currentDay, JSON.stringify(todaysLog));
      }
    }
  }

  // Class Methods
  updateFromDaily(storageId, item){
    var todaysDate = this.currentDay;
    var itemJSON = JSON.parse(localStorage.getItem(storageId));
    var todayParse = JSON.parse(localStorage.getItem(todaysDate));
    var itemArray = [];

    for(var i = 0; i < todayParse.length; i++) {
      for(var storageMeal in todayParse[i]) {
        itemArray.push(storageMeal);
      }
    }

    if(itemArray.indexOf(item) > -1){
      return;
    } else {
      var itemObject = {};
      itemObject[item] = itemJSON;
      todayParse.push(itemObject);

      var todayJSON = JSON.stringify(todayParse);
      localStorage.setItem(todaysDate, todayJSON);
    }
  }

  updateAll(storageKey, oldName, oldCalories, newName, newCalories){
    var currentDay;
    for(var i = 0; i < localStorage.length; i++){
      if(localStorage.key(i).includes('/')){
        currentDay = localStorage.key(i);
        var todaysLog = JSON.parse(localStorage.getItem(currentDay));

        if(storageKey == 'breakfast') {
          var log = todaysLog[0][storageKey]
          if(log.length > 0) { this.updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog); }
        }
        if(storageKey == 'lunch') {
          var log = todaysLog[1][storageKey]
          if(log.length > 0) { this.updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog); }
        }
        if(storageKey == 'dinner') {
          var log = todaysLog[2][storageKey]
          if(log.length > 0) { this.updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog); }
        }
        if(storageKey == 'snack') {
          var log = todaysLog[3][storageKey]
          if(log.length > 0) { this.updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog); }
        }
        if(storageKey == 'dailyExercise') {
          var log = todaysLog[4][storageKey]
          if(log.length > 0) { this.updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog); }
        }
      }
    }
  }

  updateDay(currentDay, oldName, oldCalories, newName, newCalories, log, todaysLog){
    for(var i = 0; i < log.length; i++){
      if(log[i].name == oldName && log[i].calories == oldCalories){
        log[i].name = newName;
        log[i].calories = newCalories;
        localStorage.setItem(currentDay, JSON.stringify(todaysLog));
      }
    }
  }

  updateIds(currentDay, tableBodyId, storageKey, logIndex){
    var todaysLog = JSON.parse(localStorage.getItem(currentDay));
    if(storageKey == "breakfast") {
      todaysLog[0][storageKey] = [];
      this.updateIndividual(currentDay, 'breakfast-body', storageKey, 0, todaysLog);
    };
    if(storageKey == "lunch") {
      todaysLog[1][storageKey] = [];
      this.updateIndividual(currentDay, 'lunch-body', storageKey, 1, todaysLog);
    };
    if(storageKey == "dinner") {
      todaysLog[2][storageKey] = [];
      this.updateIndividual(currentDay, 'dinner-body', storageKey, 2, todaysLog);
    };
    if(storageKey == "snack") {
      todaysLog[3][storageKey] = [];
      this.updateIndividual(currentDay, 'snack-body', storageKey, 3, todaysLog);
    };
    if(storageKey == "dailyExercise") {
      todaysLog[4][storageKey] = [];
      this.updateIndividual(currentDay, 'daily-exercise-body', storageKey, 4, todaysLog);
    };
  }

  updateIndividual(currentDay, tableBodyId, storageKey, logIndex, todaysLog){
    $(`#${tableBodyId} > tr`).each(function(index){
      var name = $(this).find('td:nth-child(1)').text();
      var calories = $(this).find('td:nth-child(2)').text();

      if(name != "" && calories != ""){
        todaysLog[logIndex][storageKey].push({ name: name, calories: calories, id: index });
        localStorage.setItem(currentDay, JSON.stringify(todaysLog));
      }
    });
  }
}

module.exports = GlobalStorage;
