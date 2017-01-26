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

$('#food-table').on('click', '.edit-cell', function(e){
  $(this).attr("contenteditable", "true");
  var rowIndex = $(this).parent()[0].rowIndex;
  var oldName = $('#food-table')[0].rows[rowIndex].cells[0].innerHTML;
  var oldCalories = $('#food-table')[0].rows[rowIndex].cells[1].innerHTML;

  $(this).on('blur keydown', function(e){
    if(e.keyCode == 13 || e.type == 'blur'){
      $(this).attr("contenteditable", "false");

      var newName = $('#food-table')[0].rows[rowIndex].cells[0].innerHTML;
      var newCalories = $('#food-table')[0].rows[rowIndex].cells[1].innerHTML;
      var currentFoods = JSON.parse(localStorage.getItem("food-calories"));

      for(var i = 0; i < currentFoods.length; i++){
        if(currentFoods[i].name == oldName && currentFoods[i].calories == oldCalories){
          currentFoods[i].name = newName;
          currentFoods[i].calories = newCalories;

          foodsJSON = JSON.stringify(currentFoods);
          localStorage.setItem("food-calories", foodsJSON);
        }
      }
    }
  });
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
  var deleteButton = "<td><i class='material-icons' onclick='deleteFoods(this)'>delete</i></td>"
  var foodData = "<tr><td class='edit-cell'>" + name + "</td><td class='edit-cell'>" + calories + '</td>' + deleteButton + '</tr>'

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

function deleteFoods(row){
  var rowIndex = $(row).parent().parent()[0].rowIndex;
  var name = $('#food-table')[0].rows[rowIndex].cells[0].innerHTML;
  var calories = $('#food-table')[0].rows[rowIndex].cells[1].innerHTML;
  var currentFoods = JSON.parse(localStorage.getItem("food-calories"));

  currentFoods.forEach(function(element){
    if(element.name == name && element.calories == calories){
      currentFoods.splice(currentFoods.indexOf(element), 1);

      foodsJSON = JSON.stringify(currentFoods);
      localStorage.setItem("food-calories", foodsJSON);
    }
  });

  $('#food-table')[0].deleteRow(rowIndex);
}

displayFoods();
