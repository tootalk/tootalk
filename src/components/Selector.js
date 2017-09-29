import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TL, TLNAME } from '../const.js'

export default class Selector extends Component {
  render() {

    const list = Object.keys(TL).map(key =>
      <option key={key} value={TL[key]}>{TLNAME[key]}</option>
    );

    const handleChange = (e) => {
      this.props.selectTL(e.target.value);
    };

    return (
      <div className="select-1 selector">
        <select onChange={handleChange} value={this.props.tl}>
          {list}
        </select>
      </div>
    )
  }
}

Selector.propTypes = {
  tl: PropTypes.string.isRequired,
  selectTL: PropTypes.func.isRequired,
}
