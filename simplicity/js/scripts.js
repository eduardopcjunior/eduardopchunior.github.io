/* JS INICIAL PARA CEP/ENDEREÇO */
const formulario = document.querySelector("form");
const inputCep = formulario.querySelector("#cep");
const inputTelefone = formulario.querySelector("#telefone");
const inputEndereco = formulario.querySelector("#endereco");
const inputBairro = formulario.querySelector("#bairro");
const inputCidade = formulario.querySelector("#cidade");
const inputEstado = formulario.querySelector("#estado");
const bStatus = formulario.querySelector("#status");
const botaoLocalizar = formulario.querySelector("#localizar-cep");

botaoLocalizar.addEventListener("click", function (event) {
    event.preventDefault();

    /* Site de programadores: viacep.com.br */

    /* Pegar cep digitado */
    let cep = inputCep.value;
    // CEP no padrão da API
    let url = `http://viacep.com.br/ws/${cep}/json/`;

    /*  AJAX: Comunicação assíncrona com ViaCEP uando a função chamada fetch */

    // 1) Fazer a conexão com a API
    fetch(url)
        // 2) Recupere a resposta desse acesso no formato JSON
        .then(resposta => resposta.json())

        // 3) Mostre os dados
        .then(dados => {
            if ("erro" in dados) {
                bStatus.innerHTML = "CEP não encontrado";
                inputCep.focus();

            } else {
                bStatus.innerHTML = "CEP encontrado!";
                inputEndereco.value = dados.logradouro;
                inputBairro.value = dados.bairro;
                inputCidade.value = dados.localidade;
                inputEstado.value = dados.uf;
            };
        });
});
/* http://vanilla-masker.github.io/vanilla-masker */

VMasker(inputCep).maskPattern("99999-999");
VMasker(inputTelefone).maskPattern("(99) 99999-999");

/* Programação do contador de caracteres */
const spanMaximo = formulario.querySelector("#maximo");
const bCaracteres = formulario.querySelector("#caracteres");
const textMensagem = formulario.querySelector("#mensagem");

// Determinar a quantidade máxima de caracteres
let quantidade = 100;

/* Evento de digitação em tempo real (input)*/
textMensagem.addEventListener("input", function(){
    //Capturando o que foi digitado
    let conteudo = textMensagem.value;
    //Criando uma contagem regressiva
    let contagem = quantidade - conteudo.length;

    bCaracteres.textContent = contagem

    if (contagem == 0) {
        bCaracteres.style.color = "red"
        textMensagem.style.boxShadow = "red 0 0 10px"
    } else {
        bCaracteres.style.color = "black"
        textMensagem.style.boxShadow = "none"
    };
});

/* https://formspree.io/ */



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
          status.innerHTML = "Enviado!";
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Ops! Deu ruim! Tente novamente mais tarde."
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Ops! Deu ruim! Tente novamente mais tarde"
      });
    }
    form.addEventListener("submit", handleSubmit)