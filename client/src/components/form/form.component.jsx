import React, { Component } from 'react'
import axios from 'axios';
import './form.styles.css'

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dateOfBirth: "",
            country: "",
            errors: {},
            countryArray: [],
            cityArray: [],
            sucess: false
        }
    }

    componentDidMount() {
        this.getCountry();
    }

    getCountry = () => {
        fetch(`/country`)
            // We get the API response and receive data in JSON format...
            .then(response => response.json())
            // ...then we update the state
            .then(data =>
                this.setState({
                countryArray: data
                })
            )
            .catch(error => console.log(error));
    }

    fetchCity = () => {
            fetch("/fetchCitiesForCountry", {
                method: "POST",
                body: JSON.stringify({
                    country: this.state.country
                }),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
                })
                .then(response => response.json())
                .then(json =>
                    this.setState({
                    cityArray: json
                    })
                );
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };


    handleChangeCountry = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        setTimeout(this.fetchCity,240);
    };

    handlSubmit = (event) => {
        event.preventDefault();
        this.setState({errors: {}});
        let newUser = {
          name: this.state.name,
          dateOfBirth: this.state.dateOfBirth,
          country: this.state.country,
          city: this.state.cityArray
        };
        axios.post("/submitForm", newUser)
          .then(res => {
              this.setState({
                name: "",
                cityArray: [],
                country: res.data.ops[0].country,
                dateOfBirth: "",
                sucess: true,
                errors: {}
              }, () => {
                  alert("Success user added");
                  console.log(res);
              });
          })
          .catch(error => this.setState({errors: error.response.data}))
    }

    render() {
        const {name, dateOfBirth, country, countryArray, cityArray, errors} = this.state;
        return (
          <div className="Form-component mt-3 card">
            <h3 className="mt-3 ml-3">Form Component</h3>
            <form onSubmit={this.handlSubmit} className="card-body">
              <div className="form-group">
                <label htmlFor="name">Name :</label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  className={
                    errors.name ? "form-control invalid-input" : "form-control"
                  }
                  id="name"
                  placeholder="Enter name ..."
                  aria-describedby="nameHelp"
                  required
                />
                {errors.name && (
                  <div className="text-danger"> {errors.name} </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth :</label>
                <input
                  type="date"
                  data-date-format="DD/MM/YYYY"
                  name="dateOfBirth"
                  onChange={this.handleChange}
                  value={dateOfBirth}
                  className="form-control"
                  id="dateOfBirth"
                  aria-describedby="dateOfBirthHelp"
                  required
                />
                {errors.dateOfBirth && (
                  <div className="text-danger"> {errors.dateOfBirth} </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="country">Select Country :</label>
                <select
                  className="form-control"
                  onChange={this.handleChangeCountry}
                  value={country}
                  id="country"
                  name="country"
                  required
                >
                  {countryArray.map((country, index) => {
                    return (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="city">City :</label>
                <input
                  type="text"
                  name="cityArray"
                  onChange={this.handleChange}
                  className="form-control"
                  id="city"
                  value={cityArray}
                  aria-describedby="cityHelp"
                  readOnly
                />
              </div>
              <input
                type="submit"
                className="btn btn btn-outline-info btn-lg"
              />
            </form>
          </div>
        );
    }
}

export default Form;
