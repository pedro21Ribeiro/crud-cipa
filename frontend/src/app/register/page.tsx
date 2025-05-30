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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    // Validação adicional da senha (reforço no lado do cliente)
    const passwordRegex = /^(?=(?:.*[a-z]){2,})(?=(?:.*[A-Z]){2,})(?=(?:.*\d){1,})(?=(?:.*[^A-Za-z0-9\s]){2,}).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "A senha deve ter no mínimo 6 caracteres, 2 letras maiúsculas, 2 letras minúsculas, 1 número e 2 caracteres especiais."
      );
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar. Tente novamente.");
      }

      setError("");
      router.push("/login");
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
          {/* Nome */}
          <Typography
            variant="h6"
            sx={{ position: "relative", top: "10px", color: "#006f83", fontWeight: "bold" }}
          >
            Nome Completo
          </Typography>
          <TextField
            type="text"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={textFieldStyle}
          />

          {/* Email */}
          <Typography
            variant="h6"
            sx={{ position: "relative", top: "10px", color: "#006f83", fontWeight: "bold" }}
          >
            E-mail
          </Typography>
          <TextField
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={textFieldStyle}
          />

          {/* Senha */}
          <Typography
            variant="h6"
            sx={{ position: "relative", top: "10px", color: "#006f83", fontWeight: "bold" }}
          >
            Senha
          </Typography>
          <TextField
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            slotProps={{
              input: {
                pattern:
                  "^(?=(?:.*[a-z]){2,})(?=(?:.*[A-Z]){2,})(?=(?:.*\\d){1,})(?=(?:.*[^A-Za-z0-9\\s]){2,}).{6,}$",
                title:
                  "A senha deve ter no mínimo 6 caracteres, 2 letras maiúsculas, 2 letras minúsculas, 1 número e 2 caracteres especiais.",
              },
            }}
            sx={textFieldStyle}
          />

          {/* Confirmar Senha */}
          <Typography
            variant="h6"
            sx={{ position: "relative", top: "10px", color: "#006f83", fontWeight: "bold" }}
          >
            Confirmar Senha
          </Typography>
          <TextField
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            slotProps={{
              input: {
                title: "Repita a senha informada acima.",
              },
            }}
            sx={textFieldStyle}
          />

          {/* Botão */}
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
              <Typography variant="inherit" sx={{ color: "#fff", fontWeight: "bold" }}>
                Cadastrar
              </Typography>
            </Button>
          </div>

          {/* Erro */}
          <div style={{ padding: "5px", textAlign: "center" }}>
            {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
          </div>
        </form>

        {/* Link para Login */}
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

const textFieldStyle = {
  backgroundColor: "rgba(230, 230, 230, 1)",
  border: "0",
  borderRadius: "15px",
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "none",
    },
  },
};
