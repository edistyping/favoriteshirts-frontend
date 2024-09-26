import './MyPosts.css'

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'

import Product from '../Product'

import { getProductsByUser, updateProduct, deleteProduct } from '../../redux/actions/productActions'

import { speedDialClasses } from "@mui/material";
import { json } from "react-router-dom";

const MyPosts = ({}) => {
    console.log('MyPosts here')

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    // Local state for products and loading status
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const [comments, setComments] = useState([]);

    // false == posts, true == comments
    const [toggleContent, setToggleContent] = useState(true); 

    const [editingProduct, setEditingProduct] = useState(null);

    // const [products, setProducts] = useState({})
    const favorites = useSelector((state) => state.favorites.value)

    useEffect(() => {
        // dispatch(getProductsByUser());

        const fetchProductsByUser = async () => {
            setLoading(true); // Set loading state to true before fetching
            try {
                const { statusCode, data } = await api.getRequest('/api/product/user-products');
                setProducts(data); // Set products in local state
            } catch (err) {
                setError('Error fetching products');
            } finally {
                setLoading(false); // Set loading state to false after fetching
            }
        };

        fetchProductsByUser();
    }, [dispatch])

    const handleCommentDelete = async (comment) => {
        const {statusCode, data} = await api.deleteRequest('/api/comment/' + comment.id);
        
        // if successful, update 'products' state variable
        if (statusCode === 204) {
            const updatedComments = comments.filter(p => p.id !== comment.id);
            alert("Delete is successfully made!");
            setComments(updatedComments);
        } else {
            alert("There was a problem with deleting...");
        }
    }

    const handleEditClick = (product) => {
        setEditingProduct(product);
        // Show edit popup/modal here
    };
    
    const handleDeleteClick = async (product) => {
        // dispatch(deleteProduct(id)); // Dispatch delete action
        const {statusCode, data} = await api.deleteRequest('/api/product/' + product.id);

        // if successful, update 'products' state variable
        if (statusCode === 204) {
            const updatedProducts = products.filter(p => p.id !== product.id);
            alert("Delete is successfully made!");
            setProducts(updatedProducts);
        } else {
            alert("There was a problem with deleting...");
        }
    };

    const handleUpdate = async (event, updatedProduct) => {
        event.preventDefault();
        
        const { user, brand, ...rest } = editingProduct;
        const transformedData = { ...rest, brand: brand.id }; 

        // dispatch(updateProduct(editingProduct.id, transformedData)); // Dispatch update action
        const {statusCode, data} = await api.patchRequest('/api/product/' + editingProduct.id, transformedData)

        // if successful, update 'products' state variable
        if (statusCode === 200) {
            const index = products.findIndex(product => product.id === editingProduct.id);
            if (index !== -1) {
                const updatedProducts = [...products];
                updatedProducts[index] = editingProduct;
                alert("Update is successfully made!");
                setProducts(updatedProducts);
                setEditingProduct(null);
            }
        } else {
            alert("There was a problem with updating...");
        }

        setEditingProduct(null); // Close edit popup/modal
    };

    const handleToggle = async (value) => {
        setLoading(true);

        if (value === false) {
            // fetch comments 
            const {statusCode, data} = await api.getRequest('/api/comment/')
            // id, productId, description, userId, score 
            if (statusCode === 200){
                setComments(data);
            }

        } else if (value === true) {
            // fetch products again 
            const { statusCode, data } = await api.getRequest('/api/product/user-products');

            // id, productId, description, userId, score 
            if (statusCode === 200){
                setProducts(data);
            }
        }
        
        setLoading(false);
        setToggleContent(value);
    };
    
    return (
        <div className="myposts__container" >

            <h2>YOUR HISTORY</h2>

            <div className="myposts__container__header" >
                <button className={toggleContent ? "active" : ""} onClick={() => handleToggle(true)}>YOUR POSTS</button>
                <button className={!toggleContent ? "active" : ""} onClick={() => handleToggle(false)}>YOUR COMMENTS</button>
            </div>

            { toggleContent ? 

                <div className='myposts__section'>
                    
                    { loading && <>LOADING NOW!</> }

                    { !loading && products && products.length > 0 ?

                        <table className='myposts__table'>
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>DESCRIPTION</th>
                                    <th>BRAND</th>
                                    <th>PRICE</th>

                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products && products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.price}</td>

                                        <td className='myposts__table__btn__container'>
                                            <button onClick={() => handleEditClick(product)}>EDIT</button>
                                            <button onClick={() => handleDeleteClick(product)}>DELETE</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    :
                        <></>
                    }

                    {/* Edit Product Popup/Modal */}
                    {editingProduct && (
                        <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setEditingProduct(null)}>&times;</span>
                            <h2>Edit Product</h2>
                            <form onSubmit={handleUpdate}>
                                <label>Name:</label>
                                <input type="text" value={editingProduct.name} onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})} />
                                <label>Description:</label>
                                <input type="text" value={editingProduct.description} onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})} />
                                <label>Price:</label>
                                <input type="number" value={editingProduct.price} onChange={(e) => setEditingProduct({...editingProduct, price: e.target.value})} />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                        </div>
                    )}
                </div>

            : 
                <div>

                    { !loading && comments && comments.length > 0 ?
                        <table className='myposts__table'>
                            <thead>
                                <tr>
                                    <th>DESCRIPTION</th>
                                    <th>SCORE</th>

                                    <th>ACTIONS</th>
                                </tr>
                            </thead>

                            <tbody>
                                {comments && comments.map(comment => (
                                    <>
                                        <tr key={comment.id}>
                                            <td>{comment.description}</td>
                                            <td>{comment.score}</td>
                                            <td>
                                                <button onClick={() => handleCommentDelete(comment)}>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    :
                        <></>
                    }
                </div>
            }
        </div>
    );
};

export default MyPosts;