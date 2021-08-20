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
    // o span é usado como tag genérica para o texto herdar a formatação da classe com a cor indicada.
    classificao = 'com o peso ideal. <span class="azul">Parabéns!</span>';
  } else if (imc < 30) {
    classificao = " levemente acima do peso.";
  } else if (imc < 35) {
    classificao = " com obesidade grau I.";
  } else if (imc < 40) {
    classificao = " com obesidade grau II.";
  } else {
    classificao =
      'com obesidade grau III. <span class="vermelho">Cuidado!</span>';
  }

  return classificao;
}

// função que valida se os campos do formulário estão preenchidos de acordo com o que está no HTML (no caso, o required no nome, peso e altura)
function camposValidos() {
  //retorna o formulário após a validação herdada do HTML
  // a diferença do getElementById para o querySelector é que, a mesma somente manipula itens através de seus id's, já o querySelector, seleciona eles através de quaisquer tipos de seleção, como por exemplo pela classe
  return document.querySelector("form").reportValidity();
}

// função que exibe o resultado do cálculo do IMC
function exibirResultado() {
  const resultado = document.getElementById("resultado");
  // o valor que o usuário digitar no campo de nome será pego com o .value
  const nome = document.getElementById("nome").value;
  // como se tratam de números, as Strings são convertidos em números decimais (com ponto flutuante)
  // o .replace, nesse caso, substitui a vírgula por ponto final, ou seja, se o usuário digitar o seu peso com vírgula, o sistem irá considerar como se fosse um ponto.
  const peso = parseFloat(
    document.getElementById("peso").value.replace(",", ".")
  );
  const altura = parseFloat(
    document.getElementById("altura").value.replace(",", ".")
  );
  // se os campos forem validados, será exibida uma mensagem com seu nome, resultado do imc e sua classificação
  if (camposValidos()) {
    const imc = calcularImc(peso, altura);
    const classificacao = classificar(imc);

    //exibe uma mensagem na caixa de texto "resultado" após o botão ser pressionado
    // o resultado herda a validação do HTML em innerHTML
    // o valor do IMC é convertido em String por se tratar de um número, para assim, poder ser exibido como mensagem
    resultado.innerHTML = `${nome} seu IMC é ${imc
      .toString()
      .replace(".", ",")} e você está ${classificacao}`;
  } else {
    // senão, se a validação for mal sucedida, será exibida a mensagem indicada abaixo
    resultado.textContent = "Preencha todos os campos";
  }
}

// função que captura o click da tecla enter
function capturarEnter(event) {
  // se o enter for pressionado, o resultado será exibido
  if (event.key == "Enter") {
    exibirResultado();
  }
}

//eventos
//pega o botão calcular pelo id e adiciona um ouvinte de evento que, quando o mesmo é pressionado/clicado, o resultado é exibido através da função indicada
document.getElementById("calcular").addEventListener("click", exibirResultado);

// a função capturarEnter é efetivada no formulário
document.querySelector("form").addEventListener("keypress", capturarEnter);
