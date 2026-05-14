// ══════════════════════════════════════════════════
// 🔐 SISTEMA DE CIFRADO - NO MODIFICAR
// ══════════════════════════════════════════════════

let PIN_CORRECTO = null; 
let contenidoDescifrado = {
    noviazgo: null,
    mes: null
};

function checkPassword() {
    const userPassword = document.getElementById("password").value;
    
    try {
   
        const encryptedData = JSON.parse(
            document.getElementById("encrypted-data").textContent
        );
        
   
        const descifradoNoviazgo = CryptoJS.AES.decrypt(
            encryptedData.noviazgo, 
            userPassword
        ).toString(CryptoJS.enc.Utf8);
        
        const descifradoMes = CryptoJS.AES.decrypt(
            encryptedData.mes, 
            userPassword
        ).toString(CryptoJS.enc.Utf8);
        
  
        if (descifradoNoviazgo && descifradoMes) {
            PIN_CORRECTO = userPassword; // Guardar en memoria
            contenidoDescifrado.noviazgo = descifradoNoviazgo;
            contenidoDescifrado.mes = descifradoMes;
            
    
            document.getElementById("login").style.display = "none";
            document.getElementById("seleccion").style.display = "flex";
        } else {
            mostrarError();
        }
    } catch (error) {
        mostrarError();
    }
}

function mostrarError() {
    const err = document.getElementById("error");
    err.innerText = "PIN incorrecto 💔";
    document.getElementById("password").value = "";
}


function mostrarSeccion(seccion) {
  
    if (seccion === 'noviazgo' && contenidoDescifrado.noviazgo) {
        document.getElementById("contenido-noviazgo").innerHTML = contenidoDescifrado.noviazgo;
    } else if (seccion === 'mes' && contenidoDescifrado.mes) {
        document.getElementById("contenido-mes").innerHTML = contenidoDescifrado.mes;
    }
    
    document.getElementById("seleccion").style.display = "none";
    document.getElementById(seccion).style.display = "flex";


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


document.addEventListener("click", (e) => {
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

