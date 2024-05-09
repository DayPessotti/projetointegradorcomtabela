import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Avatar, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import Logo from "../assets/SGAE.png";
import Background from "../assets/Fundo.png";
import MenuApp from "../components/MenuApp";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputHoras from "../components/InputHoras";
import dayjs from "dayjs";
import InputData from "../components/InputData";
import SelectProfessor from "../components/SelectProfessor";

const Fundo = `url(${Background})`;

export default function CadastroAtribuicaoAulas() {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Verifica se todos os campos estão preenchidos

    handleAPISubmit();
  };

  const handleAPISubmit = () => {
    var horaInicioAPI = dayjs(horaInicio).format("HH:mm:ss");
    var horaFimAPI = dayjs(horaTermino).format("HH:mm:ss");
    var dataAPI = dayjs(horaInicio).format("YYYY-MM-D");

    // console.log({horaInicioAPI, horaFimAPI, dataAPI });

    // Adicione aqui a lógica de autenticação, se necessário
    const url = "https://nestjs-sgcpe-api.vercel.app/atribuicao_aulas";
    const opcoes = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        HoraInicioAula: horaInicioAPI,
        HoraFimAula: horaFimAPI,
        Data: dataAPI,
        idProfessor: professor,
        idProfessorEventual: professorEventual,
        nomeEscola: nomeEscola,
        UA: ua,
        CIE: cie,
        ciclo,
        turno,
        turma,
      }),
    };

    fetch(url, opcoes)
      .then((resposta) => {
        // Verificando se a requisição foi bem-sucedida
        if (resposta.ok) {
          // Você pode processar a resposta da API aqui, se necessário

          window.location = "/atribuicao-aulas";

          return resposta.json();
        } else {
          return resposta.json();
        }
      })
      .then((data) => {
        // Processar os dados da resposta, se necessário
        alert(data.message);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };

  return (
    <>
      <MenuApp />
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
                marginBottom: "5px"
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
                marginTop: "5px"
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
                  <MenuItem value={"1° ao 5°"}>1° ao 5°</MenuItem>
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
                  <MenuItem value="Manhã">Manhã</MenuItem>
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
                justifyContent: "center",
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
                type="submit"
              >
                Salvar
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </>
  );
}
