import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import WorkSpace from "./WorkSpace";
import Text from "./editScreenLayout/Text";
import Image from "./editScreenLayout/Images";

const ADD_LOGO = gql`
  mutation AddLogo(
    $text: [TextInput!]
    $backgroundColor: String!
    $borderColor: String!
    $borderRadius: Int!
    $borderWidth: Int!
    $padding: Int!
    $margins: Int!
    $width: Int!
    $height: Int!
    $img: [ImageInput]
  ) {
    addLogo(
      text: $text
      backgroundColor: $backgroundColor
      borderColor: $borderColor
      borderRadius: $borderRadius
      borderWidth: $borderWidth
      padding: $padding
      margins: $margins
      width: $width
      height: $height
      img: $img
    ) {
      _id
    }
  }
`;

class CreateLogoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: {
        text: [{ text: "John Doe", color: "#000000", size: 22, x: 0, y: 0 }],
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderRadius: "0",
        borderWidth: "0",
        padding: "0",
        margins: "0",
        fontSize: "69",
        width: "200",
        height: "200",
        img: [],
      },
    };
  }

  changeXY = (x, y, index, form) => {
    let texts = [...this.state.logo.text];
    texts[index].x = x;
    texts[index].y = y;

    let logo = { ...this.state.logo, text: texts };

    this.setState({ logo });
  };

  imgXY = (x, y, index, form) => {
    let images = [...this.state.logo.img];
    images[index].x = x;
    images[index].y = y;

    let logo = { ...this.state.logo, img: images };

    this.setState({ logo });
  };

  changeImgSize = (height, width, index, form) => {
    let images = [...this.state.logo.img];
    images[index].height = height;
    images[index].width = width;

    let logo = { ...this.state.logo, img: images };

    this.setState({ logo });
  };

  moveText = (pos, destination, data) => {
    if (destination < 0) {
      console.log("destination: ", destination);
    } else if (destination > this.state.logo.text.length - 1) {
      console.log("destination: ", destination);
    } else {
      console.log("Before Change: ", this.state.logo.text);
      const texts = [...this.state.logo.text];

      const textObj = Object.assign({}, texts[pos]);
      texts[pos] = Object.assign({}, texts[destination]);
      texts[destination] = Object.assign({}, textObj);

      // data.logo.text = [...texts];
      let logo = { ...this.state.logo, text: texts };

      this.setState({ logo });
      console.log("After Change: ", this.state.logo.text);
    }
  };

  moveImage = (pos, destination, data) => {
    if (destination < 0) {
      console.log("destination: ", destination);
    } else if (destination > this.state.logo.img.length - 1) {
      console.log("destination: ", destination);
    } else {
      const images = [...this.state.logo.img];

      const imgObj = Object.assign({}, images[pos]);
      images[pos] = Object.assign({}, images[destination]);
      images[destination] = Object.assign({}, imgObj);

      let logo = { ...this.state.logo, img: images };
      this.setState({ logo });
    }
  };

  addText = (data) => {
    const dummy = { text: "John Doe", color: "#000000", size: 24, x: 0, y: 0 };
    const texts = [...data.logo.text, dummy];
    let logo = { ...this.state.logo, text: texts };

    this.setState({ logo });
  };

  addImage = (data) => {
    const dummy = { url: "", x: 0, y: 0, height: 40, width: 40 };
    const images = [...data.logo.img, dummy];
    let logo = { ...this.state.logo, img: images };

    this.setState({ logo });
  };

  textUpdate = (text, index, data) => {
    let textForm = this.state.logo.text;
    textForm[index] = text;
    let logo = { ...this.state.logo, text: textForm };
    this.setState({ logo });
  };

  ImageUpdate = (img, index, data) => {
    let imgForm = this.state.logo.img;
    imgForm[index] = img;
    let logo = { ...this.state.logo, img: imgForm };
    this.setState({ logo });
  };

  update = (index) => {
    if (this.state.logo.text.length > 1) {
      let textForm = this.state.logo.text.splice(index, 1);
      let logo = { ...this.state.logo, text: textForm };
      this.setState({ logo });
    }
  };

  updateImg = (index) => {
    let imgForm = this.state.logo.img.splice(index, 1);
    let logo = { ...this.state.logo, img: imgForm };
    this.setState({ logo });
  };

  onChange = (e) => {
    let logo = this.state.logo;
    logo[e.target.name] = e.target.value;

    this.setState({ logo });
  };

  checkString = (value) => {
    console.log(value);
    value.map((obj) => {
      for (var i = 0; i < obj.text.length; i++) {
        console.log(obj.text);
        if (obj.text.charAt(i) !== " ") {
          return value;
        }
      }

      return [];
    });

    return;
  };

  render() {
    let backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      padding,
      margins,
      width,
      height;
    return (
      <Mutation
        mutation={ADD_LOGO}
        onCompleted={() => this.props.history.push("/")}
      >
        {(addLogo, { loading, error }) => (
          <div className='container'>
            <div className='row'>
              <div className='col-'>
                <div className='panel panel-default'>
                  <div className='panel-heading'>
                    <h4>
                      <Link to='/'>Home</Link>
                    </h4>
                    <h3 className='panel-title'>Create Logo</h3>
                  </div>
                  <div className='panel-body'>
                    <button onClick={() => this.addText(this.state)}>
                      Add Text
                    </button>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        addLogo({
                          variables: {
                            text: this.state.logo.text.map((obj) => {
                              const size = parseInt(obj.size);
                              obj.size = size;
                              return obj;
                            }),
                            backgroundColor: backgroundColor.value,
                            borderColor: borderColor.value,
                            borderRadius: parseInt(borderRadius.value),
                            borderWidth: parseInt(borderWidth.value),
                            padding: parseInt(padding.value),
                            margins: parseInt(margins.value),
                            width: parseInt(width.value),
                            height: parseInt(height.value),
                            img: this.state.logo.img.map((obj) => {
                              const { __typename, ...other } = obj;
                              const x = parseInt(other.x);
                              const y = parseInt(other.y);
                              const width = parseInt(other.width);
                              const height = parseInt(other.height);
                              other.x = x;
                              other.y = y;
                              other.width = width;
                              other.height = height;
                              return other;
                            }),
                          },
                        });

                        backgroundColor = "";
                        borderColor = "";
                        borderRadius = "";
                        borderWidth = "";
                        padding = "";
                        margins = "";
                        width = "";
                        height = "";
                      }}
                    >
                      {this.state.logo.text.map((obj, index) => (
                        <Text
                          data={obj}
                          index={index}
                          callback={this.textUpdate}
                          updateState={this.update}
                          move={this.moveText}
                        />
                      ))}

                      <div className='form-group'>
                        <label htmlFor='backgroundColor'>
                          background Color:
                        </label>
                        <input
                          type='color'
                          className='form-control'
                          name='backgroundColor'
                          onChange={(e) => this.onChange(e)}
                          ref={(node) => {
                            backgroundColor = node;
                          }}
                          defaultValue={"#ffffff"}
                          placeholder='Background Color'
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='borderColor'>Border Color:</label>
                        <input
                          type='color'
                          className='form-control'
                          name='borderColor'
                          onChange={(e) => this.onChange(e)}
                          ref={(node) => {
                            borderColor = node;
                          }}
                          placeholder='Border Color'
                          defaultValue='#000000'
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='borderRadius'>Border Radius:</label>
                        <input
                          type='number'
                          className='form-control'
                          name='borderRadius'
                          onChange={(e) => this.onChange(e)}
                          ref={(node) => {
                            borderRadius = node;
                          }}
                          placeholder='Background Radius'
                          min='0'
                          max='144'
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='borderWidth'>Border Width:</label>
                        <input
                          type='number'
                          className='form-control'
                          name='borderWidth'
                          onChange={(e) => this.onChange(e)}
                          ref={(node) => {
                            borderWidth = node;
                          }}
                          placeholder='Border Width'
                          min='0'
                          max='144'
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='padding'>Padding:</label>
                        <input
                          type='number'
                          className='form-control'
                          name='padding'
                          onChange={(e) => this.onChange(e)}
                          ref={(node) => {
                            padding = node;
                          }}
                          placeholder='Padding'
                          min='0'
                          max='144'
                          required
                        />
                      </div>

                      <div className='form-group'>
                        <label htmlFor='margins'>Margins:</label>
                        <input
                          type='number'
                          className='form-control'
                          name='margins'
                          onChange={(e) => this.onChange(e)}
                          ref={(node) => {
                            margins = node;
                          }}
                          placeholder='Margins'
                          min='0'
                          max='144'
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='borderWidth'>Logo's Width:</label>
                        <input
                          type='number'
                          className='form-control'
                          name='width'
                          onChange={(e) => this.onChange(e)}
                          ref={(node) => {
                            width = node;
                          }}
                          placeholder='Logo Width'
                          min='0'
                          required
                        />
                      </div>

                      <div className='form-group'>
                        <label htmlFor='borderWidth'>Logo's Height:</label>
                        <input
                          type='number'
                          className='form-control'
                          name='height'
                          onChange={(e) => this.onChange(e)}
                          ref={(node) => {
                            height = node;
                          }}
                          placeholder='Logo height'
                          min='0'
                          required
                        />
                      </div>

                      <button
                        type='button'
                        onClick={() => this.addImage(this.state)}
                      >
                        Add Image
                      </button>

                      {this.state.logo.img &&
                        this.state.logo.img.map((obj, index) => (
                          <Image
                            data={obj}
                            index={index}
                            callback={this.ImageUpdate}
                            updateState={this.updateImg}
                            move={this.moveImage}
                          />
                        ))}

                      <button type='submit' className='btn btn-success'>
                        Submit
                      </button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {error && (
                      <p>Error!:( A logo with only spaces is not allowed</p>
                    )}
                  </div>
                </div>
              </div>
              <WorkSpace
                data={this.state}
                changeXY={this.changeXY}
                imgXY={this.imgXY}
                changeImgSize={this.changeImgSize}
              />
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateLogoScreen;
