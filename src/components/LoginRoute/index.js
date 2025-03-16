import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: ''}

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 20})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitUserDetails = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password, isLoginError: false, errorMsg: ''}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.setState({isLoginError: true, errorMsg: data.error_msg})
    }
  }

  onEnterUserName = event => {
    this.setState({username: event.target.value})
  }

  onEnterPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isLoginError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <form className="form-container" onSubmit={this.onSubmitUserDetails}>
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="credentials-container">
            <label className="username-label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="username-input-field"
              type="text"
              value={username}
              id="username"
              placeholder="Username"
              onChange={this.onEnterUserName}
            />
            <label className="password-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="password-input-field"
              type="password"
              value={password}
              id="password"
              placeholder="Password"
              onChange={this.onEnterPassword}
            />
            <button type="submit" className="login-button">
              Login
            </button>
            {isLoginError && <p className="error-msg">{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginRoute
