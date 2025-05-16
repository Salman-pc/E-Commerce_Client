import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useContext } from 'react';
import { AddProductContext, GetSubCategoriesContext } from '../Context/ResponseContextApi';
import { addProductsApi } from '../services/allApi';

function AddProduct({ isActive }) {

    const { getsubcategoriesResponse } = useContext(GetSubCategoriesContext)
    const {setaddproductResponse}=useContext(AddProductContext)



    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({
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
            const result = await addProductsApi(form,headers);
            if (result.status === 201) {
                
                alert(result.data.message)
                setaddproductResponse(result.data)
                handleClose();
            }
            else {
                console.log(result);

                alert(result.response.data.message)
            }

        } catch (error) {
            console.error("Error adding product:", error);
        }
        handleClose();
    };

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
                        backgroundColor: '',
                        color: '#000',
                        width: '100%'

                    }}
                >
                    Edit Product
                </Button>}

            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ textAlign: 'center' }}>Add Product</DialogTitle>
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
                    <div className="flex flex-col gap-2">
                        <label className="block font-medium">Upload Images (max 3)</label>
                        <div className="flex gap-4 flex-wrap">
                            {formData.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img.url}
                                    alt={`uploaded-${idx}`}
                                    className="w-16 h-16 rounded border object-cover"
                                />
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
                    </div>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'end', pb: 4 }}>
                    {isActive ? <Button
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
