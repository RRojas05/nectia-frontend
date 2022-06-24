import { Modal } from '@material-ui/core';

const GamesModal = (props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {props.handle}
    </Modal>
  );
};

export default GamesModal;
