import React from 'react';
import Header from './component/header'
import "antd/dist/antd.css";
import './index'
export default class Root extends React.Component {
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <h1>只更新这11里</h1>
        <Header></Header>
      </div>);
  }
};