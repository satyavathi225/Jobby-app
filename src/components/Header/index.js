import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsBriefcase} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const logoutApp = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-container">
      <div className="nav-content">
        <div className="nav-mobile-container">
          <Link to="/">
            <img
              className="nav-website-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </Link>
          <ul className="nav-list-container">
            <Link to="/" className="nav-link">
              <li>
                <AiFillHome className="nav-home-logo" />
              </li>
            </Link>
            <Link to="/jobs" className="nav-link">
              <li>
                <BsBriefcase className="nav-job-logo" />
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="logout-logo-button"
                onClick={logoutApp}
              >
                <FiLogOut className="nav-logout-logo" />
              </button>
            </li>
          </ul>
        </div>
        <div className="nav-desktop-container">
          <Link to="/" className="link">
            <img
              className="nav-website-logo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </Link>
          <ul className="nav-list-desktop-container">
            <Link to="/" className="nav-link">
              <li>
                <p className="nav-tab-text">Home</p>
              </li>
            </Link>
            <Link to="/jobs" className="nav-link">
              <li>
                <p className="nav-tab-text">Jobs</p>
              </li>
            </Link>
          </ul>
          <button type="button" className="logout-button" onClick={logoutApp}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
