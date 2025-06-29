export default function Header(props) {  
    return (<div id="cabecera">
      <img className="logo" src={import.meta.env.BASE_URL + "sun.webp"} alt="logo" />
      <h3 className="mensaje">Bienvenido a la página de Mariano Lorenzo Kayser</h3>      
    </div>)
  }