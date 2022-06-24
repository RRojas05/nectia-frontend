import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { Button, Table, TableContainer } from '@material-ui/core';
import AddIcon from '@mui/icons-material/Add';
import GamesActionModal from '../pages/components/games/GamesActionModal';
import GamesDeleteDialog from '../pages/components/games/GamesDeleteDialog';
import GamesModal from '../pages/components/games/GamesModal';
import GamesTableBody from '../pages/components/games/GamesTableBody';
import GamesTableHead from '../pages/components/games/GamesTableHead';
import Dialog from '../pages/components/global/Dialog';
import AuthService from '../services/auth.service';
import GamesServices from '../services/games.services';

import Login from './Login';

function App() {
  const [data, setData] = useState([]);
  const [createModalState, setCreateModalState] = useState(false);
  const [updateModalState, setUpdateModalState] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState(false);
  const [dialogModalState, setDialogModalState] = useState(false);
  const [commentsState, setCommentState] = useState('');
  const [gameSelected, setGameSelected] = useState({
    code: 0,
    title: '',
    price: '',
    image: '',
  });

  const handleCreateModal = () => {
    setCreateModalState(!createModalState);
  };
  const handleUpdateModal = () => {
    setUpdateModalState(!updateModalState);
  };
  const handleDeleteModal = () => {
    setDeleteModalState(!deleteModalState);
  };

  const handleDialogModal = () => {
    if (dialogModalState) {
      // setLoading(false);
    }
    setDialogModalState(!dialogModalState);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setGameSelected((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function sortGamesByCode(games) {
    return games.sort(sortByCode);
  }

  function sortByCode(x, y) {
    if (x.code < y.code) {
      return -1;
    }
    if (x.code > y.code) {
      return 1;
    }
    return 0;
  }

  const gamesGetList = async () => {
    const games = await GamesServices.getGames();
    const sortGames = sortGamesByCode(games);
    setData(sortGames);
  };

  const gameDelete = async (handleLoading) => {
    const game = await GamesServices.deleteGame(gameSelected.code);

    setData(data.filter((data) => data.code !== game.code));
    handleLoading();
    handleDeleteModal();
  };

  const gameInsert = async (handleLoading) => {
    const validation = validateGame();

    if (validation.length > 0) {
      setCommentState(validation);
      handleDialogModal();
    } else {
      handleLoading();
      const game = await GamesServices.insertGame(gameSelected);

      if (game != false) {
        if (game.id) {
          handleCreateModal();
          setData(data.concat(game));
        }
      } else {
        setCommentState('El codigo ingresado ya existe.');
        handleCreateModal();
        handleDialogModal();
      }
      handleLoading();
    }
  };

  const validateGame = () => {
    let msg = '';
    if (gameSelected.code < 1000) {
      msg = 'El codigo debe ser de 4 digitos';
    }

    if (gameSelected.title.length < 4) {
      msg = 'El titulo debe contener al menos 4 caracteres';
    }
    if (!Number.isInteger(parseInt(gameSelected.price))) {
      msg = 'El precio debe ser un numero';
    }

    if (gameSelected.image.length < 3) {
      msg = 'La imagen debe ser una cadena de texto';
    }

    return msg;
  };

  const gameUpdate = async (handleLoading) => {
    const validation = validateGame();

    if (validation.length > 0) {
      setCommentState(validation);
      handleDialogModal();
    } else {
      handleLoading();
      const game = await GamesServices.updateGame(gameSelected);

      updateData(game);
      handleUpdateModal();
    }
  };

  const updateData = (game) => {
    let newGames = data.map((item) => {
      if (item.code === game.code) {
        return { ...item, ...game };
      }
      return item;
    });
    setData(newGames);
  };

  const dialogModal = (
    <Dialog
      title={'Atencion'}
      comments={commentsState}
      handleModal={handleDialogModal}
    />
  );

  const createModal = (
    <GamesActionModal
      title={'Juego Nuevo'}
      type={'create'}
      gameUpdate={gameInsert}
      handleChange={handleChange}
      handleModal={handleCreateModal}
    />
  );

  const updateModal = (
    <GamesActionModal
      title={'Actualizar Juego'}
      type={'update'}
      currentGame={gameSelected}
      gameUpdate={gameUpdate}
      handleChange={handleChange}
      handleModal={handleUpdateModal}
    />
  );

  const deleteModal = (
    <GamesDeleteDialog
      currentGame={gameSelected}
      gameDelete={gameDelete}
      handleModal={handleDeleteModal}
    />
  );

  useEffect(() => {
    const fetchData = async () => {
      await fetch(gamesGetList());
    };

    fetchData().catch(console.error);
  }, []);

  if (
    AuthService.getCurrentUser() === undefined ||
    AuthService.getCurrentUser() === null
  ) {
    return <Login />;
  }

  return (
    <div>
      <Stack justifyContent="center" direction="row" spacing={2} sx={{ m: 3 }}>
        <Button
          size={'small'}
          variant="outlined"
          endIcon={<AddIcon />}
          onClick={handleCreateModal}
        >
          Agregar
        </Button>
      </Stack>

      <TableContainer>
        <Table>
          <GamesTableHead />
          <GamesTableBody
            data={data}
            updateModal={handleUpdateModal}
            deleteModal={handleDeleteModal}
            setGame={setGameSelected}
          />
        </Table>
      </TableContainer>
      <GamesModal
        open={createModalState}
        onClose={handleCreateModal}
        handle={createModal}
      />
      <GamesModal
        open={updateModalState}
        onClose={handleUpdateModal}
        handle={updateModal}
      />
      <GamesModal
        open={deleteModalState}
        onClose={handleDeleteModal}
        handle={deleteModal}
      />
      <GamesModal
        open={dialogModalState}
        onClose={handleDialogModal}
        handle={dialogModal}
      />
    </div>
  );
}

export default App;
