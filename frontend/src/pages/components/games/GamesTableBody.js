import { TableBody } from '@material-ui/core';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@material-ui/core/styles';
import ButtonIcon from '../global/ButtonIcon';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const selectAction = (props, game, action) => {

  props.setGame(game);
  if (action === 'update') {
    props.updateModal(true);
  } else {
    props.deleteModal(true);
  }
};
const GamesTableBody = (props) => {
  // const styles = useStyles();
  return (
    <TableBody>
      {props.data.map((game) => (
        <StyledTableRow key={game.id}>

          <StyledTableCell  align="center">
            <img
              width={'70px'}
              height={'100px'}
              alt={game.title}
              src={game.image}
            ></img>

          </StyledTableCell>
          <StyledTableCell  align="center">{game.code}</StyledTableCell>
          <StyledTableCell  align="center">{game.title}</StyledTableCell>
          <StyledTableCell  align="center">{`$ ${game.price}`}</StyledTableCell>

          <StyledTableCell  align="center">
            <ButtonIcon
              type={'edit'}
              handle={() => selectAction(props, game, 'update')}
            />
            <ButtonIcon
              type={'delete'}
              handle={() => selectAction(props, game, 'delete')}
            />
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  );
};

export default GamesTableBody;
