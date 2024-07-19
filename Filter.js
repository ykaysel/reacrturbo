import React from "react";

export default function Filter({ filters, onFilterChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="filter">
      <form className="inputfields">
        <div className="inputfield">
          <label htmlFor="cars" className="exampleLabel">Choose a car:</label>
          <select id="cars" name="cars" value={filters.cars} onChange={handleChange}>
              <option value="none">---</option>
              <option value="BMW">BMW</option>
              <option value="Chevrolet">Chevrolet</option>
              <option value="AstonMartin">AstonMartin</option>
              <option value="Maserati">Maserati</option>
              <option value="Volvo">Volvo</option>
              <option value="Mercedes">Mercedes</option>
          </select>
        </div>
        <div className="inputfield">
          <label htmlFor="model" className="exampleLabel">Choose a model:</label>
          <select id="model" name="model" value={filters.model} onChange={handleChange}>
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
        </div>
        <div className="inputfield radiofield">
          <input id="used0" type="radio" name="usedtype" value="" checked={filters.usedtype === ''} onChange={handleChange} />
          <label htmlFor="used0" className="radiolabel0">All</label>
          <input id="used1" type="radio" name="usedtype" value="New" checked={filters.usedtype === 'New'} onChange={handleChange} />
          <label htmlFor="used1" className="radiolabel1">New</label>
          <input id="used2" type="radio" name="usedtype" value="Old" checked={filters.usedtype === 'Old'} onChange={handleChange} />
          <label htmlFor="used2" className="radiolabel2">Old</label>
        </div>
        <div className="inputfield">
          <label htmlFor="City" className="exampleLabel">Choose Ban type:</label>
          <select id="City" name="ban" value={filters.ban} onChange={handleChange}>
              <option value="none">---</option>
              <option value="Sedan">Sedan</option>
              <option value="Furqon">Furqon</option>
              <option value="Liftbek">Liftbek</option>
              <option value="Offroader">Offroader</option>
              <option value="Universal">Universal</option>
              <option value="Kupe">Kupe</option>
          </select>
        </div>
      </form>
    </div>
  );
}
