import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './AddItem.css'

import { DatePicker, notification } from 'antd';

function onOk(value) {
  console.log('onOk: ', value);
}

export default class AddItem extends Component {
  state = {
    error: null,
    isLoaded: false,
    datas: {
      amount: "",
      category: ""
    },
    date: ""
  };

  openNotificationWithIcon = type => {
    notification[type]({
      message: 'Add',
      description:
        'Add new transcation success.',
    });
  };

  addItems = _ => {
    const { datas, date } = this.state;
    fetch(`https://be-4920.herokuapp.com/spending?category=${datas.category}&amount=${datas.amount}&fbclid=IwAR3ruVBFMXI2d-mgnolt0OCgP3UPI2i2ogs_HNDtVGEjgWbzN8XDpzsKK6w&time=${date}`)
      .then(console.log('Add item success'))
      .catch(error => 
        this.setState({
          isLoaded: true,
          error: error
        })
      )
  }

  onChange = (value) => {
    this.setState({
      date: value.toISOString()
    })
  }

  render() {
    const { datas } = this.state;
    return (
      <div>
        <div className="datepicker-input">
            <label htmlFor="text">
              Select a date:
            </label>
        </div>
        <DatePicker className='date-input' 
              size="large" 
              onChange={this.onChange} 
              onOk={onOk} 
        />
        <div className="additem-input">
          <label htmlFor="text">
            Category:
          </label>
          <input 
              type="text"
              placeholder="Enter catagory..." 
              value={datas.category} 
              onChange={e => this.setState({ datas: { ...datas, category: e.target.value}})}
            />
        </div>
        <div className="additem-input">
          <label htmlFor="amount">
            Amount:
          </label>
          <input 
            type="number"
            placeholder="Enter Amount..." 
            value={datas.amount} 
            onChange={e => this.setState({ datas: { ...datas, amount: e.target.value}})}
          />
        </div>
        <br />
        <Link to="/tracker/">
          <button className='additem-btn' onClick={() => {this.addItems(); this.openNotificationWithIcon('success'); }} type="primary">Add Item</button>
        </Link>
        <br />
        <Link to="/tracker/">
          <button className='additem-btn' type="primary">Back to tracker</button>
        </Link>
      </div>
    );
  }
}
