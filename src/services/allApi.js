import commonApi from "./commonApi";
import serverUrl from "./serverUrl";

// usser Auth realted API

export const SignUpApi=async(reqbody)=>{
    return await commonApi("POST",`${serverUrl}/usersignup`,reqbody,"")
}

export const LoginApi=async(reqbody)=>{
    return await commonApi("POST",`${serverUrl}/userlogin`,reqbody,'')
}

// category
export const addCategoryApi=async(reqbody)=>{
    return await commonApi("POST",`${serverUrl}/addcategory`,reqbody,'')
}
export const getCategoryApi=async()=>{
    return await commonApi("GET",`${serverUrl}/getcategories`,'','')
}

// subcategoryApi
export const addSubCategoryApi=async(reqbody)=>{
    return await commonApi("POST",`${serverUrl}/addsubcategory`,reqbody,'')
}
export const getSubCategoryApi=async()=>{
    return await commonApi("GET",`${serverUrl}/getsubcategory`,'','')
}

//product
export const addProductsApi=async(reqbody,headers)=>{
    return await commonApi("POST",`${serverUrl}/addproduct`,reqbody,headers)
}
export const getProductsApi=async()=>{
    return await commonApi("GET",`${serverUrl}/getproduct`,'','')
}
export const getSingleProductsApi=async(id)=>{
    return await commonApi("GET",`${serverUrl}/getsingleproduct/${id}`,'','')
}
// edit product
export const EditProductApi = (id, reqbody, reqheader) => {
  return commonApi("PUT",`${serverUrl}/editproduct/${id}`, reqbody,reqheader);
};
// search product
export const searchBasedProductsApi=async(keyword)=>{
    return await commonApi("GET",`${serverUrl}/search?keyword=${keyword}`,'','')
}

//
export const addTowishlistApi=async(reqbody)=>{
    return await commonApi("POST",`${serverUrl}/addtowishlist`,reqbody)
}
export const getToWhishlistApi=async(userid)=>{
    return await commonApi("GET",`${serverUrl}/gettowishlist/${userid}`,'','')
}
export const deletefromWhishlistApi=async(id,userid)=>{
    return await commonApi("DELETE",`${serverUrl}/deletefromwishlist/${id}?userid=${userid}`,{},'')
}

