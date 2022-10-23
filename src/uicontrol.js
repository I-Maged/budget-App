import deleteImg from './assets/delete.png';
import editImg from './assets/edit.png';
const UICtrl = (() => {
  //function to display date
  const displayDate = () => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let now = new Date();

    let day = now.getUTCDate();
    let month = now.getMonth();
    let year = now.getFullYear();

    let today = `${day} ${months[month]} ${year}`;

    setDom.date.innerHTML = `Your budget in ${today}`;
  };

  //get DOM elements
  const setDom = {
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
    amountInvalid: document.querySelector('.amount-invalid'),
  };

  //get data from input form after add button click
  const getAccountInput = () => {
    const type = setDom.type.value;
    const description = setDom.description.value;
    const tempAmount = setDom.amount.value;
    const amount = setNum(tempAmount);

    //insures value is positive & in correct form
    function setNum(num) {
      if (num < 0) {
        num *= -1;
      }
      return Number(num).toFixed(2);
    }

    return { type, description, amount };
  };

  //displays data in add form  after edit click
  const displayInputToEdit = (account) => {
    setDom.type.value = account.type;
    setDom.description.value = account.description;
    setDom.amount.value = account.amount;
  };

  //display accounts from local storage or new accounts
  const displayNewAccount = (account) => {
    let el = document.createElement('div');
    el.innerHTML = `<div id="${account.id}" class='${
      account.type == '+' ? 'budget-income' : 'budget-expenses'
    } flex'>
          <div class='title'>${account.description}</div>
          <div class='amount'>${Number(account.amount).toFixed(2)}</div>
            <img class="edit-icon" src="${editImg}" alt="edit account" title="edit" />
            <img class="delete-icon" src="${deleteImg}" alt="delete account" title="delete" />
        </div>`;
    account.type == '+'
      ? setDom.displayIncome.appendChild(el)
      : setDom.displayExpenses.appendChild(el);
  };

  //insures entered data is not empty
  const validate = (newData) => {
    if (
      newData.description.length < 2 ||
      !/[a-zA-Z]/.test(newData.description)
    ) {
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
  const clearForm = () => {
    setDom.type.value = '+';
    setDom.description.value = '';
    setDom.amount.value = '';
  };

  return {
    displayDate,
    getAccountInput,
    displayNewAccount,
    displayInputToEdit,
    validate,
    clearForm,
    getDom: function () {
      return setDom;
    },
  };
})();
export default UICtrl;
