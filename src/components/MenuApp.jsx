import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import Logo from '../assets/SGAE.png';
import Swal from 'sweetalert2';

const pages = [
  { campo: 'Atribuição de Aulas', url: '/atribuicao-aulas' },
  { campo: 'Cadastro Atribuição de Aulas', url: '/cadastro-aulas' },
  { campo: 'Professores', url: '/professores' },
  { campo: 'Cadastro de Professores', url: '/cadastro-professores' }
];

const settings = ['Perfil', 'Sair'];

function MenuApp() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate(); 

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Tem certeza que deseja sair?",
      text: "Você será desconectado do sistema.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, sair",
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirecionar para a página de login
        navigate('/');
      }
    });
  };

  const handleCloseUserMenu = (option) => {
    setAnchorElUser(null);
    if (option === 'Perfil') {
      navigate('/perfil-usuario');
    } else if (option === 'Sair') {
      // Chamar a função de logout
      handleLogout();
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Botão de "Home" */}
          <IconButton href='/escolha-funcionalidade'>
            <HomeIcon sx={{ mr: 1 }} />
          </IconButton>

          {/* Título do Aplicativo */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/escolha-funcionalidade"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SGAE
          </Typography>

          {/* Ícone de Menu (para telas pequenas) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {/* Menu de Navegação para telas pequenas */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.campo} onClick={handleCloseNavMenu}>
                  <Link to={page.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography textAlign="center">{page.campo}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Título do Aplicativo (para telas pequenas) */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SGAE
          </Typography>

          {/* Botões de Navegação (para telas grandes) */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.campo}
                component={Link}
                to={page.url}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
              >
                {page.campo}
              </Button>
            ))}
          </Box>

          {/* Avatar do Usuário e Menu de Configurações */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Logo da empresa" src={Logo} />
              </IconButton>
            </Tooltip>
            {/* Menu de Configurações do Usuário */}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MenuApp;
