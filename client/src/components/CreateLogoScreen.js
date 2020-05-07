import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import WorkSpace from "./WorkSpace";
import Text from "./editScreenLayout/Text";

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
        text: [{ text: "John Doe", color: "#000000", size: 12 }],
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderRadius: "0",
        borderWidth: "0",
        padding: "0",
        margins: "0",
        fontSize: "69",
        width: "69",
        height: "69",
      },
    };
  }

  textUpdate = (text, index, data) => {
    let textForm = this.state.logo.text;
    textForm[index] = text;
    let logo = { ...this.state.logo, text: textForm };
    this.setState({ logo });
  };

  update = (index) => {
    if (this.state.logo.text.length > 1) {
      let textForm = this.state.logo.text.splice(index, 1);
      let logo = { ...this.state.logo, text: textForm };
      this.setState({ logo });
    }
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
              <WorkSpace data={this.state} />
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateLogoScreen;
