export default function Resultados({ numitems, datos }) {
  // Extraemos location y forecast de los datos
  const { location, forecast } = datos;

  // Verificamos que forecast y forecastday existan antes de intentar usarlos
  if (!datos || !forecast || !forecast.forecastday) {
    return <div>No hay datos disponibles</div>;
  }

  return (
    <div id="resultados">
      <h4>El tiempo en los próximos días será:</h4>
      <h3>Ciudad: {location.name}</h3>
      <h3>País: {location.country}</h3>
      <h3>Código Timezone: {location.tz_id}</h3> 
      <ul style={{ display: 'flex', justifyContent: 'space-around', padding: 0 }}>
        {/* Iteramos sobre los primeros numitems de forecastday */}
        {forecast.forecastday.slice(0, numitems).map((item, index) => (
          <li key={index} style={{ border: '1px solid #000', padding: '10px', listStyle: 'none', textAlign: 'center' }}>
            <h4>{new Date(item.date_epoch * 1000).toLocaleDateString()}</h4>
            <img className="tiempoimg" src={item.day.condition.icon} alt={`Icono del tiempo en ${location.name}`} />
            <p>{item.day.condition.text}</p>
            <p>Temp: {item.day.avgtemp_c}°C</p>
            <p>Humedad: {item.day.avghumidity}%</p>
            <p>Viento: {item.day.maxwind_kph} km/h</p>
          </li>
        ))}
      </ul>
    </div>
  );
}