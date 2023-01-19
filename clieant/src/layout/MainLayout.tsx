import React from "react";

interface IProps {
  children:
    | JSX.Element
    | JSX.Element[]
}

class MainLayout extends React.Component<IProps> {
  render() {
    return (
      <div className="wrapper">
        <div className="main__container">{this.props.children}</div>
      </div>
    );
  }
}

export default MainLayout;
