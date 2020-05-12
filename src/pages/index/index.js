import '../../assets/index.scss'
import '../../assets/index.css'
import '../../assets/index.less'

import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root.jsx';
import aaa from './component/common'
console.log(aaa)
let person = {
  name:undefined
}
let xiaohong = person?.name??'hahha'
console.log(xiaohong)
ReactDOM.render(
  <Root></Root>,
  document.getElementById('root')
);