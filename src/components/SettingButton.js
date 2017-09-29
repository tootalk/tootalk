import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SettingButton extends Component {
  render() {
    const handleChange = (e) => {
      this.props.toggleSettingOpen()
    }
    return (
      <div className="setting-button" onClick={handleChange}>
        <div className="fa fa-cog fa-2x">
        </div>
      </div>
    )
  }
}

SettingButton.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  toggleSettingOpen: PropTypes.func.isRequired,
}
