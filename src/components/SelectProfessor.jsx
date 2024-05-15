import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const url = "https://nestjs-sgcpe-api.vercel.app/cadastro_professores/";

export default function SelectProfessor({label, professor, setProfessor}) {
  const [dados, setDados] = React.useState([]);

  const handleChange = (event) => {
    setProfessor(event.target.value);
  };

  React.useEffect(() => {
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

  return (
    <Box sx={{ minWidth: 120, width:'100%', margin:'10px 0' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={professor}
          label={label}
          onChange={handleChange}
        >
          {dados.map(option => (
            <MenuItem key={option.ID_cp} value={option.ID_cp}>
              {option.nomeCompleto}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
