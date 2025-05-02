const urlRegister = "http://localhost:3000/utilizadores";

function updateIcons() {
  const UserLog = sessionStorage.getItem("utilizadorAtivo");

  if (UserLog) {
    const user = JSON.parse(UserLog);

    if (UserNameGreeting) {
      UserNameGreeting.innerHTML = `Bem-vindo(a), ${user.nome}`;
    }

    if (user.funcao === "Admin") {
      SectionAdm.style.display = "flex";
    } else {
      SectionAdm.style.display = "none";
    }

    IconLog.className = "fa-solid fa-arrow-right-from-bracket";
    IconLog.setAttribute("title", "Logout");

    IconReg.className = "fa-regular fa-user";
    IconReg.setAttribute("title", "Perfil");
  } else {
    if (UserNameGreeting) {
      UserNameGreeting.innerHTML = "";
    }

    IconLog.className = "fa-solid fa-arrow-right-to-bracket";
    IconLog.setAttribute("title", "Login");

    IconReg.className = "fa-solid fa-user-plus";
    IconReg.setAttribute("title", "Registro");
  }
}

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

async function RegisterUser(newUser) {
  try {
    const response = await fetch(urlRegister, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Erro ao registrar utilizador!");
    }
    window.location.href = "primavera.html";
    alert("Cadastro efetuado com sucesso!");
  } catch (erro) {
    console.error("Erro:", erro);
    alert("Ocorreu um erro ao tentar registrar o novo utilizador.");
  }
}

async function GetDataUser(id) {
  try {
    const response = await fetch(`${urlRegister}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Erro ao retornar dados do utilizador!");
    }
    return response.json();
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

async function GetAllDataUsers() {
  try {
    const response = await fetch(urlRegister, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Erro ao retornar dados do utilizador!");
    }
    return response.json();
  } catch (erro) {
    console.error("Erro:", erro);
  }
}

async function UpdateDataUser(User, id) {
  try {
    const response = await fetch(`${urlRegister}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(User),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Erro ao atualizar o utilizador!");
    }
    return response.ok;
  } catch (erro) {
    console.error("Erro:", erro);
    alert("Ocorreu um erro ao tentar atualizar o utilizador.");
  }
}

async function ReadUsersFromFileEmail() {
  try {
    const response = await fetch("../ficheiro.json");
    const data = await response.json();
    if (data !== null && Array.isArray(data.utilizadores)) {
      return data.utilizadores;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao ler ficheiro:", error);
    return [];
  }
}

async function isEmailRegistered(emailValue) {
  let users = await ReadUsersFromFileEmail();
  let validEmail = users.some((user) => user.email === emailValue);
  return validEmail;
}
