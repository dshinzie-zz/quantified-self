"use strict"

class Food {
  constructor(name, calories){
    this.name = name;
    this.calories = calories;
  }

  store(){
    var currentFoods = this.getStorage();
    currentFoods.push({name: this.name, calories: this.calories});

    var foodsJSON = JSON.stringify(currentFoods);
    localStorage.setItem("food-calories", foodsJSON);
  }

  update(oldName, oldCalories){
    var currentFoods = this.getStorage();
    var newName = this.name;
    var newCalories = this.calories;

    for(var i = 0; i < currentFoods.length; i++){
      if(currentFoods[i].name == oldName && currentFoods[i].calories == oldCalories){
        currentFoods[i].name = newName;
        currentFoods[i].calories = newCalories;

        var foodsJSON = JSON.stringify(currentFoods);
        localStorage.setItem("food-calories", foodsJSON);
      }
    }
  }

  delete(){
    var currentFoods = this.getStorage();
    var nameDelete = this.name;
    var caloriesDelete = this.calories;

    currentFoods.forEach(function(element){
      if(element.name == nameDelete && element.calories == caloriesDelete){
        currentFoods.splice(currentFoods.indexOf(element), 1);

        var foodsJSON = JSON.stringify(currentFoods);
        localStorage.setItem("food-calories", foodsJSON);
      }
    });
  }

  getStorage(){
    var currentFoods = localStorage.getItem("food-calories");
    if(currentFoods === null) { currentFoods = '[]'; }
    return JSON.parse(currentFoods);
  }
}

module.exports = Food
