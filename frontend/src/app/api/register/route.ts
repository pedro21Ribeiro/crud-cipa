import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Simulação: salvar o usuário (aqui só vamos mostrar no console)
    console.log("Novo usuário cadastrado:", { name, email, password });

    return NextResponse.json({ message: "Cadastro realizado com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    return NextResponse.json({ message: "Erro ao cadastrar usuário" }, { status: 500 });
  }
}
