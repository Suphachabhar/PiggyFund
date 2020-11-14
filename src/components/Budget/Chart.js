
import {Doughnut} from 'react-chartjs-2';
import { GlobalContext_budget } from '../../context/GlobalState_budget';
import { ColourGenerator } from './ColourGenerator';
import React, { useContext } from 'react';

export const Chart = () => {
    const { budgets } = useContext(GlobalContext_budget);

    function groupBudgets(budgets) {
        var groups = {};

        budgets.forEach(function (i) {
            if (groups.hasOwnProperty(i.Category)) {
                groups[i.Category] += i.Amount;
            } else {
                groups[i.Category] = i.Amount;
            }
        });

        var result = [];

        for (var g in groups) {
            result.push({ Category: g, Amount: groups[g].toFixed(2) });
        }

        return result;
    }

    const grouped = groupBudgets(budgets);
    const colours = ColourGenerator.getInstance(grouped.length);

    const state = {
    labels: grouped.map(b => b.Category),
    datasets: [
        {
        label: 'Budgets',
        backgroundColor: colours[0],
        hoverBackgroundColor: colours[1],
        data: grouped.map(b => b.Amount)
        }
    ]
    }

    const options = {
        title: {
            display: true,
            text:'',
            fontSize:20
            },
        legend: {
            display: true,
            position:'right'
            }
    }

    return (
    <h2>
        <Doughnut
        data={state}
        options={options}
        />
    </h2>
    )
}
  

