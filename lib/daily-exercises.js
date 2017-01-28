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
    localStorage.setItem("daily-exercise", dailyExercisesJSON);
  }

  getStorage(){
    var dailyExercises = localStorage.getItem("daily-exercise");
    if(dailyExercises === null){ dailyExercises = '[]'; }
    return JSON.parse(dailyExercises);
  }
}

module.exports = DailyExercise;
