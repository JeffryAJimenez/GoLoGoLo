import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import WorkSpace from "./WorkSpace";

const ADD_LOGO = gql`
  mutation AddLogo(
    $text: String!
    $color: String!
    $fontSize: Int!
    $backgroundColor: String!
    $borderColor: String!
    $borderRadius: Int!
    $borderWidth: Int!
    $padding: Int!
    $margins: Int!
  ) {
    addLogo(
      text: $text
      color: $color
      fontSize: $fontSize
      backgroundColor: $backgroundColor
      borderColor: $borderColor
      borderRadius: $borderRadius
      borderWidth: $borderWidth
      padding: $padding
      margins: $margins
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
        text: "",
        color: "#000000",
        backgroundColor: "#ffffff",
        borderColor: "#000000",
        borderRadius: "0",
        borderWidth: "0",
        padding: "0",
        margins: "0",
        fontSize: "69",
      },
    };
  }

  onChange = (e) => {
    let logo = this.state.logo;
    logo[e.target.name] = e.target.value;

    this.setState({ logo });
  };

  checkString = (value) => {
    for (var i = 0; i < value.length; i++) {
      if (value.charAt(i) !== " ") {
        return value;
      }
    }

    return;
  };

  render() {
    let text,
      color,
      fontSize,
      backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      padding,
      margins;
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
                            text: this.checkString(text.value),
                            color: color.value,
                            fontSize: parseInt(fontSize.value),
                            backgroundColor: backgroundColor.value,
                            borderColor: borderColor.value,
                            borderRadius: parseInt(borderRadius.value),
                            borderWidth: parseInt(borderWidth.value),
                            padding: parseInt(padding.value),
                            margins: parseInt(margins.value),
                          },
                        });
                        text.value = "";
                        color.value = "";
                        fontSize.value = "";
                        backgroundColor = "";
                        borderColor = "";
                        borderRadius = "";
                        borderWidth = "";
                        padding = "";
                        margins = "";
                      }}
                    >
                      <div className='form-group'>
                        <label htmlFor='text'>Text:</label>
                        <input
                          type='text'
                          className='form-control'
                          name='text'
                          onChange={(e) => this.onChange(e)}
                          ref={(node) => {
                            text = node;
                          }}
                          placeholder='Text'
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='color'>Color:</label>
                        <input
                          type='color'
                          className='form-control'
                          name='color'
                          onChange={(e) => this.onChange(e)}
                          ref={(node) => {
                            color = node;
                          }}
                          placeholder='Color'
                          required
                        />
                      </div>
                      <div className='form-group'>
                        <label htmlFor='fontSize'>Font Size:</label>
                        <input
                          type='number'
                          className='form-control'
                          name='fontSize'
                          onChange={(e) => this.onChange(e)}
                          ref={(node) => {
                            fontSize = node;
                          }}
                          placeholder='Font Size'
                          min='2'
                          max='144'
                          required
                        />
                      </div>
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
