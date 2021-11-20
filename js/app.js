// constructores
function seguro(marca, año, tipo) {
  this.marca = marca;
  this.año = año;
  this.tipo = tipo;
}
function UI() {}

UI.prototype.mostrarEnPantalla = function (seguro, total) {
  const contenedor = document.querySelector("#resultado"),
    div = document.createElement("div"),
    spinner = document.querySelector("#cargando");
  spinner.style.display = "block";
  let { marca, año, tipo } = seguro;
  switch (marca) {
    case "1":
      marca = "Americano";
      break;
    case "2":
      marca = "Asiatico";
      break;
    case "3":
      mcarca = "Europea";
      break;

    default:
  }
  div.innerHTML = `
  <p class = 'header'>Resultado</p>
  <p class = 'font-bold'>Marca: <spam class= 'font-normal'>${marca}</spam> </p> 
  <p class = 'font-bold'>Año: <spam class= 'font-normal'>${año}</spam> </p> 
  <p class = 'font-bold'>Tipo de seguro: <spam class= 'font-normal capitalize'>${tipo}</spam></p> 
  <p class = 'font-bold'>Total seguro: <spam class= 'font-normal'>$${total}</spam></p> 
  `;
  setTimeout(() => {
    spinner.style.display = "none";
    contenedor.appendChild(div);
  }, 3000);
};

UI.prototype.cotizarSeguro = function (seguroAuto) {
  const { marca, año, tipo } = seguroAuto;
  let resultado;
  const base = 2000;
  switch (marca) {
    case "1":
      resultado = base * 1.15;
      break;
    case "2":
      resultado = base * 1.05;
      break;
    case "3":
      resultado = base * 1.35;
      break;
    default:
  }
  // Leer año seguro
  añoActual = new Date().getFullYear();
  diferencia = añoActual - año;
  resultado -= resultado * 0.03 * diferencia;
  // Leer el tipo de seguro
  if (tipo === "basico") {
    resultado *= 1.3;
  } else {
    resultado *= 1.5;
  }
  return resultado;
};

UI.prototype.llenarOpciones = () => {
  const year = document.querySelector("#year");
  const max = new Date().getFullYear(),
    min = max - 20;
  for (let i = max; i > min; i--) {
    const option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    year.appendChild(option);
  }
};

UI.prototype.mostrarMensaje = function (mensaje, tipo) {
  const formulario = document.querySelector("#cotizar-seguro"),
    resultado = document.querySelector("#resultado"),
    button = document.querySelector("button"),
    p = document.createElement("p");
  button.setAttribute("disabled", "disabled");
  p.textContent = mensaje;
  formulario.insertBefore(p, resultado);
  if (tipo === "error") {
    (p.classList = "error"), "pd-10";
  } else if (tipo === "correcto") {
    (p.classList = "correcto"), "pd-10";
  }
  setTimeout(() => {
    p.remove();
    button.removeAttribute("disabled");
  }, 3000);
};

//Instanciación
const ui = new UI();

// Event listeners

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones();
});

eventListeners();
function eventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", validarFormulario);
}

function validarFormulario(e) {
  e.preventDefault();
  // Leer marca
  const marca = document.querySelector("#marca").value;
  // Leer año
  const año = document.querySelector("#year").value;
  //Leer tipo
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === "" || año === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos deben ser llenados", "error");
    return;
  }
  ui.mostrarMensaje("Cotizando vehiculo", "correcto");
  // Eliminar resultados anteriores
  const resultado = document.querySelector("#resultado div");
  if (resultado !== null) {
    resultado.remove();
  }
  // Creación del objeto;
  const seguroAuto = new seguro(marca, año, tipo);
  const total = ui.cotizarSeguro(seguroAuto);
  ui.mostrarEnPantalla(seguroAuto, total);
}
