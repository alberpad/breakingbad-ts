import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IFraseProps {
  frase: IFrase;
}
const Frase = (props: IFraseProps) => {
  const { author, quote } = props.frase;
  return (
    <div className="frase">
      <h1>{quote}</h1>
      <p>- {author}</p>
    </div>
  );
};

interface IFrase {
  quote: string;
  author: string;
}
const initialState = {
  quote: '',
  author: ''
};
const App: React.FC = () => {
  const [frase, setFrase] = useState<IFrase>(initialState);

  async function consultarApi() {
    try {
      const response = await axios(
        'https://breaking-bad-quotes.herokuapp.com/v1/quotes'
      );
      // console.log(response.data[0]);
      setFrase(response.data[0]);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    consultarApi();
  }, []); // Si no se pone el [] tendríamos infinitas llamadas a la api

  return (
    <div className="contenedor">
      <Frase frase={frase} />
      <button onClick={consultarApi}>Generar Nueva</button>
    </div>
  );
};

export default App;
