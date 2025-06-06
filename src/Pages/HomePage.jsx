import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import ProductCard from '../Components/ProductCard';
import { FaAngleDown, FaAngleRight, } from 'react-icons/fa';
import AddCategory from '../Components/AddCategory';
import AddsubCategory from '../Components/AddsubCategory';
import AddProduct from '../Components/AddProduct';
import { getProductsApi, getSubCategoryApi, searchBasedProductsApi } from '../services/allApi';
import { useContext } from 'react';
import { AddProductContext, AddSubCategoriesContext, GetSubCategoriesContext } from '../Context/ResponseContextApi';
import { SearchContext } from '../Context/SearchContextApi';
import ProductPagination from '../Components/ProductPagination';


function HomePage() {

    const { searchKeyword } = useContext(SearchContext);
    const { setgetsubcategoriesResponse } = useContext(GetSubCategoriesContext)
    const { addsubcategoriesResponse } = useContext(AddSubCategoriesContext)
    const { addProductresponse } = useContext(AddProductContext)
    const itemsPerPage = 6;

    const [openCategory, setOpenCategory] = useState({});
    const [subCategorydata, setSubCategorydata] = useState([])
    const [products, setProducts] = useState([]);
    const [selectedSubs, setSelectedSubs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const filteredProducts = selectedSubs.length
        ? products.filter((product) =>
            selectedSubs.includes(product.subCategory)
        )
        : products;

    // pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const fetchAllProducts = async () => {

        try {
            const result = searchKeyword
                ? await searchBasedProductsApi(searchKeyword)
                : await getProductsApi();

            if (result.status === 200) {
                const data = Array.isArray(result.data)
                    ? result.data
                    : result.data?.data || [];
                setProducts(data);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.log("Failed to fetch products:", error);
            setProducts([]);
        }
    };

    const getAllsubcategories = async () => {
        try {

            const result = await getSubCategoryApi()
            if (result.status == 200) {
                const subCategories = result.data.data;
                setgetsubcategoriesResponse(subCategories)
                setSubCategorydata(subCategories)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const groupByCategory = () => {
        const grouped = {};
        subCategorydata?.forEach(({ categoryName, subCategoryName }) => {
            if (!grouped[categoryName]) {
                grouped[categoryName] = [];
            }
            grouped[categoryName].push(subCategoryName);
        });
        return grouped;
    };

    const groupedCategories = groupByCategory();


    // filtering
    const handleSubCategoryFilter = (subCategoryName) => {
        setSelectedSubs((prev) =>
            prev.includes(subCategoryName)
                ? prev.filter((sub) => sub !== subCategoryName)
                : [...prev, subCategoryName]
        );
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProducts]);


    useEffect(() => {
        getAllsubcategories()
    }, [addsubcategoriesResponse])

    useEffect(() => {
        fetchAllProducts();
    }, [addProductresponse, searchKeyword]);



    // dropdown use
    const toggleCategory = (name) => {
        setOpenCategory((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };
    return (
        <div>
            <Header />

            <div className="flex flex-col md:flex-row  gap-6">
                {/* Sidebar */}
                <div className="w-full md:w-1/5 md:min-h-screen bg-gray-100 p-4 rounded-lg shadow-sm">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-4 text-gray-600">
                        <span className="text-sm">Home</span>
                        <FaAngleRight />
                    </div>

                    {/* Categories Filter */}
                    <div>
                        <h3 className="text-lg  mb-2">Categories</h3>
                        <h3 className="text-lg  mb-2">All Categories</h3>
                        {Object.entries(groupedCategories).map(([categoryName, subcategories]) => (
                            <div key={categoryName} className="mb-4">
                                <button
                                    className="flex justify-between items-center w-full mb-1"
                                    onClick={() => toggleCategory(categoryName)}
                                >
                                    <span className="font-medium">{categoryName}</span>
                                    {openCategory[categoryName] ? <FaAngleDown /> : <FaAngleRight />}
                                </button>
                                {openCategory[categoryName] && (
                                    <div className="ml-4">
                                        {subcategories.map((sub) => (
                                            <label key={sub} className="block text-sm mb-1">
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    onChange={() => handleSubCategoryFilter(sub)}
                                                    checked={selectedSubs.includes(sub)}
                                                />
                                                {sub}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Products */}
                <div>
                    <div className="flex  justify-end mt-4 px-4 gap-4 mb-6">
                        <AddCategory />
                        <AddsubCategory />
                        <AddProduct isActive={'addproduct'} />
                    </div>
                    <div className="w-full grid  gap-4">
                        <div className='w-full '>
                            <div className=''>
                                {
                                    filteredProducts.length > 0 ?
                                        <div className='flex flex-wrap md:justify-start justify-center'>
                                            {currentItems.map((product) => (
                                                <ProductCard
                                                    key={product._id}
                                                    id={product._id}
                                                    name={product.title}
                                                    price={product.variants?.[0]?.price}
                                                    image={product.images?.[0]}
                                                />
                                            ))}
                                            <div className='w-full flex justify-center my-5'>
                                                <ProductPagination
                                                    count={Math.ceil(filteredProducts.length / itemsPerPage)}
                                                    page={currentPage}
                                                    onChange={handlePageChange}
                                                    variant="outlined"
                                                    shape="rounded"
                                                />
                                            </div>
                                        </div> : <p>No products found.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
