import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Background from '../assets/Fundo.png';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Foto from '../assets/professoraavatar.png';
import Logo from '../assets/SGAE.png';
import CardCargoUsuarios from "../components/CardCargoUsuarios";
import CardEscolas from "../components/CardEscolas";
import CardDisciplinas from "../components/CardDisciplina";

export default function Perfil() {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [nomeCompletoError, setNomeCompletoError] = useState('');
  const [rg, setRg] = useState('');
  const [rgError, setRgError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [telefone, setTelefone] = useState('');
  const [telefoneError, setTelefoneError] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaError, setSenhaError] = useState('');
  const [formEnviado, setFormEnviado] = useState(false);
  const [escolas, setEscolas] = useState('');
  const [cargo, setCargo] = useState('');
  const [novaFoto, setNovaFoto] = useState(null);
  const [disciplina, setDisciplina] = useState('');

  const Fundo = `url(${Background})`;

  const handleNomeChange = (event) => {
    const { value } = event.target;
    setNomeCompleto(value);
    if (value.trim() === '') {
      setNomeCompletoError('Nome é um campo obrigatório');
    } else {
      setNomeCompletoError('');
    }
  };

  const handleRgChange = (event) => {
    const { value } = event.target;
    setRg(value);
    if (!/^[0-9]*$/.test(value)) {
      setRgError('RG deve conter apenas números');
    } else {
      setRgError('');
    }
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    if (!value.includes('@')) {
      setEmailError('E-mail inválido');
    } else {
      setEmailError('');
    }
  };

  const handleTelefoneChange = (event) => {
    const { value } = event.target;
    let formattedValue = value.replace(/\D/g, '');
    if (formattedValue.length > 10) {
      formattedValue = formattedValue.slice(0, 11);
    }
    let formattedPhoneNumber = '';
    if (formattedValue.length >= 1) {
      formattedPhoneNumber += `(${formattedValue.substring(0, 2)}`;
    }
    if (formattedValue.length > 2) {
      formattedPhoneNumber += `) ${formattedValue.substring(2, 6)}`;
    }
    if (formattedValue.length > 6) {
      formattedPhoneNumber += `-${formattedValue.substring(6, 10)}`;
    }
    setTelefone(formattedPhoneNumber);
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
    setFormEnviado(true);
    if (
      nomeCompleto.trim() === '' ||
      rg.trim() === '' ||
      email.trim() === '' ||
      telefone.trim() === '' ||
      senha.trim() === '' ||
      !email.includes('@') ||
      !/^[0-9]*$/.test(rg)
    ) {
      return;
    }
    handleCadastroAPISubmit();
  };

  const handleCadastroAPISubmit = () => {
    const url = "https://nestjs-sgcpe-api.vercel.app/login_senha/register";
    const opcoes = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({'RG': rg, nomeCompleto, email, senha, telefone, 'cargoEscolar': cargo, 'nomeEscola': escolas, 'disciplina': disciplina }),
      
    };

    fetch(url, opcoes)
      .then((resposta) => {
        if (resposta.ok) {
          console.log("Requisição bem-sucedida!");
          window.location = "/";
          return resposta.json();
        } else {
          console.error("Erro ao fazer a requisição:", resposta.status);
          return resposta.json()
        }
      })
      .then((data) => {
        console.log("Resposta da API:", data);
        alert(data.message);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };

  const handleNovaFotoSelecionada = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNovaFoto(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid container style={{ height: '100vh' }}>
      <Grid item xs={12} sm={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar sx={{ width: '50%', height: '50%' }} src={Logo} variant="square" />
      </Grid>
      <Grid item xs={12} sm={6} style={{ background: Fundo, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form style={{ height: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} onSubmit={handleSubmit}>
          <Stack direction="row" spacing={2}> 
            <Avatar
              alt="Professor 1"
              src={novaFoto || Foto}
              sx={{ width: 80, height: 80, '&:hover': { opacity: 0.8, cursor: 'pointer' } }}
              onClick={() => document.getElementById('selecionar-foto').click()}
            />
            <input
              id="selecionar-foto"
              type="file"
              accept="image/*"
              onChange={handleNovaFotoSelecionada}
              style={{ display: 'none' }}
            />
          </Stack>
          <TextField
            sx={{ marginBottom: '8px', width: '100%' }}
            label="Nome completo"
            variant="filled"
            fullWidth
            value={nomeCompleto}
            onChange={handleNomeChange}
            error={formEnviado && nomeCompleto.trim() === ''}
            helperText={(formEnviado && nomeCompleto.trim() === '') && 'Nome é um campo obrigatório'}
          />
          <TextField
            style={{ marginBottom: '8px', width: '100%' }}
            label="RG"
            variant="filled"
            fullWidth
            value={rg}
            onChange={handleRgChange}
            error={formEnviado && rg.trim() === ''}
            helperText={(formEnviado && rg.trim() === '') && 'RG é um campo obrigatório'}
          />
          <TextField
            sx={{ marginBottom: '8px', width: '100%' }}
            label="E-mail"
            variant="filled"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={formEnviado && (!email || !email.includes('@'))}
            helperText={(formEnviado && (!email || !email.includes('@'))) && 'E-mail inválido'}
          />
          <TextField
            sx={{ marginBottom: '8px', width: '100%' }}
            label="Telefone"
            variant="filled"
            fullWidth
            value={telefone}
            onChange={handleTelefoneChange}
            error={formEnviado && telefone.trim() === ''}
            helperText={(formEnviado && telefone.trim() === '') && 'Telefone é um campo obrigatório'}
          />
          <CardCargoUsuarios Cargo={cargo} setCargo={setCargo}/>
          <CardEscolas Escolas={escolas} setEscolas={setEscolas}/>
          <CardDisciplinas Disciplina={disciplina} setDisciplina={setDisciplina} />
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button style={{ marginTop: '16px', width: '45%', background: 'darkblue' }} variant="contained" href="/escolha-funcionalidade">Voltar</Button>
            <Button style={{ marginTop: '16px', width: '45%', background: 'darkblue' }} variant="contained" type="submit">Salvar</Button>
          </div>
        </form>
      </Grid>
    </Grid>
  );
}
