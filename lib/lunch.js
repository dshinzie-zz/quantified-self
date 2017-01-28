"use strict"

class Lunch {
  constructor(name, calories){
    this.name = name;
    this.calories = calories;
  }

  store(){
    var lunch = this.getStorage();
    lunch.push({name: this.name, calories: this.calories});

    var lunchJSON = JSON.stringify(lunch);
    localStorage.setItem("daily-lunches", lunchJSON);
  }

  delete(){
    var lunch = this.getStorage();
    var nameDelete = this.name;
    var caloriesDelete = this.calories;

    lunch.forEach(function(element){
      if(element.name == nameDelete && element.calories == caloriesDelete){
        lunch.splice(lunch.indexOf(element), 1);

        var lunchesJSON = JSON.stringify(lunch);
        localStorage.setItem("daily-lunches", lunchesJSON);
      }
    });
  }

  getStorage(){
    var lunch = localStorage.getItem("daily-lunches");
    if(lunch === null){ lunch = '[]'; }
    return JSON.parse(lunch);
  }
}

module.exports = Lunch;
