import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useEffect } from 'react';
import { useState } from 'react';
import { addSubCategoryApi, getCategoryApi } from '../services/allApi';
import { AddCategoriesContext, AddSubCategoriesContext, GetSubCategoriesContext } from '../Context/ResponseContextApi';

function AddsubCategory() {


  const {setaddsubcategoriesResponse}=useContext(AddSubCategoriesContext)
  const {addcategoriesResponse}=useContext(AddCategoriesContext)

  
  const [open, setOpen] = useState(false);
  const [categories, setcategories] = useState([])
  const [formData, setFormData] = useState({
    categoryName: '',
    subCategoryName: '',
  });


  // Open and close dialog
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const getAllcategory = async () => {
    try {
      const result = await getCategoryApi()

      if (result.status === 200) {
        
        setcategories(result.data.categories)
        
      }

    } catch (error) {
      console.log(error);

    }
  }

  // Handle form submission
  const handleSubmit = async () => {
   
    try {

      const result = await addSubCategoryApi(formData)
      if (result.status === 201) {
        setaddsubcategoriesResponse(result.data.data) 
        alert(result.data.message)
       
      }
      else {
        
        alert(result.response.data.message)
        
      }
    } catch (error) {
      console.log(error);

    }
    handleClose();
  };

  useEffect(() => {
    getAllcategory()
  }, [addcategoriesResponse])

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: '#eab308',
          color: '#000',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#d4a406',
          },
        }}
      >
        Add Sub Category
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ textAlign: 'center' }}>Add Sub Category</DialogTitle>
        <DialogContent>
          {/* Category Selection */}
          <div style={{ marginBottom: '1rem' }}>
            <select
              value={formData.categoryName}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
              onChange={(e) => setFormData({ ...formData, categoryName: e.target.value })}
            >
              <option value="" disabled>Select Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat.categoryName}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Sub-Category Name */}
          <div>
            <input
              type="text"
              placeholder="Enter Sub Category Name"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
              }}
              value={formData.subCategoryName}
              onChange={(e) => setFormData({ ...formData, subCategoryName: e.target.value })}
            />
          </div>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button
            onClick={handleSubmit}
            sx={{
              backgroundColor: '#facc15',
              color: '#000',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#eab308',
              },
            }}
          >
            ADD
          </Button>
          <Button onClick={handleClose} color="inherit" sx={{ textTransform: 'none' }}>
            DISCARD
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddsubCategory;
