import { useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Stack } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
// import ButtonIcon from '../global/ButtonIcon';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #000',
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  inputMaterial: {
    width: '100%',
  },
}));

const GamesActionModal = (props) => {
  const styles = useStyles();
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(!loading);
  };

  const actionButton = () => {
    props.gameUpdate(handleLoading);
  };
  return (
    <div className={styles.modal}>
      <h3>{props.title}</h3>
      <TextField
        name="code"
        label="Codigo"
        className={styles.inputMaterial}
        value={props.currentGame && props.currentGame.code}
        onChange={props.handleChange}
        disabled={(props.type=='create'? false:true)}
      />
      <TextField
        name="title"
        label="Titulo"
        className={styles.inputMaterial}
        value={props.currentGame && props.currentGame.title}
        onChange={props.handleChange}
      />
      <TextField
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        name="price"
        label="Precio"
        value={props.currentGame && props.currentGame.price}
        className={styles.inputMaterial}
        onChange={props.handleChange}
      />
      <TextField
        name="image"
        label="Imagen"
        value={props.currentGame && props.currentGame.image}
        className={styles.inputMaterial}
        onChange={props.handleChange}
      />
      <br></br>
      <br></br>
      <br></br>
      <Stack direction="column" spacing={2} sx={{ m: 3 }}>
        {/* <ButtonIcon type={'check'} handle={props.gameUpdate} />
        <ButtonIcon type={'cancel'} handle={props.handleModal} /> */}

        <LoadingButton
          onClick={actionButton}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
        >
          Confirmar
        </LoadingButton>
        <Button size="medium" variant="outlined" onClick={props.handleModal}>
          Volver
        </Button>
      </Stack>
    </div>
  );
};

export default GamesActionModal;
