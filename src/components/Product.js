
import "./Product.css";
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { addFavorite, removeFavorite } from '../redux/counter/favoritesSlice'

import { api } from '../utils/api'

// https://mui.com/material-ui/react-modal/
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import logo_amazon from '../assets/images/logo_amazon.webp';
import logo_costco from '../assets/images/logo_costco.png';
import logo_target from '../assets/images/logo_target.png';
import logo_walmart from '../assets/images/logo_walmart.webp';
import logo_macy from '../assets/images/logo_macy.png';
import logo_uniqlo from '../assets/images/logo_uniqlo.png';
import logo_jcrew from '../assets/images/logo_jcrew.webp';
import logo_jcpenny from '../assets/images/logo_jcpenny.png';
import logo_other from '../assets/images/logo_other.png';
import default_shirt from '../assets/images/default_shirt.png';
import { json } from "react-router-dom";


const ModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Product = ( props ) => {

  console.log('Product')
  
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 });
  const [userVote, setUserVote] = useState(null);

  const [open, setOpen] = useState(false)
  const [comments, setComments] = useState([])
  const [postComment, setPostComment] = useState(''); // Declare a state variable...
  const [imageSrcs, setImageSrcs] = useState(props.imageUrls); // Declare a state variable...
  
  const user = useSelector(state => state.user)
  const { items: favorites, loaded } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch votes for the product
    const fetchVotes = async () => {
      const { statusCode, data } = await api.getRequest(`/api/vote/${props.id}`);
      // alert(data);

      setVotes(data);
    };
    // Fetch user vote for the product
    const fetchUserVote = async () => {
      try {
        const { statusCode, data } = await api.getRequest(`/api/vote/vote-user/${props.id}`);
        var result = data.voteType === undefined || data.voteType === null ? "" : data.voteType === 1 ? "upvote" : "downvote";
        setUserVote(result); // Assume response has { voteType: 'upvote' | 'downvote' | null }
      } catch (error) {
        console.error("Error fetching user vote:", error);
      }
    };

    fetchVotes();
    fetchUserVote();
  }, [props.id]);

  const handleVote = async (voteType) => {
    const { statusCode, data } = await api.postRequest('/api/vote', {
      productId: props.id,
      voteType: voteType
    });

    // If update is successful, 
    // upvote, downvote, or undo. 
    if (statusCode === 200) {
      
    }

    // Fetch updated votes TODO
    // const updatedVotes = await api.getRequest(`/api/product/${props.id}/votes`);
    // setVotes(updatedVotes.data);
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
      setComments(data);
    }
  }
  async function handleOpen(product_id) {
    await fetchComment(product_id);
    setOpen(true);
  }

  function handleClose(e) {
    setOpen(false);
  }
  
  async function handleAddComment() {
    console.log('   handleAddComment()....')

    if (user.userInfo.isLogin) {

      const {statusCode, data} = await api.postRequest('/api/comment', {
        ProductId: props.id,
        Description: postComment,
      })

      if ( statusCode === 200 || statusCode === 201) {

        const newComment = { 
          id: data.id, 
          description: postComment, 
          userName: user.userInfo.details.username,
          score: 0
        };

        setPostComment('')
        setComments(oldComments => [...oldComments, newComment] );

      } else if ( statusCode === 500 ) {
        alert('There was an issue when adding a comment... (Code 500)');
      }  
    }
    else {
      alert('There was an issue when adding a comment... (Not Logged In)')
    }
  }

  async function handleRemoveComment(id) {
    console.log('   handleRemoveComment()..')

    // input variable 'id' is comment_id, not user_id
    if (user.userInfo.isLogin) {
      const {statusCode, data} = await api.deleteRequest('/api/comment/' + id, {})
        
      if ( statusCode === 200 || statusCode === 201 || statusCode === 204) {
        const updatedComments = [...comments].filter((comment) => comment.id !== id)
        setComments(updatedComments);
        setPostComment('')
      } else if ( statusCode === 500 ) {
        alert('ERROR removing comment')
      }

    } else {
      alert('not your comment')
    }
  }

  const Urls = () => {

    // const urls = props.productUrls;
    // const stores = ["amazon", "walmart", "costco", "target", "jcpenny", "macy", "uniqlo", "jcrew"];
    // alert(JSON.stringify(props))
    // console.log(' URL HERE')
    // console.log(props.productUrls.url)
    const urls = props.productUrls.url;
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
    // console.log('error here ')

    setImageSrcs((prevImageSrcs) => {
      const newImageSrcs = [...prevImageSrcs];
      newImageSrcs[index] = default_shirt;
      return newImageSrcs;
    });
  }

  return (
    <div>
        <div className="proudct__container">
          <div className="product__header">
            <p>(ID: {props.id}) Uplaoded By <span>{props.uploadedBy}</span></p>
            <p>{props.category}</p>
            <button onClick={() => handleFavorite(props.id)}>{favorites.includes(props.id) ? 'Remove from Favorites' : 'Add to Favorites'}!</button>
          </div>

          <div className="product__body" onClick={() => handleOpen(props.id)}>
            <img loading="lazy" src={imageSrcs && imageSrcs.length > 0 ? imageSrcs[0] : default_shirt} onError={() => handleImageError(0)}  alt="main" />

            <div className="product__body__container">

                <div>
                  <h3>{props.name}</h3>
                </div>
                
            </div>

          </div>

          <div className="product__info">
              
              <h4 className="product__info__price">${props.price}</h4>

              <div className="product__vote">
                  <p>Score: {votes.upvotes - votes.downvotes}</p>
                  <div>
                    <button
                      className={userVote === 'upvote' ? 'button-highlighted' : 'button-normal'}
                      onClick={() => handleVote(1)}
                      >
                      Upvote
                    </button>
                  </div>
                  <div>
                    <button
                      className={userVote === 'downvote' ? 'button-highlighted' : 'button-normal'}
                      onClick={() => handleVote(-1)}
                      >
                      Downvote
                    </button>
                  </div>
                </div>


              <div className="product__info__tags">
                {props.tags ? props.tags.map((tag, id) => 
                  <button key={id} className="info_tag">{tag}</button>) : ""
                }
              </div>
          </div>                   

          <div className="product__links">
              <Urls key={props.id}/>
          </div>
        </div>

      {/* Pop-up Modal  */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
      <Box sx={ModalStyle}>
        
        {imageSrcs && imageSrcs.map((image, i) => {
          return <img loading="lazy" key={i} src={image} onError={() => handleImageError(i)} style={{ height: "100px", width: "100px"}} alt="additional_images" />
        })}

        <p>Tags: {props.tags ? props.tags.map( (tag, i) => <div key={i}>{tag}</div> ) : ""} </p>

        <Typography id="modal-modal-title" variant="h6" component="h2">
          {props.name}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          { props.description ? props.description : "" }
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 5 }}>
          { props.features ? 
            props.features.map((feature, i) => {
              return <p key={i}>{feature}</p>
            })            
          : '' } 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 5 }}>
          { props.maintenance ? 
            props.maintenance.map((maintenance, i) => {
              return <p key={i}>{maintenance}</p>
            })            
          : '' } 
        </Typography>

        <div>
          <textarea 
            value={postComment} 
            onChange={e => setPostComment(e.target.value)} 
            name="postComment" 
            placeholder="Please share your comments :D" row={4} cols={40} />

          <button onClick={handleAddComment}>Add New Comment</button>
          
          { !comments.length ? <p>NO COMMENTS</p> :
          (
            <div className="product__comments__container">

              <h4>COMMENTS HERE ({comments.length}) </h4>
              <div className="product__comments">
              {comments.map((comment) => 
                  <div className="product__comment">
                    <p>
                      {comment.description} BY {comment.userName} 
                    </p>
                    
                    { user.userInfo.isLogin && comment.userName === user.userInfo.details.username ? 
                        <button onClick={() => handleRemoveComment(comment.id)}>Delete</button>
                        :
                        <></>
                    }
                  </div>
              )}     
              </div>
   
            </div>
          )
          } 
        </div>

      </Box>
      </Modal>

    </div>
  );
};

export default Product;
