import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import WorkSpace from "./WorkSpace";

const GET_LOGO = gql`
  query logo($logoId: String) {
    logo(id: $logoId) {
      _id
      text
      color
      backgroundColor
      borderColor
      borderRadius
      borderWidth
      padding
      margins
      fontSize
      lastUpdate
    }
  }
`;

const UPDATE_LOGO = gql`
  mutation updateLogo(
    $id: String!
    $text: String!
    $color: String!
    $fontSize: Int!
  ) {
    updateLogo(id: $id, text: $text, color: $color, fontSize: $fontSize) {
      lastUpdate
    }
  }
`;

class EditLogoScreen extends Component {
  constructor(props) {
    super(props);
    this.state = undefined;
  }

  onChange = (e, data) => {
    data.logo[e.target.name] = e.target.value;
    this.setState({});
  };

  render() {
    let text, color, fontSize;
    return (
      <Query
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <Mutation
              mutation={UPDATE_LOGO}
              key={data.logo._id}
              onCompleted={() => this.props.history.push(`/`)}
            >
              {(updateLogo, { loading, error }) => (
                <div className='container'>
                  <div className='panel panel-default'>
                    <div className='panel-heading'>
                      <h4>
                        <Link to='/'>Home</Link>
                      </h4>
                      <h3 className='panel-title'>Edit Logo</h3>
                    </div>
                    <div className='row'>
                      <div className='col-'>
                        <div className='panel-body'>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              updateLogo({
                                variables: {
                                  id: data.logo._id,
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
                                onChange={(e) => this.onChange(e, data)}
                                ref={(node) => {
                                  text = node;
                                }}
                                placeholder='Text'
                                defaultValue={data.logo.text}
                              />
                            </div>
                            <div className='form-group'>
                              <label htmlFor='color'>Color:</label>
                              <input
                                type='color'
                                className='form-control'
                                name='color'
                                onChange={(e) => this.onChange(e, data)}
                                ref={(node) => {
                                  color = node;
                                }}
                                placeholder='Color'
                                defaultValue={data.logo.color}
                              />
                            </div>
                            <div className='form-group'>
                              <label htmlFor='fontSize'>Font Size:</label>
                              <input
                                type='text'
                                className='form-control'
                                name='fontSize'
                                onChange={(e) => this.onChange(e, data)}
                                ref={(node) => {
                                  fontSize = node;
                                }}
                                placeholder='Font Size'
                                defaultValue={data.logo.fontSize}
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
                      <WorkSpace data={data} />
                    </div>
                  </div>
                </div>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default EditLogoScreen;
