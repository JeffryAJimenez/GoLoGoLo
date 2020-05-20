import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import gql from "graphql-tag";

import { Mutation } from "react-apollo";

const Login = () => {
  const Log_In = gql`
    mutation LogIn($email: String!, $password: String!) {
      logIn(email: $email, password: $password) {
        token
      }
    }
  `;

  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onchange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const redirect = async () => {
    // var xhr = new XMLHttpRequest();
    // const res = xhr.open("GET", "http://localhost:3000/login/google");

    const res = await axios.get("http://localhost:3000/login/google");
    console.log(res);
  };
  //Redirect if logged in

  return (
    <Mutation
      mutation={Log_In}
      onCompleted={() => {
        console.log("===completed");
        return <Redirect to={"/"} />;
      }}
    >
      {(logIn, { loading, error }) => (
        <Fragment>
          <h1 className='large text-primary'>Sign In</h1>
          <p className='lead'>Sign Into Your Account</p>

          <form
            className='form'
            onSubmit={(e) => {
              e.preventDefault();
              logIn({
                variables: { email: email, password: password },
              });
            }}
          >
            <div className='form-group'>
              <input
                type='email'
                placeholder='Email Address'
                name='email'
                value={email}
                onChange={(e) => onchange(e)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={password}
                onChange={(e) => onchange(e)}
                minLength='3'
              />
            </div>

            <input type='submit' className='btn btn-primary' value='Login' />
          </form>

          <p className='my-1'>
            Don't have an account? <Link to='/register'>Sign Up</Link>
          </p>
          <button onClick={() => redirect()} className='btn btn-primary'>
            LogIn with GOOGLE
          </button>
          {loading && <p>Loading...</p>}
          {error && <p>Error :( Please try again</p>}
        </Fragment>
      )}
    </Mutation>
  );
};

export default Login;
