// src/components/Favorites.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoriteCars, fetchFavorites, removeFavorite } from '../redux/favoritesSlice';
import { Link } from 'react-router-dom';
import '../style.css';

const Favorites = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const favorites = useSelector(state => state.favorite.favorites);
  const favoriteCars = useSelector(state => state.favorite.favoriteCars);

  useEffect(() => {
    if (user) {
      dispatch(fetchFavorites(user.id));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (favorites.length > 0) {
      const carIds = favorites.map(favorite => favorite.carId);
      dispatch(fetchFavoriteCars(carIds));
    }
  }, [favorites, dispatch]);

  const handleRemoveFavorite = (carId) => {
    dispatch(removeFavorite({ userId: user.id, carId }));
  };

  if (!user) {
    return <div className='errorpage'><h1>Please sign in to view your favorite cars.</h1><Link to={`/signin`}>SignUp</Link></div>;
  }

  return (
    <div className='posts'>
      <div className='favtitle'>
        <h1>Your Favorite Cars: </h1>
      </div>
      <div className='favitems'>
        {favoriteCars.map(car => (
          <div key={car.id} className='item'>
            <Link to={`/products/${car.id}`}>
                    <div className="images">
                      <img src={car.image[0]} alt=""></img>
                    </div>
                    <div className="texts">
                      <h1 className="model">{car.model}</h1>
                    </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
