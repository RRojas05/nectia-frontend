import { IconButton } from '@mui/material';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircle from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const renderIcon = (type) => {
  switch (type) {
    case 'cancel':
      return <CancelIcon />;
    case 'check':
      return <CheckCircle />;
    case 'delete':
      return <DeleteIcon />;
    case 'edit':
      return <EditIcon />;
    default:
      return null;
  }
};

const ButtonIcon = (props) => {
  return (
    <IconButton onClick={props.handle}>
      {renderIcon(props.type)}
    </IconButton>
  );
};

export default ButtonIcon;
