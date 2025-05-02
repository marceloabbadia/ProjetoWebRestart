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

if (checkbox) {
  checkbox.addEventListener("change", function (e) {
    e.preventDefault();
    btn.disabled = !checkbox.checked;
  });
}

if (FormRegister) {
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

    const emailValue = email.value.trim();
    const existEmail = await isEmailRegistered(emailValue);

    if (existEmail) {
      alert(
        `O e-mail "${emailValue}" já está cadastrado em nossa base de dados. Por favor, utilize outro endereço de e-mail para realizar o cadastro ou faça login com o e-mail informado.`
      );
      return;
    }

    btn.disabled = true;

    //btoa() (binary to ASCII) converte uma string em Base64
    let passwordCode = btoa(password.value);

    let newUser = {
      nome: fullName.value,
      email: email.value,
      morada: address.value,
      cp: zipCode3.value + "-" + zipCode4.value,
      distrito: zipCodeLocal.value,
      pais: country.value,
      senha: passwordCode,
      funcao: "User",
      status: "Inativa",
    };

    RegisterUser(newUser);

    btn.disabled = false;
  });
}
