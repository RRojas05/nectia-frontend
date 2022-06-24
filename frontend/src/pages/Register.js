import React, { useState } from 'react';
import axios from 'axios';
import {Container, Grid, TextField, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import GamesModal from '../pages/components/games/GamesModal';
import Dialog from '../pages/components/global/Dialog';
import '../styles/Resgister.css';

export default function Login({ setToken }) {
  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validName, setValidName] = useState(false);
  const [dialogModalState, setDialogModalState] = useState(false);
  const [commentsState, setCommentState] = useState('');

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const usersUrl = 'http://localhost:5000/users';
  const navigate = useNavigate();

  const registerRequest = async () => {
    if (validEmail && validPassword) {
      handleLoading()
      user.email = user.email.toLowerCase().trim();
      await axios.post(usersUrl, user).then((response) => {
        
        if ((response.status = '201')) {
          loginPage();
        }
      });
    } else {
      if (!validName) {
        setCommentState('Nombre invalido, minimo 4 caracteres');
        handleDialogModal();
        return;
      }

      if (!validEmail) {
        setCommentState('Email invalido');
        handleDialogModal();
        return;
      }

      if (!validPassword) {
        setCommentState('Contraseña invalida, minimo 6 caracteres');
        handleDialogModal();
        return;
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    namesValidation();
    emailValidation();
    passwordValidation();
  };

  const namesValidation = () => {
    if (user.name.length >= 2) {
      setValidName(true);
    } else {
      setValidName(false);
    }
  };

  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (regex.test(user.email) === false) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  const passwordValidation = () => {
    if (user.password.length >= 5) {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const loginPage = () => {
    navigate('/login');
  };

  const handleLoading = () => {
    setLoading(!loading);
  };

  const handleDialogModal = () => {
    if (dialogModalState) {
      setLoading(false);
    }
    setDialogModalState(!dialogModalState);
  };

  const dialogModal = (
    <Dialog
      title={'Atencion'}
      comments={commentsState}
      handleModal={handleDialogModal}
    />
  );

  return (
    <div className="login-wrapper">
      <Container maxWidth="sm" sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: '100vh' }}
        >
          <h2>Registro de usuario</h2>
          <Stack direction="column" spacing={2} sx={{ m: 5 }}>
            <TextField
              name={'name'}
              label="nombre"
              required
              variant="outlined"
              onChange={handleChange}
              error={!validName}
            />
            <TextField
              name={'email'}
              label="email"
              required
              variant="outlined"
              onChange={handleChange}
              error={!validEmail}
            />
            <TextField
              name={'password'}
              label="password"
              type="password"
              required
              variant="outlined"
              onChange={handleChange}
              error={!validPassword}
            />
          </Stack>

          <Stack direction="column" spacing={2} sx={{ m: 3 }}>
            <LoadingButton
              onClick={registerRequest}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              Registrarse
            </LoadingButton>
          </Stack>
        </Grid>
      </Container>
      <GamesModal
        open={dialogModalState}
        onClose={handleDialogModal}
        handle={dialogModal}
      />
    </div>
  );
}
