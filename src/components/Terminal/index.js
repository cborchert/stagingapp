import React, { Component } from "react";
import Commandline from "../Commandline";
import "./Terminal.css";

export default class Terminal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: "",
      cursorLocationStart: 0,
      cursorLocationEnd: 0,
      commandHistory: [],
      visibleHistory: []
    };
    this.handleKeyup = this.handleKeyup.bind(this);
    this.textareaRef = React.createRef();
  }

  handleTextareaChange(e) {
    // console.log(e.target.value);
    this.setState({
      currentInput: e.target.value,
      cursorLocationStart: e.target.selectionStart,
      cursorLocationEnd: e.target.selectionEnd
    });
  }

  handleTextareaInteraction(e) {
    this.setState({
      cursorLocationStart: e.target.selectionStart,
      cursorLocationEnd: e.target.selectionEnd,
      currentInput: e.target.value
    });
  }

  handleKeyup(e) {
    const code = e.which || e.keyCode;
    switch (code) {
      case 13:
        this.newCommand();
        break;
    }
  }

  newCommand() {
    const currentCommand = (
      <Commandline
        text={this.state.currentInput}
        prefix="guest@stagingsite.app:~ "
      />
    );
    this.setState({
      commandHistory: [...this.state.commandHistory, this.state.currentInput],
      visibleHistory: [...this.state.visibleHistory, currentCommand],
      currentInput: ""
    });
  }

  focusOnTextarea() {
    console.log(this.textareaRef.current.focus);
    if (
      this.textareaRef &&
      this.textareaRef.current &&
      this.textareaRef.current.focus
    ) {
      this.textareaRef.current.focus();
    }
  }

  componentDidMount() {
    document.addEventListener("keyup", this.handleKeyup);
    this.focusOnTextarea();
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.handleKeyup);
  }

  render() {
    const { children } = this.props;
    const {
      currentInput,
      cursorLocationStart,
      cursorLocationEnd,
      visibleHistory
    } = this.state;

    return (
      <div className="Terminal">
        <div className="Terminal__intro">{children}</div>
        <div className="Terminal__history">
          {visibleHistory.map((item, i) => {
            return <div key={i}>{item}</div>;
          })}
        </div>
        <div className="Terminal__current">
          <Commandline
            text={currentInput}
            active={true}
            highlightStart={cursorLocationStart}
            highlightEnd={cursorLocationEnd}
            prefix="guest@stagingsite.app:~ "
          />
        </div>
        <textarea
          className="Terminal__textarea"
          onChange={this.handleTextareaChange.bind(this)}
          value={currentInput}
          onClick={this.handleTextareaInteraction.bind(this)}
          onKeyUp={this.handleTextareaInteraction.bind(this)}
          onFocus={this.handleTextareaInteraction.bind(this)}
          onBlur={this.focusOnTextarea.bind(this)}
          ref={this.textareaRef}
        />
      </div>
    );
  }
}
