
function displayFoods(){
  JSON.parse(localStorage.getItem("food-calories")).forEach(function(element){
  addFoodToTable(element.name, element.calories);
  })
}

function displayExercises(){
  JSON.parse(localStorage.getItem("exercise-calories")).forEach(function(element){
  addExerciseToTable(element.name, element.calories);
  })
}

function addFoodToTable(name, calories){
  var deleteButton = "<td><i class='material-icons' onclick='deleteFoods(this)'>delete</i></td>"
  var foodData = "<tr><td class='edit-cell'>" + name + "</td><td class='edit-cell'>" + calories + '</td>' + deleteButton + '</tr>'

  $('#diary-food-table > tbody > tr:first').before(foodData);
}

function addExerciseToTable(name, calories){
  var deleteButton = "<td><i class='material-icons' onclick='deleteFoods(this)'>delete</i></td>"
  var foodData = "<tr><td class='edit-cell'>" + name + "</td><td class='edit-cell'>" + calories + '</td>' + deleteButton + '</tr>'

  $('#diary-exercise-table > tbody > tr:first').before(foodData);
}

displayFoods();
displayExercises();
