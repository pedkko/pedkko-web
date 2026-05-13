// ── Autenticación ──────────────────────────────
function checkPassword() {
    const correctPassword = "14022026";
    const userPassword = document.getElementById("password").value;

    if (userPassword === correctPassword) {
        document.getElementById("login").style.display = "none";
        document.getElementById("seleccion").style.display = "flex";
    } else {
        const err = document.getElementById("error");
        err.innerText = "PIN incorrecto 💔";
        document.getElementById("password").value = "";
    }
}

// ── Navegación entre secciones ─────────────────
function mostrarSeccion(seccion) {
    document.getElementById("seleccion").style.display = "none";
    document.getElementById(seccion).style.display = "flex";

    // Reiniciar el sobre al entrar
    const envoltura = document.querySelector(`#${seccion} .envoltura-sobre`);
    const carta = document.querySelector(`#${seccion} .carta`);
    if (envoltura) {
        envoltura.classList.remove("abierto", "desactivar-sobre");
    }
    if (carta) {
        carta.classList.remove("abierta", "mostrar-carta", "cerrando-carta");
    }
}

function volverSeleccion() {
    document.getElementById("noviazgo").style.display = "none";
    document.getElementById("mes").style.display = "none";
    document.getElementById("seleccion").style.display = "flex";
}

// ── Lógica del sobre ───────────────────────────
document.addEventListener("click", (e) => {
    // Busca el sobre más cercano al elemento clickeado
    const seccionActiva = ["noviazgo", "mes"].find(id => {
        const el = document.getElementById(id);
        return el && el.style.display !== "none";
    });
    if (!seccionActiva) return;

    const envoltura = document.querySelector(`#${seccionActiva} .envoltura-sobre`);
    const carta = document.querySelector(`#${seccionActiva} .carta`);

    const esSobre = e.target.matches(".sobre") ||
        e.target.matches(".solapa-derecha") ||
        e.target.matches(".solapa-izquierda") ||
        e.target.matches(".corazon") ||
        e.target.matches(".corazon-mes");

    const esDentroSobre = e.target.matches(".sobre *");

    if (esSobre) {
        envoltura.classList.toggle("abierto");

    } else if (esDentroSobre) {
        if (!carta.classList.contains("abierta")) {
            carta.classList.add("mostrar-carta");
            setTimeout(() => {
                carta.classList.remove("mostrar-carta");
                carta.classList.add("abierta");
            }, 500);
            envoltura.classList.add("desactivar-sobre");
        } else {
            carta.classList.add("cerrando-carta");
            envoltura.classList.remove("desactivar-sobre");
            setTimeout(() => {
                carta.classList.remove("cerrando-carta");
                carta.classList.remove("abierta");
            }, 500);
        }
    }
});
