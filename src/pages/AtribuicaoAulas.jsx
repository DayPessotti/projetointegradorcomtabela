import "datatables.net-dt/css/dataTables.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons-dt/css/buttons.dataTables.min.css";
import "datatables.net-buttons/js/buttons.html5.mjs";
import "datatables.net-buttons/js/buttons.print.js";
import "datatables.net-buttons/js/buttons.colVis.js";
import "https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import MenuApp from "../components/MenuApp";
import ReactDataTables from "../components/Tabela";

const columns = [
  { data: "nomeProfessorEventual", title: "Professor Eventual" },
  { data: "RGProfessorEventual", title: "RG Professor Eventual" },
  { data: "Data", title: "Data" },
  { data: "UA", title: "UA" },
  { data: "CIE", title: "CIE" },
  { data: "HoraInicioAula", title: "Hora Inicio" },
  { data: "HoraFimAula", title: "Hora Fim" },
  { data: "nomeProfessor", title: "Professor" },
  { data: "RGProfessor", title: "RG Professor" },
  { data: "ciclo", title: "Ciclo" },
  { data: "turno", title: "Turno" },
  { data: "turma", title: "Turma" },
  { data: null, title: "Editar" },
  { data: null, title: "Excluir" },
];

const layout = {
  topStart: {
    buttons: [
      "pageLength",
      {
        extend: "copy",
        text: "Copiar Tabela",
      },
      // {
      //   extend: "excel",
      //   text: "Excel colunas restringidas",
      //   exportOptions: {
      //     columns: [0, 1, 2, 5],
      //   },
      // },
      "csv",
      "excel",
      "pdf",
      "print",
    ],
  },
};

const css = 'style="width: 90px;height: 25px; background: blue; border: none; border-radius: 3px; color: white; cursor: pointer;"';

const columnDefs = [
  {
    data: "null",
    defaultContent:
      '<button '+css+' id="editar">Editar</button>',
    targets: -2,
  },
  {
    data: "null",
    defaultContent:
      '<button '+css+' id="excluir">Excluir</button>',
    targets: -1,
  },
];

const EmployeeTable = () => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  return (
    <>
      <MenuApp />
      <div
        style={{
          width: "90%",
          margin: "30px auto",
          backgroundColor: "#FFFFFf",
        }}
      >
        <ReactDataTables
          columns={columns}
          destroy={true}
          layout={layout}
          ajax={"https://nestjs-sgcpe-api.vercel.app/atribuicao_aulas/view"}
          columnDefs={columnDefs}
        />
      </div>
    </>
  );
};

export default EmployeeTable;
