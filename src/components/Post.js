import "./Post.css";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { api } from '../utils/api'
import { Link } from "react-router-dom";

import LockIcon from '../assets/images/lock_icon.jpg'

const Post = ({ props }) => {
    const user = useSelector(state => state.user)
    
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [pack, setPack] = useState("")
    const [discount, setDiscount] = useState("")
    const [sku, setSku] = useState("")
    const [imageUrls, setImageUrls] = useState([]);
    const [productUrls, setProductUrls] = useState(["", ""]);
    const [features, setFeatures] = useState([]);
    const [maintenance, setMaintenance] = useState([]);
    const [category, setCategory] = useState("CUSTOM");
    const [tag, setTag] = useState([]);
    
    const [moreDetails, setMoreDetails] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);

    /*
        Need to Update for Images: 
            1. Upload the function to Azure Storage
            2. Get the URLs and post it to DB 
    */

    const updateFieldChanged = index => e => {
        let newArr = [...productUrls]; // copying the old datas array
        newArr[index] = e.target.value; // replace e.target.value with whatever you want to change it to
        setProductUrls(newArr);
    }

    function handleProductLinks(e) {
        // Add and Delete
        e.preventDefault()
        if (e.target.name === "delete-productlinks" && productUrls.length === 1) {
            return
        }

        let current = [...productUrls]
        if (e.target.name === "add-productlinks") {
            current.push("")
        } else if (e.target.name === "delete-productlinks") {
            current.splice(e.target.id, 1)
        }
        setProductUrls(current)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('    Your Post is Submitted');
        console.log(user)

        if (user.userInfo.isLogin) { 
            const user_id = user.userInfo.details.id
            const user_type = user.userInfo.details.type_id
            
            console.log("       handleSubmit()...")

            // TO DO
            // 1. Need to upload this Azure Storage 
            // 2. Get the links and attach it

            // TEST
            console.log(uploadedImages)
            if (uploadedImages.length > 3) {
                alert("Files selected are greater than 3")
                return
            }

            if (name === "" || brand === "") {
                alert("Name and/or Brand is not provided!")
                return
            } 

            const {statusCode, data} = await api.postRequest('/api/product/upload', 
                { user_id, user_type, name, brand, description, price, pack, discount, sku, imageUrls, productUrls, features, maintenance, category, tag, moreDetails }
            )

            if (statusCode === 500) {
                console.log("       There was an error submitting the post")
            } 

            alert("Your Post was successfully uploaded!")
        } else {
            console.log('       User is not logged in!')
        }
    }

    return (
        <div className="form__container" >

            { user.userInfo.isLogin  ? 

                <form className="form__post" encType='multipart/form-data'>
                    <label>
                        Product Name:
                        <input value={name} type="text" name="name" onChange={e => setName(e.target.value)} />
                    </label>

                    <label>
                        Brand:
                        <input value={brand} type="text" name="name" onChange={e => setBrand(e.target.value)} />
                    </label>

                    <label>
                        <div className="form__list">
                            <div className="form__list__top">
                                <h3>Link to Product</h3>
                                <button name="add-productlinks" onClick={handleProductLinks}>+</button>
                            </div>

                            <ul>
                                <p><b>Ex</b>: https://www.amazon.com/Gildan-Mens-T-Shirt-Assortment-Large..... </p>
                                {
                                    productUrls.map((productUrl, index) => 
                                        <li className="form__list__item" key={index} >
                                            {index} <input type="text" name="name" value={productUrl} onChange={updateFieldChanged(index)}  />
                                            <button id={index} name="delete-productlinks" onClick={handleProductLinks}>DELETE</button>
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </label>

                    <label>
                        Description (Optional):
                        <textarea value={description} name="description" onChange={e => setDescription(e.target.value)} />
                    </label>

                    <label>
                        Images: Use li here (Files or URL; Optional) 
                        <input type="text" name="imageUrl" />
                        <input type="file" multiple name="uplaodedImages" accept="image/png, image/jpg, image/jpeg" onChange={(e)=> setUploadedImages(e.target.files)} />
                    </label>
                            
                    <label>
                        Features (Optional): Use li here 
                        <input type="text" name="features" />
                    </label>

                    <input type="submit" value="Submit" onClick={handleSubmit} />
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