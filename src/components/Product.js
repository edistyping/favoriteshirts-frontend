
import "./Product.css";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { addFavorite, removeFavorite } from '../redux/counter/favoritesSlice'

import { api } from '../utils/api'

import logo_amazon from '../assets/images/logo_amazon.png';
import logo_costco from '../assets/images/logo_costco.png';
import logo_target from '../assets/images/logo_target.png';
import logo_walmart from '../assets/images/logo_walmart.png';
import logo_macy from '../assets/images/logo_macy.png';
import logo_uniqlo from '../assets/images/logo_uniqlo.png';
import logo_jcrew from '../assets/images/logo_jcrew.png';
import logo_jcpenny from '../assets/images/logo_jcpenny.png';
import logo_other from '../assets/images/logo_other.png';
import default_shirt from '../assets/images/default_shirt.png';

const Product = ({ product, openModal } ) => {

  console.log('Product component');
  
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
  const [userVote, setUserVote] = useState(null);

  const [imageSrcs, setImageSrcs] = useState(product.imageUrls); // Declare a state variable...
  
  const user = useSelector(state => state.user)
  const { items: favorites, loaded } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch votes for the product
    const fetchVotes = async () => {
      const { statusCode, data } = await api.getRequest(`/api/vote/${product.id}`);
      // alert(data);

      setVotes(data);
    };
    // Fetch user vote for the product
    const fetchUserVote = async () => {
      try {
        const { statusCode, data } = await api.getRequest(`/api/vote/vote-user/${product.id}`);
        var result = data.voteType === undefined || data.voteType === null ? "" : data.voteType === 1 ? "upvote" : "downvote";
        setUserVote(result); // Assume response has { voteType: 'upvote' | 'downvote' | null }
      } catch (error) {
        console.error("Error fetching user vote:", error);
      }
    };

    fetchVotes();
    if (user.userInfo.isLogin) {
      fetchUserVote();
    }
  }, [product.id]);

  const handleVote = async (voteType) => {

    if (user.userInfo.isLogin) {

      const { statusCode, data } = await api.postRequest('/api/vote', {
        productId: product.id,
        voteType: voteType
      });
      
      // If update is successful, highlight the color 
      if (statusCode === 200) {
        var existingVote = userVote  
        var newVote = voteType === 1 ? "upvote" : voteType === -1 ? "downvote" : null;
        
        // Purpose: Un-do the previous Vote change or apply new Vote change  
        // { voteType: 'upvote' | 'downvote' | null }  
        // User clicked the same button (so un-do) 
        if (existingVote === newVote) {
          // User un-did Upvote
          if (voteType === 1) {
            setVotes(prevVotes => ({
              ...prevVotes,
              upvotes: prevVotes.upvotes - 1 
            }));
          } else if (voteType === -1) { 
            setVotes(prevVotes => ({
              ...prevVotes,
              downvotes: prevVotes.downvotes - 1 
            }));
          }
            setUserVote(null);         
        } else {
          setVotes(prevVotes => ({
            ...prevVotes,
            upvotes: newVote === "upvote" ? prevVotes.upvotes + 1 : prevVotes.upvotes,
            downvotes: newVote === "downvote" ? prevVotes.downvotes + 1 : prevVotes.downvotes
          }));
          setUserVote(newVote); 
        }
      }
    } else {
      alert("You have to sign in you silly")
    }

  };

  const handleFavorite = (productId) => {
    if (favorites.includes(productId)) {
      dispatch(removeFavorite({ productId: productId, isLoggedIn: user.userInfo.isLogin }));
    } else {
      dispatch(addFavorite({ productId: productId, isLoggedIn: user.userInfo.isLogin }));
    }
  };

  const fetchComment = async (id) => {
    const {statusCode, data} = await api.getRequest('/api/comment/' + id)
    if(statusCode === 200) {
    }
  }
  async function handleOpen(product_id) {
    await fetchComment(product_id);
  }

  const Urls = () => {

    const urls = product.productUrls.url;
    const stores = ["amazon", "walmart", "costco", "target", "jcpenny", "macy", "uniqlo", "jcrew"];
    const logos = [logo_amazon, logo_walmart, logo_costco, logo_target, logo_jcpenny, logo_macy, logo_uniqlo, logo_jcrew]; 
    var results = [];
    
    if (urls) {
      urls.forEach((url, index) => {
        var store = "" 
        var logo;
        for (var i = 0; i < stores.length; i++) {
          if (url.includes(stores[i])) {
            store = stores[i];
            logo = logos[i];
            break
          } else if (i === stores.length - 1 && !url.includes(stores[i]))
            store = 'Other'
            logo = logo_other
        }
        results.push({name: store, url: url, logo: logo})
      });
      
      return (
        <>
          {
            results.map(function(result, i) {
              return (
                <div key={i}>
                  <a href={result.url} target="_blank" rel="noopener noreferrer" >
                    <img alt="logo" src={result.logo} />
                  </a>
                </div>
              )
            })
          }
        </>
      )
    } else {
        return (
          <>
          </>
        )
    }
  }

  const handleImageError = (index) => {
    console.log('   handleImageError here ')
    setImageSrcs((prevImageSrcs) => {
      const newImageSrcs = [...prevImageSrcs];
      newImageSrcs[index] = default_shirt;
      return newImageSrcs;
    });
  }
  
  // Check productUrls.brand or productUrls.name then display correct image 
  const DisplayProductUrlsLogo = () => {
    return (
      <div className='body-left-productUrls'>
        { 
          product.productUrls.map((product, index) =>  {
            const brandName = product.brand.toLowerCase().replace(/ /g, '_');
            let logoSrc 
            if (brandName) {
              logoSrc = require(`../assets/images/logo_${brandName}.png`);
            } else {
              logoSrc = require(`../assets/images/logo_default.png`);
            }

            return (
              <div className="productUrl-container" key={index}>
                <a href={product.url} target="_blank" >
                  <img 
                    src={logoSrc} width={45} height={45} 
                    onError={(e) => e.target.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSThwbC9UmRbjp7lUDtGkv0_5b_noXgQF7V3w&s'} 
                    alt="Issue reading logo"
                    />
                </a>
            </div>
          )
        })
        }
      </div>
    )
  }

  return (
        <div className="proudct__container">
          
          <div className="product__header">
            <p>{product.brand} - Uplaoded By <span>{product.userName}</span></p>
            <button onClick={() => handleFavorite(product.id)}>{favorites.includes(product.id) ? 'Remove from Favorites' : 'Add to Favorites'}!</button>
          </div>

          <div className="product__body" onClick={() => openModal(product)} >
            <img loading="lazy" src={imageSrcs && imageSrcs.length > 0 ? imageSrcs[0] : default_shirt} onError={() => handleImageError(0)}  alt="main" />
          </div>

          <div className="product__info">

            <div className="product__info__name">
              <h3 >{product.name}</h3>
            </div>

            <div className="product__details">
                
              <h4 className="product__price">${product.price}</h4>

              <div className="product__vote">

                <p>{votes.upvotes - votes.downvotes}</p>

                <button
                  className={userVote === 'upvote' ? 'button-highlighted' : 'button-normal'}
                  onClick={() => handleVote(1)}
                  >
                  &#128077;	
                </button>

                <button
                  className={userVote === 'downvote' ? 'button-highlighted' : 'button-normal'}
                  onClick={() => handleVote(-1)}
                  >
                  &#128078;
                </button>

              </div>
              
            </div>

          </div>                   

          <div className="product__links">
              <DisplayProductUrlsLogo />
          </div>

        </div>

  );
};

export default Product;
