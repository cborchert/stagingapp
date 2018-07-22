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
    const command = this.state.currentInput;
    switch (code) {
      case 13:
        this.newCommand();
        this.checkCommand(command);
        break;
    }
  }

  checkCommand(command) {
    if (command && command.trim) {
      let cmd = command.trim().toLowerCase();
      if (cmd === "clear") {
        this.setState({ visibleHistory: [] });
      } else if (cmd === "help") {
        let output = (
          <div>
            <br />&nbsp;&nbsp;stagingsite.app commands
            <br />&nbsp;&nbsp;------------------------
            <br />&nbsp;&nbsp;`clear` clears the screen
            <br />&nbsp;&nbsp;`help` shows the help screen
            <br />&nbsp;&nbsp;`about` shows app information
            <br />
            <br />
          </div>
        );
        this.setState({
          visibleHistory: [...this.state.visibleHistory, output]
        });
      } else if (cmd === "about") {
        let output = (
          <div>
            <br />&nbsp;&nbsp;stagingsite.app created by{" "}
            <a href="http://cborchert.com/" target="_blank">
              chris borchert
            </a>.
            <br />&nbsp;&nbsp;check out the{" "}
            <a href="https://github.com/cborchert/stagingapp" target="_blank">
              git repo
            </a>
            <br />&nbsp;&nbsp;need some dev work done?{" "}
            <a href="http://cborchert.com/hire" target="_blank">
              drop a line
            </a>
            <br />
            <br help />
          </div>
        );
        this.setState({
          visibleHistory: [...this.state.visibleHistory, output]
        });
      } else {
        let output = (
          <div>
            <br />&nbsp;&nbsp;command not recognized.
            <br />&nbsp;&nbsp;type `help` for a list of all commands.<br />
            <br />
          </div>
        );
        this.setState({
          visibleHistory: [...this.state.visibleHistory, output]
        });
      }
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
