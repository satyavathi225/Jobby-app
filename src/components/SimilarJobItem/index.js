import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsStarFill, BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = ({eachJob}) => {
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = eachJob

  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="similar-job-item">
        <div className="similar-company-name-container">
          <img
            className="similar-company-logo"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div className="similr-company-title-rating-container">
            <h1 className="similar-job-title">{title}</h1>
            <div className="similar-company-rating-container">
              <BsStarFill className="rating-icon" />
              <p className="similar-job-rating">{rating}</p>
            </div>
          </div>
        </div>
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
        <h1 className="similar-job-description-heading">Description</h1>
        <p className="similar-job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default SimilarJobItem
