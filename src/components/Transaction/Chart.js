
import {Doughnut} from 'react-chartjs-2';
import { GlobalContext } from '../../context/GlobalState';
import React, { useContext } from 'react';

export const Chart = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.Amount);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += Math.round(item)), 0)
    .toFixed(2);

  const outcome = amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc -= Math.round(item)), 0)
    .toFixed(2);

  const state = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Balance',
        backgroundColor: [
          '#2ecc71',
          '#B21F00'
        ],
        hoverBackgroundColor: [
          '#4B5000',
          '#501800'
        ],
        data: [income, outcome]
      }
    ]
  }
  return (
    <div className="donut_chart">
      <Doughnut
        data={state}
        options={{
          title:{
            display: true,
            text:'',
            fontSize:20
          },
          legend:{
            display: true,
            position:'right'
          }
        }}
      />
    </div>
  )
}
  

