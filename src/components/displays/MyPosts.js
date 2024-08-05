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
    const response = useSelector(state => state.products)
    const {products, loading, error} = response
    
    // const [products, setProducts] = useState({})
    const favorites = useSelector((state) => state.favorites.value)

    useEffect(() => {
        dispatch(getProductsByUser());
    }, [dispatch])


    const [editingProduct, setEditingProduct] = useState(null);
    const [expandedRows, setExpandedRows] = useState([]);

    const handleEditClick = (product) => {
        setEditingProduct(product);
        // Show edit popup/modal here
      };
    
    const handleDeleteClick = (id) => {
        dispatch(deleteProduct(id)); // Dispatch delete action
    };

    const handleUpdate = (event, updatedProduct) => {
        event.preventDefault();
        
        const { user, brand, ...rest } = editingProduct;
        const transformedData = { ...rest, brand: brand.id }; 

        dispatch(updateProduct(editingProduct.id, transformedData)); // Dispatch update action
        setEditingProduct(null); // Close edit popup/modal
    };

    const handleExpandClick = (id) => {
        setExpandedRows(prev => {
            if (prev.includes(id)) {
            return prev.filter(rowId => rowId !== id); // Remove id from expandedRows
            } else {
            return [...prev, id]; // Add id to expandedRows
            }
        });
    };
    
    const isExpanded = (id) => expandedRows.includes(id);

    return (
        <div>

            <h2>Product List</h2>
            <div className='homescreen__products'>
                { products && products.length > 0 ? 
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products && products.map(product => (
                                    <>
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.description}</td>
                                            <td>{product.price}</td>
                                            <td>
                                            <button onClick={() => handleEditClick(product)}>Edit</button>
                                            <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
                                            <button onClick={() => handleExpandClick(product.id)}>
                                                {isExpanded(product.id) ? 'Collapse' : 'Expand'}
                                            </button>
                                            </td>
                                        </tr>

                                        {isExpanded(product.id) && (
                                            <tr key={`${product.id}-expanded`} style={{ backgroundColor: 'yellow' }}>
                                            <td colSpan="5">
                                                <div>
                                                <h3>{product.name}</h3>
                                                <p>Description: {product.description}</p>
                                                <p>Price: {product.price}</p>
                                                {/* Additional details or fields */}
                                                </div>
                                            </td>
                                            </tr>
                                        )}
                                    </>
                                ))}
                            </tbody>
                        </table>

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
                    </>
                    :
                    <></>
                }
            </div>

            <h2>Your Comments</h2>
            <div></div>
        </div>
    );
};

export default MyPosts;