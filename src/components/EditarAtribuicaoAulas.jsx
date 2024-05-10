import React, { useEffect, useState } from "react";
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
import dayjs from "dayjs";
import SelectProfessor from "./SelectProfessor";
import InputData from "./InputData";

const Fundo = `url(${Background})`;
const url = "https://nestjs-sgcpe-api.vercel.app/atribuicao_aulas/";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditarAtribuicaoAulas({
  dados,
  setDados,
  open,
  setOpen,
}) {
  const [data, setData] = useState(dayjs().startOf("day"));
  const [professor, setProfessor] = useState("");
  const [professorEventual, setProfessorEventual] = useState("");
  const [ua, setUa] = useState("");
  const [cie, setCie] = useState("");
  const [quantidadeAulas, setQuantidadeAulas] = useState(0);
  const [nt, setNt] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        const dadosFiltrados = data.atribuicaoAulas.find(
          (item) => item.idAtribuicaoAulas == dados.idAtribuicaoAulas
        );

        if (dadosFiltrados != null && dadosFiltrados != undefined) {
          setData(dayjs(dadosFiltrados.Data));
          setProfessor(dadosFiltrados.idProfessor);
          setProfessorEventual(dadosFiltrados.idProfessorEventual);
          setUa(dadosFiltrados.UA);
          setCie(dadosFiltrados.CIE);
          setQuantidadeAulas(dadosFiltrados.quantidadeAulas);
          setNt(dadosFiltrados.nt);
        }
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, [dados]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpDateSubmit();
  };

  const handleUpDateSubmit = () => {
    // Adicione aqui a lógica de autenticação, se necessário
    const opcoes = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idAtribuicaoAulas: dados.idAtribuicaoAulas,
        idProfessor: professor,
        idProfessorEventual: professorEventual,
        quantidadeAulas: parseInt(quantidadeAulas),
        nt: parseInt(nt),
        Data: data,
        UA: ua,
        CIE: cie,
        
      }),
    };

    fetch(url + dados.idAtribuicaoAulas, opcoes)
      .then((resposta) => {
        if (resposta.ok) {
          window.location = "/atribuicao-aulas";
          return resposta.json();
        } else {
          console.error("Erro ao fazer a requisição:", resposta.status);
          return resposta.json();
        }
      })
      .then((data) => {
        console.log("Resposta da API:", data);
        alert(data.message);
        setOpen(false);
        window.location = "/atribuicao-aulas";
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
              Editar Atribuicão de Aulas
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
              onSubmit={handleSubmit}
              style={{
                textAlign: "center",
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <SelectProfessor
                label={"Professor"}
                professor={professor}
                setProfessor={setProfessor}
              />
              <SelectProfessor
                label={"Professor Eventual"}
                professor={professorEventual}
                setProfessor={setProfessorEventual}
              />

              <TextField
                sx={{ marginBottom: "8px", width: "100%" }}
                label="Unidade Administrativa"
                variant="filled"
                value={ua}
                onChange={(event) => {
                  setUa(event.target.value);
                }}
                fullWidth
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  margin: "5px auto",
                }}
              >
                <TextField
                  sx={{ marginBottom: "8px", width: "33%" }}
                  label="QTD-Aulas"
                  variant="filled"
                  value={quantidadeAulas}
                  onChange={(event) => {
                    setQuantidadeAulas(event.target.value);
                  }}
                  // fullWidth
                />

                <TextField
                  sx={{ marginBottom: "8px", width: "33%" }}
                  label="CIE"
                  variant="filled"
                  value={cie}
                  onChange={(event) => {
                    setCie(event.target.value);
                  }}
                  // fullWidth
                />

                <TextField
                  sx={{ marginBottom: "8px", width: "33%" }}
                  label="NT"
                  variant="filled"
                  value={nt}
                  onChange={(event) => {
                    setNt(event.target.value);
                  }}
                  // fullWidth
                />
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "100%",
                  marginBottom: "5px",
                }}
              >
                <InputData value={data} setValue={setData} />
              </div>

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
                    width: "40%",
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
                    width: "40%",
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
