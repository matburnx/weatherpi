async function fetchCSV(url) {
  try {
    const response = await fetch(url);
    const textdata = await response.text();
    const linedata = textdata.split("\n").filter(values => values !== "");
    const csvdata = linedata.map(line => line.split(","));
    return csvdata;
  } catch (error) {
    console.error("Error fetching CSV file:", error);
  }
}

function humanTime(value) {
  const date = new Date(parseInt(value)*1000);
  // Get hours from the timestamp
  const hours = date.getUTCHours();
  
  // Get minutes part from the timestamp
  const minutes = date.getUTCMinutes();
  
  // Get seconds part from the timestamp
  const seconds = date.getUTCSeconds();
  
  const formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  return formattedTime;
}

(async () => {
  try {
    const unixTime = Math.floor(Date.now() / 86400000);
    const csvdata = await fetchCSV("./"+unixTime.toString()+".csv");
    const timestamps = csvdata.map(values => humanTime(values[0]));
    const temperatures = csvdata.map(values => values[1]);
    const humidities = csvdata.map(values => values[2]);
    const pressures = csvdata.map(values => values[3]);

    const data = {
      labels: timestamps,
      datasets: [
        {
          label: 'Temperature (°C)',
          data: temperatures,
          yAxisID: 'y',
        },
        {
          label: 'Humidity (%)',
          data: humidities,
          yAxisID: 'y1',
        },
        {
          label: 'Pressure (hPa)',
          data: pressures,
          yAxisID: 'y2',
        }
      ]
    };
    
    const config = {
      type: "line",
      data: data
    };
    
    
    new Chart(
      document.getElementById('firstchart'),
      config
    );
    
    document.getElementById('currentTemperature').innerHTML = `${temperatures[temperatures.length-1]}°C`;
    document.getElementById('currentHumidity').innerHTML = `${humidities[humidities.length-1]} %`;
    document.getElementById('currentPressure').innerHTML = `${pressures[pressures.length-1]} hPa`;
  } catch (error) {
    console.error('Error before doing chart:', error);
  }
})();

