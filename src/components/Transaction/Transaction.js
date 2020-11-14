import React from 'react';
import Moment from 'react-moment';
import cookie from 'react-cookies'

import { notification } from 'antd';

import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

export const Transaction = ({ transaction }) => {

  function deleteTransaction(id) {
    fetch(`http://be-4920.herokuapp.com/deletespending?id=${id}`)
      .then(console.log('delete', id))
      .catch(error => 
        console.log(error)
      )
  }

  function openNotificationWithIcon(type) {
    notification[type]({
      message: 'Delete',
      description:
        'Delete Transcation Successfully',
    });
  };

  const sign = transaction.newAmount < 0 ? '-' : '+';

  const convertToCurrency = cookie.load('currency');
  
  return (
    <li className={transaction.newAmount < 0 ? 'minus' : 'plus'}>
      {transaction.Category} 
      <p><Moment format="YYYY-MM-DD HH:mm:ss">{transaction.Time}</Moment></p>
      <span className="thick">{sign} {Math.abs(transaction.newAmount)} {convertToCurrency}</span>
      <DeleteOutlineIcon 
        style={{ color: '#c0392b', fontSize: 24 }}
        onClick={() => {deleteTransaction(transaction._id); openNotificationWithIcon('warning')}} 
      />
    </li>
  )
}
