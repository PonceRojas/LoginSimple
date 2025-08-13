import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { keyframes } from '@emotion/react';

// Definir keyframes para la animación del borde
const borderAnimation = keyframes`
  0% {
    border-color: rgba(30, 60, 114, 0.5);
    box-shadow: 0 0 15px rgba(30, 60, 114, 0.5);
  }
  50% {
    border-color: rgba(42, 82, 152, 0.8);
    box-shadow: 0 0 30px rgba(42, 82, 152, 0.8);
  }
  100% {
    border-color: rgba(30, 60, 114, 0.5);
    box-shadow: 0 0 15px rgba(30, 60, 114, 0.5);
  }
`;

// Definir keyframes para una animación sutil del fondo (pulso de brillo)
const backgroundPulse = keyframes`
  0% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.05);
  }
  100% {
    filter: brightness(1);
  }
`;

// AJUSTE REALIZADO: keyframes para el movimiento y volteo del gatito, invirtiendo el 'scaleX'
// (Asumiendo que el GIF original sigue mirando a la IZQUIERDA por defecto)
const catMovement = keyframes`
  0% {
    transform: translateX(-100%) scaleX(-1); /* Inicia fuera por la izquierda, volteado para mirar a la DERECHA */
  }
  25% {
    transform: translateX(10%) scaleX(-1); /* Moviéndose a la derecha, mirando a la DERECHA */
  }
  49% {
    transform: translateX(calc(100vw - 100px - 10%)) scaleX(-1); /* Casi al borde derecho, mirando a la DERECHA */
  }
  50% {
    transform: translateX(calc(100vw - 100px - 10%)) scaleX(1); /* En el punto de giro, voltea para mirar a la IZQUIERDA */
  }
  75% {
    transform: translateX(10%) scaleX(1); /* Regresando a la izquierda, mirando a la IZQUIERDA */
  }
  100% {
    transform: translateX(-100%) scaleX(1); /* Sale por la izquierda, mirando a la IZQUIERDA (listo para el siguiente ciclo) */
  }
`;


const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url("https://elcomercio.pe/resizer/mMMnXspIbXl6uHtZiG1otTEbWds=/1500x836/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/NFZ7N7B7YVEINGAJOXK3TLNFH4.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        animation: `${backgroundPulse} 15s infinite ease-in-out`,

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(30, 60, 114, 0.6)',
          zIndex: 0,
        },
      }}
    >
      {/* Gatito animado que se mueve y voltea */}
      <Box
        component="img"
        src="/Cat.gif" // ¡Asegúrate que este GIF esté inicialmente mirando a la IZQUIERDA!
        alt="Gatito animado"
        sx={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          width: 100, // Ancho del gatito
          height: 'auto',
          zIndex: 2,
          display: { xs: 'none', sm: 'block' },
          animation: `${catMovement} 20s linear infinite`, // 20s de duración, movimiento lineal, infinito
          transformOrigin: 'center center', // Asegura que el volteo sea desde el centro
        }}
      />

      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 3,
          width: 320,
          textAlign: 'center',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid transparent',
          animation: `${borderAnimation} 4s infinite ease-in-out`,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Panel Administrativo
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Usuario"
            variant="outlined"
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            fullWidth
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, background: '#1e3c72', '&:hover': { background: '#2a5298' } }}
          >
            Iniciar sesión
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;