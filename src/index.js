import UICtrl from './uicontrol';
import accountCtrl from './accountcontrol';
import './style.css';

const appCtrl = (() => {
  //import DOM elements
  const DOM = UICtrl.getDom();

  //handles adding new account
  function addAccount() {
    //get data from input form
    const newAcc = UICtrl.getAccountInput();
    //check data input is not empty
    const validation = UICtrl.validate(newAcc);
    if (!validation) {
      return;
    }

    //make new account
    const setNewAcc = new accountCtrl.Account(
      newAcc.type,
      newAcc.description,
      newAcc.amount
    );

    //display new account
    UICtrl.displayNewAccount(setNewAcc);

    //update total display
    updateTotals();

    //empty form fields
    UICtrl.clearForm();
  }

  function handleEditClick(id) {
    //get account data by id
    let tempAccount = accountCtrl.Account.getAccountToEdit(id);
    //display account data in add form
    UICtrl.displayInputToEdit(tempAccount[0]);
    //remove account from data
    accountCtrl.Account.removeAccount(id);
  }

  //handles delete or edit click from account list
  function editOrRemove(e) {
    if (e.target.classList.contains('delete-icon')) {
      //if click = delete
      //remove account from data by id
      accountCtrl.Account.removeAccount(e.target.parentElement.id);
    } else if (e.target.classList.contains('edit-icon')) {
      //if click = edit
      handleEditClick(e.target.parentElement.id);
    }
    //remove account from display
    e.target.parentElement.parentElement.remove();

    updateTotals();
  }

  //updates total income, expenses & budget in header display
  const updateTotals = () => {
    DOM.incomeAmount.innerHTML = accountCtrl.Account.getIncomeTotal();
    DOM.expensesAmount.innerHTML = accountCtrl.Account.getExpensesTotal();
    DOM.totalAmount.innerHTML = accountCtrl.Account.getBudgetTotal();
  };

  //App start
  const start = () => {
    //activates event listeners for account lists
    DOM.allAccounts.forEach((account) => {
      account.addEventListener('click', editOrRemove);
    });

    //activates event listeners for add button
    DOM.addBtn.addEventListener('click', addAccount);

    //display date
    UICtrl.displayDate();

    //get and display all accounts saved in local storage
    const retreiveAccounts = accountCtrl.Account.getAccounts();
    retreiveAccounts.forEach((account) => {
      UICtrl.displayNewAccount(account);
    });

    //update total display
    updateTotals();
  };

  return { start };
})();

appCtrl.start();
