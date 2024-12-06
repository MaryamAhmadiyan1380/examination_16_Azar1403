import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import NavbarPage from '../../Layouts/NavbarPage';
import useGetCategories from '../../Hook/useGetCategories';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Fade from '@mui/material/Fade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import CategoryIcon from '@mui/icons-material/Category';
import Alert from '@mui/material/Alert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: '510px',
  alignItems: 'center',
};

const Categories = () => {
  const [data, setData] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({ name: "", image: "", creationAt: "" });
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [ sortDirection , setSortDirection] = useState(null)
  const [userToDelete, setUserToDelete] = useState(null);
  const [successEdit, setSuccessEdit] = useState(false);
  const [newCategories, setNewCategories] = useState({ name: "", image: "", creationAt: "" });

  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => setOpenAdd(false);
  const handleOpenDelete = (category) => {
    setUserToDelete(category)
    setOpenDelete(true);
  }
  const handleCloseDelete = () => setOpenDelete(false);

  const { mutate: fetchCategories } = useGetCategories();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCategories({ ...newCategories, [name]: value });
  };

  const validate = () => {
    let valid = true;
    const errors = { name: "", image: "", creationAt: "" };

    if (!newCategories.name) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!newCategories.image) {
      errors.image = "Image is required";
      valid = false;
    }
    if (!newCategories.creationAt) {
      errors.creationAt = "CreationAt is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleAddInput = () => {
    if (validate()) {
      if (editingIndex !== null) {
        const updatedData = [...data];
        updatedData[editingIndex] = newCategories;
        setData(updatedData);
        setEditingIndex(null);
        setSuccessEdit(true);
        setTimeout(() => setSuccessEdit(false), 3000);
      } else {
        setData([...data, { ...newCategories }]);
        setSuccessAdd(true);
        setTimeout(() => setSuccessAdd(false), 3000);
      }
      setNewCategories({ name: "", image: "", creationAt: "" });
      setErrors({ name: "", image: "", creationAt: "" });
      handleCloseAdd();
    }
  };

  const handleDelete = () => {
    setData(data.filter(item => item !== selectedRow));
    setSuccessDelete(true);
    setTimeout(() => setSuccessDelete(false), 3000);
    handleCloseDelete();
  };

  const editInput = (row, index) => {
    setNewCategories(row);
    setEditingIndex(index);
    setOpenAdd(true);
  };
  const handleSort = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
      setData([...data].sort((a, b) => b.name.localeCompare(a.name))); 
    } else {
      setSortDirection('asc');
      setData([...data].sort((a, b) => a.name.localeCompare(b.name))); 
    }
  };
  useEffect(() => {
    fetchCategories({}, {
      onSuccess: (response) => {
        console.log("categories response is:", response);
        setData(response);
      },
      onError: (error) => {
        console.error("Error fetching categories:", error);
      },
    });
  }, [fetchCategories]);

  const columns = [
    {
      name: "",
      selector: row => <Checkbox onChange={() => setSelectedRow(row)} />,
      sortable: false,
      width: "70px"
    },
    {
      name: (
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={handleSort}
        >
          name
          {sortDirection === 'asc' ? (
            <ArrowUpwardIcon fontSize="small" style={{ marginLeft: 4 }} />
          ) : sortDirection === 'desc' ? (
            <ArrowDownwardIcon fontSize="small" style={{ marginLeft: 4 }} />
          ) : (
            <FilterListIcon fontSize="small" style={{ marginLeft: 4 }} />
          )}
        </div>
      ),
      selector: row => row.name,
      sortable:false
    },
    {
      name: "image",
      selector: row => <img src={row.image} alt={row.name} style={{ width: "100px", height: "100px" }} />
    },
    {
      name: "creationAt",
      selector: row => row.creationAt
    },
    {
      name: "action",
      selector: (row, index) => (
        <div>
          <DeleteIcon style={{ color: "red", fontSize: "20px" }} onClick={() => handleOpenDelete(row)} />
          <EditIcon style={{ color: "gray", fontSize: "20px" }} onClick={() => editInput(row, index)} />
          <ReplayIcon style={{ color: "black", fontSize: "20px" }} />
        </div>
      )
    }
  ];

  return (
    <>
      <NavbarPage />
      <div style={{ display: "flex", gap: "50px", justifyContent: "center" }}>
        <Stack spacing={2} direction="row" style={{ marginTop: "10px" }}>
          <Button onClick={handleOpenAdd} style={{ backgroundColor: "blue", color: "white" }}>Add Categories</Button>
          <Modal keepMounted open={openAdd} onClose={handleCloseAdd} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
            <Box sx={style}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{ marginLeft: "30px" }}>
                <CategoryIcon /> Add Categories
              </Typography>
              <Typography id="keep-mounted-modal-description" style={{ display: "block", alignItems: "center", marginLeft: "30px" }}>
                <TextField id="name" label="* name" variant="outlined" placeholder="please enter name" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newCategories.name} name="name" />
                {errors.name && <Typography color="error">{errors.name}</Typography>}
                <TextField id="image" label="* image src" variant="outlined" placeholder="please enter image src" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newCategories.image} name="image" />
                {errors.image && <Typography color="error">{errors.image}</Typography>}
                <TextField id="creationAt" label="* CreationAt" variant="outlined" placeholder="please enter CreationAt" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newCategories.creationAt} name="creationAt" />
                {errors.creationAt && <Typography color="error">{errors.creationAt}</Typography>}
                <Typography style={{ display: "flex", gap: "10px", marginTop: "20px", alignItems: "center", justifyContent: "center" }}>
                  <Button variant="contained" style={{ width: "170px" }} onClick={handleAddInput}>Record</Button>
                  <Button variant="outlined" style={{ width: "170px" }} onClick={handleCloseAdd}>Exit</Button>
                </Typography>
              </Typography>
            </Box>
          </Modal>
          <Modal open={openDelete} onClose={handleCloseDelete} aria-labelledby="delete-modal-title" aria-describedby="delete-modal-description" closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
            <Fade in={openDelete}>
              <Box sx={style}>
                <Typography id="delete-modal-title" variant="h6" component="h2">
                  <DeleteForeverIcon /> Delete Categories
                </Typography>
                <Typography id="delete-modal-description" sx={{ mt: 2 }}>Are you sure you want to delete {userToDelete?.name}?</Typography>
                <Stack direction="row" spacing={2} style={{ marginTop: "2px", alignItems: "center" }}>
                  <Button variant="contained" color="error" onClick={handleDelete}>Yes</Button>
                  <Button variant="outlined" onClick={handleCloseDelete}>No, I don't want to</Button>
                </Stack>
              </Box>
            </Fade>
          </Modal>
        </Stack>
      </div>
      {successAdd && <Alert severity="success">Category added successfully!</Alert>}
      {successDelete && <Alert severity="error">Category deleted successfully!</Alert>}
      {successEdit && <Alert severity="info">Category updated successfully!</Alert>}
      <DataTable
        columns={columns}
        data={data}
      />
    </>
  );
};

export default Categories;