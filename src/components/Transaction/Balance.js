import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.newAmount);

  const total = amounts
    .filter(item => !isNaN(item))
    .reduce((acc, item) => (acc += Math.round(item)), 0)
    .toFixed(2);

  return (
    <>
      <h3>Your Balance</h3>
      <h1>{total}</h1>
    </>
  )
}
