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
    sinal: '',
    numero: 0,
    resposta: 0
  });

  const onClickNumero = e => {
    const valor = e.target.innerHTML;

    e.preventDefault();

    if (calc.numero.length < 16) {
      setCalc({
        ...calc,
        num: calc.numero === 0 && valor === "0" ? "0" :
          calc.numero % 1 === 0 ? Number(calc.numero + valor) :
          calc.numero + valor,
        resposta: !calc.sinal ? 0 : calc.resposta
      })
    }
  };

  const onClickPonto = e => {
    const valor = e.target.innerHTML;

    e.preventDefault();

    setCalc({
      ...calc,
      numero: !calc.numero.toString().includes(".") ? calc.numero + valor : calc.numero
    });
  };

  const onClickSinal = e => {
    const valor = e.target.innerHTML;

    e.preventDefault();

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
            operacao(Number(calc.resposta), Number(calc.numero), calc.sinal),
          sinal: '',
          numero: 0
        });
    }
  };

  const onClickInverteSinal = () => {
    setCalc({
      ...calc,
      numero: calc.numero ? calc.numero * -1 : 0,
      resposta: calc.resposta ? calc.resposta * -1 : 0,
      sinal: ''
    });
  };

  const onClickPorcentagem = () => {
    let num = calc.numero ? parseFloat(calc.numero) : 0,
      res = calc.resposta ? parseFloat(calc.resposta) : 0;
    
    setCalc({
      ...calc,
      numero: (num /= Math.pow(100, 1)),
      resposta: (res /= Math.pow(100, 1)),
      sinal: ''
    });
  };

  const onClickResetaDisplay = () => {
    setCalc({
      ...calc,
      sinal: '',
      numero: 0,
      resposta: 0
    });
  };

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
