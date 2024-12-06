import React, { useState, useEffect } from 'react';
import NavbarPage from '../../Layouts/NavbarPage';
import DataTable from 'react-data-table-component';
import useGetProduct from '../../Hook/useGetProduct';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import Checkbox from '@mui/material/Checkbox';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: '510px',
  alignItems: 'center',
};

const Products = () => {
  const [data, setData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [newProduct, setNewProduct] = useState({ title: '', price: '' });
  const [sortDirection, setSortDirection] = useState(null);

  const { mutate: fetchProducts } = useGetProduct();

  useEffect(() => {
    fetchProducts(
      {},
      {
        onSuccess: (response) => {
          setData(response);
        },
        onError: (error) => {
          console.error("Error fetching categories is:", error);
        },
      }
    );
  }, [fetchProducts]);

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setNewProduct({ title: '', price: '', image: '' });
    setErrors({ title: '', price: '' });
    setOpenAdd(false);
  };
  const handleOpenDelete = (product) => {
    setUserToDelete(product);
    setOpenDelete(true);
  };
  
  const handleCloseDelete = () => setOpenDelete(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const validate = () => {
    let valid = true;
    const errors = { title: '', price: '' };
    if (!newProduct.title) {
      errors.title = 'Title is required';
      valid = false;
    }
    if (!newProduct.price) {
      errors.price = 'Price is required';
      valid = false;
    } else if (isNaN(newProduct.price)) {
      errors.price = 'Price must be a number';
      valid = false;
    }
    setErrors(errors);
    return valid;
  };

  const handleAddProduct = () => {
    if (validate()) {
      if (editingIndex !== null) {
        const updatedData = [...data];
        updatedData[editingIndex] = { ...newProduct, id: data[editingIndex].id };
        setData(updatedData);
        setEditingIndex(null);
        setSuccessEdit(true);
        setTimeout(() => setSuccessEdit(false), 3000);
      } else {
        setData([...data, { ...newProduct, id: data.length + 1 }]);
        setSuccessAdd(true);
        setTimeout(() => setSuccessAdd(false), 3000);
      }
      handleCloseAdd();
    }
  };

  const handleDelete = () => {
    setData(data.filter((item) => item !== selectedRow));
    setSuccessDelete(true);
    setTimeout(() => setSuccessDelete(false), 3000);
    handleCloseDelete();
  };

  const editInput = (row, index) => {
    setNewProduct(row);
    setEditingIndex(index);
    setOpenAdd(true);
  };

  const handleSort = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
      setData([...data].sort((a, b) => b.title.localeCompare(a.title)));
    } else {
      setSortDirection('asc');
      setData([...data].sort((a, b) => a.title.localeCompare(b.title)));
    }
  };

  const columns = [
    {
      name: '',
      selector: row => <Checkbox onChange={() => setSelectedRow(row)} />,
      sortable: false,
      width: '70px',
    },
    {
      name: (
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={handleSort}
        >
          title
          {sortDirection === 'asc' ? (
            <ArrowUpwardIcon fontSize="small" style={{ marginLeft: 4 }} />
          ) : sortDirection === 'desc' ? (
            <ArrowDownwardIcon fontSize="small" style={{ marginLeft: 4 }} />
          ) : (
            <FilterListIcon fontSize="small" style={{ marginLeft: 4 }} />
          )}
        </div>
      ),
      selector: row => row.title,
      sortable:false
    },
    {
      name: 'Price',
      selector: row => row.price,
    },
    {
      name: 'ID',
      selector: row => row.id,
    },
    {
      name: 'Action',
      selector: (row, index) => (
        <div>
          <DeleteIcon style={{ color: "red", fontSize: "20px" }} onClick={() => handleOpenDelete(row)} />

          <EditIcon style={{ color: "gray", fontSize: "20px" }} onClick={() => editInput(row, index)} />
          <ReplayIcon style={{ color: "black", fontSize: "20px" }} />
        </div>
      ),
    }
  ];

  return (
    <>
      <NavbarPage />
      <div style={{ display: 'flex', gap: '50px', justifyContent: 'center' }}>
        <Button onClick={handleOpenAdd} style={{ backgroundColor: 'blue', color: 'white', marginTop: '15px' }}>
          Add Product
        </Button>
      </div>
      <Modal
        keepMounted
        open={openAdd}
        onClose={handleCloseAdd}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{ marginLeft: '30px' }}>
            <ProductionQuantityLimitsIcon /> Add Product
          </Typography>
          <Typography id="keep-mounted-modal-description" style={{ display: 'block', alignItems: 'center', marginLeft: '30px' }}>
            <TextField
              id="outlined-basic"
              label="* title"
              variant="outlined"
              placeholder="please enter title"
              name="title"
              value={newProduct.title}
              onChange={handleInputChange}
              style={{ marginTop: '25px' }}
            />
            {errors.title && <Typography color="error">{errors.title}</Typography>}
            <TextField
              id="outlined-basic"
              label="* price"
              variant="outlined"
              placeholder="please enter price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              style={{ marginTop: '25px' }}
            />
            {errors.price && <Typography color="error">{errors.price}</Typography>}
            <Typography style={{ display: 'flex', gap: '10px', marginTop: '20px', alignItems: 'center', justifyContent: 'center' }}>
              <Button variant="contained" style={{ width: '170px' }} onClick={handleAddProduct}>
                Record
              </Button>
              <Button variant="outlined" style={{ width: '170px' }} onClick={handleCloseAdd}>
                Exit
              </Button>
            </Typography>
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDelete}>
          <Box sx={style}>
            <Typography id="delete-modal-title" variant="h6" component="h2">
              <DeleteForeverIcon /> Delete Product
            </Typography>
            <Typography id="delete-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete {userToDelete?.id}?
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="outlined" onClick={handleCloseDelete}>
                Cancel
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
      {successAdd && <Alert severity="success">Product added successfully!</Alert>}
      {successDelete && <Alert severity="error">Product deleted successfully!</Alert>}
      {successEdit && <Alert severity="info">Product updated successfully!</Alert>}
      <DataTable
        columns={columns}
        data={data}
      />
    </>
  );
};

export default Products;
