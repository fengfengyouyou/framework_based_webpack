import React, { Component } from 'react';
import Header from './component/header'
import "antd/dist/antd.css";
import './index'
export default class Root extends Component {
  constructor(props) {
    super(props)
    // this.forwardedRef = React.creactRef()
  }
  componentDidMount() {
    console.log(111, this.forwardedRef)
  }
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <h1>只更新这11里</h1>
        <Header ref={(ref)=>this.forwardedRef = ref}></Header>
      </div>);
  }
};