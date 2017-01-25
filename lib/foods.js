var $foodFilter = $('#food-fiter').val();
var $table = $('#food-table');

$("#add-food").on("click", function(e){
  e.preventDefault();

  var $fName = $("#food-name").val();
  var $fCalories = $("#food-calories").val();
  var validFood = validateFood($fName, $fCalories);

  if(validFood){
    addToTable($fName, $fCalories);
    storeFoods($fName, $fCalories);
    clearContent();
  }
});

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

function clearContent(){
  $("#food-name").val('');
  $("#food-calories").val('');
  $("#food-warning").empty();
  $("#calories-warning").empty();
}

function addToTable(name, calories){
  var deleteButton = "<td><i class='material-icons'>delete</i></td>"
  var foodData = '<tr><td>' + name + '</td><td>' + calories + '</td>' + deleteButton + '</tr>'

  $('#food-table > tbody > tr:first').before(foodData);
}

function storeFoods(name, calories){
  var foodsJSON = localStorage.getItem("food-calories");
  if(foodsJSON === null) {
    foodsJSON = '[]';
  }
  var currentFoodsCalories = JSON.parse(foodsJSON);
  currentFoodsCalories.push({name: name, calories: calories});

  foodsJSON = JSON.stringify(currentFoodsCalories);
  localStorage.setItem("food-calories", foodsJSON);
}

function displayFoods(){
  JSON.parse(localStorage.getItem("food-calories")).forEach(function(element){
  addToTable(element.name, element.calories);
  })
}

displayFoods();
