/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/accountcontrol.js":
/*!*******************************!*\
  !*** ./src/accountcontrol.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var accountCtrl = function () {
  //Removed local Storage to deploy on gh-pages

  //objects contains all accounts
  /* const state = {
    accounts:
      Array.from(JSON.parse(localStorage.getItem('storedAccounts'))) || [],
  }; */

  var state = {
    accounts: []
  };
  var Account = /*#__PURE__*/function () {
    function Account(type, description, amount) {
      _classCallCheck(this, Account);
      //create new account
      //Using uuid to generate random IDs
      this.id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])();
      this.type = type;
      this.description = description;
      this.amount = Number(amount);
      Account.addAccount(this);
    }
    _createClass(Account, null, [{
      key: "addAccount",
      value: function addAccount(account) {
        //push new account to the array
        state.accounts.push(account);
      }
    }, {
      key: "removeAccount",
      value: function removeAccount(id) {
        //remove account by id
        state.accounts = state.accounts.filter(function (account) {
          return account.id !== id;
        });
      }
    }, {
      key: "getAccounts",
      value: function getAccounts() {
        //returns all accounts for display
        return state.accounts;
      }
    }, {
      key: "getAccountToEdit",
      value: function getAccountToEdit(id) {
        //get account data by ID after edit click
        var temp = state.accounts.filter(function (account) {
          return account.id == id;
        });
        return temp;
      }
    }, {
      key: "getIncomeTotal",
      value: function getIncomeTotal() {
        //returns total income for header display
        var incomeTotal = 0;
        state.accounts.forEach(function (account) {
          if (account.type == '+') {
            incomeTotal += account.amount;
          }
        });
        return Number(incomeTotal).toFixed(2);
      }
    }, {
      key: "getExpensesTotal",
      value: function getExpensesTotal() {
        //returns total expenses for header display
        var ExpensesTotal = 0;
        state.accounts.forEach(function (account) {
          if (account.type == '-') {
            ExpensesTotal += account.amount * -1;
          }
        });
        return Number(ExpensesTotal).toFixed(2);
      }
    }, {
      key: "getBudgetTotal",
      value: function getBudgetTotal() {
        //returns budget total for header display
        var incomeTotal = 0;
        var ExpensesTotal = 0;
        state.accounts.forEach(function (account) {
          if (account.type == '+') {
            incomeTotal += account.amount;
          } else {
            ExpensesTotal += account.amount * -1;
          }
        });
        var total = incomeTotal + ExpensesTotal;
        return Number(total).toFixed(2);
      }
    }]);
    return Account;
  }();
  return {
    Account: Account
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (accountCtrl);

/***/ }),

/***/ "./src/uicontrol.js":
/*!**************************!*\
  !*** ./src/uicontrol.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_delete_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/delete.png */ "./src/assets/delete.png");
/* harmony import */ var _assets_edit_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/edit.png */ "./src/assets/edit.png");


