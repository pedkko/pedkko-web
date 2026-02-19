const envoltura = document.querySelector(".envoltura-sobre");
const carta = document.querySelector(".carta");
function checkPassword() {
    const correctPassword = "14022026"; // Cambia esto por tu clave
    const userPassword = document.getElementById("password").value;

    if (userPassword === correctPassword) {
        document.getElementById("login").style.display = "none";
        document.getElementById("contenido").style.display = "block";
    } else {
        document.getElementById("error").innerText = "Contraseña incorrecta 💔";
    }
}
document.addEventListener("click", (e) => {
    if (e.target.matches(".sobre") || 
        e.target.matches(".solapa-derecha") ||
        e.target.matches(".solapa-izquierda") ||
        e.target.matches(".corazon")) {
        envoltura.classList.toggle("abierto");
      
    } else if (e.target.matches(".sobre *")) {
        if (!carta.classList.contains("abierta")) {
            carta.classList.add("mostrar-carta");

            setTimeout(() => {
                carta.classList.remove("mostrar-carta");
                carta.classList.add("abierta");
            }, 500);
            envoltura.classList.add("desactivar-sobre")
        } else {
            carta.classList.add("cerrando-carta");
            envoltura.classList.remove("desactivar-sobre");

            setTimeout(() => {
                carta.classList.remove("cerrando-carta")
                carta.classList.remove("abierta")
            }, 500);
        }

    } 
})