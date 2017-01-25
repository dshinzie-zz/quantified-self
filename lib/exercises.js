var $exerciseFilter = $('#exercise-filter').val();
var $table = $('exercise-table')

$("#add-exercise").on("click", function(e){
  e.preventDefault();

  var $eName = $('#exercise-name').val();
  var $eCalories = $('#exercise-calories').val();
  var validExercise = validateExercise($eName, $eCalories);

  if(validExercise){
    addToTable($eName, $eCalories);
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
  var deleteButton = "<td><i class='material-icons'>delete</i></td>";
  var exerciseData = '<tr><td>' + name + '</td><td>' + calories + '</td>' + deleteButton + '</tr>'

  $('#exercise-table > tbody > tr:first').before(exerciseData);
}
