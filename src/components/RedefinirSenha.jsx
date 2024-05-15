// RedefinirSenha.jsx
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Typography from "@mui/material/Typography";
import { Card, CardContent } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Logo from "../assets/SGAE.png";

const RedefinirSenha = () => {
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const userId = searchParams.get("id");
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newpassword = data.get("newpassword");
    const confirmpassword = data.get("confirmpassword");
    if (newpassword !== confirmpassword)
      toast.error(
        `Nova senha e Confirme a senha não correspondem!`,
        {
          autoClose: 5000,
          position: "top-right",
        }
      );
    else {
      const url = process.env.REACT_APP_BACKEND_URL + "/api/ResetarSenha";
      const res = await axios.post(url, {
        password: newpassword,
        token: token,
        userId: userId,
      });
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
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
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
          <Card sx={{ boxShadow: 4, width: "90%", height: "70vh" }}>
            <CardContent sx={{ m: 3 }}>
              <Avatar sx={{ m: "auto", bgcolor: "primary.main" }}>
                <LockResetOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" sx={{ mt: 2, textAlign: "center" }}>
                Redefinição de Senha
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  name="newpassword"
                  id="newpassword"
                  label="Nova senha"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  label="Confirme a senha"
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 3,
                    mb: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{ width: "45%" }}
                    href="/esqueceu-senha"
                  >
                    Voltar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "45%" }}
                  >
                    Enviar
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Grid>
    </Grid>
  );
};

export default RedefinirSenha;
