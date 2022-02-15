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
                  onClick={() => {
                    console.log(`${botao} clicado`);
                  }}
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
