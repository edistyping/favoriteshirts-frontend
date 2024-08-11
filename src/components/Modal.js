import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Modal.css'; // Import CSS for modal styling

import { api } from '../utils/api';
import { useSelector } from 'react-redux';

const ProductModal = ({ isOpen, onClose, product }) => {


    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentLoading, setCommentLoading] = useState(true);    
    const [isExpanded, setIsExpanded] = useState(false);

    const user = useSelector(state => state.user)
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      if (product) {
        fetchComments();
        // Check if the user is logged in
        const loggedIn = user.userInfo.isLogin;
        setIsLoggedIn(loggedIn);
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

    const handleAddComment = async () => {
      try {
        
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
              <img src={product.imageUrls[0]} alt={product.name} className="modal-image" />
              <div className='body-left-productUrls'>
                { 
                  product.productUrls.map((product, index) => (
                    <div key={index}>
                      <p>{product.brand}! </p>
                      <a href={product.url} target="_blank" >
                        <img src="https://static.thenounproject.com/png/4778723-200.png" width={40} height={40} />
                      </a>
                    </div>
                  ))
                }
              </div>
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
                { isLoggedIn && (
                    <div className="comment-add-container">
                      <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment"
                      />

                      <div className="comment-add-btns">
                        <button onClick={handleAddComment}>Post</button>
                        <button >Cancel (Remove two buttons)</button>
                      </div>
                    </div>
                )}
                { commentLoading === true ? 
                  <>
                    LOADING
                  </> 
                  : 
                    comments.map(comment => (
                    <div key={comment.id} className="comment-container">
                        <div className="comment-writing-container">
                          <p className="comment-username"><strong>{comment.userName}</strong></p>
                          <p className="comment-description">
                            {comment.description}

                            { user.userInfo.isLogin && comment.userName === user.userInfo.details.username && 
                                <span style={{color: "orange", marginLeft: "8px", }} onClick={() => handleRemoveComment(comment.id)}>Delete</span>
                            }
                          </p>
                        </div>

 
                    </div>
                ))}
              </div>

            </div>

          </div>

        </Modal>
    );
};

export default ProductModal;
