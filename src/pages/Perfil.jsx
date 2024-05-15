import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Background from "../assets/Fundo.png";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Foto from "../assets/professoraavatar.png";
import Logo from "../assets/SGAE.png";
import CardCargoUsuarios from "../components/CardCargoUsuarios";
import CardEscolas from "../components/CardEscolas";
import { useUserContext } from "../context/UserContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuApp from '../components/MenuApp';

export default function Perfil() {
  const { userInfo } = useUserContext();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [rg, setRg] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cargo, setCargo] = useState("");
  const [escolas, setEscolas] = useState("");
  const [formEnviado, setFormEnviado] = useState(false);
  const [novaFoto, setNovaFoto] = useState(null);

  useEffect(() => {
    if (userInfo) {
      setNomeCompleto(
        userInfo.nomeCompleto || sessionStorage.getItem("nomeCompleto") || ""
      );
      setRg(userInfo.RG || sessionStorage.getItem("rg") || "");
      setEmail(userInfo.email || sessionStorage.getItem("email") || "");
      setCargo(userInfo.cargoEscolar || sessionStorage.getItem("cargo") || "");
      setEscolas(userInfo.nomeEscola || sessionStorage.getItem("escolas") || "");
      setTelefone(userInfo.telefone || sessionStorage.getItem("telefone") || "");
    }

    const savedPhoto = localStorage.getItem("profilePhoto");
    if (savedPhoto) {
      setNovaFoto(savedPhoto);
    }
  }, [userInfo]);

  const Fundo = `url(${Background})`;

  if (!sessionStorage.getItem("userData")) {
    return (window.location = "/");
  }

  const handleNomeChange = (event) => {
    const { value } = event.target;
    setNomeCompleto(value);
  };

  const handleRgChange = (event) => {
    const { value } = event.target;
    setRg(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleTelefoneChange = (event) => {
    const { value } = event.target;
    let formattedValue = value.replace(/\D/g, "");

    if (formattedValue.length > 11) {
      formattedValue = formattedValue.slice(0, 11);
    }

    let formattedPhoneNumber = "";

    if (formattedValue.length >= 1) {
      formattedPhoneNumber += `(${formattedValue.substring(0, 2)}`;
    }

    if (formattedValue.length > 2) {
      formattedPhoneNumber += `) ${formattedValue.substring(2, 7)}`;
    }

    if (formattedValue.length > 7) {
      formattedPhoneNumber += ` ${formattedValue.substring(7, 11)}`;
    }

    setTelefone(formattedPhoneNumber);
  };

  const handleNovaFotoSelecionada = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      setNovaFoto(base64String);
      localStorage.setItem("profilePhoto", base64String);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    localStorage.removeItem("profilePhoto");
    setNovaFoto(null);
  };

  return (
    <>
      <MenuApp />
      <Grid container style={{ height: "90.5vh" }}>
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            sx={{ width: "50%", height: "50%" }}
            src={Logo}
            variant="square"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            background: Fundo,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            style={{
              height: "100%",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
           <Stack direction="row" spacing={2} alignItems="center" justifyContent="center"  margin= "10px">
              <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Avatar
                  alt="Professor 1"
                  src={novaFoto || Foto}
                  sx={{
                    width: 80,
                    height: 80,
                    "&:hover": { opacity: 0.8, cursor: "pointer" },
                  }}
                  onClick={() =>
                    document.getElementById("selecionar-foto").click()
                  }
                />
                <input
                  id="selecionar-foto"
                  type="file"
                  accept="image/*"
                  onChange={handleNovaFotoSelecionada}
                  style={{ display: "none" }}
                />
                {novaFoto && (
                  <IconButton
                    aria-label="delete"
                    color="#16417b"
                    onClick={handleRemovePhoto}
                    sx={{ position: 'absolute', bottom: 0, right: -30 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Box>
            </Stack>
            <TextField
              sx={{ marginBottom: "8px", width: "100%" }}
              label="Nome completo"
              variant="filled"
              fullWidth
              value={nomeCompleto}
              onChange={handleNomeChange}
              error={formEnviado && nomeCompleto.trim() === ""}
              helperText={
                formEnviado &&
                nomeCompleto.trim() === "" &&
                "Nome é um campo obrigatório"
              }
            />
            <TextField
              style={{ marginBottom: "8px", width: "100%" }}
              label="RG"
              variant="filled"
              fullWidth
              value={rg}
              onChange={handleRgChange}
              error={formEnviado && rg.trim() === ""}
              helperText={
                formEnviado && rg.trim() === "" && "RG é um campo obrigatório"
              }
            />
            <TextField
              sx={{ marginBottom: "8px", width: "100%" }}
              label="E-mail"
              variant="filled"
              fullWidth
              value={email}
              onChange={handleEmailChange}
              error={formEnviado && (!email || !email.includes("@"))}
              helperText={
                formEnviado &&
                (!email || !email.includes("@")) &&
                "E-mail inválido"
              }
            />
            <TextField
              sx={{ marginBottom: "8px", width: "100%" }}
              label="Telefone"
              variant="filled"
              fullWidth
              value={telefone}
              onChange={handleTelefoneChange}
              error={formEnviado && telefone.trim() === ""}
              helperText={
                formEnviado &&
                telefone.trim() === "" &&
                "Telefone é um campo obrigatório"
              }
            />
            <CardCargoUsuarios cargo={cargo} setCargo={setCargo} />
            <CardEscolas escolas={escolas} setEscolas={setEscolas} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button
                style={{
                  marginTop: "16px",
                  width: "50%",
                  background: "darkblue",
                }}
                variant="contained"
                href="/escolha-funcionalidade"
              >
                Voltar
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
