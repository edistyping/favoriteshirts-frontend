import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { api } from '../../utils/api'

const Special = ({  }) => {
    console.log('Special here')
    const user = useSelector(state => state.user)

    return (
        <div >
            <p>{JSON.stringify(user)}</p>

            <p>This will be available in future</p>

            popular items?
                - This goes home
            
            anything non t-shirts go here 

        </div>

    );
};

export default Special;