var UICtrl = function () {
  //function to display date
  var displayDate = function displayDate() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var now = new Date();
    var day = now.getUTCDate();
    var month = now.getMonth();
    var year = now.getFullYear();
    var today = "".concat(day, " ").concat(months[month], " ").concat(year);
    setDom.date.innerHTML = "Your budget in ".concat(today);
  };

  //get DOM elements
  var setDom = {
    date: document.querySelector('.date'),
    incomeAmount: document.querySelector('.income-amount'),
    totalAmount: document.querySelector('.total-amount'),
    expensesAmount: document.querySelector('.expenses-amount'),
    type: document.querySelector('.add-type'),
    description: document.querySelector('.add-description'),
    amount: document.querySelector('.add-amount'),
    addBtn: document.querySelector('.add-btn'),
    displayIncome: document.querySelector('.display-income'),
    displayExpenses: document.querySelector('.display-expenses'),
    allAccounts: document.querySelectorAll('.all-accounts'),
    descriptionInvalid: document.querySelector('.description-invalid'),
    amountInvalid: document.querySelector('.amount-invalid')
  };

  //get data from input form after add button click
  var getAccountInput = function getAccountInput() {
    var type = setDom.type.value;
    var description = setDom.description.value;
    var tempAmount = setDom.amount.value;
    var amount = setNum(tempAmount);

    //insures value is positive & in correct form
    function setNum(num) {
      if (num < 0) {
        num *= -1;
      }
      return Number(num).toFixed(2);
    }
    return {
      type: type,
      description: description,
      amount: amount
    };
  };

  //displays data in add form  after edit click
  var displayInputToEdit = function displayInputToEdit(account) {
    setDom.type.value = account.type;
    setDom.description.value = account.description;
    setDom.amount.value = account.amount;
  };

  //display accounts from local storage or new accounts
  var displayNewAccount = function displayNewAccount(account) {
    var el = document.createElement('div');
    el.innerHTML = "<div id=\"".concat(account.id, "\" class='").concat(account.type == '+' ? 'budget-income' : 'budget-expenses', " flex'>\n          <div class='title'>").concat(account.description, "</div>\n          <div class='amount'>").concat(Number(account.amount).toFixed(2), "</div>\n            <img class=\"edit-icon\" src=\"").concat(_assets_edit_png__WEBPACK_IMPORTED_MODULE_1__, "\" alt=\"edit account\" title=\"edit\" />\n            <img class=\"delete-icon\" src=\"").concat(_assets_delete_png__WEBPACK_IMPORTED_MODULE_0__, "\" alt=\"delete account\" title=\"delete\" />\n        </div>");
    account.type == '+' ? setDom.displayIncome.appendChild(el) : setDom.displayExpenses.appendChild(el);
  };

  //insures entered data is not empty
  var validate = function validate(newData) {
    if (newData.description.length < 2 || !/[a-zA-Z]/.test(newData.description)) {
      setDom.descriptionInvalid.style.display = 'block';
      return false;
    } else {
      setDom.descriptionInvalid.style.display = 'none';
    }
    if (newData.amount == '' || newData.amount == 0) {
      setDom.amountInvalid.style.display = 'block';
      return false;
    } else {
      setDom.amountInvalid.style.display = 'none';
    }
    return true;
  };

  //clear form after adding or editing an account
  var clearForm = function clearForm() {
    setDom.type.value = '+';
    setDom.description.value = '';
    setDom.amount.value = '';
  };
  return {
    displayDate: displayDate,
    getAccountInput: getAccountInput,
    displayNewAccount: displayNewAccount,
    displayInputToEdit: displayInputToEdit,
    validate: validate,
    clearForm: clearForm,
    getDom: function getDom() {
      return setDom;
    }
  };
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UICtrl);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://fonts.googleapis.com/css2?family=Andika:ital@1&display=swap);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\r\n  --body-bg: #f1f1f1;\r\n  --header-bg: #edf6f9;\r\n  --add-bg: #e2e2e2;\r\n  --main-green: #28b9b5;\r\n  --main-blue: #4983ff;\r\n  --main-red: #ff5049;\r\n}\r\nbody {\r\n  background-color: var(--body-bg);\r\n}\r\n*,\r\n*::before,\r\n*::after {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  -webkit-tap-highlight-color: transparent;\r\n  font-family: 'Andika', sans-serif;\r\n}\r\n.flex {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  gap: 15px;\r\n}\r\nheader {\r\n  text-align: center;\r\n  flex-direction: column;\r\n  background-color: var(--header-bg);\r\n  padding: 20px;\r\n}\r\nheader h1 {\r\n  text-transform: uppercase;\r\n  font-size: 40px;\r\n}\r\n.budget-display {\r\n  flex-wrap: wrap;\r\n  margin: 20px 0;\r\n}\r\n.budget-income,\r\n.budget-total,\r\n.budget-expenses {\r\n  width: 280px;\r\n  padding: 10px 20px;\r\n  border-radius: 5px;\r\n  color: #fff;\r\n}\r\n.budget-income {\r\n  background-color: var(--main-green);\r\n  align-items: center;\r\n}\r\n.budget-total {\r\n  background-color: var(--main-blue);\r\n}\r\n.budget-expenses {\r\n  background-color: var(--main-red);\r\n}\r\n.title {\r\n  margin-right: auto;\r\n}\r\n.add-account {\r\n  flex-wrap: wrap;\r\n  background-color: var(--add-bg);\r\n  border-bottom: 1px solid #b4b4b4;\r\n  border-top: 1px solid #b4b4b4;\r\n  padding: 15px;\r\n  align-items: flex-start;\r\n}\r\n.add-type,\r\n.add-description,\r\n.add-amount {\r\n  border-radius: 5px;\r\n  border: 1px solid #b4b4b4;\r\n  outline: none;\r\n}\r\n.add-type {\r\n  font-size: 22px;\r\n  padding: 2px 5px;\r\n}\r\n.add-description,\r\n.add-amount {\r\n  padding: 11px 12px;\r\n}\r\n.add-description {\r\n  width: 280px;\r\n}\r\n.add-amount {\r\n  width: 140px;\r\n}\r\n.description-invalid,\r\n.amount-invalid {\r\n  text-align: center;\r\n  color: var(--main-red);\r\n  display: none;\r\n}\r\n.add-btn {\r\n  background: linear-gradient(to bottom, var(--main-blue) 5%, #3e6fd8 100%);\r\n  background-color: var(--main-blue);\r\n  border-radius: 6px;\r\n  border: 1px solid #dcdcdc;\r\n  display: inline-block;\r\n  cursor: pointer;\r\n  color: #fff;\r\n  padding: 12px 24px;\r\n}\r\n.add-btn:hover {\r\n  background: linear-gradient(to bottom, #3e6fd8 5%, var(--main-blue) 100%);\r\n  background-color: #557ed6;\r\n}\r\n.add-btn:active,\r\n.delete-icon:active,\r\n.edit-icon:active {\r\n  position: relative;\r\n  top: 2px;\r\n}\r\n.display {\r\n  background-color: var(--display-bg);\r\n  padding-top: 20px;\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\r\n  gap: 15px;\r\n}\r\n.display-income,\r\n.display-expenses {\r\n  flex-direction: column;\r\n  justify-content: flex-start;\r\n}\r\n.delete-icon,\r\n.edit-icon {\r\n  cursor: pointer;\r\n}\r\n.delete-icon:hover,\r\n.edit-icon:hover {\r\n  opacity: 0.8;\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AACA;EACE,kBAAkB;EAClB,oBAAoB;EACpB,iBAAiB;EACjB,qBAAqB;EACrB,oBAAoB;EACpB,mBAAmB;AACrB;AACA;EACE,gCAAgC;AAClC;AACA;;;EAGE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,wCAAwC;EACxC,iCAAiC;AACnC;AACA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,SAAS;AACX;AACA;EACE,kBAAkB;EAClB,sBAAsB;EACtB,kCAAkC;EAClC,aAAa;AACf;AACA;EACE,yBAAyB;EACzB,eAAe;AACjB;AACA;EACE,eAAe;EACf,cAAc;AAChB;AACA;;;EAGE,YAAY;EACZ,kBAAkB;EAClB,kBAAkB;EAClB,WAAW;AACb;AACA;EACE,mCAAmC;EACnC,mBAAmB;AACrB;AACA;EACE,kCAAkC;AACpC;AACA;EACE,iCAAiC;AACnC;AACA;EACE,kBAAkB;AACpB;AACA;EACE,eAAe;EACf,+BAA+B;EAC/B,gCAAgC;EAChC,6BAA6B;EAC7B,aAAa;EACb,uBAAuB;AACzB;AACA;;;EAGE,kBAAkB;EAClB,yBAAyB;EACzB,aAAa;AACf;AACA;EACE,eAAe;EACf,gBAAgB;AAClB;AACA;;EAEE,kBAAkB;AACpB;AACA;EACE,YAAY;AACd;AACA;EACE,YAAY;AACd;AACA;;EAEE,kBAAkB;EAClB,sBAAsB;EACtB,aAAa;AACf;AACA;EACE,yEAAyE;EACzE,kCAAkC;EAClC,kBAAkB;EAClB,yBAAyB;EACzB,qBAAqB;EACrB,eAAe;EACf,WAAW;EACX,kBAAkB;AACpB;AACA;EACE,yEAAyE;EACzE,yBAAyB;AAC3B;AACA;;;EAGE,kBAAkB;EAClB,QAAQ;AACV;AACA;EACE,mCAAmC;EACnC,iBAAiB;EACjB,aAAa;EACb,2DAA2D;EAC3D,SAAS;AACX;AACA;;EAEE,sBAAsB;EACtB,2BAA2B;AAC7B;AACA;;EAEE,eAAe;AACjB;AACA;;EAEE,YAAY;AACd","sourcesContent":["@import url('https://fonts.googleapis.com/css2?family=Andika:ital@1&display=swap');\r\n:root {\r\n  --body-bg: #f1f1f1;\r\n  --header-bg: #edf6f9;\r\n  --add-bg: #e2e2e2;\r\n  --main-green: #28b9b5;\r\n  --main-blue: #4983ff;\r\n  --main-red: #ff5049;\r\n}\r\nbody {\r\n  background-color: var(--body-bg);\r\n}\r\n*,\r\n*::before,\r\n*::after {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  -webkit-tap-highlight-color: transparent;\r\n  font-family: 'Andika', sans-serif;\r\n}\r\n.flex {\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  gap: 15px;\r\n}\r\nheader {\r\n  text-align: center;\r\n  flex-direction: column;\r\n  background-color: var(--header-bg);\r\n  padding: 20px;\r\n}\r\nheader h1 {\r\n  text-transform: uppercase;\r\n  font-size: 40px;\r\n}\r\n.budget-display {\r\n  flex-wrap: wrap;\r\n  margin: 20px 0;\r\n}\r\n.budget-income,\r\n.budget-total,\r\n.budget-expenses {\r\n  width: 280px;\r\n  padding: 10px 20px;\r\n  border-radius: 5px;\r\n  color: #fff;\r\n}\r\n.budget-income {\r\n  background-color: var(--main-green);\r\n  align-items: center;\r\n}\r\n.budget-total {\r\n  background-color: var(--main-blue);\r\n}\r\n.budget-expenses {\r\n  background-color: var(--main-red);\r\n}\r\n.title {\r\n  margin-right: auto;\r\n}\r\n.add-account {\r\n  flex-wrap: wrap;\r\n  background-color: var(--add-bg);\r\n  border-bottom: 1px solid #b4b4b4;\r\n  border-top: 1px solid #b4b4b4;\r\n  padding: 15px;\r\n  align-items: flex-start;\r\n}\r\n.add-type,\r\n.add-description,\r\n.add-amount {\r\n  border-radius: 5px;\r\n  border: 1px solid #b4b4b4;\r\n  outline: none;\r\n}\r\n.add-type {\r\n  font-size: 22px;\r\n  padding: 2px 5px;\r\n}\r\n.add-description,\r\n.add-amount {\r\n  padding: 11px 12px;\r\n}\r\n.add-description {\r\n  width: 280px;\r\n}\r\n.add-amount {\r\n  width: 140px;\r\n}\r\n.description-invalid,\r\n.amount-invalid {\r\n  text-align: center;\r\n  color: var(--main-red);\r\n  display: none;\r\n}\r\n.add-btn {\r\n  background: linear-gradient(to bottom, var(--main-blue) 5%, #3e6fd8 100%);\r\n  background-color: var(--main-blue);\r\n  border-radius: 6px;\r\n  border: 1px solid #dcdcdc;\r\n  display: inline-block;\r\n  cursor: pointer;\r\n  color: #fff;\r\n  padding: 12px 24px;\r\n}\r\n.add-btn:hover {\r\n  background: linear-gradient(to bottom, #3e6fd8 5%, var(--main-blue) 100%);\r\n  background-color: #557ed6;\r\n}\r\n.add-btn:active,\r\n.delete-icon:active,\r\n.edit-icon:active {\r\n  position: relative;\r\n  top: 2px;\r\n}\r\n.display {\r\n  background-color: var(--display-bg);\r\n  padding-top: 20px;\r\n  display: grid;\r\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\r\n  gap: 15px;\r\n}\r\n.display-income,\r\n.display-expenses {\r\n  flex-direction: column;\r\n  justify-content: flex-start;\r\n}\r\n.delete-icon,\r\n.edit-icon {\r\n  cursor: pointer;\r\n}\r\n.delete-icon:hover,\r\n.edit-icon:hover {\r\n  opacity: 0.8;\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/native.js":
/*!******************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/native.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/regex.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/regex.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/stringify.js":
/*!*********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/stringify.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "unsafeStringify": () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./validate.js */ "./node_modules/uuid/dist/esm-browser/validate.js");

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./native.js */ "./node_modules/uuid/dist/esm-browser/native.js");
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stringify.js */ "./node_modules/uuid/dist/esm-browser/stringify.js");




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/validate.js":
/*!********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/validate.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./regex.js */ "./node_modules/uuid/dist/esm-browser/regex.js");


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),

