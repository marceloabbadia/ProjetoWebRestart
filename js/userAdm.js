let UserLog = JSON.parse(sessionStorage.getItem("utilizadorAtivo"));

if (!UserLog || UserLog.funcao !== "Admin") {
  alert("Sem autorização!");
  window.location.href = "primavera.html";
}

const dataTable = document.querySelector("#userTableBody");

document.addEventListener("DOMContentLoaded", async function () {
  const usersData = await GetAllDataUsers();

  for (let user of usersData) {
    const rowData = document.createElement("tr");

    rowData.innerHTML = `
      <td>${user.id}</td>
      <td>${user.nome}</td>
      <td>${user.email}</td>
      <td>${user.morada}</td>
      <td>${user.cp}</td>
      <td>${user.pais}</td>
     <td>
        <select class="form-select form-select-sm select-role" data-id="${
          user.id
        }">
          <option value="Admin" ${
            user.funcao === "Admin" ? "selected" : ""
          }>Admin</option>
          <option value="User" ${
            user.funcao === "User" ? "selected" : ""
          }>User</option>
        </select>
      </td>
      <td>
        <select class="form-select form-select-sm select-status" data-id="${
          user.id
        }">
          <option value="Ativa" ${
            user.status === "Ativa" ? "selected" : ""
          }>Ativa</option>
          <option value="Inativa" ${
            user.status === "Inativa" ? "selected" : ""
          }>Inativa</option>
        </select>
      </td>
      <td>
        <button class="btn btn-sm btn-primary btn-save" data-id="${
          user.id
        }">Save</button>
      </td>
    `;

    dataTable.appendChild(rowData);
  }
});

dataTable.addEventListener("click", async function (e) {
  if (e.target.classList.contains("btn-save")) {
    const row = e.target.closest("tr");

    const id = row.children[0].textContent;

    const roleSelect = row.querySelector(".select-role");
    const statusSelect = row.querySelector(".select-status");

    const updatedDataAdmin = {
      funcao: roleSelect.value,
      status: statusSelect.value,
    };

    try {
      await UpdateDataUser(updatedDataAdmin, id);
    } catch (err) {
      console.error("Erro:", err);
      alert("Erro ao atualizar utilizador.");
    }
  }
});
