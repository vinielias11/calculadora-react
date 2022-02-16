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

  onClickSinal = e => {
    const valor = e.target.innerHTML;

    e.preventDefault();

    setCalc({
      ...calc,
      sinal: valor,
      resposta: !calc.resposta && calc.numero ? calc.numero : calc.resposta,
      numero: 0
    });
  }

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
