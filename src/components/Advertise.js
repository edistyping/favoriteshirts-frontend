import "./Advertise.css";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { api } from '../utils/api'

const Advertise = ({  }) => {
    console.log('~!~@~!@ProductDetail here')
    const user = useSelector(state => state.user)

    return (
        <div className="RequestAdvertise" >
            <p>{JSON.stringify(user)}</p>

            <p>This will be available in future</p>
        </div>

    );
};

export default Advertise;