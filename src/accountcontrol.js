import { v4 as uuidv4 } from 'uuid';
const accountCtrl = (() => {
  //Removed local Storage to deploy on gh-pages

  //objects contains all accounts
  /* const state = {
    accounts:
      Array.from(JSON.parse(localStorage.getItem('storedAccounts'))) || [],
  }; */

  const state = {
    accounts: [],
  };

  class Account {
    constructor(type, description, amount) {
      //create new account
      //Using uuid to generate random IDs
      this.id = uuidv4();
      this.type = type;
      this.description = description;
      this.amount = Number(amount);
      Account.addAccount(this);
    }
    static addAccount(account) {
      //push new account to the array
      state.accounts.push(account);
    }
    static removeAccount(id) {
      //remove account by id
      state.accounts = state.accounts.filter((account) => account.id !== id);
    }
    static getAccounts() {
      //returns all accounts for display
      return state.accounts;
    }
    static getAccountToEdit(id) {
      //get account data by ID after edit click
      let temp = state.accounts.filter((account) => account.id == id);
      return temp;
    }
    static getIncomeTotal() {
      //returns total income for header display
      let incomeTotal = 0;
      state.accounts.forEach((account) => {
        if (account.type == '+') {
          incomeTotal += account.amount;
        }
      });
      return Number(incomeTotal).toFixed(2);
    }
    static getExpensesTotal() {
      //returns total expenses for header display
      let ExpensesTotal = 0;
      state.accounts.forEach((account) => {
        if (account.type == '-') {
          ExpensesTotal += account.amount * -1;
        }
      });
      return Number(ExpensesTotal).toFixed(2);
    }
    static getBudgetTotal() {
      //returns budget total for header display
      let incomeTotal = 0;
      let ExpensesTotal = 0;
      state.accounts.forEach((account) => {
        if (account.type == '+') {
          incomeTotal += account.amount;
        } else {
          ExpensesTotal += account.amount * -1;
        }
      });
      let total = incomeTotal + ExpensesTotal;
      return Number(total).toFixed(2);
    }
  }
  return { Account };
})();

export default accountCtrl;
