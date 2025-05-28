import React from "react";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { Button, Card, Typography } from "@mui/material";

export default function Login() {
  return (
    <div>
      <Card
        variant="outlined"
        style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}
      >
        <div style={{ paddingBottom: "20px" }}>
          <Typography
            variant="h3"
            sx={{
              paddingBottom: "20px",
              color: "#006f83",
              fontWeight: "bold",
            }}
          >
            Login
          </Typography>
          <Typography variant="subtitle1">
            Digite seus dados de acesso no campo a baixo
          </Typography>
        </div>
        <form>
          <Typography
            variant="h6"
            sx={{
              position: "relative",
              top: "10px",
              color: "#006f83",
              fontWeight: "bold",
            }}
          >
            E-mail
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: "rgba(230, 230, 230, 1)", // Cor de fundo
              border: "0", // Remover borda
              borderRadius: "15px", // Borda arredondada
              "& .MuiOutlinedInput-root": {
                // Estilo para o root do input
                "& fieldset": {
                  border: "none", // Remover o fieldset (bordas)
                },
              },
            }}
          />
          <Typography
            variant="h6"
            sx={{
              position: "relative",
              top: "10px",
              color: "#006f83",
              fontWeight: "bold",
            }}
          >
            Senha
          </Typography>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={{
              backgroundColor: "rgba(230, 230, 230, 1)", // Cor de fundo
              border: "0", // Remover borda
              borderRadius: "15px", // Borda arredondada
              "& .MuiOutlinedInput-root": {
                // Estilo para o root do input
                "& fieldset": {
                  border: "none", // Remover o fieldset (bordas)
                },
              },
            }}
          />
        </form>

        <Link href={"/home"} style={{ textDecoration: "none" }}>
          <div style={{ padding: "10px" }}>
            <Button
              variant="contained"
              fullWidth
              sx={{
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                background: "#006f83",
                border: "0",
                borderRadius: "999px",
              }}
            >
              <Typography
                variant="inherit"
                sx={{
                  color: "#ffff",
                  fontWeight: "bold",
                }}
              >
                Entrar
              </Typography>
            </Button>
          </div>
        </Link>
        <Typography sx={{ textAlign: "center", paddingTop: "10px" }}>
          Não tem conta ?{" "}
          <Link href="/register" style={{ textDecoration: "none" }}>
            faça seu registro
          </Link>
        </Typography>
      </Card>
    </div>
  );
}
