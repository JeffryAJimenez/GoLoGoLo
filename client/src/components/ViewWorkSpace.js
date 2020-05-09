import React, { Component } from "react";

class ViewWorkSpace extends Component {
  render() {
    const {
      text,
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      padding,
      margins,
      width,
      height,
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
        width: width + "pt",
        height: height + "pt",
        position: "relative",
      },
    };

    return (
      <div style={styles.container}>
        {text.map((obj, index) => (
          <div
            style={{
              zIndex: text.length - index,
              fontSize: obj.size + "pt",
              color: obj.color,
              position: "absolute",
              cursor: "move",
              top: obj.y + "px",
              left: obj.x + "px",
            }}
          >
            {obj.text}
          </div>
        ))}
      </div>
    );
  }
}

export default ViewWorkSpace;
