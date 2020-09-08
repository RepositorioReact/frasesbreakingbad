import React, {useState, useEffect} from 'react';
import Frase from './components/Frase';
import styled from '@emotion/styled';


const Contenedor = styled.div`
  display:flex;
  align-items:center;
  padding-top:5rem;
  flex-direction:column;
`;

const Boton = styled.button`
  background: -webkit-linear-gradient(top left, #007d35 0%, #007d35 40%, #0f574e 100%);
  background-size:300px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top:3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid black;
  transition: background-size .8s ease;

  :hover{
    cursor:pointer;
    background-size:400px;
  }
`;

function App() {

  //useState de frases, para una vez que se hace la consulta, se coloca con la funcion del state para pasarla a otros componentes
  const [frase, guardarFrase] = useState({});//se accede a un objeto 

  /*const consultarApi = () =>{
    const api = fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    //fetch funciona con prosime, por lo que la promesa se pone con then(). Si en la consola de chrome pone pending, hará falta un .then()
    const frase = api.then(respuesta =>respuesta.json());//quitamos las {} y se da por implicito el return, si va con llaves hay que ponerle el return
    frase.then(resultado => console.log(resultado));
  }*/
  //con async-> detiene la ejecución del código hasta que la parte await se complete
  const consultarApi = async () =>{
    const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    const frase = await api.json();
    //la ventaja de tener la frase en el state guardarFrase es que recarga automaticamente la frase al dar click al boton gracias a react
    guardarFrase(frase[0]);
  }

  //Cargar una frase sin dar click nada más iniciar la aplicacion con useEffect
  //Es parecido a document.ready
  useEffect(()=>{
    consultarApi();
  },[]);// las [] vacias hace que lo consulte por lo menos una vez


  return (
    <Contenedor>
      <Frase
        frase={frase}
      />
      <Boton
        onClick={consultarApi}
      >
        Obtener frase
      </Boton>
    </Contenedor>
  );
}

export default App;
