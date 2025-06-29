export default function Header(props) {  
    return (<div id="micabecera">
      <img className="milogo" src={import.meta.env.BASE_URL + "sun.webp"} alt="logo" />
      <h3 id="mensaje">Bienvenido a la página de Mariano Lorenzo Kayser</h3>      
    </div>)
  }