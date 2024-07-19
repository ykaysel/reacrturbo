import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../style.css';

export default class Products extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      filteredProducts: []
    };
  }

  componentDidMount() {
    const url = "http://localhost:8000/cars";
    fetch(url)
      .then(res => res.json())
      .then(result => {
        this.setState({ products: result, filteredProducts: result });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filters !== this.props.filters) {
      this.applyFilters();
    }
  }

  applyFilters() {
    const { cars, model, usedtype, ban } = this.props.filters;
    const filteredProducts = this.state.products.filter(product => {
      return (
        (cars === 'none' || product.car === cars) &&
        (model === 'none' || product.model === model) &&
        (usedtype === '' || product.new === usedtype) &&
        (ban === 'none' || product.ban === ban)
      );
    });
    this.setState({ filteredProducts });
  }

  render() {
    return (
      <section className="posts">
        <section className="items">
          {this.state.filteredProducts.length > 0 ? (
            this.state.filteredProducts.map(p => (
              <section key={p.id} className="item">
                <Link to={`products/${p.id}`}>
                  <div className="images">
                    <img src={p.image[0]} alt=""></img>
                    <div className="likebutton"><button><i className='bx bx-heart'></i></button></div>
                  </div>
                  <div className="texts">
                    <h1 className="price">{p.price} $</h1>
                    <h1 className="model">{p.model}</h1>
                    <h1 className="attributes">{p.year}, {p.miles} km</h1>
                  </div>
                </Link>
              </section>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </section>
      </section>
    );
  }
}
