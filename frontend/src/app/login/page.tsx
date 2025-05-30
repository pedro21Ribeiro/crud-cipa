"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TextField from "@mui/material/TextField";
import { Button, Card, Typography } from "@mui/material";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");

  // Função para validar formato de email
  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Verifica email quando o input muda
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail && !validateEmail(newEmail)) {
      setEmailError("Por favor, insira um email válido.");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Por favor, insira um email válido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Email ou senha incorretos.");
      }

      setError("");
      router.push("/home");
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
        backgroundColor: "rgba(230, 230, 230, 1)",
        margin: "0",
        padding: "0",
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
            Login
          </Typography>
          <Typography variant="subtitle1">
            Digite seus dados de acesso no campo a baixo
          </Typography>
        </div>
        <form onSubmit={handleLogin}>
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
            onChange={handleEmailChange}
            error={!!emailError}
            helperText={emailError}
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
                Entrar
              </Typography>
            </Button>
          </div>
          <div style={{ padding: "5px", textAlign: "center" }}>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}{" "}
          </div>
        </form>
        <Typography sx={{ textAlign: "center", paddingTop: "10px" }}>
          Não tem conta?{" "}
          <Link href="/register" style={{ textDecoration: "none" }}>
            faça seu registro
          </Link>
        </Typography>
      </Card>
    </div>
  );
}
