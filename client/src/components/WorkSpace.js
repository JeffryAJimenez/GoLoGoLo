import React, { Component } from "react";

class WorkSpace extends Component {
  render() {
    const {
      text,
      color,
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      padding,
      margins,
      fontSize,
    } = this.props.data.logo;

    const styles = {
      container: {
        color: color,
        fontSize: fontSize + "pt",
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
      <div className='col' style={styles.container}>
        {text}
      </div>
    );
  }
}

export default WorkSpace;
