import React from 'react';
import WishlistContextApi from './WishlistContextApi'; // Adjust the path as needed
import ResponseContextApi from "./ResponseContextApi";
import   { SearchContextApi }  from './SearchContextApi';

function ContextApi({ children }) {
    return (
        <SearchContextApi>
            <ResponseContextApi>
                <WishlistContextApi>
                    {children}
                </WishlistContextApi>
            </ResponseContextApi>
        </SearchContextApi>
    );
}

export default ContextApi;
