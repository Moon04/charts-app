import React from 'react';
import { Button } from 'reactstrap';

const Navbar = ()=>{
    return(
        <nav className='nav'>
            <h3>
                Internal Dashboard
            </h3>
            <Button>
                + Add chart
            </Button>
        </nav>
    );
};

export default Navbar;