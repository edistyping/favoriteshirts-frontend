import "./ProductDetail.css";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getComments, postComment, deleteComment } from '../redux/actions/commentAction'

const ProductDetail = ({ product }) => {

  const dispatch = useDispatch()

  const comments = useSelector(state => state.comments)


  useEffect(() => {
    console.log('   ProductDetail() useEffect...')
    dispatch(getComments())
  }, [dispatch])

  return (
    <div className="productDetail" >
        
        {JSON.stringify(product)}

        ----------
        {JSON.stringify(comments)}
        ----------------
    </div>
  );
};

export default ProductDetail;