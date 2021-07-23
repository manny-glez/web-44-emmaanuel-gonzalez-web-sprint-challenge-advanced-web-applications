import React, { useState, useEffect } from "react";
import * as yup from 'yup';
import axios from 'axios'
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required('Username is required').min(2, 'username needs to be 2 chars min'),
  password: yup.string().required('Password is required').min(3, 'password is to short')
})

const initialFormValues = {
  username: '',
  password: ''
}

const Login = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({ username: '', password: '' });
  const [disabled, setDisabled] = useState(true);
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const history = useHistory();

  function handleSubmit(event) {
    event.preventDefault()

    const newUser = {
      username: formValues.username,
      password: formValues.password
    }

    axios
    .post('http://localhost:5000/api/login', newUser)
    .then(res => {
      localStorage.setItem('token', res.data.payload)
      history.push('/bubblePage')
    })

  }

  // const error = "";
  //replace with error state

  useEffect(() => {
    schema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])

  const setFormErrors = (name, value) => {
    yup.reach(schema, name).validate(value)
      .then(() => setErrors({ ...errors, [name]: '' }))
      .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
  }

  function handleChange(event) {
    const { name, value } = event.target

    setFormErrors(name, value)

    setFormValues({
      ...formValues,
      [name]: value
    });
  }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        {/* <h2>Build login form here</h2> */}
        <form onSubmit={handleSubmit} className='my-login'>

          <input 
            onChange={handleChange}
            value={formValues.username}
            type='text'
            placeholder='username'
            name='username'
            id="username"
            />

          <input 
            onChange={handleChange}
            value={formValues.password}
            type='password'
            placeholder='password'
            name='password'
            id="password"
            />

          <button id="submit" disabled={disabled}>Submit</button>
        </form>
      </div>

      <p id="error" style={{color: 'red'}}>
        <span>{errors.username}</span>
        <span>{errors.password}</span>
      </p>

      {/* <p id="error" className="error">{error}</p> */}
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state necessary for form functioning.
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to "Lambda" / "School", save that token to localStorage and redirect to a BubblePage route.
//6. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE id="username" and id="password"
//7. MAKE SURE YOUR SUBMIT BUTTON INCLUDES id="submit"
//8. MAKE SURE YOUR ERROR p tag contains the id="error"