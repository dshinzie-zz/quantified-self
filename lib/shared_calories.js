function addCalories(table, calorieID){
  var sum = 0;
  var cells = document.querySelectorAll(`#${table} tr td:nth-of-type(2)`);

  for (var i = 0; i < cells.length; i++) {
      sum+=parseFloat(cells[i].firstChild.data);
  }
  document.getElementById(`${calorieID}`).innerHTML = sum;
}

function displayAllCalories(){
  addCalories('daily-exercise-body', 'exercise-total-calories');
  addCalories('breakfast-body', 'breakfast-total-calories');
  addCalories('lunch-body', 'lunch-total-calories');
  addCalories('dinner-body', 'dinner-total-calories');
  addCalories('snack-body', 'snack-total-calories');
}

function updateRemaining(meal, calories){
  var totalCalories = $(`#${meal}-total-calories`).html();
  var newRemaining = calories - Number(totalCalories);

  if (newRemaining < 0){
    $(`#${meal}-remaining-calories`).addClass('red-text');
  } else {
    $(`#${meal}-remaining-calories`).removeClass('red-text').addClass('green-text');
  }

  document.getElementById(`${meal}-remaining-calories`).innerHTML = newRemaining.toString();
}

function totalCaloriesConsumed(){
  var breakfastTotal = Number($('#breakfast-total-calories').html());
  var lunchTotal = Number($('#lunch-total-calories').html());
  var dinnerTotal = Number($('#dinner-total-calories').html());
  var snackTotal = Number($('#snack-total-calories').html());
  var totalConsumed = breakfastTotal + lunchTotal + dinnerTotal + snackTotal;
  document.getElementById('total-consumed-calories').innerHTML = totalConsumed.toString();
}

function totalCaloriesBurned(){
  var exerciseTotal = $('#exercise-total-calories').html();

  if (exerciseTotal > 0){
    $('#total-burned-calories').addClass('green-text');
    $('#exercise-total-calories').addClass('green-text');
  }

  document.getElementById('total-burned-calories').innerHTML = exerciseTotal;
}

function totalCaloriesRemaining(){
  var totalGoal = 2000
  var totalConsumed = Number($('#total-consumed-calories').html());
  var totalBurned = Number($('#exercise-total-calories').html());
  var totalRemaining = totalGoal - totalConsumed + totalBurned

  if (totalRemaining < 0){
    $('#total-remaining-calories').addClass('red-text');
  } else {
    $('#total-remaining-calories').removeClass('red-text').addClass('green-text');
  }

  document.getElementById('total-remaining-calories').innerHTML = totalRemaining.toString();
}

module.exports = {
  addCalories: addCalories,
  displayAllCalories: displayAllCalories,
  updateRemaining: updateRemaining,
  totalCaloriesConsumed: totalCaloriesConsumed,
  totalCaloriesBurned: totalCaloriesBurned,
  totalCaloriesRemaining: totalCaloriesRemaining
}
