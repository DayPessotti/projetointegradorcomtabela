import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

import Logo from '../assets/SGAE.png'; // Adicionando a importação do logotipo

const defaultTheme = createTheme();

export default function Home() {
  const [rg, setRg] = React.useState('');
  const [rgError, setRgError] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [senhaError, setSenhaError] = React.useState('');

  const { login } = useUserContext();
  const navigate = useNavigate();

  const handleRgChange = (event) => {
    const { value } = event.target;
    setRg(value);
    if (value.trim() === '') {
      setRgError('RG é um campo obrigatório');
    } else {
      setRgError('');
    }
  };

  const handleSenhaChange = (event) => {
    const { value } = event.target;
    setSenha(value);
    if (value.trim() === '') {
      setSenhaError('Senha é um campo obrigatório');
    } else {
      setSenhaError('');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (rg.trim() === '') {
      setRgError('RG é um campo obrigatório');
    }
    if (senha.trim() === '') {
      setSenhaError('Senha é um campo obrigatório');
    }

    if (rg.trim() !== '' && senha.trim() !== '') {
      handleAPISubmit();
    }
  };

  const handleAPISubmit =  async () => {
    const url = "https://nestjs-sgcpe-api.vercel.app/login_senha/login";
    const opcoes = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'RG': rg, senha }),
      
    };

    fetch(url, opcoes)
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
         
          return resposta.json()
        }
      })
      .then((data) => {
        if(data.dados){
          login(data.dados);
          navigate("/escolha-funcionalidade")
        }
        alert(data.message);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: { xs: 'none', sm: 'flex' }, // Ocultar em telas XS (mobile)
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
        >
          <img src={Logo} alt="SGAE" style={{ maxWidth: '80%', height: 'auto' }} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            padding: '20px',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="RG"
              label="RG"
              name="RG"
              autoFocus
              value={rg}
              onChange={handleRgChange}
              error={Boolean(rgError)}
              helperText={rgError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Senha"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              value={senha}
              onChange={handleSenhaChange}
              error={Boolean(senhaError)}
              helperText={senhaError}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Lembrar"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link component={RouterLink} to="/esqueceu-senha" variant="body2">
                  Esqueceu a senha?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/cadastro-usuarios" variant="body2">
                  Não tem uma conta? Registre-se.
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
