const Modal = document.querySelector(".modal");
const BtClose = document.querySelector(".btModalClose");
const LoginBody = document.querySelector(".modalBody");
const IconReg = document.querySelector("#iconReg i");
const IconLog = document.querySelector("#Userlogin i");
const UserNameGreeting = document.querySelector("#greeting");
const toggle = document.getElementById("IconSearch");
const input = document.getElementById("searchInput");

toggle.addEventListener("click", () => {
  input.classList.add("active");
  UserNameGreeting.style.left = "10px";
  input.focus();
});

input.addEventListener("blur", () => {
  input.classList.remove("active");
  UserNameGreeting.style.left = "40px";
});

IconLog.addEventListener("click", function (e) {
  e.preventDefault();
  let UserLog = localStorage.getItem("utilizadorAtivo");

  if (UserLog) {
    UserLogout();
  } else {
    LoginBody.innerHTML = `
      <h2>Controlo de acessos</h2>
      <p class="errorMessage"></p>
      <form id="loginForm">
        <div class="form-group">
          <label for="loginEmail">E-mail: </label>
          <input type="text" id="loginEmail" />
        </div>
        <div class="form-group">
          <label for="loginSenha">Senha: </label>
          <input type="password" id="loginSenha" />
        </div>
        <button type="submit" class="btn">Validar</button>
      </form>`;
    Modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    const EmailLogin = document.querySelector("#loginEmail");
    const PasswordLogin = document.querySelector("#loginSenha");
    const errorToMessage = document.querySelector(".errorMessage");

    EmailLogin.focus();

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      errorToMessage.style.display = "none";
      errorToMessage.innerHTML = "";

      if (!EmailLogin.value || !PasswordLogin.value) {
        showError("Os dois campos são de preenchimento obrigatório!");
        return;
      }

      if (!isValidEmail(EmailLogin.value)) {
        showError("E-mail tem um formato incorrecto!");
        return;
      }

      const logado = await ReadUsersFromFileLogin(
        EmailLogin.value,
        PasswordLogin.value
      );

      if (logado === true) {
        console.log("Login efetuado com sucesso!");

        updateIcons();
        CloseModal();
      } else {
        showError(logado);
      }
    });
  }
});

function UserLogout() {
  Modal.style.display = "none";
  localStorage.removeItem("utilizadorAtivo");

  UserNameGreeting.innerHTML = "";

  IconLog.className = "fa-solid fa-arrow-right-to-bracket";
  IconLog.setAttribute("title", "Login");

  IconReg.className = "fa-solid fa-user-plus";
  IconReg.setAttribute("title", "Registro");

  window.location.href = "primavera.html";
}

IconReg.addEventListener("click", function (e) {
  e.preventDefault();

  let UserLog = localStorage.getItem("utilizadorAtivo");

  if (UserLog) {
    window.location.href = "perfil.html";
  } else {
    window.location.href = "registo_utilizador.html";
  }
});

BtClose.addEventListener("click", CloseModal);

function CloseModal() {
  Modal.style.display = "none";
  LoginBody.innerHTML = "";
  document.body.style.overflow = "";
}

function showError(message) {
  const errorToMessage = document.querySelector(".errorMessage");
  errorToMessage.style.display = "block";
  errorToMessage.innerHTML = message;
}

async function ReadUsersFromFileLogin(email, password) {
  try {
    const response = await fetch("../ficheiro.json");
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();

    if (
      typeof data === "object" &&
      data !== null &&
      Array.isArray(data.utilizadores)
    ) {
      const usersArray = data.utilizadores;

      const validLogin = usersArray.find(
        (user) => user.email === email && user.senha === password
      );

      if (!validLogin) {
        return "Utilizador Inexistente!";
      }

      if (validLogin.status === "Inativa") {
        return "Conta não activa!";
      }

      localStorage.setItem(
        "utilizadorAtivo",
        JSON.stringify({
          id: validLogin.id,
          nome: validLogin.nome,
        })
      );
      return true;
    } else {
      console.error("Os dados não estão no formato correcto.");
      return false;
    }
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error.message);
    return "Ocorreu um erro ao tentar realizar o login.";
  }
}

function updateIcons() {
  const UserLog = localStorage.getItem("utilizadorAtivo");

  if (UserLog) {
    const user = JSON.parse(UserLog);

    if (UserNameGreeting) {
      UserNameGreeting.innerHTML = `Bem-vindo(a), ${user.nome}`;
    }
  }

  if (UserLog) {
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

window.addEventListener("storage", function (event) {
  if (event.key === "utilizadorAtivo") {
    updateIcons();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  updateIcons();
});
