import React, { createContext, useReducer, useState, useEffect } from 'react';
import AppReducer from './AppReducer';
import moment, { months } from 'moment';
import cookie from 'react-cookies'
import { Header } from '../components/Transaction/Header';
import './global.css'

const ITME_API = `https://be-4920.herokuapp.com/getall`

// Initial state
const initialState = {
  transactions: [],
  all_transactions: [],
  month: moment().format('MMMM')
}

// Create context
export const GlobalContext = createContext(initialState);

export const loginUser = () => {
  return cookie.load('userInfo')
}


// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
    const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const url = `${ITME_API}`;
        const response = await fetch(url);
        const data = await response.json();
        setList(data);
        state.all_transactions = list;
        state.transactions = list.filter(transaction => { return moment(transaction.Time).format('MMMM').localeCompare(state.month) === 0; })
            .sort(function (a, b) { return moment(a.Time).diff(moment(b.Time)); });
    }
    fetchData()
  })

  function getRemoval(arr1) {
    let arr = [...arr1];
    let newarr = [];
    let userid = loginUser();
    var convertToCurrency = cookie.load('currency');
    if (!convertToCurrency) {
      cookie.save('currency', 'AUD', { path: '/' });
    }
    var rates = cookie.load('rate');
    if (!rates) {
      rates = 1;
      cookie.save('rate', 1, { path: '/' })
    }
    for (const value of arr) {
        if (value.UserID === parseInt(userid)) {
          let baseAmount = parseInt(value.Amount)
          let res = parseInt(baseAmount * rates)
          value.newAmount = res.toString()
          newarr.push(value);
        }
    }
    return newarr;
  }

  function getRemovalAll(arr1) {
    let arr = [...arr1];
    let newarr = [];
    let userid = loginUser();
    for (const value of arr) {
        if (value.UserID === parseInt(userid)) {
          newarr.push(value);
        }
    }
    cookie.save('trackerData', newarr, { path: '/' })
    return newarr;
  }

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  const setMonthToDisplay = function(month) {
    state.month = month;
  };



  return (<GlobalContext.Provider value={{
    transactions: getRemoval(state.transactions),
    all_transactions: getRemovalAll(state.all_transactions),
    deleteTransaction,
    addTransaction
  }}>
    <Header />
    <div className="month_display">
      <select className="month"
        onChange={e => setMonthToDisplay(e.target.value)}
        
      >
        {months().map(month => {
            if (moment().format('MMMM').localeCompare(month) === 0) {
                return (<option value={month} selected>{month}</option>)
            } else {
                return (<option value={month}>{month}</option>)
            }
        })}
      </select>
    </div>
    
    {children}
  </GlobalContext.Provider>);
}