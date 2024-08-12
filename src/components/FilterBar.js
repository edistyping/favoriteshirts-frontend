import './FilterBar.css'
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

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

const FilterBar = ( { handleFilter, brands }) => {
  console.log('   FilterBar component...')
  
  const [brand, setBrand] = useState("");

  // Where to get this or passed from? 
  // Should I retrieve this in App.js then store in Redux brand
  return (
    <div className='filter-main-container' >

        <div className="filter-container">
          <label htmlFor="brand-select">BRAND</label>
          <select id="brand-select" value={brand} onChange={(e) => setBrand(e.target.value)}>
              {brands.map((b, index) => (
                <option key={index} value={b}>
                      {b}
                  </option>
              ))}
          </select>
        </div>
        
        <div className="filter-btn-container">
          <button onClick={() => handleFilter(brand)}>Apply</button>
        </div>
    </div>
  )
}

export default FilterBar