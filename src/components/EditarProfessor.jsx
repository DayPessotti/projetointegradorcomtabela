import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Background from "../assets/Fundo.png";
import Select from "@mui/material/Select";
import { Avatar } from "@mui/material";
import Logo from "../assets/SGAE.png";
import FormControl from "@mui/material/FormControl";

const Fundo = `url(${Background})`;
const url = "https://nestjs-sgcpe-api.vercel.app/cadastro_professores/";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditarProfessor({ dados, setDados, open, setOpen }) {
  const [formEnviado, setFormEnviado] = React.useState(false);

  console.log(dados);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDados({
      ...dados,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormEnviado(true);

    console.table(dados);
    if (
      dados.nomeCompleto.trim() === ""
      //  ||  rg.trim() === '' ||
      //   email.trim() === '' ||
      //   senha.trim() === '' ||
      //   !email.includes('@') ||
      //   !/^[0-9]*$/.test(rg)
    ) {
      return;
    }
    handleUpDateSubmit();
  };

  const handleUpDateSubmit = () => {
    const opcoes = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...dados }),
    };

    fetch(url + dados.ID_cp, opcoes)
      .then((resposta) => {
        if (resposta.ok) {
          return resposta.json();
        } else {
          return resposta.json();
        }
      })
      .then((data) => {
        alert(data.message);
        setOpen(false);
        window.location = "/professores";
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };

  return (
    <>
      <React.Fragment>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Editar Professor
              </Typography>
            </Toolbar>
          </AppBar>

          <Grid container style={{ height: "100vh" }}>
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
                className="logo"
                sx={{ width: "50%", height: "50%" }}
                src={Logo}
                variant="square"
              />
            </Grid>
            <Grid
              className="editar-prof"
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
                onSubmit={handleSubmit}
              >
                <TextField
                  sx={{ marginBottom: "8px", width: "100%" }}
                  label="Nome completo"
                  name="nomeCompleto"
                  variant="filled"
                  fullWidth
                  value={dados.nomeCompleto}
                  onChange={handleChange}
                  error={formEnviado && dados.nomeCompleto.trim() === ""}
                  helperText={
                    formEnviado &&
                    dados.nomeCompleto.trim() === "" &&
                    "Nome é um campo obrigatório"
                  }
                />
                <TextField
                  style={{ marginBottom: "8px", width: "100%" }}
                  label="RG"
                  variant="filled"
                  name="RG"
                  fullWidth
                  value={dados.RG}
                  onChange={handleChange}
                  error={formEnviado && dados.RG.trim() === ""}
                  helperText={
                    formEnviado &&
                    dados.RG.trim() === "" &&
                    "RG é um campo obrigatório"
                  }
                />
                <TextField
                  sx={{ marginBottom: "8px", width: "100%" }}
                  label="Código da Disciplina"
                  variant="filled"
                  fullWidth
                  name="codigoDisciplina"
                  value={dados.codigoDisciplina}
                  onChange={handleChange}
                  error={formEnviado && dados.codigoDisciplina.trim() === ""}
                  helperText={
                    formEnviado &&
                    dados.codigoDisciplina.trim() === "" &&
                    "Código da disciplina é um campo obrigatório"
                  }
                />
                <FormControl fullWidth>
                  <InputLabel id="di">DI</InputLabel>
                  <Select
                    style={{ marginBottom: "8px", width: "100%" }}
                    labelId="di"
                    id="di"
                    value={dados.DI}
                    name="DI"
                    label="DI"
                    onChange={handleChange}
                  >
                    <MenuItem value={"D1"}>D1</MenuItem>
                    <MenuItem value={"D2"}>D2</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel id="categoria">Categoria</InputLabel>
                  <Select
                    style={{ marginBottom: "8px", width: "100%" }}
                    labelId="categoria"
                    id="categoria"
                    name="categoria"
                    value={dados.categoria}
                    label="Categoria"
                    onChange={handleChange}
                  >
                    <MenuItem value={"A"}>A</MenuItem>
                    <MenuItem value={"F"}>F</MenuItem>
                    <MenuItem value={"O"}>O</MenuItem>
                    <MenuItem value={"V"}>V</MenuItem>
                    <MenuItem value={"S"}>S</MenuItem>
                  </Select>
                </FormControl>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    style={{
                      marginTop: "16px",
                      width: "45%",
                      background: "darkblue",
                    }}
                    variant="contained"
                    onClick={() => setOpen(false)}
                  >
                    Voltar
                  </Button>

                  <Button
                    style={{
                      marginTop: "16px",
                      width: "45%",
                      background: "darkblue",
                    }}
                    variant="contained"
                    type="submit"
                  >
                    Salvar
                  </Button>
                </div>
              </form>
            </Grid>
          </Grid>
        </Dialog>
      </React.Fragment>
      <style>
        {`
      @media only screen and (max-width: 1200px) {
        .editar-prof {
          maxWidth: 1200px;
          height: 94.9vh;
        }
      }

      @media only screen and (max-width: 700px) {
        .editar-prof  {
          maxWidth: 700px;
          height: 100vh;
        }
        .logo {
          maxWidth: 800px;
          display: none;
        }
      }
      `}
      </style>
    </>
  );
}
