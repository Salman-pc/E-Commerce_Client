import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AddProductContext, GetSubCategoriesContext } from '../Context/ResponseContextApi';
import { addProductsApi, EditProductApi } from '../services/allApi';
import { useEffect } from 'react';
import serverUrl from '../services/serverUrl';


function AddProduct({ isActive, intildataProductdetails }) {

    const { getsubcategoriesResponse } = useContext(GetSubCategoriesContext)
    const { setaddproductResponse } = useContext(AddProductContext)

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subCategory: '',
        variants: [{ ram: '', price: '', qty: 1 }],
        images: [],
    });

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addVariant = () => {
        setFormData({
            ...formData,
            variants: [...formData.variants, { ram: '', price: '', qty: 1 }],
        });
    };

    const handleVariantChange = (index, field, value) => {
        const updatedVariants = [...formData.variants];
        updatedVariants[index][field] = value;
        setFormData({ ...formData, variants: updatedVariants });
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const allowed = 3 - formData.images.length;
        if (allowed <= 0) return;

        const previews = files.slice(0, allowed).map((file) => ({
            file,
            url: URL.createObjectURL(file),
        }));

        setFormData({ ...formData, images: [...formData.images, ...previews] });
    };

    const handleSubmit = async () => {
        console.log('Form Data:', formData);
        console.log('Images:', formData.images.map((img) => img.file));

        const form = new FormData();
        form.append("title", formData.title);
        form.append("description", formData.description);
        form.append("subCategory", formData.subCategory);
        form.append("variants", JSON.stringify(formData.variants));

        formData.images.forEach((imgObj) => {
            form.append("images", imgObj.file);
        });
        const headers = {
            'Content-Type': 'multipart/form-data',
        }
        try {
            let result;
            if (isActive === "addproduct") {
                // ADD
                result = await addProductsApi(form, headers);
            } else {
                // EDIT
                result = await EditProductApi(intildataProductdetails._id, form, headers)
            }

            if (result.status === 201 || result.status === 200) {
                alert(result.data.message)
                setaddproductResponse(result.data)
                handleClose();
            }
            else {
                alert(result.response.data.message)
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
        handleClose();
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...formData.images];
        updatedImages.splice(index, 1);
        setFormData({ ...formData, images: updatedImages });
    };

    useEffect(() => {
        if (intildataProductdetails) {
            setFormData({
                title: intildataProductdetails.title || '',
                description: intildataProductdetails.description || '',
                subCategory: intildataProductdetails.subCategory || '',
                variants: intildataProductdetails.variants || [{ ram: '', price: '', qty: 1 }],
                images: (intildataProductdetails.images || []).map(url => ({
                    file: null,
                    url: url, // assuming these are URLs from backend
                })),
            });
        }
    }, [intildataProductdetails]);

    return (
        <>
            {isActive == 'addproduct' ? <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                    backgroundColor: '#eab308',
                    color: '#000',
                    py: '5px',
                    textTransform: 'none',
                    '&:hover': { backgroundColor: '#d4a406' },
                }}
            >
                Add Product
            </Button>
                :
                <Button
                    variant=""
                    onClick={handleClickOpen}
                    sx={{
                        backgroundColor: '#facc18',
                        color: '#000',
                        borderRadius: '24px',
                        '&:hover': { backgroundColor: '#d4a406' }
                    }}
                >
                    Edit Product
                </Button>}

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ textAlign: 'center' }}>
                    {isActive === "addproduct" ? "Add Product" : "Edit Product"}
                </DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

                    {/* Title */}
                    <TextField
                        label="Title"
                        fullWidth
                        variant="outlined"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />

                    {/* Variants */}
                    {formData.variants.map((variant, index) => (
                        <div key={index} className="flex gap-2">
                            <TextField
                                label="RAM"
                                value={variant.ram}
                                onChange={(e) =>
                                    handleVariantChange(index, 'ram', e.target.value)
                                }
                            />
                            <TextField
                                label="Price"
                                type="number"
                                value={variant.price}
                                onChange={(e) =>
                                    handleVariantChange(index, 'price', e.target.value)
                                }
                            />
                            <TextField
                                label="Qty"
                                type="number"
                                value={variant.qty}
                                onChange={(e) =>
                                    handleVariantChange(index, 'qty', e.target.value)
                                }
                            />
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <Button
                            onClick={addVariant}
                            startIcon={<AddCircleIcon />}
                            sx={{ width: '200px', color: '#000', backgroundColor: '#d4d4d8', mt: 1 }}
                        >
                            Add Variant
                        </Button>
                    </div>

                    {/* Subcategory */}
                    <div className="flex flex-col">
                        <label>Sub Category:</label>
                        <select
                            value={formData.subCategory}
                            onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '6px',
                                border: '1px solid #ccc',
                                marginTop: '10px',
                            }}
                        >
                            <option disabled value="">
                                Select Sub Category
                            </option>

                            {getsubcategoriesResponse?.map((item) => (
                                <option key={item._id} value={item.subCategoryName}>
                                    {item.subCategoryName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <TextField
                        label="Description"
                        multiline
                        rows={3}
                        fullWidth
                        variant="outlined"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />

                    {/* Image Upload (max 3) */}
                    <div className="flex gap-4 flex-wrap">
                        {formData.images.map((img, idx) => (
                            <div key={idx} className="relative w-16 h-16">
                                <img
                                    src={
                                        img.file || img.url.startsWith("blob:")
                                            ? img.url
                                            : `${serverUrl}/uploads/${img.url}`
                                    }
                                    alt={`uploaded-${idx}`}
                                    className="w-full h-full rounded border object-cover"
                                />
                                <button
                                    onClick={() => handleRemoveImage(idx)}
                                    className="absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                        {formData.images.length < 3 && (
                            <label className="w-16 h-16 flex items-center justify-center border-2 border-dashed rounded text-gray-500 cursor-pointer">
                                +
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>
                        )}
                    </div>

                </DialogContent>

                <DialogActions sx={{ justifyContent: 'end', pb: 4 }}>
                    {isActive === "addproduct" ? <Button
                        onClick={handleSubmit}
                        sx={{
                            backgroundColor: '#facc15',
                            color: '#000',
                            '&:hover': { backgroundColor: '#eab308' },
                        }}
                    >
                        ADD
                    </Button> :
                        <Button
                            onClick={handleSubmit}
                            sx={{
                                backgroundColor: '#facc15',
                                color: '#000',
                                '&:hover': { backgroundColor: '#eab308' },
                            }}
                        >
                            UPDATE
                        </Button>}

                    <Button onClick={handleClose} color="inherit">
                        DISCARD
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddProduct;
