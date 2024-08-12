import "./Post.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { api } from '../utils/api'
import { Link } from "react-router-dom";

import LockIcon from '../assets/images/lock_icon.jpg'
import { yellow } from "@mui/material/colors";

const Post = ({ props }) => {

    // Issue here: When refresh, this becomes not logged in
    const user = useSelector(state => state.user) 

    const [name, setName] = useState("")

    const [brands, setBrands] = useState([])

    const [brand, setBrand] = useState("Walmart")

    const [selectedBrand, setSelectedBrand] = useState("")
    const [otherBrand, setOtherBrand] = useState("")

    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)
    const [pack, setPack] = useState(0)
    const [discount, setDiscount] = useState("")
    const [sku, setSku] = useState("")
    const [imageUrls, setImageUrls] = useState(["", ""]);
    const [productUrls, setProductUrls] = useState([{brand: "Walmart", name: "", url: ""}]);
    const [features, setFeatures] = useState(["", ""]);
    const [maintenances, setMaintenances] = useState(["", ""]);
    const [category, setCategory] = useState("NOLOGO");
    const [tag, setTag] = useState([]);
    
    const [moreDetails, setMoreDetails] = useState("");
    const [uploadedImages, setUploadedImages] = useState([]);

    useEffect(() => {
        async function fetchMyAPI() {
            var { statusCode, data}  = await api.getRequest('/api/brand')

            var temp = data.map((item) => item.name )

            setBrands(data);
            setBrand(data[0]);
            setProductUrls((prevProductUrls) => prevProductUrls.map((product) => ({
                ...product, 
                brand: data[0].name
            })));
        }
    
        fetchMyAPI()
      }, [])
    

    const updateFieldChanged = index => e => {
        const {name, value} = e.target;

        let newArr
        switch(name) {
            case 'productUrls': 
                newArr = [...productUrls]; // copying the old datas array
                newArr[index].name = value; // replace e.target.value with whatever you want to change it to
                setProductUrls(newArr); 
                break;
            case 'productUrl_url':
                newArr = [...productUrls]; // copying the old datas array
                newArr[index].url = value; // replace e.target.value with whatever you want to change it to
                setProductUrls(newArr);   
                break;
            case 'imageUrls':
                newArr = [...imageUrls]; // copying the old datas array
                newArr[index] = value; // replace e.target.value with whatever you want to change it to
                setImageUrls(newArr);
                break;
            case 'features':
                newArr = [...features]; // copying the old datas array
                newArr[index] = value; // replace e.target.value with whatever you want to change it to
                setFeatures(newArr);
                break;
            case 'maintenances':
                newArr = [...maintenances]; // copying the old datas array
                newArr[index] = value; // replace e.target.value with whatever you want to change it to
                setMaintenances(newArr);
                break;
            default:
                break;
        } 
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
            case 'imageUrls':
                if (e.target.name === "delete" && imageUrls.length === 1) {
                    return
                } else {
                    current = [...imageUrls]
                }                
                break
            case 'maintenances':
                if (e.target.name === "delete" && maintenances.length === 1) {
                    return
                } else {
                    current = [...maintenances]
                }                
                break
            default: 
                break
        }

        // Increment/Decrement the List depending on whether User clicked +/-
        if (e.target.name === "add") {
            
            if (val1 === 'productUrls') {
                current.push({brand: "", name: "", url: ""})
            } else {
                current.push("");
            }

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
            case 'imageUrls':
                setImageUrls(current)
                break
            case 'maintenances':
                setMaintenances(current)
                break
            default: 
                break
        }
    }

    const handleProductUrlsChange = (event, index) => {
        console.log('       handleProductUrlsChange()...');
        const newValue = event.target.value;
        const newProductUrls = [...productUrls];
        newProductUrls[index].brand = newValue;
        setProductUrls(newProductUrls);
    };

    // To Do
    // How to solve Choice thing 
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log("       handleSubmit()...")

        if (user.userInfo.isLogin) { 
            const user_id = user.userInfo.details.id
            const user_type = user.userInfo.details.type_id // for future conditions

            const newPostData = { 
                BrandId: brand.id, 
                Name: name, 
                Description: description, 
                Price: price, 
                Pack: pack, 
                Discount: discount, 
                Sku: sku, 
                ImageUrls: imageUrls, 
                ProductUrls: productUrls, 
                Features: features, 
                Maintenances: maintenances, 
                Category: category, 
                Tag: tag,
            }

            const updatedPostData = validateData(newPostData);
            const validationResult = validateSubmit(updatedPostData)              
            if (validationResult === true) {

                
                console.log(updatedPostData)
                alert(JSON.stringify(updatedPostData));

                const {statusCode, data} = await api.postRequest('/api/product', 
                    updatedPostData            
                )

                console.log("       statusCode: " + statusCode);

                if (statusCode === 400 || statusCode === 401 || statusCode === 500) {
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


    function validateData(newData) {
        console.log("       validateData()...");

        var result = newData;
        result.Features = features.filter(feature => feature !== '');
        result.Maintenances = maintenances.filter(maintenance => maintenance !== '');
        result.ImageUrls = imageUrls.filter(imageUrl => imageUrl !== '');
        result.ProductUrls = productUrls.filter(productUrl => productUrl.url !== '');
        
        alert(result.productUrls)
        return result;
    }
    function validateSubmit(newData) {
        // check productUrls, images, features, maintenaces 
        // remove from array if empty. if final is empty, then jnust empty array
        console.log("       validateSubmit()...");

        if (newData.Name === "" || newData.Brand === "" ) {
            return true
        } 
        return true
    }

    // Handler to handle select change
    const handleSelectChange = (index, event) => {
        const value = event.target.value;
        const newProductUrls = [...productUrls];
        newProductUrls[index].brand = value;
        setProductUrls(newProductUrls);
    };

    function printFormData() {
        console.log('name: ' +name)
        console.log('brand: ' + selectedBrand + " - " + otherBrand)
        console.log('description: ' +description)
        console.log('price: ' +price)
        console.log('pack: ' +pack)
        console.log('discount: ' +discount)
        console.log('sku: ' +sku)
        console.log('imageUrls: ' +imageUrls)
        console.log('productUrls: ' + productUrls)
        console.log('features: ' + features)
        console.log('maintenances: ' + maintenances)
        console.log('category: ' +category)
    }

    return (
        <div className="form__container" >

            { user.userInfo.isLogin  ? 
                <form className="form__post" encType='multipart/form-data' onSubmit={handleSubmit}>
                    <h2>Share your own or favorite shirt! </h2>

                    <div className="form__post__section">
                        <label> <b>Product (Required)</b>: </label>
                        <input value={name} type="text" name="productName" onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="form__list">
                        <label><b>Brand (Required)</b></label>
                        <div style={{background: "yellow"}}>
                            <select id="select-brand" name="selectedBrand" value={brand} onChange={e => setBrand(e.target.value)}>
                                {brands.map((brand, index) => (
                                <option key={index} value={brand.name}>
                                    {brand.name}
                                </option>
                                ))}
                            </select>
                        </div>                                
                    </div>

                    <div className="form__post__section">
                        <label> Description: </label>
                        <textarea value={description} name="description" onChange={e => setDescription(e.target.value)} />
                    </div>

                    <div className="form__post__section">
                        <label> <b>Price (Required)</b>: </label>
                        <input value={price} type="number" name="price" onChange={e => setPrice(e.target.value)} />
                    </div>

                    <div className="form__post__section">
                        <div className="form__select">
                            <label> Category {category} </label> 
                            <div>
                                <select name="category" value={category} onChange={e => setCategory(e.target.value)} >
                                    <option value="WHITE">WHITE</option>
                                    <option value="NOLOGO">NO LOGO</option>
                                    <option value="LOGO">LOGO</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form__list">
                        <div className="form__list__top">
                            <label><b>Links to Product (Required)</b></label>
                            <button name="add" onClick={(e => handleList(e, 'productUrls'))}>+</button>
                        </div>

                        <ul>
                            <p><b>Ex</b>: https://www.amazon.com/T-Shirt-Assortments..... </p>
                            {
                                productUrls.map((productUrl, index) => 
                                    <li className="form__list__item" key={index} >
                                        <div style={{background: "yellow"}}>
                                            <select id="select-brand" name="selectedBrand" value={productUrl.brand} onChange={(e) => handleProductUrlsChange(e, index)}>
                                                {brands.map((brand, index) => (
                                                    <option key={index} value={brand.name}>
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        
                                        <input type="text" name="productUrl_url" value={productUrl.url} onChange={updateFieldChanged(index)}  />
                                        <button id={index} name="delete" onClick={(e => handleList(e, 'productUrls'))}>DELETE</button>

                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="form__list">
                        <div className="form__list__top">
                            <label><b>Images (Required)</b></label>
                            <button name="add" onClick={(e => handleList(e, 'imageUrls'))}>+</button>
                        </div>
                        <ul>
                            <p><b>Ex</b>: https://m.media-amazon.com/images/...png</p>
                            {
                                imageUrls.map((image, index) => 
                                    <li className="form__list__item" key={index} >
                                        {index} <input type="text" name="imageUrls" value={image} onChange={updateFieldChanged(index)}  />
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
                                        {index} <input type="text" name="features" value={feature} onChange={updateFieldChanged(index)}  />
                                        <button id={index} name="delete" onClick={(e => handleList(e, 'features'))}>DELETE</button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="form__list">
                        <div className="form__list__top">
                            <label> Maintenances </label>
                            <button name="add" onClick={(e => handleList(e, 'maintenances'))}>+</button>
                        </div>

                        <ul>
                            <p><b>Ex:</b> Cold Wash Only</p>
                            {
                                maintenances.map((maintenance, index) => 
                                    <li className="form__list__item" key={index} >
                                        {index} <input type="text" name="maintenances" value={maintenance} onChange={updateFieldChanged(index)}  />
                                        <button id={index} name="delete" onClick={(e => handleList(e, 'maintenances'))}>DELETE</button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <button type="submit" >Submit</button>
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