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
import dayjs from "dayjs";

const columns = [
  { data: "nomeProfessorEventual", title: "Professor Eventual" },
  { data: "RGProfessorEventual", title: "RG Professor Eventual" },
  { data: "UA", title: "UA" },
  { data: "CIE", title: "CIE" },
  { data: "Data", title: "Dia" },
  { data: "quantidadeAulas", title: "QTD Aulas" },
  { data: "nt", title: "NT" },
  { data: "nomeProfessor", title: "Professor" },
  { data: "RGProfessor", title: "RG Professor" },
  { data: "DIProfessor", title: "DI" },
  { data: "codigoDisciplinaProfessorEventual", title: "DISC" },
  { data: null, title: "Editar" },
  { data: null, title: "Excluir" },
];


const layout = {
  topStart: {
    buttons: [
      "pageLength",
      {
        extend: "copy",
        exportOptions: {
          columns: [0, 1, 2, 3,4,5,6,7,8,9,10],
        },
      },
      {
        extend: "excel",
        exportOptions: {
          columns: [0, 1, 2, 3,4,5,6,7,8,9,10],
        },
      },
      {
        extend: "csv",
        exportOptions: {
          columns: [0, 1, 2, 3,4,5,6,7,8,9,10],
        }
      },
      {
        extend: "pdf",
        exportOptions: {
          columns: [0, 1, 2, 3,4,5,6,7,8,9,10],
        }
      },
      {
        extend: "print",
        exportOptions: {
          columns: [0, 1, 2, 3,4,5,6,7,8,9,10],
        }
      }
    ],
  },
};

const css =
  'style="width: 90px;height: 25px; background: blue; border: none; border-radius: 3px; color: white; cursor: pointer;"';

const columnDefs = [
  {
    data: "null",
    defaultContent: "<button " + css + ' id="editar">Editar</button>',
    targets: -2,
  },
  {
    data: "null",
    defaultContent: "<button " + css + ' id="excluir">Excluir</button>',
    targets: -1,
  },
  {
    data: "Data",
    targets: 4,
    render: function (data, type, row, meta) {
      var dataFormatada = dayjs(data).add(1, 'day');
      return dataFormatada.format('DD/MM/YYYY');
    },
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
