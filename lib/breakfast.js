"use strict"

class Breakfast {
  constructor(name, calories){
    this.name = name;
    this.calories = calories;
  }

  store(){
    var breakfast = this.getStorage();
    breakfast.push({name: this.name, calories: this.calories});

    var breakfastJSON = JSON.stringify(breakfast);
    localStorage.setItem("daily-breakfasts", breakfastJSON);
  }

  delete(){
    var breakfast = this.getStorage();
    var nameDelete = this.name;
    var caloriesDelete = this.calories;

    breakfast.forEach(function(element){
      if(element.name == nameDelete && element.calories == caloriesDelete){
        breakfast.splice(breakfast.indexOf(element), 1);

        var breakfastsJSON = JSON.stringify(breakfast);
        localStorage.setItem("daily-breakfasts", breakfastsJSON);
      }
    });
  }

  getStorage(){
    var breakfast = localStorage.getItem("daily-breakfasts");
    if(breakfast === null){ breakfast = '[]'; }
    return JSON.parse(breakfast);
  }
}

module.exports = Breakfast;
