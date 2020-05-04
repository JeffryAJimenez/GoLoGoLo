import React, { Component } from "react";

class WorkSpace extends Component {
  render() {
    const {
      text,
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      padding,
      margins,
    } = this.props.data.logo;

    const styles = {
      container: {
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderStyle: "solid",
        borderRadius: borderRadius + "pt",
        borderWidth: borderWidth + "pt",
        padding: padding + "pt",
        margin: margins + "pt",
      },
    };

    console.log(text);
    return (
      <div style={styles.container}>
        {text.map((obj) => (
          <div style={{ fontSize: obj.size + "pt", color: obj.color }}>
            {obj.text}
          </div>
        ))}
      </div>
    );
  }
}

export default WorkSpace;
