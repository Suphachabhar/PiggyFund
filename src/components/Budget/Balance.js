import React, { useContext } from 'react';
import { GlobalContext_budget } from '../../context/GlobalState_budget';
import cookie from 'react-cookies'
import moment from 'moment';

export const trackerData = () => {
    return cookie.load('trackerData')
}

export const Balance_budget = () => {
  const { budgets } = useContext(GlobalContext_budget);

  function calculateProgress(budgets) {
      const transactions = trackerData();
      var results = [];

      budgets.forEach(function (b) {
          results.push(b);
          results[results.length - 1].Progress = 0;
          results[results.length - 1].Spent = 0;
      });

      transactions.forEach(function (t) {
          results.forEach(function (b) {
              if (b.Category.toUpperCase().localeCompare(t.Category.toUpperCase()) === 0 && b.Month === moment(t.Time).format('MMMM')) {
                  var cost = parseFloat(t.Amount).toFixed(2)
                  b.Spent -= cost;
              }
          });
      });

      const rates = cookie.load('rate');

      let total = [];
      total.spent = 0;
      total.amount = 0;
      results.forEach(function (b) {
          var newSpent = parseFloat(b.Spent * rates).toFixed(2);
          var newAmount = parseFloat(b.Amount * rates).toFixed(2);
          b.Progress = newSpent / newAmount;
          b.Spent = b.Progress * newAmount;
          b.newAmount = newAmount;
          total.amount += b.Amount;
          total.spent += b.Spent;
      });

      return total;
  };


  const total = calculateProgress(budgets)

  return (
    <>
      <h1>{total}</h1>
      <div className="inc-exp-container-budget">
        <div>
          <h4>Expense</h4>
          <p className="money minus">{total.spent}</p>
        </div>
        <div>
          <h4>Total</h4>
          <p className="money plus">{total.amount}</p>
        </div>
      </div>
    </>
  )
}
