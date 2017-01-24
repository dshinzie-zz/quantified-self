var $foodFilter = $('#food-fiter').val();
var $table = $('#food-table');

$("#add-food").on("click", function(e){
  e.preventDefault();

  var $fName = $("#food-name").val();
  var $fCalories = $("#food-calories").val();
  var validFood = validateFood($fName, $fCalories);

  if(validFood){
    var deleteButton = "<td><i class='material-icons'>delete</i></td>"
    var foodData = '<tr><td>' + $fName + '</td><td>' + $fCalories + '</td>' + deleteButton + '</tr>'

    $('#food-table > tbody > tr:first').before(foodData);
    clearContent();
  }
});

function validateFood(food, calories){
  if (food.trim() == '') {
    $('#food-warning').append("Please enter a food name.");
    return false;
  } else if (calories.trim() == ''){
    $('#calories-warning').append("Please enter a calorie amount.");
    return false;
  } else {
    return true;
  }
}

$("#food-filter").keyup(function () {
  var rows = $("#food-body").find("tr").hide();

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

function clearContent(){
  $("#food-name").val('');
  $("#food-calories").val('');
  $("#food-warning").empty();
  $("#calories-warning").empty();
}
