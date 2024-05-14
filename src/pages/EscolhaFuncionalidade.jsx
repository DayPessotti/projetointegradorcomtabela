import React from 'react';
import Figura1 from '../assets/sala.png';
import Figura2 from '../assets/coruja.png';
import Fundo from '../assets/Fundo.png';
import CardFuncionalidade from "../components/CardFuncionalidade";
import MenuApp from '../components/MenuApp';


export default function EscolhaFuncionalidade() {
    if(!sessionStorage.getItem('userData')){
        return window.location = "/";
      }
    return (
        <>
            <MenuApp />
            <div
                style={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: `url(${Fundo})`, // Adiciona a imagem de fundo
                    backgroundSize: 'cover', // Garante que a imagem de fundo cubra toda a área
                    backgroundPosition: 'center', // Centraliza a imagem de fundo
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center', // Centraliza os elementos na linha
                    alignItems: 'center',
                    width: '60%', // Ajusta a largura do container principal
                    height: '60%',
                }}>
                    <CardFuncionalidade img={Figura1} header='Atribuição de Aulas' url={'/atribuicao-aulas'} />
                    <div style={{ width: '40px' }}></div> {/* Espaço entre os cards */}
                    <CardFuncionalidade img={Figura2} header='Cadastro de Professores' url={'/cadastro-professores'} />
                </div>
            </div>
        </>
    );
}
