import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Grid, TextField, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import AuthService from '../services/auth.service';
import GamesModal from '../pages/components/games/GamesModal';
import Dialog from '../pages/components/global/Dialog';
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [dialogModalState, setDialogModalState] = useState(false);
  const [commentsState, setCommentState] = useState('');

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const loginRequest = async () => {
    handleLoading();
    if (validEmail && validPassword) {
      user.email = user.email.toLowerCase().trim();

      AuthService.login(user).then(
        (data) => {
          navigate('/');
          window.location.reload(false);
        },
        (error) => {
          setCommentState('El usuario no existe');
          handleDialogModal();
        }
      );
    } else {
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
    emailValidation();
    passwordValidation();
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

  const handleLoading = () => {
    setLoading(!loading);
  };

  const handleDialogModal = () => {
    if (dialogModalState) {
      setLoading(false);
    }
    setDialogModalState(!dialogModalState);
  };

  const registerPAge = () => {
    navigate('/register');
    window.location.reload(false);
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
          <h2>Login de usuario</h2>
          <Stack direction="column" spacing={2} sx={{ m: 5 }}>
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
              onClick={loginRequest}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
            >
              Ingresar
            </LoadingButton>
            <Button size="medium" variant="outlined" onClick={registerPAge}>
              Registrarse
            </Button>
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
