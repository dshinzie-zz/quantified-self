var $exerciseFilter = $('#exercise-filter').val();
var $table = $('exercise-table')

$("#add-exercise").on("click", function(e){
  e.preventDefault();

  var $eName = $('#exercise-name').val();
  var $eCalories = $('#exercise-calories').val();
  var validExercise = validateExercise($eName, $eCalories);

  if(validExercise){
    addToTable($eName, $eCalories);
    storeExercises($eName, $eCalories);
    clearContent();
  }
});

$("#exercise-filter").keyup(function () {
  var rows = $("#exercise-body").find("tr").hide();

  if (this.value.length) {
    var data = this.value.split(" ");

    $.each(data, function (index, value) {
      rows.filter(function(){
        return $(this).text().toLowerCase().indexOf(value.toLowerCase()) > -1;
      }).show();
    });
  } else {
    rows.show();
  }
});

function validateExercise(exercise, calories){
  if (exercise.trim() == '') {
    $('#exercise-warning').append("Please enter an exercise name.");
    return false;
  } else if (calories.trim() == '') {
    $('#calories-warning').append("Please enter a calorie amount.");
    return false;
  } else {
    return true;
  }
}

function clearContent(){
  $("#exercise-name").val('');
  $("#exercise-calories").val('');
  $("#exercise-warning").empty();
  $("#calories-warning").empty();
}

function addToTable(name, calories){
  var deleteButton = "<td><i class='material-icons' onclick='deleteExercises(this)'>delete</i></td>";
  var exerciseData = '<tr><td>' + name + '</td><td>' + calories + '</td>' + deleteButton + '</tr>'

  $('#exercise-table > tbody > tr:first').before(exerciseData);
}

function storeExercises(name, calories){
  var exercisesJSON = localStorage.getItem("exercise-calories");
  if(exercisesJSON === null) {
    exercisesJSON = '[]';
  }
  var currentExercisesCalories = JSON.parse(exercisesJSON);
  currentExercisesCalories.push({name: name, calories: calories});

  exercisesJSON = JSON.stringify(currentExercisesCalories);
  localStorage.setItem("exercise-calories", exercisesJSON);
}

function displayExercises(){
  JSON.parse(localStorage.getItem("exercise-calories")).forEach(function(element){
    addToTable(element.name, element.calories);
  })
}

function deleteExercises(row){
  var rowIndex = $(row).parent().parent()[0].rowIndex;
  var name = $('#exercise-table')[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $('#exercise-table')[0].rows[rowIndex].cells[1].innerHTML;
  var currentExercises = JSON.parse(localStorage.getItem("exercise-calories"));

  currentExercises.forEach(function(element){
    if(element.name == name && element.calories == calories){
      currentExercises.splice(currentExercises.indexOf(element), 1);

      exercisesJSON = JSON.stringify(currentExercises);
      localStorage.setItem("exercise-calories", exercisesJSON);
    }
  });

  $('#exercise-table')[0].deleteRow(rowIndex);
}


displayExercises();
