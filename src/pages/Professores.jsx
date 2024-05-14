import DadosCadastroProfessores from "../components/DadosCadastroProfessores";
import MenuApp from "../components/MenuApp";

export default function Professores() {
    if(!sessionStorage.getItem('userData')){
        return window.location = "/";
      }
    
    return (
        <>
        <MenuApp />
        <DadosCadastroProfessores />
        </>
    )
}