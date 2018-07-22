import React, { Component } from "react";
import "./Terminal.css";

export default class Terminal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { children } = this.props;
    return <div className="Terminal" />;
  }
}
