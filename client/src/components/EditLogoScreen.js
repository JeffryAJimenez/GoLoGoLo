import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import WorkSpace from "./WorkSpace";
import Text from "./editScreenLayout/Text";

const GET_LOGO = gql`
  query logo($logoId: String) {
    logo(_id: $logoId) {
      _id
      text {
        text
        color
        size
      }
      backgroundColor
      borderColor
      borderRadius
      borderWidth
      padding
      margins
      width
      height
      lastUpdate
    }
  }
`;

const UPDATE_LOGO = gql`
  mutation updateLogo(
    $id: String!
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
    updateLogo(
      _id: $id
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

  textUpdate = (text, index, data) => {
    data.logo.text[index] = text;
    this.setState({});
  };

  addText = (data) => {
    const dummy = { text: "John Doe", color: "#ffffff", size: 14 };
    const texts = [...data.logo.text, dummy];
    data.logo.text = texts;
    this.setState({});
  };

  update = () => {
    this.setState({});
  };

  render() {
    let backgroundColor,
      borderColor,
      borderRadius,
      borderWidth,
      padding,
      margins,
      height,
      width;
    return (
      <Query
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
        fetchPolicy={"no-cache"}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          console.log(data.logo.height);

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
                          <button onClick={() => this.addText(data)}>
                            Add Text
                          </button>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              updateLogo({
                                variables: {
                                  id: data.logo._id,
                                  text: data.logo.text.map((obj) => {
                                    const { __typename, ...other } = obj;
                                    const size = parseInt(other.size);
                                    other.size = size;
                                    return other;
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
                            {data.logo.text.map((obj, index) => (
                              <Text
                                data={obj}
                                index={index}
                                callback={this.textUpdate}
                                updateState={this.update}
                                form={data}
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
                                onChange={(e) => this.onChange(e, data)}
                                ref={(node) => {
                                  backgroundColor = node;
                                }}
                                placeholder='Background Color'
                                defaultValue={data.logo.backgroundColor}
                              />
                            </div>
                            <div className='form-group'>
                              <label htmlFor='borderColor'>Border Color:</label>
                              <input
                                type='color'
                                className='form-control'
                                name='borderColor'
                                onChange={(e) => this.onChange(e, data)}
                                ref={(node) => {
                                  borderColor = node;
                                }}
                                placeholder='Border Color'
                                defaultValue={data.logo.borderColor}
                              />
                            </div>
                            <div className='form-group'>
                              <label htmlFor='borderRadius'>
                                Border Radius:
                              </label>
                              <input
                                type='number'
                                className='form-control'
                                name='borderRadius'
                                onChange={(e) => this.onChange(e, data)}
                                ref={(node) => {
                                  borderRadius = node;
                                }}
                                placeholder='Background Radius'
                                defaultValue={data.logo.borderRadius}
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
                                onChange={(e) => this.onChange(e, data)}
                                ref={(node) => {
                                  borderWidth = node;
                                }}
                                placeholder='Border Width'
                                defaultValue={data.logo.borderWidth}
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
                                onChange={(e) => this.onChange(e, data)}
                                ref={(node) => {
                                  padding = node;
                                }}
                                placeholder='Padding'
                                defaultValue={data.logo.padding}
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
                                onChange={(e) => this.onChange(e, data)}
                                ref={(node) => {
                                  margins = node;
                                }}
                                placeholder='Margins'
                                defaultValue={data.logo.margins}
                                min='0'
                                max='144'
                                required
                              />
                            </div>
                            <div className='form-group'>
                              <label htmlFor='borderWidth'>Logo Width:</label>
                              <input
                                type='number'
                                className='form-control'
                                name='width'
                                onChange={(e) => this.onChange(e, data)}
                                ref={(node) => {
                                  width = node;
                                }}
                                placeholder='Logo Width'
                                defaultValue={data.logo.width}
                                min='0'
                                required
                              />
                            </div>

                            <div className='form-group'>
                              <label htmlFor='borderWidth'>Logo Height:</label>
                              <input
                                type='number'
                                className='form-control'
                                name='height'
                                onChange={(e) => this.onChange(e, data)}
                                ref={(node) => {
                                  height = node;
                                }}
                                placeholder='Logo height'
                                defaultValue={data.logo.height}
                                min='0'
                                required
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
