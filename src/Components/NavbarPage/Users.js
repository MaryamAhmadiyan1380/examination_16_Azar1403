import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import NavbarPage from '../../Layouts/NavbarPage';
import useGetUsers from '../../Hook/useGetUsers';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ReplayIcon from '@mui/icons-material/Replay';
import PeopleIcon from '@mui/icons-material/People';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Alert from '@mui/material/Alert';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList'
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
  width: "510px",
  alignItems: "center",
};

const Users = () => {
  const [data, setData] = useState([]);
  const { mutate: fetchUsers } = useGetUsers();
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [successAdd, setSuccessAdd] = useState(false)
  const [successDelete, setSuccessDelete] = useState(false)
  const [successEdit, setSuccessEdit] = useState(false)
  const [newUser, setNewUser] = useState({ email: "", name: "", role: "" });
  const [errors, setErrors] = useState({ email: "", name: "", role: "" });
  const [sortDirection, setSortDirection] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const handleOpenAdd = () => setOpenAdd(true);
  const handleCloseAdd = () => {
    setNewUser({ email: "", name: "", role: "" });
    setErrors({ email: "", name: "", role: "" });
    setOpenAdd(false);
  };

  const handleOpenDelete = (user) => {
    setUserToDelete(user);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => setOpenDelete(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const validate = () => {
    let valid = true;
    const errors = { email: "", name: "", role: "" };

    if (!newUser.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
      errors.email = "Email address is invalid";
      valid = false;
    }

    if (!newUser.name) {
      errors.name = "Name is required";
      valid = false;
    }

    if (!newUser.role) {
      errors.role = "Role is required";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleAddInput = () => {
    if (validate()) {
      if (editingIndex !== null) {
        const updatedData = [...data];
        updatedData[editingIndex] = { ...newUser, id: data[editingIndex].id };
        setData(updatedData);
        setEditingIndex(null);
        setSuccessEdit(true)
        setTimeout(() => setSuccessEdit(false), 3000)

      } else {
        setData([...data, { ...newUser, id: data.length + 1 }]);
        setSuccessAdd(true)
        setTimeout(() => setSuccessAdd(false), 3000)
      }
      setNewUser({ email: "", name: "", role: "" });
      handleCloseAdd();
    }
  };

  const handleDelete = () => {
    setData(data.filter(item => item !== selectedRow));
    setSuccessDelete(true)
    setTimeout(() => setSuccessDelete(false), 3000)
    handleCloseDelete();

  };

  const editInput = (row, index) => {
    setEditingIndex(index);
    setNewUser(row);
    setOpenAdd(true);
  };
  const handleSort = () => {
    if (sortDirection === 'asc') {
      setSortDirection('desc');
      setData([...data].sort((a, b) => b.email.localeCompare(a.title)));
    } else {
      setSortDirection('asc');
      setData([...data].sort((a, b) => a.email.localeCompare(b.title)));
    }
  };
  useEffect(() => {
    fetchUsers({}, {
      onSuccess: (response) => {
        setData(response);
      },
      onError: (error) => {
        console.error("Error fetching users:", error);
      },
    });
  }, [fetchUsers]);

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
          Title
          {sortDirection === 'asc' ? (
            <ArrowUpwardIcon fontSize="small" style={{ marginLeft: 4 }} />
          ) : sortDirection === 'desc' ? (
            <ArrowDownwardIcon fontSize="small" style={{ marginLeft: 4 }} />
          ) : (
                <FilterListIcon fontSize="small" style={{ marginLeft: 4 }} />
              )}
        </div>
      ),
      selector: row => row.email,
      sortable: false
    },
    {
      name: 'Name',
      selector: row => row.name
    },
    {
      name: 'Role',
      selector: row => row.role
    },
    {
      name: 'Action',
      selector: (row, index) => (
        <div>
          <DeleteIcon onClick={() => handleOpenDelete(row)} style={{ color: "red" }} />
          <EditIcon style={{ color: "gray", fontSize: "20px" }} onClick={() => editInput(row, index)} />
          <ReplayIcon style={{ color: "black", fontSize: "20px" }} />
        </div>
      ),
    },
  ];

  return (
    <>
      <NavbarPage />
      {/* <div>
        <PeopleIcon style={{ float: "left", fontSize: "50px" }} />
        <p style={{ float: "left", fontSize: "30px" }}>Bank Users</p>
      </div> */}
      {/* <hr /> */}
      <div style={{ display: "flex", gap: "50px", justifyContent: "center" }}>
        <Stack spacing={2} direction="row" style={{ marginTop: "10px" }}>
          <Button onClick={handleOpenAdd} style={{ backgroundColor: "blue", color: "white" }}>Add User</Button>
          <Modal keepMounted open={openAdd} onClose={handleCloseAdd} aria-labelledby="keep-mounted-modal-title" aria-describedby="keep-mounted-modal-description">
            <Box sx={style}>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2" style={{ marginLeft: "30px" }}>
                <PersonAddIcon /> Add User
              </Typography>
              <Typography id="keep-mounted-modal-description" style={{ display: "block", alignItems: "center", marginLeft: "30px", marginTop: "20px" }}>
                <TextField id="email" label="* Email" variant="outlined" placeholder="please enter email" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newUser.email} name="email" />
                {errors.email && <Typography color="error">{errors.email}</Typography>}
                <TextField id="name" label="* Name" variant="outlined" placeholder="please enter name" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newUser.name} name="name" />
                {errors.name && <Typography color="error">{errors.name}</Typography>}
                <TextField id="role" label="* Role" variant="outlined" placeholder="please enter role" style={{ marginTop: "25px" }} onChange={handleInputChange} value={newUser.role} name="role" />
                {errors.role && <Typography color="error">{errors.role}</Typography>}
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
                  <DeleteForeverIcon /> Delete User
                </Typography>
                <Typography id="delete-modal-description" sx={{ mt: 2 }}>
                  Are you sure you want to delete {userToDelete?.name}?
                   </Typography>
                <Stack direction="row" spacing={2} sx={{ mt: 2, justifyContent: "center" }}>
                  <Button variant="contained" color="error" onClick={handleDelete}>Yes</Button>
                  <Button variant="outlined" onClick={handleCloseDelete}>No i don't want to</Button>
                </Stack>
              </Box>
            </Fade>
          </Modal>
        </Stack>
      </div>
      {successAdd && <Alert severity="success">User added successfully!</Alert>}
      {successDelete && <Alert severity="error">User deleted successfully!</Alert>}
      {successEdit && <Alert severity="info">User updated successfully!</Alert>}
      <DataTable
        columns={columns}
        data={data}
      />
    </>
  );
};

export default Users;
