import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../createproduct.css';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUsername, getCurrentPhone } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default class CreateProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        cars: 'none',
        model: 'none',
        usedtype: '',
        Ban: 'none',
        price: '',
        miles: '',
        year: '',
        Fuel: 'none',
        geartype: '',
        image: ''
      },
      errors: {}
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      const imageArray = value.split(',');
      this.setState({
        formData: {
          ...this.state.formData,
          [name]: imageArray
        }
      });
    } else {
      this.setState({
        formData: {
          ...this.state.formData,
          [name]: value
        }
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    const { formData } = this.state;

    if (formData.cars === 'none') {
      validationErrors.cars = "Please choose a car.";
    }

    if (formData.model === 'none') {
      validationErrors.model = "Please choose a model.";
    }

    if (!formData.usedtype) {
      validationErrors.usedtype = "Please select the type (All, New, Used).";
    }

    if (formData.Ban === 'none') {
      validationErrors.Ban = "Please choose a Ban type.";
    }

    if (!formData.price) {
      validationErrors.price = "Please enter the price.";
    }

    if (!formData.miles) {
      validationErrors.miles = "Please enter the miles.";
    }
    if (!formData.year) {
        validationErrors.year = "Please enter the year.";
    }
    if (formData.Fuel === 'none') {
      validationErrors.Fuel = "Please choose a fuel type.";
    }

    if (!formData.geartype) {
      validationErrors.geartype = "Please select the gear type.";
    }
    if (!formData.image) {
        validationErrors.image = "Please enter image link.";
    }


    this.setState({ errors: validationErrors });

    if (Object.keys(validationErrors).length === 0) {
      alert("Form Submitted successfully");
      // Handle form submission logic here, e.g., send data to server

      const username = getCurrentUsername();
      const phone = getCurrentPhone();

        const doc = {
            car: formData.cars,
            model: formData.model,
            new: formData.usedtype,
            ban: formData.Ban,
            miles: formData.miles,
            price: formData.price,
            fuel: formData.Fuel,
            gear: formData.geartype,
            year: formData.year,
            user: username,
            number: phone,
            image: formData.image
        }

        fetch('http://localhost:8000/cars', {
            method: 'POST',
            body: JSON.stringify(doc),
            headers: {'Content-Type': 'application/json'}
        })
      .then(response => {
        if (response.ok) {
          this.props.navigate('/'); // Navigate to home page
        } else {
          console.error('Failed to create post');
        }
      })
      .then(data => {
        console.log('Success:', data);
        // Optionally handle success response
      })
      .catch(error => {
        console.error('Error:', error);
        // Optionally handle error
      });      
    }
  }

  render() {
    const { formData, errors } = this.state;

    return (
      <div className="addcar">
        <form className="inputfields" onSubmit={this.handleSubmit}>
          <div className="inputfield">
            <label htmlFor="cars" className="exampleLabel">Choose a car:</label>
            {/* <input type="text" name="cars" placeholder="Car Brand" value={formData.cars} onChange={this.handleChange} /> */}
            <select id="cars" name="cars" value={formData.cars} onChange={this.handleChange}>
              <option value="none">---</option>
              <option value="BMW">BMW</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="AstonMartin">AstonMartin</option>
              <option value="Maserati">Maserati</option>
              <option value="Volvo">Volvo</option>
              <option value="Mercedes">Mercedes</option>
            </select>
            {errors.cars && <span>{errors.cars}</span>}
          </div>
          <div className="inputfield">
            <label htmlFor="model" className="exampleLabel">Choose a model:</label>
            <select id="model" name="model" value={formData.model} onChange={this.handleChange}>
              <option value="none">---</option>
              <option value="X5">X5</option>
              <option value="X3">X3</option>
              <option value="520">520</option>
              <option value="Ghibli">Ghibli</option>
              <option value="Quattroporte">Quattroporte</option>
              <option value="XC60">XC60</option>
              <option value="XC90">XC90</option>
              <option value="Camaro">Camaro</option>
              <option value="Cruze">Cruze</option>
              <option value="Vito">Vito</option>
              <option value="Vito111">Vito111</option>
              <option value="E220D">E 220 d</option>
            </select>
            {errors.model && <span>{errors.model}</span>}
          </div>
          <div className="inputfield radiofield">
            <input id="used0" type="radio" name="usedtype" value="New" onChange={this.handleChange} checked={formData.usedtype === 'New'} />
            <label htmlFor="used0" className="radiolabel0">New</label>
            <input id="used1" type="radio" name="usedtype" value="Old" onChange={this.handleChange} checked={formData.usedtype === 'Old'} />
            <label htmlFor="used1" className="radiolabel1">Old</label>
            {errors.usedtype && <span>{errors.usedtype}</span>}
          </div>
          <div className="inputfield">
            <label htmlFor="Ban" className="exampleLabel">Choose Ban type:</label>
            <select id="Ban" name="Ban" value={formData.Ban} onChange={this.handleChange}>
            <option value="none">---</option>
              <option value="Sedan">Sedan</option>
              <option value="Furqon">Furqon</option>
              <option value="Liftbek">Liftbek</option>
              <option value="Offroader">Offroader</option>
              <option value="Universal">Universal</option>
              <option value="Kupe">Kupe</option>
            </select>
            {errors.Ban && <span>{errors.Ban}</span>}
          </div>
          <div className="inputfield">
            <label className="exampleLabel">Choose Price:</label>
            <input type="number" name="price" placeholder="Price" min="0" value={formData.price} onChange={this.handleChange} />
            {errors.price && <span>{errors.price}</span>}
          </div>
          <div className="inputfield">
            <label className="exampleLabel">Choose Miles:</label>
            <input type="number" name="miles" placeholder="Miles" min="0" value={formData.miles} onChange={this.handleChange} />
            {errors.miles && <span>{errors.miles}</span>}
          </div>
          <div className="inputfield">
            <label className="exampleLabel">Choose Year:</label>
            <input type="number" name="year" placeholder="Year" min="1900" value={formData.year} onChange={this.handleChange} />
            {errors.year && <span>{errors.year}</span>}
          </div>
          <div className="inputfield">
            <label htmlFor="Fuel" className="exampleLabel">Choose Fuel type:</label>
            <select id="Fuel" name="Fuel" value={formData.Fuel} onChange={this.handleChange}>
              <option value="none">---</option>
              <option value="Benzin">Benzin</option>
              <option value="Dizel">Dizel</option>
              <option value="Hibrid">Hibrid</option>
              <option value="Elektro">Elektro</option>
            </select>
            {errors.Fuel && <span>{errors.Fuel}</span>}
          </div>
          <div className="inputfield radiofield">
            <input id="gear0" type="radio" name="geartype" value="Manual" onChange={this.handleChange} checked={formData.geartype === 'Manual'} />
            <label htmlFor="gear0" className="radiolabel0">Manual</label>
            <input id="gear1" type="radio" name="geartype" value="Automatic" onChange={this.handleChange} checked={formData.geartype === 'Automatic'} />
            <label htmlFor="gear1" className="radiolabel1">Automatic</label>
            {errors.geartype && <span>{errors.geartype}</span>}
          </div>
          <div className="inputfield">
            <label className="exampleLabel">Upload Image Link:</label>
            <input type="text" name="image" placeholder="Image" value={formData.image} onChange={this.handleChange} />
            {errors.image && <span>{errors.image}</span>}
          </div>
          <div className="showposts">
            <button name="commit" type="submit">Add Car</button>
          </div>
        </form>
      </div>
    );
  }
}
