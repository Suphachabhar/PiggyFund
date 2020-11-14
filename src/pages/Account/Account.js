import React, { Component } from 'react';
import cookie from 'react-cookies';
import { notification, Drawer, Form, Col, Row, DatePicker } from 'antd';
import moment from 'moment';
import Profile from './Profile';

import './account.css'

export const loginUser = () => {
    let id = parseInt(cookie.load('userInfo'))
    return id
};

function onOk(value) {
    console.log('onOk: ', value);
}

export default class Account extends Component {
  state = {
    rates: [],
    currencies: [],
    baseCurrency: 'AUD',
    visible: false,
    error: null,
    isLoaded: false,
    datas: {
        date: "",
        message: ""
    }
  };

  componentDidMount() {
    this.callAPI('AUD')
  };

  callAPI = async(base) => {
    try {
      let res = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`);
      let data = await res.json();
      let rate = data['rates']
      let sort_curr = Object.keys(data['rates']).sort()
      this.setState({
        rates: rate,
        currencies: sort_curr
      })

      if (cookie.load('currency') == null) {
        cookie.save('currency', 'AUD', { path: '/' })
        cookie.save('rate', rate['AUD'], { path: '/' })
      }

    } catch (err) {
      console.log(err);
    }
  };

  changeBaseCurrency = (e) => {
    const { rates } = this.state;
    this.setState({ baseCurrency: e.target.value});
    cookie.save('currency', e.target.value, { path: '/' })
    cookie.save('rate', rates[e.target.value], { path: '/' })
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  openNotificationWithIcon = type => {
    notification[type]({
      message: 'Add',
      description:
        'Add new notification success.',
    });
  };

  addNotification = _ => {
    const { datas } = this.state;
      let userid = loginUser();
      if (datas.message.length === 0) {
          notification['error']({
              message: 'Add',
              description:
                  'Please enter the message.',
          });
      } else if (datas.date.length === 0 || moment(datas.date).diff(moment().startOf('day'), "days") <= 0) {
          notification['error']({
              message: 'Add',
              description:
                  'Please enter a valid date (after today).',
          });
      } else {
          fetch(`https://be-4920.herokuapp.com/addreminder?message=${datas.message}&time=${datas.date}&userid=${userid}`)
              .then(console.log('Add item success'))
              .catch(error =>
                  this.setState({
                      isLoaded: true,
                      error: error
                  })
          );
          this.openNotificationWithIcon('success');
          this.onClose();
      }
  }

  render() {
    const { currencies, datas } = this.state;

    const currencyChoice = currencies.map(currency =>
      <option key={currency} value={currency}> {currency} </option>      
    );
    return (
    <div>
        <div style={{ height: 60 }}></div>
        <Profile />
        <div>
            <label className="currency-font">
              Currency: 
              <select 
                className="currency-select" 
                value={cookie.load('currency')} 
                onChange={this.changeBaseCurrency}
              >
                {currencyChoice}
                <option>{cookie.load('currency')}</option>
              </select>
            </label>
        </div>
            <button className='back-btn' onClick={this.showDrawer} type="primary" style={{width: 520}}>Add Notification</button>

            <Drawer
                title="Add a new notification"
                width={520}
                onClose={this.onClose}
                visible={this.state.visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <button className='additem-btn' type="primary" onClick={this.onClose} style={{ marginRight: 8 }}>Cancel</button>
                        <button className='additem-btn' onClick={() => { this.addNotification(); }} type="primary">Add Message</button>
                    </div>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="dateTime"
                                label="Date"
                                rules={[{ required: true, message: 'Please choose the dateTime' }]}
                            >
                                <DatePicker className='date-input'
                                    size="large"
                                    style={{ width: '100%' }}
                                    onChange={e => { if (e) { this.setState({ datas: { ...datas, date: e.toISOString() } })}}}
                                    onOk={onOk}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="message"
                                label="Message"
                                rules={[{ required: true, message: 'Please enter the message' }]}
                            >
                                <input
                                    type="text"
                                    placeholder="Enter message..."
                                    value={this.state.datas.message}
                                    onChange={e => this.setState({ datas: { ...datas, message: e.target.value } })}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
      </div>
    );
  }
}
