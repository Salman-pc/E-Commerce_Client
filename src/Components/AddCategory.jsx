import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import { addCategoryApi } from '../services/allApi';
import { useContext } from 'react';
import { AddCategoriesContext } from '../Context/ResponseContextApi';


function AddCategory() {

  const { setaddcategoriesResponse } = useContext(AddCategoriesContext)

  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = useState({ categoryName: "" });
  const [loading, setLoading] = React.useState(false);


  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCategory('');

  };

  const handleAdd = async () => {

    setLoading(true);
    try {

      const result = await addCategoryApi(category)
      if (result.status === 201) {


        setaddcategoriesResponse(result.data)
        alert(result.data.message)

      }
      else {

        alert(result.response.data.message)
      }


      setTimeout(() => {
        setLoading(false);
        handleClose(); // Close the dialog and reset
      }, 2000);
    } catch (error) {
      setLoading(false);

    }
  };

  return (
    <>
      <Button
        onClick={handleClickOpen}
        sx={{
          backgroundColor: '#eab308',
          color: '#000',
          px: 3,
          py: 1,
          borderRadius: 2,
          '&:hover': {
            backgroundColor: '#d4a106',
          },
        }}
      >
        Add Category
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="add-category-title"
        maxWidth="sm"
        fullWidth
        PaperProps={{
          style: {
            borderRadius: 12,
            padding: '20px',
          },
        }}
      >
        <DialogTitle id="add-category-title" sx={{ textAlign: 'center', fontWeight: 600 }}>
          Add Category
        </DialogTitle>

        <DialogContent>
          <input
            type="text"
            placeholder="Enter Category Name"
            value={category.categoryName}
            onChange={(e) => setCategory({ categoryName: e.target.value })}
            style={{
              width: '100%',
              padding: '12px',
              marginTop: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '16px',
            }}
          />

        </DialogContent>

        <DialogActions sx={{ justifyContent: 'center', mt: 2 }}>
          <Button
            onClick={handleAdd}
            sx={{
              backgroundColor: '#facc15',
              color: '#000',
              '&:hover': { backgroundColor: '#eab308' },
              disabled: loading, // Disable the button while loading
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: '#000' }} /> : 'ADD'}
          </Button>
          <Button onClick={handleClose} color="inherit" disabled={loading}>
            DISCARD
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddCategory;
