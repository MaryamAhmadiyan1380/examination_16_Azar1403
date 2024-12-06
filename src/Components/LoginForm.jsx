import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Checkbox, FormControl, FormControlLabel, InputAdornment, InputLabel, OutlinedInput, Stack, Button, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LoginPic from '../Assets/LoginPic.jpg';
import '../Components/Style/Login.css';
import useLogin from '../Hook/useLogin';
import useSignup from '../Hook/useSignup'

const schema = yup.object().shape({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup.string().min(4, "Password must be at least 4 characters").max(11).required("Password is required"),
  avatar : yup.string().required("Avatar is required"),
  name : yup.string().min(4, "Password must be at least 4 characters").max(20).required("Name is required"),
});

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loginQuery = useLogin();
  const signUpQuery = useSignup();
  const [action, setAction] = useState("Login");

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const onFormSubmit = async (data) => {
    console.log("Form data: ", data);

    if (action === "Login") {
      loginQuery.mutate({
        email: data.email,
        password: data.password,
      }, {
        onSuccess: (res) => {
          if (res?.access_token && res?.refresh_token) {
            console.log("Tokens received:", res.access_token, res.refresh_token);
            localStorage.setItem("access_token", res.access_token);
            localStorage.setItem("refresh_token", res.refresh_token);
            navigate('/');
          } else {
            console.error("Tokens not received");
          }
        },
        onError: (error) => {
          console.error("Login failed:", error);
          navigate("/login");
        }
      });
    } else if (action === "Sign Up") {
      signUpQuery.mutate({
        name: data.name,
        email: data.email,
        password: data.password,
        avatar: data.avatar,
      }, {
        onSuccess: (res) => {
          console.log("Sign up response is : ", res);
          if (res) {
            navigate("/");
          }
        },
        onError: (err) => {
          console.log("This request is false", err);
          navigate('/login');
        }
      });
    }
  };

  const handleNameInput = (e) => {
    const { value } = e.target;
    e.target.value = value.replace(/[^A-Za-z]/g, '');
  };

  return (
    <div className='testdiv'>
      <div className='left'>
        <form className="logform" onSubmit={handleSubmit(onFormSubmit)}>
          <h1 className='hf'>Welcome!</h1>
          <span className='hf'>Please, {action} to continue</span>
          <div className="underline"></div>
          <div className='form-container'>
            <div className='form-container' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: "20px" }}>
              {action === "Login" ? (
                <>
                  <FormControl sx={{ m: 1, width: '25ch', display: "block", margin: "auto", marginTop: "20px" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput id="outlined-adornment-email" type="text" {...register("email")} label="email" />
                  </FormControl>
                  {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput id="outlined-adornment-password" type={showPassword ? 'text' : 'password'} {...register("password")} endAdornment={<InputAdornment position="end"> <IconButton aria-label={showPassword ? 'Hide password' : 'Show password'} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} >
                      {showPassword ? <VisibilityOff /> : <Visibility />} </IconButton> </InputAdornment>}
                      label="Password" />
                  </FormControl>
                  {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                </>
              ) : (
                <>
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{ margin: "auto", marginTop: "20px" }}>
                    <InputLabel htmlFor="outlined-adornment-name">Name</InputLabel>
                    <OutlinedInput id="outlined-adornment-name" type="text" {...register("name")} onInput={handleNameInput} label="name" />
                  </FormControl>
                  {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
                  <FormControl sx={{ m: 1, width: '25ch', display: "block", margin: "auto", marginTop: "20px" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                    <OutlinedInput id="outlined-adornment-email" type="text" {...register("email")} label="email" />
                  </FormControl>
                  {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput id="outlined-adornment-password"
                      type={showPassword ? 'text' : 'password'}
                      {...register("password")}
                      endAdornment={<InputAdornment position="end">
                        <IconButton aria-label={showPassword ? 'Hide password' : 'Show password'}
                          onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton> </InputAdornment>}
                      label="Password" />
                  </FormControl>
                  {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
                  <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" style={{ margin: "auto", marginTop: "15px" }}>
                    <InputLabel htmlFor="outlined-adornment-avatar">Avatar</InputLabel>
                    <OutlinedInput id="outlined-adornment-avatar" type="text" {...register("avatar")} label="avatar" />
                  </FormControl>
                  {errors.avatar && <p style={{ color: "red" }}>{errors.avatar.message}</p>}
                  <Stack style={{ display: "flex", justifyContent: "center", marginTop: "28px", fontWeight: "25px" }} spacing={2} direction="row">
                    <FormControlLabel control={<Checkbox color='primary' />} label="Remember me" />
                    <p style={{ marginTop: "10px", cursor: "pointer" }}>Forgot Password?</p>
                  </Stack>
                </>
              )}
            </div>
          </div>

          <Stack style={{ alignItems: "center", display: "flex", justifyContent: "center" }} spacing={2} direction="row">
            <Button type="submit" className="submit" variant="contained">Login</Button>
            <Button type="submit" className="submit" onClick={() => { setAction("Sign Up") }} variant="contained">Sign Up</Button>
          </Stack>
        </form>
      </div>
      <div className='right'>
        <img className='piclog' src={LoginPic} alt="Login pic not found" />
      </div>
    </div>
  );
};

export default LoginForm;
