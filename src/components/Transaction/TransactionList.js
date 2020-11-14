import React, { useContext } from 'react';
import { Transaction } from './Transaction';

import { GlobalContext } from '../../context/GlobalState';

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

    function transactionListContent(transactions) {
        if (transactions.length === 0) {
            return (<p>There is no transaction in this month.</p>);
        } else {
            return (transactions.map(transaction => {
                return (
                    <Transaction key={transaction._id} transaction={transaction} />
                )
            }));
        }
    }

  return (
    <>
      <h3>History</h3>
      <ul className="list">
              {transactionListContent(transactions)}
      </ul>
    </>
  )
}
