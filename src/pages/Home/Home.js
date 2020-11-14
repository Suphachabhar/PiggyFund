import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import 'antd/dist/antd.css'; 

export default class Home extends Component {
  render() {
    return (
      
      <div className="container">
        <Link to="/additems">
          <button className='back-btn' type="primary">Add Transcation</button>
        </Link>

        <Link to="/budget">
          <button className='back-btn' type="primary">Add Budget</button>
        </Link>
        
      </div>
    )
  }
}


