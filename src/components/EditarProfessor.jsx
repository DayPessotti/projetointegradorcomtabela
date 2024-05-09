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
import Logo from "../assets/SGCPE.png";
import FormControl from '@mui/material/FormControl';

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
    // Define o formulário como enviado para mostrar mensagens de erro
    setFormEnviado(true);
    // Verifica se todos os campos estão preenchidos corretamente
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
    // Lógica de autenticação ou envio do formulário
    handleUpDateSubmit();
  };

   const handleUpDateSubmit = () => {
    // Adicione aqui a lógica de autenticação, se necessário
    const opcoes = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...dados }),

    };

    fetch(url + dados.ID_cp, opcoes)
      .then((resposta) => {
        // Verificando se a requisição foi bem-sucedida
        if (resposta.ok) {
          console.log("Requisição bem-sucedida!");
          // Você pode processar a resposta da API aqui, se necessário

          return resposta.json();
        } else {

          console.error("Erro ao fazer a requisição:", resposta.status);
          return resposta.json()
        }

      })
      .then((data) => {
        // Processar os dados da resposta, se necessário

        console.log("Resposta da API:", data);
        alert(data.message);
        setOpen(false);
        window.location = "/professores";
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };


  return (
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
          {/* Exibição da imagem à esquerda em telas pequenas */}
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
          {/* Formulário à direita */}
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
  );
}
