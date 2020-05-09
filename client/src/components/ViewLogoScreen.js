import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import ViewWorkSpace from "./ViewWorkSpace";
import { DropdownMenu, MenuItem } from "react-bootstrap-dropdown-menu";

const GET_LOGO = gql`
  query logo($logoId: String) {
    logo(_id: $logoId) {
      _id
      text {
        text
        color
        size
        x
        y
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

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(_id: $id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {
  render() {
    return (
      <Query
        pollInterval={500}
        query={GET_LOGO}
        variables={{ logoId: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          console.log(JSON.stringify(data));
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className='container'>
              <div className='row'>
                <div className='col-'>
                  <div className='panel panel-default'>
                    <div className='panel-heading'>
                      <h4>
                        <Link to='/'>Home</Link>
                      </h4>
                      <h3 className='panel-title'>View Logo</h3>
                    </div>
                    <div className='panel-body'>
                      <dl>
                        {data.logo.text.map((obj) => (
                          <div className='myDIV'>
                            <dt>Text:</dt>
                            <dd>{obj.text}</dd>
                            <dt>Color:</dt>
                            <dd>{obj.color}</dd>
                            <dt>Font Size:</dt>
                            <dd>{obj.size}</dd>
                          </div>
                        ))}
                        <dt>Background Color:</dt>
                        <dd>{data.logo.backgroundColor}</dd>
                        <dt>Border Color:</dt>
                        <dd>{data.logo.borderColor}</dd>
                        <dt>Border Radius:</dt>
                        <dd>{data.logo.borderRadius}</dd>
                        <dt>Border Width:</dt>
                        <dd>{data.logo.borderWidth}</dd>
                        <dt>Padding:</dt>
                        <dd>{data.logo.padding}</dd>
                        <dt>Margins:</dt>
                        <dd>{data.logo.margins}</dd>
                        <dt>Logo's Width:</dt>
                        <dd>{data.logo.width}</dd>
                        <dt>Logo's Height:</dt>
                        <dd>{data.logo.height}</dd>
                        <dt>Last Updated:</dt>
                        <dd>{data.logo.lastUpdate}</dd>
                      </dl>
                      <Mutation
                        mutation={DELETE_LOGO}
                        key={data.logo._id}
                        onCompleted={() => this.props.history.push("/")}
                      >
                        {(removeLogo, { loading, error }) => (
                          <div>
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                removeLogo({
                                  variables: { id: data.logo._id },
                                });
                              }}
                            >
                              <Link
                                to={`/edit/${data.logo._id}`}
                                className='btn btn-success'
                              >
                                Edit
                              </Link>
                              &nbsp;
                              <button type='submit' className='btn btn-danger'>
                                Delete
                              </button>
                            </form>
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                          </div>
                        )}
                      </Mutation>
                    </div>
                  </div>
                </div>
                <ViewWorkSpace data={data} />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default ViewLogoScreen;
