import { Button, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'

const ViewHome = () => {
  const [message, setMessage] = useState('')
  const [numbers, setNumbers] = useState('')
  const [amount, setAmount] = useState(0)
  const [winAverage, setWinAverage] = useState(0)
  const [name, setName] = useState('')
  const [user, setUser] = useState(null)


  // Función para crear un nuevo usuario en la base de datos.
  const handleCreateUser = async () => {
    try {
      const body = {
        name
      }

      const response = await axios.post('http://localhost:3001/users/create', body)
    }
    catch (err) {
      console.error(err);
    }
  }

  // Función para realizar una jugada en una máquina tragamonedas.
  const pullLever = async () => {
    try {
      const body = {
        name
      }

      const response = await axios.post('http://localhost:3001/users/tirarPalanca', body)
      setMessage(response.data.message)
      setNumbers(response.data.numbers)
      setAmount(response.data.amount)
      const winAverage = await axios.get(`http://localhost:3001/users/winAverage/${name}`)
      setWinAverage(winAverage.data.winAverage)
    }
    catch (err) {
      console.error(err);
    }
  }

  // Función para obtener la información de un usuario.
  const getInfo = async () => {
    try {

      const response = await axios.get(`http://localhost:3001/users/info/${name}`)
      setMessage('')
      setNumbers('')
      setUser(response.data.user)
      setAmount(response.data.user.amount)
      const winAverage = await axios.get(`http://localhost:3001/users/winAverage/${name}`)
      setWinAverage(winAverage.data.winAverage)
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ margin: 10 }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: '20%', marginTop: 50 }}>
        <TextField id="outlined-basic" label="ingrese su nombre" variant="outlined" onChange={(e) => setName(e.target.value)} />
        {/* El primer boton es para crear un usuario en la base de datos, se debe ejecutar esto primero para poder acceder a las demas funcionalidades */}
        <Button type='submit' variant="contained" sx={{ marginTop: 2 }} onClick={() => handleCreateUser()} >Crear usuario</Button>
        <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => getInfo()}>Ver información</Button>
        {user &&
          <>
            <Typography variant='h5'>Información del usuario</Typography>
            <Typography variant='h5'>Id: {user.id}</Typography>
            <Typography variant='h5'>Jugador: {user.name}</Typography>
            <Typography variant='h5'>Número de jugadas: {user.numberOfPlays}</Typography>
            <Typography variant='h5'>Número de victorias: {user.numberOfWins}</Typography>
          </>
        }
        <Button variant="contained" sx={{ marginTop: 2 }} onClick={() => pullLever()} >Tirar palanca</Button>
      </div>

      <Grid container spacing={2} style={{ marginTop: 10 }}>
        <Grid item xs={12}>
          <Typography variant='h5'>{message}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5'>{numbers}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5'>Monto acumulado: {amount}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h5'>Promedio de victorias: {winAverage}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default ViewHome