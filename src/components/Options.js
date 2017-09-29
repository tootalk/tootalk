import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Options extends Component {
  render() {
    const checkboxChange = (e) => {
      this.props.toggleNameSpeak()
    }

    const rangeChange = (e) => {
      this.props.changeMaxRate(e.target.value)
    }

    return (
      <div className="setting-options">
        <input type="range" min="1" max="3" step="0.1" value={this.props.maxRate} onChange={rangeChange}/>読み上げの最大速度：{this.props.maxRate}倍
      </div>
    )
  }
}

Options.propTypes = {
  maxRate: PropTypes.number.isRequired,
  changeMaxRate: PropTypes.func.isRequired,
}
