import React, { createContext, useState, useEffect } from 'react';
import moment from 'moment';
import cookie from 'react-cookies';
import './global.css';

var ITME_API = `https://be-4920.herokuapp.com/getreminder`;

export const loginUser = () => {
    return cookie.load('userInfo')
};

export const GlobalContext_notification = createContext();

// Provider component
export const GlobalProvider_notification = ({ children }) => {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = `${ITME_API}`
            const response = await fetch(url)
            const data = await response.json()
            setList(data.filter(notification => {
                var before = moment(notification.Time).endOf('day').isBefore(moment());
                return !before;
            }).sort(function (a, b) { if (moment(a.Time).endOf('day').isAfter(b.Time)) { return 1; } return -1; }))
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

    // eslint-disable-next-line react/jsx-pascal-case
    return (<GlobalContext_notification.Provider value={{
        notifications: getRemoval(list)
    }}>
        {children}
    </GlobalContext_notification.Provider>);
}