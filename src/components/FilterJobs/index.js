import {BsSearch} from 'react-icons/bs'
import ProfileDetails from '../ProfileDetails'

import './index.css'

const FilterJobs = props => {
  const onChangeSearchInput = event => {
    const {onSearchInput} = props
    onSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobsList} = props
    if (event.key === 'Enter') {
      getJobsList()
    }
  }
  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-box"
          value={searchInput}
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button type="button" className="search-button">
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList, onSelectEmploymentType} = props
    return (
      <div className="employment-type-container">
        <h1 className="type-of-employment-heading">Type of Employment</h1>
        <ul className="employment-type-list">
          {employmentTypesList.map(employmentType => {
            const onChangeEmploymentType = event => {
              onSelectEmploymentType(event.target.id)
            }
            return (
              <li
                className="employment-type-item"
                onChange={onChangeEmploymentType}
                key={employmentType.employmentTypeId}
              >
                <input
                  className="check-box"
                  type="checkbox"
                  value={employmentType.employmentTypeId}
                  id={employmentType.employmentTypeId}
                />
                <label
                  className="label-text"
                  htmlFor={employmentType.employmentTypeId}
                >
                  {employmentType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
  const renderSalaryrange = () => {
    const {salaryRangesList, onSelectSalaryRange, selectedSalaryRange} = props
    return (
      <div className="salary-range-container">
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul className="salary-range-list">
          {salaryRangesList.map(salaryRange => {
            const onChangeSalaryRange = event => {
              onSelectSalaryRange(event.target.id)
            }
            return (
              <li
                className="salary-range-item"
                onChange={onChangeSalaryRange}
                key={salaryRange.salaryRangeId}
              >
                <input
                  type="radio"
                  checked={selectedSalaryRange === salaryRange.salaryRangeId} // Ensure checked is tied to state
                  value={salaryRange.salaryRangeId}
                  id={salaryRange.salaryRangeId}
                />
                <label
                  className="label-text"
                  htmlFor={salaryRange.salaryRangeId}
                >
                  {salaryRange.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderTypeOfLocation = () => {
    const {locationTypesList, onSelectLocation, selectedLocations} = props
    return (
      <div className="employment-type-container">
        <h1 className="type-of-employment-heading">Type of Location</h1>
        <ul className="employment-type-list">
          {locationTypesList.map(locationType => (
            <li
              className="employment-type-item"
              key={locationType.locationTypeId}
            >
              <input
                className="check-box"
                type="checkbox"
                checked={selectedLocations.includes(
                  locationType.locationTypeId,
                )} // Make sure it stays checked
                value={locationType.locationTypeId}
                id={locationType.locationTypeId}
                onChange={event => onSelectLocation(event.target.id)}
              />
              <label
                className="label-text"
                htmlFor={locationType.locationTypeId}
              >
                {locationType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div className="filter-jobs-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="line" />
      {renderTypeOfEmployment()}
      <hr className="line" />
      {renderSalaryrange()}
      <hr className="line" />
      {renderTypeOfLocation()}
    </div>
  )
}

export default FilterJobs
