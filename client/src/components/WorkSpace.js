import React, { Component } from "react";
import { Rnd } from "react-rnd";

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
      },
    };

    return (
      <div style={styles.container}>
        {text.map((obj, index) => (
          <Rnd
            style={{
              zIndex: text.length - index,
              fontSize: obj.size + "pt",
              color: obj.color,
              position: "absolute",
              cursor: "move",
            }}
            bounds='parent'
          >
            {obj.text}
          </Rnd>
        ))}
      </div>
    );
  }
}

export default WorkSpace;
