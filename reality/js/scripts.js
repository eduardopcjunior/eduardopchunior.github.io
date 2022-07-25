/* Programação do contador de caracteres
do campo mensagem */
const spanMaximo = formulario.querySelector("#maximo");
const bCaracteres = formulario.querySelector("#caracteres");
const textMensagem = formulario.querySelector("#mensagem");

// Determinar a quantidade máxima de caracteres
let quantidade = 100;

// Evento para detectar a digitação (entrada) no campo
textMensagem.addEventListener("input", function(){
    
    // Capturando o que for digitado
    let conteudo = textMensagem.value;

    // Criando uma contagem regressiva
    let contagem = quantidade - conteudo.length;

    // Adicionando a contagem ao elemento HTML
    bCaracteres.textContent = contagem;

    if (contagem == 0) {
        bCaracteres.style.color = "red";
        textMensagem.style.boxShadow = "red 0 0 10px";
    } else {
        bCaracteres.style.color = "black";
        textMensagem.style.boxShadow = "black 0 0 10px";
    }
});

/* Programação do Formspree */
var form = document.getElementById("my-form");
    
    async function handleSubmit(event) {
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          status.innerHTML = "Obrigado por enviar!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! Deu ruim! Tente novamente mais tarde"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
    }
    form.addEventListener("submit", handleSubmit)