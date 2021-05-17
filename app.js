// budget controller module
// add the new item to our data structure
// calculate the budget
var budgetController = (function () {
  var expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var calculateTotal = function (type) {
    var sum = 0;

    data.allItems[type].forEach(function (cur) {
      sum += cur.value;
    });
    data.totals[type] = sum;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      // ID = last ID + 1
      // create new ID > 0
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item based on inc or exp type
      if (type === "exp") {
        newItem = new expense(ID, des, val);
      } else if (type === "inc") {
        newItem = new income(ID, des, val);
      }

      // push it into the data structure
      data.allItems[type].push(newItem);

      // return the new element
      return newItem;
    },

    deleteItem : function(type, id){
      // loop over elements in an inc or exp arr

    var ids, index;

    ids = data.allItems[type].map(function(current){
        return current.id;
      });

      index = ids.indexOf(id)

      if(index !== -1){
    data.allItems[type].splice(index, 1);
      }
    },


    calculateBudget: function () {
      // calculate the total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");

      // budget : income - expenses
      data.budget = data.totals.inc - data.totals.exp;

      // % of income spent
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage
      };
    },

    testing: function () {
      console.log(data);
    },
  };
})();

// UI module
// Get input values
// add the new item to the UI
// update the UI
var UIcontroller = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expensesContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expensesLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
    container: ".container"
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    addListItem: function (obj, type) {
      var html, newHtml, element;

      // create HTML string with placeholder text
      if (type === "inc") {
        element = DOMstrings.incomeContainer;

        html = `<div class="item clearfix" id="inc-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
      } else if (type === "exp") {
        element = DOMstrings.expensesContainer;

        html = `<div class="item clearfix" id="exp-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
      }

      // replace placeholder with actual data
      newHtml = html.replace(`%id%`, obj.id);
      newHtml = newHtml.replace(`%description%`, obj.description);
      newHtml = newHtml.replace(`%value%`, obj.value);

      // insert the html into the dom
      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },

    deleteListItem: function(selectorID){
      var el =  document.getElementById(selectorID);
      el.parentNode.removeChild(el);
    },

    clearFields: function () {
      var fields, fieldsArr;

      fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );

      fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach((current, index, array) => {
        current.value = "";
      });

      fieldsArr[0].focus();
    },
    displayBudget: function (obj) {


      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expensesLabel).textContent =
        obj.totalExp;

        if(obj.percentage > 0){
          document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';

        } else {
          document.querySelector(DOMstrings.percentageLabel).textContent =
            "---";
        }


    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// controller module
// add event handler
var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keycode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });

    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };
  var updateBudget = function () {
    // calculcate the budget
    budgetCtrl.calculateBudget();

    // return the budget
    var budget = budgetCtrl.getBudget();

    // display the budget to the ui
    UICtrl.displayBudget(budget);
  };

  var updatePercentages  = function(){
    //  calculate the budget

    // read percentages from the budget controller

    //  update the UI with the new percentages
  }

  var ctrlAddItem = function () {
    var input, newItem;
    // get field input data
    input = UICtrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // add item to budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // add item ui
      UICtrl.addListItem(newItem, input.type);

      // clear fields
      UICtrl.clearFields();

      // calculate and update the budget
      updateBudget();

      // calculate and update percentages
      updatePercentages();
    }
  };

  var ctrlDeleteItem = function(event){
    var itemID, splitID, type, ID;

    itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

    if (itemID){
      // inc-1
      splitID = itemID.split("-");
      type = splitID[0];
      ID = parseInt(splitID[1]);

      // add event handler to listen for click on delete button
      // delete item from data structure
      budgetCtrl.deleteItem(type, ID);

      // delete item from the UI
      UICtrl.deleteListItem(itemID);

      // recalculcate budget
      // update the ui with new budget
      updateBudget();

      // calculate and update percentages
      updatePercentages ();

    }
  }

  return {
    init: function () {
      console.log("application started");
      UICtrl.displayBudget({
        budget: 0,
        totalInc:  0,
        totalExp:  0,
        percentage: -1
      });
      setupEventListeners();
    },
  };
})(budgetController, UIcontroller);

controller.init();

// TO-DO-List
// calculcate percentages
// update percentages in UI
// display current month and year
// number formatiing
// improve input field UX
