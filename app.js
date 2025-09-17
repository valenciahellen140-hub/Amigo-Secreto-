let listaAmigos = [];
let resultados = [];
function agregarAmigo() {
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    if (nombre === "") {
        alert("Por favor, escribe un nombre.");
        return;
    }

    if (listaAmigos.includes(nombre)) {
        alert("Este nombre ya fue agregado.");
        return;
    }

    listaAmigos.push(nombre);
    input.value = "";
    mostrarLista();
}
function mostrarLista() {
    const ul = document.getElementById("listaAmigos");
    ul.innerHTML = "";

    listaAmigos.forEach((amigo) => {
        const li = document.createElement("li");
        li.textContent = amigo;
        ul.appendChild(li);
    });
}
function sortearAmigo() {
    if (listaAmigos.length < 2) {
        alert("Necesitas al menos dos participantes.");
        return;
    }

    let copia = [...listaAmigos];
    resultados = [];

    listaAmigos.forEach((amigo) => {
        let posibles = copia.filter((a) => a !== amigo);
        
        if (posibles.length === 0) {
            // Reinicia si el último no tiene a quién regalar
            sortearAmigo();
            return;
        }

        let elegido = posibles[Math.floor(Math.random() * posibles.length)];
        resultados.push({ quien: amigo, regalo: elegido });

        // Elimina al elegido para que no le toque a otro más
        copia = copia.filter((a) => a !== elegido);
    });

    mostrarSorteo();
}
function mostrarSorteo() {
    const ul = document.getElementById("resultado");
    ul.innerHTML = "";

    let index = 0;

    function mostrarUno() {
        if (index >= resultados.length) return;

        const par = resultados[index];
        const li = document.createElement("li");

        const boton = document.createElement("button");
        boton.textContent = `Ver el amigo secreto de ${par.quien}`;
        boton.onclick = () => {
            boton.disabled = true;
            boton.textContent = `${par.quien} → ${par.regalo}`;
        };

        li.appendChild(boton);
        ul.appendChild(li);

        index++;
        mostrarUno(); // Si quieres mostrar todos los botones de una vez
        // Para mostrar uno por uno con botón, necesitarías un sistema diferente
    }

    mostrarUno();
}
