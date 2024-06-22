// Write your code here
import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'

const apiConstantStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class CowinDashboard extends Component {
  state = {
    vaccinationData: [],
    isLoading: false,
    apiStatus: apiConstantStatus.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({isLoading: true})

    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok === true) {
      const data = await response.json()

      const updatedVaccinationData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachData => ({
          vaccineDate: eachData.vaccine_date,
          dose1: eachData.dose_1,
          dose2: eachData.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(eachAge => ({
          age: eachAge.age,
          count: eachAge.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(eachGender => ({
          count: eachGender.count,
          gender: eachGender.gender,
        })),
      }

      this.setState({
        isLoading: false,
        vaccinationData: updatedVaccinationData,
        apiStatus: apiConstantStatus.success,
      })
    } else {
      this.setState({
        isLoading: false,
        apiStatus: apiConstantStatus.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {vaccinationData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = vaccinationData

    return (
      <div>
        <div className="container">
          <h1 className="header">Vaccination Coverage</h1>
          <VaccinationCoverage data={last7DaysVaccination} />
        </div>
        <div className="container">
          <h1 className="header"> Vaccination by gender</h1>
          <VaccinationByGender data={vaccinationByGender} />
        </div>
        <div className="container">
          <h1 className="header">Vaccination by age</h1>
          <VaccinationByAge data={vaccinationByAge} />
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view"
      />
      <h1 className="failure-header">Something Went Wrong</h1>
    </div>
  )

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSpecificView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstantStatus.success:
        return this.renderSuccessView()

      case apiConstantStatus.failure:
        return this.renderFailureView()

      case apiConstantStatus.initial:
      case apiConstantStatus.inprogress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="website-logo"
          />
          <h1 className="logo-header">Co-WIN</h1>
        </div>
        <h1 className="sub-header">CoWIN Vaccination in India</h1>
        {isLoading ? this.renderLoadingView() : this.renderSpecificView()}
      </div>
    )
  }
}

export default CowinDashboard
