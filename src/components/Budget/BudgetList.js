import React, { useContext } from 'react';
import { Budget } from './Budget';
import { GlobalContext_budget } from '../../context/GlobalState_budget';
import cookie from 'react-cookies'
import moment from 'moment';

import './Progress.css';

export const trackerData = () => {
    return cookie.load('trackerData')
}

export const BudgetList = () => {
    const { budgets } = useContext(GlobalContext_budget);
    const transactions = trackerData();

    function calculateProgress(budgets, transactions) {
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

        results.forEach(function (b) {
            var newSpent = parseFloat(b.Spent * rates).toFixed(2);
            var newAmount = parseFloat(b.Amount * rates).toFixed(2);
            b.Progress = newSpent / newAmount;
            b.Spent = b.Progress * newAmount;
            b.newAmount = newAmount;

            if(b.Progress >= 0.50 && b.Progress < 1) {
                b.alert = 'be careful';
            } else if (b.Progress >= 1){
                b.alert = "exceed";
            }else{
                b.alert = "good job";
            }
        });

        return budgets;
    };

    const budgetsWithProgress = calculateProgress(budgets, transactions);

    function budgetListContent(budgets) {
        if (budgets.length === 0) {
            return (<p>There is no budget in this month.</p>);
        } else {
            return (budgets.map(budget => {
                return (
                    <Budget key={budget._id} budget={budget} />
                )
            }));
        }
    }

    return (
        <>
            <h3>Lists</h3>
            <ul className="list">
                {budgetListContent(budgetsWithProgress)}
            </ul>
        </>
    );
}
