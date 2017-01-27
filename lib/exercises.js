"use strict"

class Exercise {
  constructor(name, calories){
    this.name = name;
    this.calories = calories;
  }

  store(){
    var currentExercises = this.getStorage();
    currentExercises.push({name: this.name, calories: this.calories});

    var exercisesJSON = JSON.stringify(currentExercises);
    localStorage.setItem("exercise-calories", exercisesJSON);
  }

  update(oldName, oldCalories){
    var currentExercises = JSON.parse(localStorage.getItem("exercise-calories"));
    var newName = this.name;
    var newCalories = this.calories;

    for(var i = 0; i < currentExercises.length; i++){
      if(currentExercises[i].name == oldName && currentExercises[i].calories == oldCalories){
        currentExercises[i].name = newName;
        currentExercises[i].calories = newCalories;

        var exercisesJSON = JSON.stringify(currentExercises);
        localStorage.setItem("exercise-calories", exercisesJSON);
      }
    }
  }

  delete(){
    var currentExercises = JSON.parse(localStorage.getItem("exercise-calories"));
    var nameDelete = this.name;
    var caloriesDelete = this.calories;

    currentExercises.forEach(function(element){
      if(element.name == nameDelete && element.calories == caloriesDelete){
        currentExercises.splice(currentExercises.indexOf(element), 1);

        var exercisesJSON = JSON.stringify(currentExercises);
        localStorage.setItem("exercise-calories", exercisesJSON);
      }
    });
  }

  getStorage(){
    var currentExercises = localStorage.getItem("exercise-calories");
    if(currentExercises === null) { currentExercises = '[]'; }
    return JSON.parse(currentExercises);
  }

}

module.exports = Exercise
