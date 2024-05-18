import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import EditarProfessor from "./EditarProfessor";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const url = "https://nestjs-sgcpe-api.vercel.app/cadastro_professores/";

const DadosCadastroProfessores = () => {
  const [dados, setDados] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [dadosEdit, setDadosEdit] = React.useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        setDados(data.cadastro_professores);
      } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditar = (item) => {
    setDadosEdit(item);
    setOpen(true);
  };

  const handleExcluir = (id) => {
    Swal.fire({
      title: "Tem certeza que deseja excluir?",
      text: "Essa ação é irreversível!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir",
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit(id);

        Swal.fire({
          title: "Deletado!",
          text: "Seu professor foi excluído com sucesso",
          icon: "success",
        });
      }
    });
  };

  const handleSubmit = (id) => {
    const opcoes = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url + id, opcoes)
      .then((resposta) => {
        if (resposta.ok) {
          window.location = "/professores";

          return resposta.json();
        } else {
          return resposta.json();
        }
      })
      .then((data) => {
        // Processar os dados da resposta, se necessário
        console.log("Resposta da API:", data);
        // alert(data.message);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };

  return (
    <>
      <EditarProfessor
        open={open}
        setOpen={setOpen}
        dados={dadosEdit}
        setDados={setDadosEdit}
      />

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}>
        <style>
          {`
        @media only screen and (max-width: 1200px) {
          .table-container {
            overflow-y: auto;
            maxWidth: 1200px;
          }
        }

        @media only screen and (max-width: 800px) {
          .table-container {
            maxWidth: 500px;
            overflow-y: auto;
            margin: 10px;
          }
        }
        `}
        </style>
        <div class="table-container">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#1976d2" }}>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "center",
                    padding: "8px",
                    color: "white",
                  }}
                >
                  Nome Completo
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "center",
                    padding: "8px",
                    color: "white",
                  }}
                >
                  RG
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "center",
                    padding: "8px",
                    color: "white",
                  }}
                >
                  Código Disciplina
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "center",
                    padding: "8px",
                    color: "white",
                  }}
                >
                  Categoria
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "center",
                    padding: "8px",
                    color: "white",
                  }}
                >
                  DI
                </th>
                <th
                  style={{
                    border: "1px solid #dddddd",
                    textAlign: "center",
                    padding: "8px",
                    color: "white",
                  }}
                >
                  Ações
                </th>
              </tr>
            </thead>
            <tbody>
              {dados.map((item) => (
                <tr key={item.ID_cp} style={{ border: "1px solid #dddddd" }}>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {item.nomeCompleto}
                  </td>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {item.RG}
                  </td>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {item.codigoDisciplina}
                  </td>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {item.categoria}
                  </td>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    {item.DI}
                  </td>
                  <td
                    style={{
                      border: "1px solid #dddddd",
                      textAlign: "center",
                      padding: "8px",
                    }}
                  >
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEditar(item)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleExcluir(item.ID_cp)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </>
  );
};

export default DadosCadastroProfessores;
