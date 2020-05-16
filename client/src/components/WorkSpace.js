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
          <Rnd
            position={{
              x: obj.x,
              y: obj.y,
            }}
            style={{
              zIndex: text.length - index,
              fontSize: obj.size + "pt",
              color: obj.color,
              position: "absolute",
              cursor: "move",
            }}
            bounds='parent'
            onDragStop={(e, d) => {
              this.props.changeXY(d.x, d.y, index, this.props.data);
            }}
          >
            {obj.text}
          </Rnd>
        ))}

        {img &&
          img.map((obj, index) => (
            <Rnd
              position={{
                x: obj.x,
                y: obj.y,
              }}
              style={{
                zIndex: text.length - index,
                position: "absolute",
                cursor: "move",
              }}
              bounds='parent'
              onDragStop={(e, d) => {
                this.props.imgXY(d.x, d.y, index, this.props.data);
              }}
              size={
                obj.height
                  ? { width: obj.width, height: obj.height }
                  : { width: 40, height: 40 }
              }
              onResizeStop={(e, direction, ref, delta, position) => {
                this.props.changeImgSize(
                  ref.style.height,
                  ref.style.width,
                  index,
                  this.props.data
                );
              }}
            >
              <img
                alt='test'
                src={obj.url}
                width={obj.width ? obj.width : 40}
                height={obj.height ? obj.height : 40}
              />
            </Rnd>
          ))}
      </div>
    );
  }
}

export default WorkSpace;
