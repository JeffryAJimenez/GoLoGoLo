import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import WorkSpace from "./WorkSpace";

const ADD_LOGO = gql`
  mutation AddLogo($text: String!, $color: String!, $fontSize: Int!) {
    addLogo(text: $text, color: $color, fontSize: $fontSize) {
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
        color: "",
        backgroundColor: "",
        borderColor: "",
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

  render() {
    let text, color, fontSize;
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
                            text: text.value,
                            color: color.value,
                            fontSize: parseInt(fontSize.value),
                          },
                        });
                        text.value = "";
                        color.value = "";
                        fontSize.value = "";
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
                        />
                      </div>
                      <button type='submit' className='btn btn-success'>
                        Submit
                      </button>
                    </form>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error :( Please try again</p>}
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
