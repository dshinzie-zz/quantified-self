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

  deleteDayLog(storageKey, storage){
    var currentDay = this.currentDay;
    var todaysLog = JSON.parse(localStorage.getItem(currentDay));

    if(storageKey == 'breakfast') {
      var log = todaysLog[0][storageKey];
      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
    }
    if(storageKey == 'lunch') {
      var log = todaysLog[1][storageKey];
      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
    }
    if(storageKey == 'dinner') {
      var log = todaysLog[2][storageKey];
      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
    }
    if(storageKey == 'snack') {
      var log = todaysLog[3][storageKey];
      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
    }
    if(storageKey == 'dailyExercise') {
      var log = todaysLog[4][storageKey];
      this.deleteIndividual(currentDay, storageKey, storage, log, todaysLog);
    }
  }

  deleteIndividual(currentDay, storageKey, storage, log, todaysLog){
    for(var i = 0; i < log.length; i++){
      if(log[i].name == storage.name && log[i].calories == storage.calories){
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
}

module.exports = GlobalStorage;
