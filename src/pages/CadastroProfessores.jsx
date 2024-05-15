import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Avatar, Grid } from '@mui/material';
import Logo from '../assets/SGAE.png';
import CardCargoProfessores from "../components/CardCargoProfessores";
import CardCategoriaProfessores from "../components/CardCategoriaProfessores";
import Background from '../assets/Fundo.png';
import MenuApp from '../components/MenuApp';

const Fundo = `url(${Background})`;

const CadastroProfessores = () => {
  const [codigoDisciplina, setcodigoDisciplina] = useState('');
  const [codigoDisciplinaError, setcodigoDisciplinaError] = useState('');
  const [rg, setRg] = useState('');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [di, setDi] = useState('');
  const [categoria, setCategoria] = useState('');

  const handlecodigoDisciplinaChange = (event) => {
    const { value } = event.target;
    setcodigoDisciplina(value);
  
  };

  const handleCadastroProfessorSubmit = () => {
    
    const url = "https://nestjs-sgcpe-api.vercel.app/cadastro_professores";
    const opcoes = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'RG': rg, nomeCompleto, codigoDisciplina, 'DI': di, categoria }),
      
    };

    fetch(url, opcoes)
      .then((resposta) => {
        if (resposta.ok) {
          window.location = "/professores";
          return resposta.json();
        } else {

          return resposta.json()
        }

      })
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };

  if(!sessionStorage.getItem('userData')){
    return window.location = "/";
  }


  return (
    <>
    <MenuApp/>
    <Grid container style={{ height: "90.5vh" }}>
      <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar sx={{ width: '50%', height: '50%', display: { xs: 'none', sm: 'block' } }} src={Logo} variant="square" />
      </Grid>
      <Grid item xs={12} sm={6} style={{ background: Fundo, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={(e) => {
          e.preventDefault();
          
        }} style={{ textAlign: 'center', width: '80%' }}>
          <TextField
            sx={{ marginBottom: '8px', width: '100%'}}
            label="Nome Completo"
            variant="filled"
            value={nomeCompleto}
            onChange={(event) => {
              setNomeCompleto(event.target.value);
            }}
            fullWidth
          />
          <TextField
            sx={{ marginBottom: '8px', width: '100%'}}
            label="RG"
            variant="filled"
            value={rg}
            onChange={(event) => {
              setRg(event.target.value);
            }}
            fullWidth
          />
          <TextField
            sx={{ marginBottom: '8px', width: '100%'}}
            label="Código da disciplina"
            variant="filled"
            fullWidth
            value={codigoDisciplina}
            onChange={handlecodigoDisciplinaChange}
            error={Boolean(codigoDisciplinaError)}
            helperText={codigoDisciplinaError}
          />
          <CardCategoriaProfessores Categoria={categoria} setCategoria={setCategoria}/>
          <CardCargoProfessores DI={di} setDi={setDi}/>
          
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Button
              style={{ marginTop: '16px', width: '30%', background: 'darkblue' }}
              variant="contained"
              onClick={handleCadastroProfessorSubmit}
            >
              Salvar
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
    </>
  );
};

export default CadastroProfessores;
