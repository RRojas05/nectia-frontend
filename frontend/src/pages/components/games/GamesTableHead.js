import { styled } from '@mui/material/styles';
import { TableHead, TableRow } from '@material-ui/core';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const GamesTableHead = (props) => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell  align="center">Imagen</StyledTableCell>
        <StyledTableCell align="center">Codigo</StyledTableCell>
        <StyledTableCell align="center">Titulo</StyledTableCell>
        <StyledTableCell  align="center">Precio</StyledTableCell>
        <StyledTableCell align="center">Acciones</StyledTableCell>
      </TableRow>
    </TableHead>
  );
};

export default GamesTableHead;
