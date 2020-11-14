import React, { createContext, useReducer, useState, useEffect } from 'react';
import AppReducer from './AppReducer_budget';
import moment, { months } from 'moment';
import { Header } from '../components/Budget/Header';
import cookie from 'react-cookies'
import './global.css'

function onOk(value) {
    console.log('onOk: ', value);
}

var ITME_API = `https://be-4920.herokuapp.com/getallbudget`

// Initial state
const initialState = {
    budgets: [],
    month: moment().format('MMMM')
}

// Create context
export const GlobalContext_budget = createContext(initialState);

export const loginUser = () => {
    return cookie.load('userInfo')
}

// Provider component
export const GlobalProvider_budget = ({ children }) => {
    const [state] = useReducer(AppReducer, initialState);
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `${ITME_API}`
            const response = await fetch(url)
            const data = await response.json()
            setList(data)
            state.budgets = list.filter(budget => { return budget.Month.localeCompare(state.month) === 0; })
        }
        fetchData()
    });

    function getRemoval(arr1) {
        let arr = [...arr1];
        let newarr = [];
        let userid = loginUser();
        for (const value of arr) {
            if (value.UserID === parseInt(userid)) {
              newarr.push(value);
            }
        }
        return newarr;
    }

  // Actions
    const setMonthToDisplay = function(month) {
        state.month = month;
    };

    // eslint-disable-next-line react/jsx-pascal-case
    return (<GlobalContext_budget.Provider value={{
        budgets: getRemoval(state.budgets)
    }}>
        <Header />
        <div className="month_display">
        <select className="month"
            onChange={e => setMonthToDisplay(e.target.value)}
            onOk={onOk}
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
    </GlobalContext_budget.Provider>);
}