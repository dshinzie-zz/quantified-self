"use strict"

class DailyExercise {
  constructor(name, calories){
    this.name = name;
    this.calories = calories;
  }

  store(){
    var dailyExercises = this.getStorage();
    dailyExercises.push({name: this.name, calories: this.calories});

    var dailyExercisesJSON = JSON.stringify(dailyExercises);
    localStorage.setItem("daily-exercises", dailyExercisesJSON);
  }

  delete(){
    var dailyExercises = this.getStorage();
    var nameDelete = this.name;
    var caloriesDelete = this.calories;

    dailyExercises.forEach(function(element){
      if(element.name == nameDelete && element.calories == caloriesDelete){
        dailyExercises.splice(dailyExercises.indexOf(element), 1);

        var exercisesJSON = JSON.stringify(dailyExercises);
        localStorage.setItem("daily-exercises", exercisesJSON);
      }
    });
  }

  getStorage(){
    var dailyExercises = localStorage.getItem("daily-exercises");
    if(dailyExercises === null){ dailyExercises = '[]'; }
    return JSON.parse(dailyExercises);
  }
}

module.exports = DailyExercise;
