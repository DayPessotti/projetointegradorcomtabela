import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Avatar, Grid, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Background from "../assets/Fundo.png";
import MenuApp from "../components/MenuApp";
import dayjs from "dayjs";
import InputData from "../components/InputData";
import SelectProfessor from "../components/SelectProfessor";
import Logo from "../assets/SGAE.png";

const Fundo = `url(${Background})`;

export default function CadastroAtribuicaoAulas() {
  const [data, setData] = useState(dayjs().startOf("day"));
  const [professor, setProfessor] = useState("");
  const [professorEventual, setProfessorEventual] = useState("");
  const [ua, setUa] = useState("");
  const [cie, setCie] = useState("");
  const [quantidadeAulas, setQuantidadeAulas] = useState(0);
  const [nt, setNt] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSubmit = (event) => {
    event.preventDefault();

    handleAPISubmit();
  };

  const handleAPISubmit = () => {
    const url = "https://nestjs-sgcpe-api.vercel.app/atribuicao_aulas";
    const opcoes = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idProfessor: professor,
        idProfessorEventual: professorEventual,
        quantidadeAulas: parseInt(quantidadeAulas),
        nt: parseInt(nt),
        Data: data,
        UA: ua,
        CIE: cie,
      }),
    };

    fetch(url, opcoes)
      .then((resposta) => {
        if (resposta.ok) {
          window.location = "/aulas-atribuidas";
          return resposta.json();
        } else {
          return resposta.json();
        }
      })
      .then((data) => {
        alert(data.message);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };

  if (!sessionStorage.getItem("userData")) {
    return (window.location = "/");
  }

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
          {!isMobile && (
            <Avatar
              className="logo"
              sx={{ width: "50%", height: "50%" }}
              src={Logo}
              variant="square"
            />
          )}
        </Grid>
        <Grid
          className="cadastro-aulas"
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
              label={"Professor Titular"}
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
                width: "100%",
                marginBottom: "5px",
              }}
            >
              <InputData value={data} setValue={setData} />
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
      <style>
          {`
        @media only screen and (max-width: 1200px) {
          .cadastro-aulas {
            maxWidth: 1200px;
            height: 94.9vh;
          }
        }

        @media only screen and (max-width: 700px) {
          .cadastro-aulas {
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
