// EsquecerSenha.jsx
import React from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Typography from "@mui/material/Typography";
import { Card, CardContent } from "@mui/material";
import { toast } from "react-toastify";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Logo from "../assets/SGAE.png";

const EsquecerSenha = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const url = process.env.REACT_APP_BACKEND_URL + "/api/forgotPassword";
    const res = await axios.post(url, { email: email });
    if (res.data.success === false) {
      toast.error(res.data.message, {
        autoClose: 5000,
        position: "top-right",
      });
    } else {
      toast.success(res.data.message, {
        autoClose: 5000,
        position: "top-right",
      });
    }
  };
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <img
          src={Logo}
          alt="SGAE"
          style={{ maxWidth: "80%", height: "auto" }}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Box
          sx={{
            paddingTop: 5, // Reduzindo o espaço entre o logotipo e o card
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card sx={{ boxShadow: "4", width: "90%", height: "70vh" }}>
            <CardContent sx={{ m: 3 }}>
              <Avatar
                sx={{
                  m: "auto",
                  bgcolor: "primary.main",
                }}
              >
                <LockResetOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ mt: 2, textAlign: "center" }}>
                Recuperação de Senha
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />

                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "100%", marginTop: "30px" }}
                  href="/redefinir-senha"
                >
                  Redefinir senha
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "100%", marginTop: "20px" }}
                  href="/"
                >
                  Voltar
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default EsquecerSenha;
