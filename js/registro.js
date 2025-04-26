const urlRegister = "http://localhost:3000/utilizadores";
const FormRegister = document.querySelector("#formRegistro");
const fullName = document.querySelector("#nome");
const email = document.querySelector("#email");
const address = document.querySelector("#morada");
const zipCode3 = document.querySelector("#cp3");
const zipCode4 = document.querySelector("#cp4");
const zipCodeLocal = document.querySelector("#cpLocalidade");
const country = document.querySelector("#pais");
const password = document.querySelector("#senha");
const validPassword = document.querySelector("#confirmarSenha");
const checkbox = document.querySelector("#confirmo");
const btn = document.querySelector("#btnSubmit");
const mensagemSucesso = document.querySelector("#mensagemSucesso");

async function ReadUsersFromFile() {
  try {
    const response = await fetch("../ficheiro.json");
    const data = await response.json();
    if (
      typeof data === "object" &&
      data !== null &&
      Array.isArray(data.utilizadores)
    ) {
      const usersArray = data.utilizadores;
      const emails = usersArray.map((user) => user.email);
      return emails;
    } else {
      console.error("Os dados no arquivo JSON não estão no formato esperado.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error.message);
    return [];
  }
}

checkbox.addEventListener("change", function () {
  btn.disabled = !checkbox.checked;
});

function isEmailRegistered(users, emailValue) {
  return users.some((user) => user.email === emailValue);
}

FormRegister.addEventListener("submit", async function (e) {
  e.preventDefault();

  const passwordValue = password.value.trim();
  const validPasswordValue = validPassword.value.trim();

  if (passwordValue !== validPasswordValue) {
    alert("A senha está diferente da confirmação da senha");
    return;
  }

  const passwordValidationResult = isStrongPassword(passwordValue);
  if (passwordValidationResult !== true) {
    alert(passwordValidationResult);
    return;
  }

  const emails = await ReadUsersFromFile();
  const emailValue = email.value.trim();

  if (emails.includes(emailValue)) {
    alert(
      `O e-mail "${emailValue}" já está cadastrado em nossa base de dados. Por favor, utilize outro endereço de e-mail para realizar o cadastro ou faça login com o e-mail informado.`
    );
    return;
  }

  btn.disabled = true;

  let newUser = {
    nome: fullName.value,
    email: email.value,
    morada: address.value,
    cp: zipCode3.value + "-" + zipCode4.value,
    distrito: zipCodeLocal.value,
    pais: country.value,
    senha: password.value,
    funcao: "User",
    status: "Inativa",
  };

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
    alert("Registo efetuado com sucesso!");
  } catch (erro) {
    console.error("Erro:", erro);
    btn.disabled = false;
    alert("Ocorreu um erro ao tentar registrar o utilizador.");
  }
});
