import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const onFindJObs = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-route-bg-container">
        <div className="homeRoute-text-container">
          <h1 className="homeRoute-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="homeRoute-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link className="link" to="/jobs">
            <button
              type="button"
              className="find-job-button"
              onClick={onFindJObs}
            >
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
