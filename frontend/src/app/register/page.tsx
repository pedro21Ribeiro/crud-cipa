"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { Button, Card, Typography } from "@mui/material";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar. Tente novamente.");
      }

      setError("");
      router.push("/login"); // Redireciona para a tela de login após cadastro
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocorreu um erro desconhecido.");
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
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
            Cadastro
          </Typography>
          <Typography variant="subtitle1">
            Preencha seus dados para criar uma conta
          </Typography>
        </div>

        <form onSubmit={handleRegister}>
          <Typography
            variant="h6"
            sx={{
              position: "relative",
              top: "10px",
              color: "#006f83",
              fontWeight: "bold",
            }}
          >
            Nome
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              backgroundColor: "rgba(230, 230, 230, 1)",
              border: "0",
              borderRadius: "15px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
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
            E-mail
          </Typography>
          <TextField
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              backgroundColor: "rgba(230, 230, 230, 1)",
              border: "0",
              borderRadius: "15px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              backgroundColor: "rgba(230, 230, 230, 1)",
              border: "0",
              borderRadius: "15px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
              },
            }}
          />

          <div style={{ padding: "10px" }}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
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
                Cadastrar
              </Typography>
            </Button>
          </div>

          <div style={{ padding: "5px", textAlign: "center" }}>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          </div>
        </form>

        <Typography sx={{ textAlign: "center", paddingTop: "10px" }}>
          Já tem uma conta?{" "}
          <Link href="/login" style={{ textDecoration: "none" }}>
            Faça login
          </Link>
        </Typography>
      </Card>
    </div>
  );
}
