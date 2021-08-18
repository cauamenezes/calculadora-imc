//função que calcula o IMC
function calcularImc(peso, altura) {
  //retorna o calculo do IMC e limita a quantidade de caracteres que serão exibidos, para apenas um após a vírgula
  return (peso / altura ** 2).toFixed(1);
}

//função que determina a classificação do IMC do usuário de acordo com o que ele inseriu
function classificar(imc) {
  let classificao = "";
  if (imc < 18.5) {
    classificao = " abaixo do peso.";
  } else if (imc < 25) {
    classificao = " com o peso ideal. <span class="verde">Parabéns!</span>"
  } else if (imc < 30) {
    classificao = " levemente acima do peso.";
  } else if (imc < 35) {
    classificao = " com obesidade grau I.";
  } else if (imc < 40) {
    classificao = " com obesidade grau II.";
  } else {
    classificao = " com obesidade grau III. <span class="vermelho">Cuidado!</span>"
  }

  return classificao;
}

// função que valida se os campos do formulário estão preenchidos de acordo com o que está no html
function camposValidos() {
  return document.querySelector("form").reportValidity();
}

// função que exibe o resultado do cálculo do IMC
function exibirResultado() {
  const resultado = document.getElementById("resultado");
  const nome = document.getElementById("nome").value;
  const peso = parseFloat(
    document.getElementById("peso").value.replace(",", ".")
  );
  const altura = parseFloat(
    document.getElementById("altura").value.replace(",", ".")
  );
  if (camposValidos()) {
    const imc = calcularImc(peso, altura);
    const classificacao = classificar(imc);

    //exibe uma mensagem na caixa de texto "resultado" após o botão ser pressionado
    resultado.innerHTML.textContent = `${nome} seu IMC é ${imc
      .toString()
      .replace(".", ",")} e você está ${classificacao}`;
  } else {
    resultado.textContent = "Preencha todos os campos";
  }
}

function capturarEnter(event) {
  if (event.key == "Enter") {
    exibirResultado();
  }
}

//eventos
//pega o botão calcular pelo id e adiciona um ouvinte de evento que, quando o mesmo é pressionado/clicado, o resultado é exibido através do função indicado
document.getElementById("calcular").addEventListener("click", exibirResultado);

document.querySelector("form").addEventListener("keypress", capturarEnter);
