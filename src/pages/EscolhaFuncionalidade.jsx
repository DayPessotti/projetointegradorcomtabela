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
                    height: '90.5vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundImage: `url(${Fundo})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '60%', 
                    height: '60%',
                }}>
                    <CardFuncionalidade img={Figura1} header='Cadastro de Atribuição de Aulas' url={'/cadastro-aulas'} />
                    <div style={{ width: '40px' }}></div>
                    <CardFuncionalidade img={Figura2} header='Cadastro de Professores' url={'/cadastro-professores'} />
                </div>
            </div>
        </>
    );
}
