// BOTONES 
const calcular = document.getElementById("calcular");
const limpiar = document.getElementById("limpiar");
const copiar = document.getElementById("copiar");

// RESULTADOS

const consumoDiario = document.getElementById("consumoDiario");
const consumoMensual = document.getElementById("consumoMensual");
const costoMensual = document.getElementById("costoMensual");
const nivel = document.getElementById("nivel");
const consejo = document.getElementById("consejo");
const fecha = document.getElementById("fecha");


calcular.addEventListener("click", function () {

    const equipo = document.getElementById("equipo").value;
    const potencia = Number(document.getElementById("potencia").value);
    const horas = Number(document.getElementById("horas").value);
    const dias = Number(document.getElementById("dias").value);
    const precio = Number(document.getElementById("precio").value);

    if (
        equipo === "" ||
        potencia <= 0 ||
        horas <= 0 ||
        dias <= 0 ||
        precio <= 0
    ) {

        alert("Complete correctamente todos los campos.");

        return;

    }

    const diario = (potencia * horas) / 1000;

    const mensual = diario * dias;

    const costo = mensual * precio;

    consumoDiario.innerHTML =
        " Consumo diario: <strong>" +
        diario.toFixed(2) +
        " kWh</strong>";

    consumoMensual.innerHTML =
        "Consumo mensual: <strong>" +
        mensual.toFixed(2) +
        " kWh</strong>";

    costoMensual.innerHTML =
        "Costo mensual: <strong>RD$ " +
        costo.toFixed(2) +
        "</strong>";


    if (mensual < 100) {

        nivel.innerHTML =
            "<span class='bajo'> Consumo Bajo</span>";

        consejo.innerHTML =
            "Excelente. Tu consumo es bajo.";

    }

    else if (mensual <= 300) {

        nivel.innerHTML =
            "<span class='medio'> Consumo Medio</span>";

        consejo.innerHTML =
            "Puedes ahorrar apagando equipos que no utilices.";

    }

    else {

        nivel.innerHTML =
            "<span class='alto'> Consumo Alto</span>";

        consejo.innerHTML =
            "Reduce las horas de uso o utiliza equipos eficientes.";

    }

    const hoy = new Date();

    fecha.innerHTML =
        "📆 Fecha: " +
        hoy.toLocaleDateString();

});

limpiar.addEventListener("click", function () {

    document.getElementById("equipo").value = "";
    document.getElementById("potencia").value = "";
    document.getElementById("horas").value = "";
    document.getElementById("dias").value = "";
    document.getElementById("precio").value = "";

    consumoDiario.innerHTML = "Consumo diario: --";
    consumoMensual.innerHTML = "Consumo mensual: --";
    costoMensual.innerHTML = "Costo mensual: --";
    nivel.innerHTML = "Nivel de consumo: --";
    consejo.innerHTML = "Consejo: --";
    fecha.innerHTML = "Fecha: --";

});


copiar.addEventListener("click", function () {

    const texto =

        consumoDiario.innerText + "\n" +
        consumoMensual.innerText + "\n" +
        costoMensual.innerText + "\n" +
        nivel.innerText + "\n" +
        consejo.innerText;

    navigator.clipboard.writeText(texto);

    alert("Resultado copiado.");

});

