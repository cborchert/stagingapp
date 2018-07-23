import { h, render, Component } from "preact";
import "./Commandline.css";

const Commandline = ({
  active,
  highlightStart,
  highlightEnd,
  text,
  prefix
}) => {
  let renderedText = text;
  if (active) {
    const highlightedText = text.substr(
      highlightStart,
      highlightEnd - highlightStart
    );
    const highlight = (
      <span className="Commandline__highlight">
        &nbsp;
        {highlightedText}
      </span>
    );
    renderedText = (
      <span>
        {text.substr(0, highlightStart)}
        {highlight}
        {text.substr(highlightEnd)}
      </span>
    );
  }

  return (
    <div className="Commandline">
      {prefix}
      {renderedText}
    </div>
  );
};

// Commandline.defaultProps = {
//   active: false,
//   text: "",
//   highlightStart: 0,
//   highlightEnd: 0,
//   prefix: ""
// };

export default Commandline;
