import React from 'react';
import { useParams } from 'react-router-dom';
import Text from '../Text';
import Navigation from '../Navigation';
import Overview from './overview';
import Guidance from './guidance';
import Code from './code';

const Typography = ()=> {
    const {id} = useParams();
    return(
        <>
        <Text
        title="Typography"
        description="Most of the information that is present in a user interface for the purpose of passing information across is represented via typography. Correct structuring and appropriate application is important for all interfaces."
        />
        <Navigation 
        type="typography"
        />
        {id==="guidance"?<Guidance/>:id==="code"?<Code/>:<Overview/>}
        </>
    )
}

export default Typography;