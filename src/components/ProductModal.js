import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './ProductModal.css'; // Import CSS for modal styling

import { api } from '../utils/api';
import { useSelector } from 'react-redux';

const ProductModal = ({ isOpen, onClose, product }) => {

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentLoading, setCommentLoading] = useState(true);    
    const [isExpanded, setIsExpanded] = useState(false);

    const [showCommentButtons, setShowCommentButtons] = useState(false);


    const user = useSelector(state => state.user)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {

      if (product) {
        fetchComments();
        // Check if the user is logged in
        const loggedIn = user.userInfo.isLogin;
        setIsLoggedIn(loggedIn);

        console.log(product);
      }
    }, [product]);

    const fetchComments = async () => {
      try {
        const {statusCode, data} = await api.getRequest(`/api/comment/${product.id}`);
        setComments(data);
        setCommentLoading(false);

      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const handleToggleComment = (e) => {
      if (e.target.name === "comment-textarea" && !showCommentButtons ) {
        setShowCommentButtons(true);
      } else if (e.target.name === "comment-btn-cancel") {
        setShowCommentButtons(false);
      }
    }

    const handleAddComment = async () => {
      try {
        if (user.userInfo.isLogin) {

          const {statusCode, data} = await api.postRequest('/api/comment', {
            productId: product.id,
            description: newComment,
          });
          
          const tempComment = {
            id: product.id,
            description: data.description, 
            userName: user.userInfo.details.username, 
            score: data.score
          }
          
          setComments([...comments, tempComment]);
          setNewComment('');
        } else {
          alert("Please log in!");
        }
          
        } catch (error) {
          console.error('Error adding comment:', error);
      }
    };

    async function handleRemoveComment(id) {
      console.log('   handleRemoveComment()..')
      if (user.userInfo.isLogin) {
        const {statusCode, data} = await api.deleteRequest('/api/comment/' + id, {})
          
        if ( statusCode === 200 || statusCode === 201 || statusCode === 204) {
          const updatedComments = [...comments].filter((comment) => comment.id !== id)
          setComments(updatedComments);
          setNewComment('')
        } else if ( statusCode === 500 ) {
          alert('ERROR removing comment')
        }
      } else {
        alert('not your comment')
      }
    }

    const handleHiddenContent = () => {
      setIsExpanded(!isExpanded);
    };

    const DisplayArrayDetails = ({ name, items }) => {
      return (
        <div className="details-arrayDetails">
          <p style={{margin: 0}}><strong> {name} </strong></p>
          <ul style={{margin: 0}}>
            {items
              .filter(item => item.trim() !== '') // Filter out empty strings or strings with only whitespace
              .map((item, index) => (
                <li key={index}>{item}</li>
              ))}
          </ul>
        </div>
      );
    };

    const DisplayTagDetails = ({ name, items }) => {
      return (
        <div>
          <ul style={{margin: 0}}>
            {items && items
              .filter(item => item.trim() !== '') // Filter out empty strings or strings with only whitespace
              .map((item, index) => (
                <li key={index}>{item}REPLACE THIS WITH IMAGE</li>
              ))}
          </ul>
        </div>
      );
    };

    // Check productUrls.brand or productUrls.name then display correct image 
    const DisplayProductUrlsLogo = () => {
      return (
        <div className='model-body-left-productUrls'>
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
                  <div className="model-productUrl-container" key={index}>
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
        <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          className="modal"
          overlayClassName="modal-overlay"
          shouldCloseOnOverlayClick={true}
          ariaHideApp={false}
        >
          
          <div className="modal-body">

            <div className="modal-body-left">
              <div className="modal-image-container">
                <img src={product.imageUrls[0]} alt={product.name} className="modal-image" />
              </div>

              <DisplayProductUrlsLogo/>
            </div>
            
            <div className="modal-body-right">

              <div className="modal-details">
                <div className='details-title-container'>
                  <h3>{product.name}</h3>         
                  <button style={{margin: 0}} onClick={onClose} className="modal-close">X</button>
                </div>

                <p className="details-brand"><strong>BY </strong> {product.brand}</p>
                <p className="details-description">{product.description}</p>
                <p className="details-price"><strong>~${product.price}</strong></p>

                <p className="details-uploadedBy"><strong>Uploaded By </strong> {product.userName}</p>
              </div>
              
              <div className="details-hidden-content-btn-container"> 
                <button style={{margin: "0 auto", padding: "5px"}} className="details-hidden-content-btn" onClick={handleHiddenContent}>
                    SHOW {isExpanded ? "LESS" : "MORE"}
                </button>
              </div>

              <div className={`details-hidden-content ${isExpanded ? 'expanded' : ''}`}>                <DisplayArrayDetails name="Features" items={product.features} />
                <DisplayArrayDetails name="Maintenances" items={product.maintenances} />
                <DisplayTagDetails name="Tags" items={product.tags} />
              </div>

              <div className="comments-section">
                    <div className="comment-add-container">
                      <textarea
                          value={newComment}
                          name="comment-textarea"
                          onChange={(e) => setNewComment(e.target.value)}
                          onClick={handleToggleComment}
                          placeholder="Click to add a comment (Please log in)!"
                      />

                      { showCommentButtons && 
                        <div className="comment-add-btns-container">
                          <button name="comment-btn-post" class="comment-btn-post" onClick={handleAddComment}>Post</button>
                          <button name="comment-btn-cancel" class="comment-btn-cancel" onClick={handleToggleComment}>Cancel</button>
                        </div>
                      }
                    </div>
                
                <div className="comments-main-container" >
                  { commentLoading === true ? 
                    <>
                      LOADING
                    </> 
                    : 
                      comments.length <= 0 ?
                        <></>
                        : 
                        <div className  ="comments-container">
                          {comments.map(comment => (
                          <div key={comment.id} className="comment-container">
                              <div className="comment-writing-container">
                                <p className="comment-username"><strong>{comment.userName}</strong></p>
                                <p className="comment-description">
                                  {comment.description}

                                  { user.userInfo.isLogin && comment.userName === user.userInfo.details.username && 
                                      <span style={{color: "orange", marginLeft: "8px" }} onClick={() => handleRemoveComment(comment.id)}>Delete</span>
                                    }
                                </p>
                              </div>
                          </div>
                          ))}
                        </div>
                    }
                </div>

              </div>

            </div>

          </div>

        </Modal>
    );
};

export default ProductModal;
