import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'

export const AddCategoriesContext = createContext()
export const AddSubCategoriesContext =createContext()
export const GetSubCategoriesContext =createContext()
export const AddProductContext = createContext()

function ResponseContextApi({children}) {

    const [addcategoriesResponse,setaddcategoriesResponse]=useState()
    const [addsubcategoriesResponse,setaddsubcategoriesResponse]=useState()
    const [getsubcategoriesResponse,setgetsubcategoriesResponse]=useState([])
    const [addProductresponse,setaddproductResponse]=useState()

    // console.log(getsubcategoriesResponse,"fskjdflksjlf");
    
  return (
    <AddProductContext.Provider value={{addProductresponse,setaddproductResponse}}>
        <GetSubCategoriesContext.Provider value={{getsubcategoriesResponse,setgetsubcategoriesResponse}}>
            <AddSubCategoriesContext.Provider value={{addsubcategoriesResponse,setaddsubcategoriesResponse}}>
                <AddCategoriesContext.Provider value={{addcategoriesResponse,setaddcategoriesResponse}}>
                    {children}
                </AddCategoriesContext.Provider>
            </AddSubCategoriesContext.Provider>
        </GetSubCategoriesContext.Provider>
    </AddProductContext.Provider>
  )
}

export default ResponseContextApi