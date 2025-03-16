import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import FilterJobs from '../FilterJobs'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  inProcess: 'IN_PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    employmentType: [],
    minimumPackage: 0,
    searchInput: '',
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstant.inProcess})
    const {employmentType, minimumPackage, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const profileApiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType.join()}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      const filteredJobs = updatedData.filter(job => {
        const packageValue = parseInt(job.packagePerAnnum.split(' ')[0], 10) // Extract number from "10 LPA"

        if (minimumPackage === '1000000') {
          // Filter for salaries between 10 LPA and 20 LPA
          return packageValue >= 10 && packageValue < 20
        }
        if (minimumPackage === '2000000') {
          // Filter for salaries between 20 LPA and 30 LPA
          return packageValue >= 20 && packageValue < 30
        }
        if (minimumPackage === '3000000') {
          // Filter for salaries between 30 LPA and 40 LPA
          return packageValue >= 30 && packageValue < 40
        }
        if (minimumPackage === '4000000') {
          // Filter for salaries 40 LPA and above
          return packageValue >= 40
        }
        return true // No salary filter applied
      })
      this.setState({
        jobsList: filteredJobs,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  onSelectEmploymentType = id => {
    this.setState(prevState => {
      const {employmentType} = prevState
      const isSelected = employmentType.includes(id)
      // Add or remove the selected employment type from the array
      const updatedEmploymentType = isSelected
        ? employmentType.filter(type => type !== id)
        : [...employmentType, id]
      return {employmentType: updatedEmploymentType}
    }, this.getJobsList) // Call the API after updating the state
  }

  onSelectSalaryRange = id => {
    this.setState({minimumPackage: id}, this.getJobsList)
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    // It will Trigger the API call only when "Enter" is pressed
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  onClickSearchButton = () => {
    this.getJobsList()
  }

  onRetry = () => {
    this.getJobsList()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="retry-button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state

    const isJobAvailable = jobsList.length > 0

    return isJobAvailable ? (
      <div className="all-jobs-container">
        <ul className="all-jobs-list">
          {jobsList.map(eachJob => (
            <JobCard eachJob={eachJob} key={eachJob.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-job-container">
        <img
          className="no-jobs-image"
          alt="no jobs"
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        />
        <h1 className="no-job-heading">No Jobs Found</h1>
        <p className="no-job-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  getJobsListDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProcess:
        return this.renderLoaderView()
      case apiStatusConstant.success:
        return this.renderJobsList()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {minimumPackage, searchInput, profileDetails} = this.state
    return (
      <>
        <Header />
        <div className="job-route-container">
          <div className="jobs-content">
            <FilterJobs
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              onSelectEmploymentType={this.onSelectEmploymentType}
              onSelectSalaryRange={this.onSelectSalaryRange}
              searchInput={searchInput}
              onSearchInput={this.onSearchInput}
              getJobsList={this.getJobsList}
              profileDetails={profileDetails}
              selectedSalaryRange={minimumPackage} // Passing current state
            />
            <div className="jobs-list-container">
              <div className="search-input-container-desktop">
                <input
                  type="search"
                  className="search-box-desktop"
                  value={searchInput}
                  placeholder="Search"
                  onChange={this.onSearchInput}
                  onKeyDown={this.onEnterSearchInput}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  className="search-button-desktop"
                  onClick={this.onClickSearchButton}
                >
                  <BsSearch className="search-icon-desktop" />
                </button>
              </div>
              {this.getJobsListDetails()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
