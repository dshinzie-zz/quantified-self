"use strict"

class Storage {
  constructor(storageId, name = null, calories = null){
    this.name = name;
    this.calories = calories;
    this.storageId = storageId;
  }

  store(){
    var meal = this.getStorage();
    meal.push({name: this.name, calories: this.calories});

    var mealJSON = JSON.stringify(meal);
    localStorage.setItem(this.storageId, mealJSON);
  }

  delete(){
    var meal = this.getStorage();
    var nameDelete = this.name;
    var caloriesDelete = this.calories;
    var storageId = this.storageId;

    meal.forEach(function(element){
      if(element.name == nameDelete && element.calories == caloriesDelete){
        meal.splice(meal.indexOf(element), 1);

        var mealJSON = JSON.stringify(meal);
        localStorage.setItem(storageId, mealJSON);
      }
    });
  }

  getStorage(){
    var meal = localStorage.getItem(this.storageId);
    if(meal === null){ meal = '[]'; }
    return JSON.parse(meal);
  }

  setEmptyStorage(){
    var meal = localStorage.getItem(this.storageId);
    if(meal === null){ meal = '[]'; }
    localStorage.setItem(this.storageId, meal);
  }
}

module.exports = Storage;
