import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@material-ui/core';
  
    const AlertDialog = (props) => {
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
          <DialogTitle>{props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
             {props.comments}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleModal} autoFocus>
            Volver
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      );
    };
    
    export default AlertDialog;
    