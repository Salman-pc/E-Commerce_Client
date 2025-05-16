import React from 'react';
import WishlistContextApi from './WishlistContextApi'; // Adjust the path as needed
import ResponseContextApi from "./ResponseContextApi";

function ContextApi({ children }) {
    return (
        <ResponseContextApi>
            <WishlistContextApi>
                {children}
            </WishlistContextApi>
        </ResponseContextApi>
    );
}

export default ContextApi;
