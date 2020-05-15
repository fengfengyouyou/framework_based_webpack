import { Row, Col } from 'antd';

import React, { Component } from 'react'
import withA from './hightCom.jsx'
class header extends Component {
  constructor(props){
    super(props)
    this.state = {
      aaa:111
    }
  }
  aaa(){
    console.log(13132)
  }
  becomeOnBlur = e => {}
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>col</Col>
        </Row>
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </div>
    )
  }
}
//  const Header = React.forwardRef((props, ref) => (
//   <header></header>
// ))
export default withA(header, () => ({ aaa: 123 }))