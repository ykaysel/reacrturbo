import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import '../post.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite, fetchFavorites } from "../redux/favoritesSlice";
import Products from "./Products";

export default function ProductDetail() {

    const { id } = useParams();
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      console.log(id);
      const url = "http://localhost:8000/cars/?id=" + id;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, [id]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const favorites = useSelector(state => state.favorite.favorites);
    const isFavorite = favorites.some(favorite => favorite.carId === id);
  
     useEffect(() => {
        if (user) {
          dispatch(fetchFavorites(user.id));
        }
      }, [user, dispatch]);
    
      const handleFavorite = () => {
        if (!user) {
          navigate('/signin');
          return;
        }
        if (isFavorite) {
          dispatch(removeFavorite({ userId: user.id, carId: id }));
        } else {
          dispatch(addFavorite({ userId: user.id, carId: id }));
        }
      };
  
      const change = () =>{
        var heart = document.querySelector('#heart');
        if(heart.classNameList.contains('bx-heart')){
            heart.classNameList.remove('bx-heart');
            heart.classNameList.add('bxs-heart');
        }else{
            heart.classNameList.add('bx-heart');
            heart.classNameList.remove('bxs-heart');
        }
    }
    
    var imgIndex = 1;
    
    const nextimg = (n) =>{
        displayImg(imgIndex += n);
    }
    
    const currentImg = (n) =>{
        displayImg(imgIndex = n);
    }
    
    const displayImg = (n) =>{
        var i;
        var image = document.querySelectorAll(".image");
        var subImage = document.querySelectorAll(".item");
        if(n > image.length){
            imgIndex = 1;
        }
        if(n < 1){
            imgIndex = image.length
        }

        for(i=0; i<image.length; i++){
            image[i].style.display = "none";
        }

        image[imgIndex - 1].style.display = "block";
    }



  return (
<section>
{products.map((p)=>(
    <div className="post" key={p.id}>
        <div className="container">
            <div className="product-header">
                    <div className="title">
                        <h1>{p.car}, {p.model}, {p.year}, {p.miles} km</h1>
                    </div>
                <div className="likebutton">
                        <a onClick={handleFavorite} >
                        <i id="heart" className='bx bx-heart'>
                            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                        </i>
                        </a>
                </div>
            </div>
            <div className="product-image-slider">
                <div className="images">
                    {
                        p.image.map((img, index) => (
                            <div className="image" style={{display: index+1 === imgIndex ? 'block' : 'none' }}>
                                <img src={img} alt=""></img>
                            </div>
                        ))
                    }
            
                    <div className="button">
                        <a onClick={() => nextimg(-1)} className="prev">&#10094;</a>
                        <a onClick={() => nextimg(1)} className="next">&#10095;</a>
                    </div>
                </div>
                <div className="subimages">
                    {
                        p.image.map((img, index) => (
                            <div className="item" onClick={() => currentImg(index+1 )} style={{backgroundImage: `url(${img})` }}></div>
                        ))
                    }
                </div>
            </div>
            <div className="product-about">
                <div className="column">
                    <div className="property">
                        <label for="">Brand</label>
                        <span>{p.car}</span>
                    </div>
                    <div className="property">
                        <label for="">Model</label>
                        <span>{p.model}</span>
                    </div>
                    <div className="property">
                        <label for="">Ban</label>
                        <span>{p.ban}</span>
                    </div>
                    <div className="property">
                        <label for="">Miles</label>
                        <span>{p.miles} km</span>
                    </div>
                </div>
                <div className="column">
                    <div className="property">
                        <label for="">New</label>
                        <span>{p.new}</span>
                    </div>
                    <div className="property">
                        <label for="">Year</label>
                        <span>{p.year}</span>
                    </div>
                    <div className="property">
                        <label for="">Fuel</label>
                        <span>{p.fuel}</span>
                    </div>
                    <div className="property">
                        <label for="">Price</label>
                        <span>{p.price} $</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="product-sidebar">
            <div className="sidebar">
                <div className="product-price">
                    <h1 className="price">{p.price} USD</h1>
                    <h1 className="price-converted">≈ {p.price * 1.7} AZN</h1>
                </div>
                <div className="product-owner">
                    <div className="owner-info">
                        <h1>{p.user}</h1>
                        <p>Baku</p>
                    </div>
                    <div className="owner-logo"></div>
                </div>
                <div className="product-installment">
                    <button>Number: {p.number}</button>
                </div>
            </div>
        </div>
    </div>
    ))
}
</section>
  );
}




