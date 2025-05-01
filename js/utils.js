const urlRegister = "http://localhost:3000/utilizadores";

function isStrongPassword(password) {
  if (password.length < 8) {
    return "A senha deve ter no mínimo 8 caracteres.";
  }

  if (!/[A-Z]/.test(password)) {
    return "A senha deve conter pelo menos 1 letra maiúscula.";
  }

  if (!/[a-z]/.test(password)) {
    return "A senha deve conter pelo menos 1 letra minúscula.";
  }

  if (!/[0-9]/.test(password)) {
    return "A senha deve conter pelo menos 1 número.";
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "A senha deve conter pelo menos 1 símbolo (ex.: ! @ # $ % ^ & *).";
  }

  return true;
}

function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

async function DataUser(id) {
  const response = await fetch(`${urlRegister}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

// Pesquisa Regex:

// Parte	O que faz
// ^[^\s@]+	- Começa com pelo menos um caractere que não seja espaço ou @

// @	- Deve ter um arroba

// [^\s@]+	- Depois do @, precisa de mais caracteres válidos

// \.	- Depois precisa de um ponto

// [^\s@]+$ - termina com caracteres válidos
