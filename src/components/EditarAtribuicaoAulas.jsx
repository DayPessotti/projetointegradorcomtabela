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
import Logo from "../assets/SGCPE.png";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import SelectProfessor from "./SelectProfessor";
import InputData from "./InputData";
import InputHoras from "./InputHoras";

const Fundo = `url(${Background})`;
const url = "https://nestjs-sgcpe-api.vercel.app/atribuicao_aulas/";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditarAtribuicaoAulas({ dados, setDados, open, setOpen }) {
  const [formEnviado, setFormEnviado] = useState(false);

  const [ciclo, setCiclo] = useState("");
  const [turno, setTurno] = useState("");
  const [turma, setTurma] = useState("");
  const [horaInicio, setHoraInicio] = useState(dayjs().startOf("day"));
  const [data, setData] = useState(dayjs().startOf("day"));
  const [horaTermino, setHoraTermino] = useState(dayjs().startOf("day"));
  const [professor, setProfessor] = useState("");
  const [professorEventual, setProfessorEventual] = useState("");
  const [nomeEscola, setNomeEscola] = useState("");
  const [ua, setUa] = useState("");
  const [cie, setCie] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        const dadosFiltrados = data.atribuicaoAulas.find(
          (item) => item.idAtribuicaoAulas == dados.idAtribuicaoAulas
        );

        if (dadosFiltrados != null && dadosFiltrados != undefined) {
          setCiclo(dadosFiltrados.ciclo);
          setTurno(dadosFiltrados.turno);
          setTurma(dadosFiltrados.turma);
          setHoraInicio(
            dayjs(dadosFiltrados.Data + " " + dadosFiltrados.HoraInicioAula)
          );
          setData(dayjs(dadosFiltrados.Data));
          setHoraTermino(
            dayjs(dadosFiltrados.Data + " " + dadosFiltrados.HoraFimAula)
          );
          setProfessor(dadosFiltrados.idProfessor);
          setProfessorEventual(dadosFiltrados.idProfessorEventual);
          setNomeEscola(dadosFiltrados.nomeEscola);
          setUa(dadosFiltrados.UA);
          setCie(dadosFiltrados.CIE);
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
        CIE: cie,
        Data: data,
        HoraFimAula: horaTermino,
        HoraInicioAula: horaInicio,
        UA: ua,
        ciclo: ciclo,
        idAtribuicaoAulas: dados.idAtribuicaoAulas,
        idProfessor: professor,
        idProfessorEventual: professorEventual,
        nomeEscola: nomeEscola,
        turma: turma,
        turno: turno,
      }),
    };

    fetch(url + dados.idAtribuicaoAulas, opcoes)
      .then((resposta) => {
        if (resposta.ok) {
          console.log("Requisição bem-sucedida!");
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
                label="Escola"
                variant="filled"
                value={nomeEscola}
                onChange={(event) => {
                  setNomeEscola(event.target.value);
                }}
                fullWidth
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
              <TextField
                sx={{ marginBottom: "8px", width: "100%" }}
                label="CIE"
                variant="filled"
                value={cie}
                onChange={(event) => {
                  setCie(event.target.value);
                }}
                fullWidth
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "100%",
                  marginBottom: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "33%",
                    marginTop: "5px",
                  }}
                >
                  <InputData value={data} setValue={setData} />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "33%",
                    marginTop: "5px",
                  }}
                >
                  <InputHoras
                    label={"Hora de Início"}
                    value={horaInicio}
                    setValue={setHoraInicio}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "33%",
                    marginTop: "5px",
                  }}
                >
                  <InputHoras
                    label={"Hora de Término"}
                    value={horaTermino}
                    setValue={setHoraTermino}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "100%",
                  marginTop: "5px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    Ciclo
                  </InputLabel>
                  <Select
                    style={{ marginBottom: "8px", width: "99%" }}
                    value={ciclo}
                    label="Ciclo"
                    onChange={(event) => {
                      setCiclo(event.target.value);
                    }}
                  >
                    <MenuItem value={"6° ao 9°"}>6° ao 9°</MenuItem>
                    <MenuItem value={"1° ao 3°"}>1° ao 3°</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Turno</InputLabel>
                  <Select
                    style={{ marginBottom: "8px", width: "99%" }}
                    value={turno}
                    label="Turno"
                    onChange={(event) => {
                      setTurno(event.target.value);
                    }}
                  >
                    <MenuItem value={"Manhã"}>Manhã</MenuItem>
                    <MenuItem value={"Tarde"}>Tarde</MenuItem>
                    <MenuItem value={"Noite"}>Noite</MenuItem>
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Turma</InputLabel>
                  <Select
                    style={{ marginBottom: "8px", width: "99%" }}
                    value={turma}
                    label="Turma"
                    onChange={(event) => {
                      setTurma(event.target.value);
                    }}
                  >
                    <MenuItem value={"1A"}>1A</MenuItem>
                    <MenuItem value={"1B"}>1B</MenuItem>
                    <MenuItem value={"1C"}>1C</MenuItem>
                    <MenuItem value={"1D"}>1D</MenuItem>
                    <MenuItem value={"2A"}>2A</MenuItem>
                    <MenuItem value={"2B"}>2B</MenuItem>
                    <MenuItem value={"2C"}>2C</MenuItem>
                    <MenuItem value={"2D"}>2D</MenuItem>
                    <MenuItem value={"2A1"}>2A1</MenuItem>
                    <MenuItem value={"3C"}>3C</MenuItem>
                    <MenuItem value={"3D"}>3D</MenuItem>
                    <MenuItem value={"4A1"}>4A1</MenuItem>
                    <MenuItem value={"6A"}>6A</MenuItem>
                    <MenuItem value={"6B"}>6B</MenuItem>
                    <MenuItem value={"6C"}>6C</MenuItem>
                    <MenuItem value={"6D"}>6D</MenuItem>
                    <MenuItem value={"7A"}>7A</MenuItem>
                    <MenuItem value={"7B"}>7B</MenuItem>
                  </Select>
                </FormControl>
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