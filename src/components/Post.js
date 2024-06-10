import "./Post.css";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { api } from '../utils/api'
import { Link } from "react-router-dom";

import LockIcon from '../assets/images/lock_icon.jpg'
import { yellow } from "@mui/material/colors";

const Post = ({ props }) => {

    // Issue here: When refresh, this becomes not logged in
    const user = useSelector(state => state.user) 

    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [pack, setPack] = useState("")
    const [discount, setDiscount] = useState("")
    const [sku, setSku] = useState("")
    const [imageUrls, setImageUrls] = useState(["", ""]);
    const [productUrls, setProductUrls] = useState(["", ""]);
    const [features, setFeatures] = useState(["", ""]);
    const [maintenance, setMaintenance] = useState(["", ""]);
    const [category, setCategory] = useState("NO LOGO");
    const [tag, setTag] = useState([]);
    
    const [productUrls2, setProductUrls2] = useState([{brand: "", name: "", url: ""}]);


    const [moreDetails, setMoreDetails] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);

    const updateFieldChanged = index => e => {
        let newArr = [...productUrls]; // copying the old datas array
        newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to
        setProductUrls(newArr);
    }

    const updateFieldChanged2 = index => e => {
        let newArr = [...productUrls2]; // copying the old datas array
        newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to
        setProductUrls2(newArr);
    }
    /*
        Add or Remove from a List. 
        If it's already at size 1, it does nothing. 
     */
    function handleList(e, val1) {
        // Add and Delete
        e.preventDefault()
        
        let current
        switch(val1) {
            case 'features':
                if (e.target.name === "delete" && features.length === 1) {
                    return
                } else {
                    current = [...features]
                }
                break
            case 'productUrls':
                if (e.target.name === "delete" && productUrls.length === 1) {
                    return
                } else {
                    current = [...productUrls]
                }   
                break
            case 'productUrls2':
                if (e.target.name === "delete" && productUrls2.length === 1) {
                    return
                } else {
                    current = [...productUrls2]
                }   
                break
            case 'imageUrls':
                if (e.target.name === "delete" && imageUrls.length === 1) {
                    return
                } else {
                    current = [...imageUrls]
                }                
                break
            case 'maintenance':
                if (e.target.name === "delete" && maintenance.length === 1) {
                    return
                } else {
                    current = [...maintenance]
                }                
                break
            default: 
                break
        }

        // Increment/Decrement the List depending on whether User clicked +/-
        if (e.target.name === "add") {
            current.push("")
        } else if (e.target.name === "delete") {
            current.splice(e.target.id, 1)
        }

        // Update the State variable 
        switch(val1) {
            case 'features':
                setFeatures(current)
                break
            case 'productUrls':
                setProductUrls(current)
                break
            case 'productUrls2':
                setProductUrls2(current)
                break
            case 'imageUrls':
                setImageUrls(current)
                break
            case 'maintenance':
                setMaintenance(current)
                break
            default: 
                break
        }
    }

    // To Do
    // How to solve Choice thing 
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("       handleSubmit()...")
        console.log(category)

        if (user.userInfo.isLogin) { 
            const user_id = user.userInfo.details.id
            const user_type = user.userInfo.details.type_id // for future conditions

            const validationResult = validateSubmit()              

            if (validationResult === true) {
                const newPostData = { 
                    brand, name, description, price, pack, discount, sku, 
                    imageUrls, productUrls, features, maintenance, category, tag,
                    user_id
                }
            
                const {statusCode, data} = await api.postRequest('/api/product', 
                    newPostData
                )

                if (statusCode === 400 || statusCode === 500) {
                    console.log("       There was an error submitting the post")
                    alert(`There was an error! ${statusCode}` )
                    return
                } 
                alert("Your Post was successfully uploaded!")
            } else {
                alert("     Not enough info provided to post a product...")
            }
        } else {
            alert('       Please login in order to post :D')
        }
    }

    function validateSubmit() {
        if (name === "" || brand === "" || description === "" || price === null || imageUrls.length === 0 || productUrls.length === 0) {
            return false
        } 
        return true
    }

    // Handler to handle select change
    const handleSelectChange = (index, event) => {
        const value = event.target.value;
        alert(value);
        const newProductUrls2 = [...productUrls2];
        // newProductUrls2[index].isOthers = value === 'Others';
        newProductUrls2[index].brand = value;
        setProductUrls2(newProductUrls2);
    };

    function printFormData() {
        console.log('name: ' +name)
        console.log('brand: ' +brand)
        console.log('description: ' +description)
        console.log('price: ' +price)
        console.log('pack: ' +pack)
        console.log('discount: ' +discount)
        console.log('sku: ' +sku)
        console.log('imageUrls: ' +imageUrls)
        console.log('productUrls: ' +productUrls)
        console.log('features: ' +features)
        console.log('maintenance: ' +maintenance)
        console.log('category: ' +category)
    }

    return (
        <div className="form__container" >

            { user.userInfo.isLogin  ? 
                <form className="form__post" encType='multipart/form-data' onSubmit={handleSubmit}>
                    <h2>Share your own or favorite shirt! </h2>

                    <div className="form__post__section">
                        <label> <b>Product Name</b>: </label>
                        <input value={name} type="text" name="productName" onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="form__post__section">
                        <label> <b>Brand</b>: </label>
                        <input value={brand} type="text" name="brand" onChange={e => setBrand(e.target.value)} />
                    </div>

                    <div className="form__post__section">
                        <label> Description (Optional): </label>
                        <textarea value={description} name="description" onChange={e => setDescription(e.target.value)} />
                    </div>

                    <div className="form__post__section">
                        <label> <b>Price</b>: </label>
                        <input value={price} type="number" name="price" onChange={e => setPrice(e.target.value)} />
                    </div>

                    <div className="form__post__section">
                        <div className="form__select">
                            <label> Category {category} </label> 
                            <div>
                                <select name="category" value={category} onChange={e => setCategory(e.target.value)} >
                                    <option value="WHITE">WHITE</option>
                                    <option value="NO LOGO">NO LOGO</option>
                                    <option value="LOGO">LOGO</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form__list">
                        <div className="form__list__top">
                            <label><b>Links to Product2</b></label>
                            <button name="add" onClick={(e => handleList(e, 'productUrls2'))}>+</button>
                        </div>

                        <ul>
                            <p><b>Ex</b>: https://www.amazon.com/T-Shirt-Assortments..... </p>
                            {
                                productUrls2.map((productUrl2, index) => 
                                    <li className="form__list__item" key={index} >
                                        
                                        {/* IP HERE 
                                           -> productUrls
                                           Each should include a 
                                                
                                        */}
                                        <div style={{background: "yellow"}}>
                                            <select id="select-brand" name="selectedBrand" onChange={(e) => handleSelectChange(index, e)}>
                                                <option value="amazon">AMAZON</option>
                                                <option value="costco">COSTCO</option>
                                                <option value="walmart">WALMART</option>
                                                <option value="others">OTHERS</option>
                                            </select>
                                            {productUrl2 === "others" && <input type="text" value={productUrl2.name} onChange={updateFieldChanged2(index)}  placeholder="Please specify" />}

                                        </div>
                                        
                                        <input type="text" name="productUrl" value={productUrl2.url} onChange={updateFieldChanged2(index)}  />
                                        <button id={index} name="delete" onClick={(e => handleList(e, 'productUrls2'))}>DELETE</button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>


                    <div className="form__list">
                        <div className="form__list__top">
                            <label><b>Links to Product</b></label>
                            <button name="add" onClick={(e => handleList(e, 'productUrls'))}>+</button>
                        </div>

                        <ul>
                            <p><b>Ex</b>: https://www.amazon.com/T-Shirt-Assortments..... </p>
                            {
                                productUrls.map((productUrl, index) => 
                                    <li className="form__list__item" key={index} >
                                        
                                        {/* IP HERE 
                                           -> productUrls
                                           Each should include a 
                                                
                                        */}
                                        <div style={{background: "yellow"}}>
                                            <select id="select-brand" name="selectedBrand">
                                                <option value="amazon">AMAZON</option>
                                                <option value="costco">COSTCO</option>
                                                <option value="walmart">WALMART</option>
                                                <option value="others">OTHERS</option>
                                            </select>
                                            
                                            <input type="text" name="productUrl" value={productUrl} onChange={updateFieldChanged(index)}  />
                                        </div>
                                        
                                        <input type="text" name="productUrl" value={productUrl} onChange={updateFieldChanged(index)}  />
                                        <button id={index} name="delete" onClick={(e => handleList(e, 'productUrls'))}>DELETE</button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="form__list">
                        <div className="form__list__top">
                            <label><b>Images</b></label>
                            <button name="add" onClick={(e => handleList(e, 'imageUrls'))}>+</button>
                        </div>
                        <ul>
                            <p><b>Ex</b>: https://m.media-amazon.com/images/...png</p>
                            {
                                imageUrls.map((image, index) => 
                                    <li className="form__list__item" key={index} >
                                        {index} <input type="text" name="name" value={image} onChange={updateFieldChanged(index)}  />
                                        <button id={index} name="delete" onClick={(e => handleList(e, 'imageUrls'))}>DELETE</button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="form__list">
                        <div className="form__list__top">
                            <label> Features </label>
                            <button name="add" onClick={(e => handleList(e, 'features'))}>+</button>
                        </div>

                        <ul>
                            <p><b>Ex:</b> Soft, breathable cotton </p>
                            {
                                features.map((feature, index) => 
                                    <li className="form__list__item" key={index} >
                                        {index} <input type="text" name="name" value={feature} onChange={updateFieldChanged(index)}  />
                                        <button id={index} name="delete" onClick={(e => handleList(e, 'features'))}>DELETE</button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="form__list">
                        <div className="form__list__top">
                            <label> Maintenance </label>
                            <button name="add" onClick={(e => handleList(e, 'maintenance'))}>+</button>
                        </div>

                        <ul>
                            <p><b>Ex:</b> Cold Wash Only</p>
                            {
                                maintenance.map((item, index) => 
                                    <li className="form__list__item" key={index} >
                                        {index} <input type="text" name="name" value={item} onChange={updateFieldChanged(index)}  />
                                        <button id={index} name="delete" onClick={(e => handleList(e, 'maintenance'))}>DELETE</button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <button type="submit" >Submit </button>
                </form>
                :
                <div className="post__denied">
                    <img height={200} width={200} src={LockIcon} alt="lock icon"  />
                    <p>Sorry, please sign up share your favorite shirts!</p>
                    <p>IT'S FREE!</p>
                    <Link to='/'>BACK TO HOME</Link>
                </div>
            }

        </div>

    );
};

export default Post;