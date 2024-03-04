import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'

const Logo = ({  }) => {
    console.log('Logo here')
    const user = useSelector(state => state.user)

    return (
        <div >
            <p>{JSON.stringify(user)}</p>

            <p>This will be available in future</p>
        </div>

    );
};

export default Logo;