import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProcess: 'IN_PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    similarJobsData: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProcess})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(jobDetailsApiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedJobData = this.getFormatedData(data.job_details)
      const updatedSimilarJobData = data.similar_jobs.map(similarJob =>
        this.getFormatedSimilarJobData(similarJob),
      )
      this.setState({
        jobsList: updatedJobData,
        similarJobsData: updatedSimilarJobData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  getFormatedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    skills: data.skills.map(skill => ({
      imageUrl: skill.image_url,
      name: skill.name,
    })),
    title: data.title,
    lifeAtCompany: {
      imageUrl: data.life_at_company.image_url,
      description: data.life_at_company.description,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
  })

  getFormatedSimilarJobData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  renderLoaderView = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderJobDetails = () => {
    const {jobsList} = this.state
    const {
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobsList
    return (
      <div className="job-details-container">
        <div className="job-title-location-container">
          <div className="company-name-container">
            <img
              className="company-logo"
              src={jobsList.companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-rating-container">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <BsStarFill className="rating-icon" />
                <p className="job-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-location-package-container">
            <div className="job-location-container">
              <div className="location-container">
                <MdLocationOn className="location-icon" />
                <p className="location">{location}</p>
              </div>
              <div className="employment-type-card-container">
                <BsFillBriefcaseFill className="brief-case-icon" />
                <p className="emoloyment-type">{employmentType}</p>
              </div>
            </div>
            <p className="package-annum">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />
        <div className="description-container">
          <h1 className="description-heading">Description</h1>
          <a href={companyWebsiteUrl} className="link">
            <div className="visit-container">
              <p className="visit">Visit</p>
              <BiLinkExternal className="visit-logo" />
            </div>
          </a>
        </div>
        <p className="job-description">{jobDescription}</p>
        <h1 className="skill-heading">Skills</h1>
        <ul className="skills-list">
          {skills.map(eachSkill => (
            <SkillItem eachSkill={eachSkill} key={eachSkill.name} />
          ))}
        </ul>
        <h1 className="life-at-company-heading">Life at Company</h1>
        <div className="life-at-company-container">
          <p className="life-at-company-description">
            {lifeAtCompany.description}
          </p>
          <img
            className="life-at-company-image"
            src={lifeAtCompany.imageUrl}
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  getJobData = () => {
    this.getJobDetails()
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
      <button type="button" className="retry-button" onClick={this.getJobData}>
        Retry
      </button>
    </div>
  )

  renderDetials = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProcess:
        return this.renderLoaderView()
      case apiStatusConstant.success:
        return this.renderJobDetails()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {similarJobsData} = this.state
    return (
      <>
        <Header />
        <div className="company-details-bg-container">
          {this.renderDetials()}
          <div className="similarJob-container">
            <h1 className="similar-jobs-heading">Similar Jobs </h1>
            <ul className="similarJob-list">
              {similarJobsData.map(eachJob => (
                <SimilarJobItem eachJob={eachJob} key={eachJob.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default JobItemDetails
