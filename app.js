// UI module
// Get input values
// add the new item to the UI
// update the UI
var UIcontroller = (function(){

 return{
  getInput: function(){

   return {
     type: document.querySelector('.add__type').value,
     description:  document.querySelector(".add__description").value,
     value: document.querySelector(".add__value").value,
   }
  }
 }
})();

// budget controller module
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

 var ctrlAddItem = function(){
   // get field input data
   // add item to budget controller
   // add item ui
   // calculcate the budget
   // display the budget to the ui
 }
 document.querySelector('add__btn').addEventListener('click', ctrlAddItem);

 document.querySelector('keypress', function(event){

 });

})(budgetController, UIcontroller)