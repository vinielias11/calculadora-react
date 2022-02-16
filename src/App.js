import React, { useState } from 'react';

import Botao from './components/Botao/Botao';
import Container from './components/Container/Container';
import ContainerBotoes from './components/ContainerBotoes/ContainerBotoes';
import Display from './components/Display/Display';

const valoresParaOsBotoes = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="]
];

const App = () => {
  const [calc, setCalc] = useState({
    sinal: "",
    numero: 0,
    resposta: 0
  });

  const onClickNumero = e => {
    e.preventDefault();
    
    const valor = e.target.innerHTML;

    if (removerEspacos(calc.numero).length < 16) {
      setCalc({
        ...calc,
        num: calc.numero === 0 && valor === "0" 
        ? "0" 
        : removerEspacos(calc.numero) % 1 === 0 
        ? converteParaString(Number(removerEspacos(calc.numero + valor))) :
          converteParaString(calc.numero + valor),
        resposta: !calc.sinal ? 0 : calc.resposta
      })
    }
  };

  const onClickPonto = e => {
    e.preventDefault();
    
    const valor = e.target.innerHTML;

    setCalc({
      ...calc,
      numero: !calc.numero.toString().includes(".") ? calc.numero + valor : calc.numero
    });
  };

  const onClickSinal = e => {
    e.preventDefault();
    
    const valor = e.target.innerHTML;

    setCalc({
      ...calc,
      sinal: valor,
      resposta: !calc.resposta && calc.numero ? calc.numero : calc.resposta,
      numero: 0
    });
  };
  
  const onClickIgual = () => {
    if (calc.sinal && calc.numero) {
      const operacao = (a, b, sinal) => 
        sinal === "+" ? a + b :
        sinal === "-" ? a - b :
        sinal === "X" ? a * b :
        a / b;

        setCalc({
          ...calc,
          resposta:
            calc.numero === "0" && calc.sinal === "/" ? "Operação inválida" :
            converteParaString(operacao(Number(removerEspacos(calc.resposta)), Number(removerEspacos(calc.numero)), calc.sinal)),
          sinal: '',
          numero: 0
        });
    }
  };

  const onClickInverteSinal = () => {
    setCalc({
      ...calc,
      numero: calc.numero ? converteParaString(removerEspacos(calc.numero) * -1) : 0,
      resposta: calc.resposta ? converteParaString(removerEspacos(calc.resposta) * -1) : 0,
      sinal: ""
    });
  };

  const onClickPorcentagem = () => {
    let num = calc.numero ? parseFloat(removerEspacos(calc.numero)) : 0;
    let res = calc.resposta ? parseFloat(removerEspacos(calc.resposta)) : 0;
    
    setCalc({
      ...calc,
      numero: (num /= Math.pow(100, 1)),
      resposta: (res /= Math.pow(100, 1)),
      sinal: ""
    });
  };

  const onClickResetaDisplay = () => {
    setCalc({
      ...calc,
      sinal: "",
      numero: 0,
      resposta: 0
    });
  };

  const converteParaString = num =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

  const removerEspacos = num => num.toString().replace(/\s/g, "");

  return (
      <Container>
        <Display valor={calc.numero ? calc.numero : calc.resposta}/>
        <ContainerBotoes>
          {
            valoresParaOsBotoes.flat().map((botao, index) => {
              return (
                <Botao
                  key={index}
                  className={botao === "=" ? "igual" : ""}
                  valor={botao}
                  onClick={
                    botao === "C" ? onClickResetaDisplay :
                    botao === "+-" ? onClickInverteSinal :
                    botao === "%" ? onClickPorcentagem :
                    botao === "=" ? onClickIgual :
                    botao === "/" || botao === "X" || botao === "-" || botao === "+" ? onClickSinal :
                    botao === "." ? onClickPonto : onClickNumero
                  }
                />
              );
            })
          }
        </ContainerBotoes>
      </Container>
  );
}

export default App;
