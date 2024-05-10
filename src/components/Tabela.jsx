import DataTables from "datatables.net-dt";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import EditarAtribuicaoAulas from "./EditarAtribuicaoAulas";


const url = "https://nestjs-sgcpe-api.vercel.app/atribuicao_aulas/";

export function ReactDataTables({ ...props }) {
 
  const tableRef = useRef([]);
  const [open, setOpen] = useState(false);
  const [dadosEdit, setDadosEdit] = useState({});


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
        handleDeleteSubmit(id);
        Swal.fire({
          title: "Deletado!",
          text: "Seu professor foi excluído com sucesso",
          icon: "success",
        });
      }
    });
  };

  const handleDeleteSubmit = (id) => {
    const opcoes = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(url + id, opcoes)
      .then((resposta) => {
        if (resposta.ok) {
          console.log("Requisição bem-sucedida!");
          window.location = "/atribuicao-aulas";

          return resposta.json();
        } else {
          console.error("Erro ao fazer a requisição:", resposta.status);
          return resposta.json();
        }
      })
      .then((data) => {
        console.log("Resposta da API:", data);
      })
      .catch((error) => {
        console.error("Erro durante a requisição:", error);
      });
  };
  

  useEffect(() => {
    const dt = new DataTables(tableRef.current, props);

    dt.on('click', 'button#editar', function () {
        let data = dt.row(this.parentNode.parentElement).data();
    
        if(data != null ){
          //alert('You clicked on edit ' + data?.nomeProfessor + "'s row");
          handleEditar(data);
        }
          
    });

    dt.on('click', 'button#excluir', function () {
      let data = dt.row(this.parentNode.parentElement).data();
  
      if(data != null ){
        handleExcluir(data?.idAtribuicaoAulas)
      } 
    });
    
    return () => {
      dt.destroy();
    };
   
  }, [open]);


  return (
    <div>
      <EditarAtribuicaoAulas
        open={open}
        setOpen={setOpen}
        dados={dadosEdit}
        setDados={setDadosEdit}
      />

    <table ref={tableRef}></table>
    </div>
  );
 
}

export default ReactDataTables;