// UI module
// Get input values
// add the new item to the UI
// update the UI
var UIcontroller = (function(){

})();

// data module
// add the new item to our data structure
// calculate the budget
var budgetController = (function () {
  var x = 23;
  var add = function (a) {
    return x + a;
  };
})();

// controller module
// add event handler
var controller = (function(budgetCtrl, UICtrl){

})(budgetController, UIcontroller)