/***/ "./src/assets/delete.png":
/*!*******************************!*\
  !*** ./src/assets/delete.png ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "delete.png";

/***/ }),

/***/ "./src/assets/edit.png":
/*!*****************************!*\
  !*** ./src/assets/edit.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "edit.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _uicontrol__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./uicontrol */ "./src/uicontrol.js");
/* harmony import */ var _accountcontrol__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./accountcontrol */ "./src/accountcontrol.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./style.css */ "./src/style.css");



var appCtrl = function () {
  //import DOM elements
  var DOM = _uicontrol__WEBPACK_IMPORTED_MODULE_0__["default"].getDom();

  //handles adding new account
  function addAccount() {
    //get data from input form
    var newAcc = _uicontrol__WEBPACK_IMPORTED_MODULE_0__["default"].getAccountInput();
    //check data input is not empty
    var validation = _uicontrol__WEBPACK_IMPORTED_MODULE_0__["default"].validate(newAcc);
    if (!validation) {
      return;
    }

    //make new account
    var setNewAcc = new _accountcontrol__WEBPACK_IMPORTED_MODULE_1__["default"].Account(newAcc.type, newAcc.description, newAcc.amount);

    //display new account
    _uicontrol__WEBPACK_IMPORTED_MODULE_0__["default"].displayNewAccount(setNewAcc);

    //update total display
    updateTotals();

    //empty form fields
    _uicontrol__WEBPACK_IMPORTED_MODULE_0__["default"].clearForm();
  }
  function handleEditClick(id) {
    //get account data by id
    var tempAccount = _accountcontrol__WEBPACK_IMPORTED_MODULE_1__["default"].Account.getAccountToEdit(id);
    //display account data in add form
    _uicontrol__WEBPACK_IMPORTED_MODULE_0__["default"].displayInputToEdit(tempAccount[0]);
    //remove account from data
    _accountcontrol__WEBPACK_IMPORTED_MODULE_1__["default"].Account.removeAccount(id);
  }

  //handles delete or edit click from account list
  function editOrRemove(e) {
    if (e.target.classList.contains('delete-icon')) {
      //if click = delete
      //remove account from data by id
      _accountcontrol__WEBPACK_IMPORTED_MODULE_1__["default"].Account.removeAccount(e.target.parentElement.id);
    } else if (e.target.classList.contains('edit-icon')) {
      //if click = edit
      handleEditClick(e.target.parentElement.id);
    }
    //remove account from display
    e.target.parentElement.parentElement.remove();
    updateTotals();
  }

  //updates total income, expenses & budget in header display
  var updateTotals = function updateTotals() {
    DOM.incomeAmount.innerHTML = _accountcontrol__WEBPACK_IMPORTED_MODULE_1__["default"].Account.getIncomeTotal();
    DOM.expensesAmount.innerHTML = _accountcontrol__WEBPACK_IMPORTED_MODULE_1__["default"].Account.getExpensesTotal();
    DOM.totalAmount.innerHTML = _accountcontrol__WEBPACK_IMPORTED_MODULE_1__["default"].Account.getBudgetTotal();
  };

  //App start
  var start = function start() {
    //activates event listeners for account lists
    DOM.allAccounts.forEach(function (account) {
      account.addEventListener('click', editOrRemove);
    });

    //activates event listeners for add button
    DOM.addBtn.addEventListener('click', addAccount);

    //display date
    _uicontrol__WEBPACK_IMPORTED_MODULE_0__["default"].displayDate();

    //get and display all accounts saved in local storage
    var retreiveAccounts = _accountcontrol__WEBPACK_IMPORTED_MODULE_1__["default"].Account.getAccounts();
    retreiveAccounts.forEach(function (account) {
      _uicontrol__WEBPACK_IMPORTED_MODULE_0__["default"].displayNewAccount(account);
    });

    //update total display
    updateTotals();
  };
  return {
    start: start
  };
}();
appCtrl.start();
})();

/******/ })()
;
//# sourceMappingURL=bundle70b70faa4534ebdadc5e.js.map