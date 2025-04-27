const Modal = document.querySelector(".modal");
const BtClose = document.querySelector(".btModalClose");
const LoginBody = document.querySelector(".modalBody");
const LoginToUser = document.querySelector("#Userlogin");

LoginToUser.addEventListener("click", function (e) {
  e.preventDefault();

  LoginBody.innerHTML = `
      <h2>Controlo de acessos</h2>
      <p class="errorMessage"></p>
      <form id="loginForm">
        <div class="form-group">
          <label for="loginEmail">E-mail: </label>
          <input type="email" id="loginEmail" />
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

  EmailLogin.focus();

  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const errorToMessage = document.querySelector(".errorMessage");

    if (EmailLogin.value == "" || PasswordLogin.value == "") {
      errorToMessage.style.display = "flex";
      errorToMessage.innerHTML =
        "Os dois campos são de preenchimento obrigatório!";
      return;
    }

    if (!isValidEmail(EmailLogin.value)) {
      errorToMessage.style.display = "flex";
      errorToMessage.innerHTML =
        "E-mail inválido! Por favor, insira um e-mail válido.";
      return;
    }

    errorToMessage.style.display = "none";
    errorToMessage.innerHTML = "";

    const logado = await ReadUsersFromFileLogin(
      EmailLogin.value,
      PasswordLogin.value
    );

    if (logado) {
      console.log("Login efetuado com sucesso!");
    } else {
      errorToMessage.style.display = "flex";
      errorToMessage.innerHTML = "Email ou senha incorretos. Tente novamente.";
      return;
    }

    Modal.style.display = "none";
    LoginBody.innerHTML = "";
    document.body.style.overflow = "";
  });
});

BtClose.addEventListener("click", function () {
  Modal.style.display = "none";
  LoginBody.innerHTML = "";
  document.body.style.overflow = "";
});

async function ReadUsersFromFileLogin(email, password) {
  try {
    const response = await fetch("../ficheiro.json");
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
        return false;
      } else {
        localStorage.setItem(
          "utilizadorAtivo",
          JSON.stringify({
            id: validLogin.id,
            nome: validLogin.nome,
          })
        );
        return true;
      }
    } else {
      console.error("Os dados no arquivo JSON não estão no formato esperado.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error.message);
    return [];
  }
}
