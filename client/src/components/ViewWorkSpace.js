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
      img,
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

              top: obj.y + "px",
              left: obj.x + "px",
            }}
          >
            {obj.text}
          </div>
        ))}

        {img &&
          img.map((obj, index) => (
            <img
              style={{
                zIndex: text.length - index,

                position: "absolute",
                top: obj.y + "px",
                left: obj.x + "px",
              }}
              alt='test'
              src={obj.url}
              width={obj.width ? obj.width : 40}
              height={obj.height ? obj.height : 40}
            />
          ))}
      </div>
    );
  }
}

export default ViewWorkSpace;
