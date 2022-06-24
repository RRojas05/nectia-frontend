import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

  const GamesDeleteDialog = (props) => {
    const [loading, setLoading] = useState(false);

    const handleLoading = () => {
      setLoading(!loading);
    };

    const deleteGame=()=>{
      handleLoading()
      props.gameDelete(handleLoading)
    }
    return (
        <div>
      <Button variant="outlined" onClick={props.handleModal}>
        Open alert dialog
      </Button>
      <Dialog
        open={props.handleModal}
        onClose={props.handleModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.currentGame.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Desea eliminar el juego actual?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleModal}>Volver</Button>
          <LoadingButton
          //  onClick={props.gameDelete} autoFocus
           onClick={deleteGame}
              endIcon={<SendIcon />}
              loading={loading}
              loadingPosition="end"
              variant="contained"
           >
            Confirmar
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
    );
  };
  
  export default GamesDeleteDialog;
  