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

    const [brand, setBrand] = useState({})

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

            const firstBrand = data[0] ? data[0] : {};
            setBrands(data);
            setBrand(firstBrand);

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
    const handleSelectChange = (e) => {
        const selectedBrand = brands.find((b) => b.id === Number(e.target.value));
        setBrand(selectedBrand);
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
        <div className="post__form__container" >

            { user.userInfo.isLogin  ? 

                <form className="form__post" encType='multipart/form-data' onSubmit={handleSubmit}>
                    
                    <h2>Share your own or favorite shirt! </h2>

                    <div className="form__item__container">
                        <label><b>Product</b> </label>
                        <input value={name} type="text" name="productName" onChange={e => setName(e.target.value)} />
                    </div>

                    <div className="form__item__container">
                        <label><b>Brand</b></label>

                        <div className="select__container">
                            <select id="select-brand" name="selectedBrand" onChange={handleSelectChange}> 
                                {brands.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>                                
                    </div>

                    <div className="form__item__container">
                        <label><b>Description</b> </label>
                        <textarea value={description} name="description" onChange={e => setDescription(e.target.value)} />
                    </div>

                    <div className="form__item__container">
                        <label> <b>Price</b></label>
                        <input value={price} type="number" name="price" onChange={e => setPrice(e.target.value)} />
                    </div>

                    <div className="form__item__container">
                        <label> Category</label> 
                        <div className="select__container">
                                <select name="category" value={category} onChange={e => setCategory(e.target.value)} >
                                    <option value="WHITE">WHITE</option>
                                    <option value="NOLOGO">NO LOGO</option>
                                    <option value="LOGO">LOGO</option>
                                </select>
                        </div>
                    </div>

                    <div className="form__item__container">
                        <div className="form__item__top">
                            <label><b>Links to Product (Required)</b></label>
                            <button name="add" onClick={(e => handleList(e, 'productUrls'))}>+</button>
                        </div>

                        <ul>
                            {
                                productUrls.map((productUrl, index) => 
                                    <li key={index} >
                                        <select id="select-brand" name="selectedBrand" value={productUrl.brand} onChange={(e) => handleProductUrlsChange(e, index)}>
                                            {brands.map((brand, index) => (
                                                <option key={index} value={brand.name}>
                                                    {brand.name}
                                                </option>
                                            ))}
                                        </select>

                                        <div className="form__item__list">
                                            <input type="text" name="productUrl_url" value={productUrl.url} onChange={updateFieldChanged(index)} placeholder="https://www.amazon.com/T-Shirt-Assortments....." />
                                            <button id={index} name="delete" onClick={(e => handleList(e, 'productUrls'))}>DELETE</button>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="form__item__container">
                        <div className="form__item__top">
                            <label><b>Images</b></label>
                            <button name="add" onClick={(e => handleList(e, 'imageUrls'))}>+</button>
                        </div>
                        
                        <ul>
                            {
                                imageUrls.map((image, index) => 
                                    <li key={index} >

                                        <div className="form__item__list">
                                            <input type="text" name="imageUrls" value={image} onChange={updateFieldChanged(index)} placeholder="https://m.media-amazon.com/images/...png"  />
                                            <button id={index} name="delete" onClick={(e => handleList(e, 'imageUrls'))}>DELETE</button>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="form__item__container">
                        <div className="form__item__top">
                            <label> Features </label>
                            <button name="add" onClick={(e => handleList(e, 'features'))}>+</button>
                        </div>

                        <ul>
                            {
                                features.map((feature, index) => 
                                    <li key={index} >
                                        
                                        <div className="form__item__list">
                                            <input type="text" name="features" value={feature} onChange={updateFieldChanged(index)} placeholder="Soft, breathable cotton"  />
                                            <button id={index} name="delete" onClick={(e => handleList(e, 'features'))}>DELETE</button>
                                        </div>
                                    </li>
                                )
                            }
                        </ul>
                    </div>

                    <div className="form__item__container">
                        <div className="form__item__top">
                            <label> Maintenances </label>
                            <button name="add" onClick={(e => handleList(e, 'maintenances'))}>+</button>
                        </div>

                        <ul>
                            {
                                maintenances.map((maintenance, index) => 
                                    <li key={index} >
                                        
                                        <div className="form__item__list">
                                            <input type="text" name="maintenances" value={maintenance} onChange={updateFieldChanged(index)} placeholder="Cold Wash Only" />
                                            <button id={index} name="delete" onClick={(e => handleList(e, 'maintenances'))}>DELETE</button>
                                        </div>
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
                </div>
            }

        </div>

    );
};

export default Post;