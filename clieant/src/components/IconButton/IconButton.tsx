import React, { Component } from 'react';
import './iconButton.css';

interface IProps {
  src: string,
  id: string,
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default class IconButton extends Component<IProps> {
  render() {
    const {  onClick, ...rest } = this.props;
    return (
      <button className='icon-button' onClick={onClick}>
        <img
          {...rest}
          alt="Icon"
        />
      </button>
    )
  }
}