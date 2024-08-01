const btnBusca = document.getElementById("btnBusca");
const btnIncluirCliente = document.getElementById("btnIncluirCliente");
const btnIncluir = document.getElementById("btnIncluir");
const content = document.getElementById("content");
const frmIncluirCliente = document.getElementById("frmIncluirCliente");

btnIncluirCliente.addEventListener("click", (e) => {
  frmIncluirCliente.style.setProperty("display", "block");
});

btnIncluir.addEventListener("click", (e) => {
  const xhr = new XMLHttpRequest();
  let cliente = new FormData(frmIncluirCliente);
  xhr.onload = function () {
    if (xhr.status == 200) {
      alert("Inclusao Ok");
      frmIncluirCliente.reset();
      frmIncluirCliente.style.setProperty("display", "none");
      buscaClientes();
    }
    else {
      alert("Erro na Inclusao");
    }
  }
  xhr.open("POST", "insert-cliente.php");
  xhr.send(cliente);
  e.preventDefault();
})

btnBusca.addEventListener("click", buscaClientes);
document.addEventListener("DOMContentLoaded", buscaClientes);
function buscaClientes() {
  const req = new XMLHttpRequest();
  req.onload = function () {
    if (req.status == 200) {
      let html = "<table class='table table-bordered table-hover table-sm'>";
      html += "<tr><th>Cod</th><th>Nome</th><th>Email</th></tr>";
      const vetorClientes = JSON.parse(this.responseText);
      for (let cliente of vetorClientes) {
        html += `<tr><td>${cliente.codigo}</td><td>${cliente.nome}</td><td>${cliente.email}</td>`;
        html += '<td>';
        html += ` <button class="btn btn-info" onClick="showClienteUpdForm(${cliente.codigo})"><i class="fa-solid fa-pencil"></i></button>`;
        html += ` <button class="btn btn-danger" onClick="delCliente(${cliente.codigo});"><i class="fa-solid fa-trash-can"></i></button>`;
        html += '</td></tr>';
      }
      html += "</table>";
      content.innerHTML = html;
    }
    else {
      alert(`Erro: ${req.status} ${req.statusText}`);
    }
  }
  req.open("GET", "busca-clientes.php");
  req.send();
}
function delCliente(id) {
  if (confirm("Confirma a exclusão do registro?") == true) {
    let data = new FormData();
    data.append("id", id);
    console.log(data.id);
    let xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status == 200) {
        alert("Exclusao Ok");
        buscaClientes();
      }
      else {
        alert(`Erro: ${xhr.status} ${xhr.statusText}`);
      }
    }
    xhr.open("POST", "cliente-delete.php");
    xhr.send(data);
  }
}
