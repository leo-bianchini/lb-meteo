import './App.css';
import React, { useState } from "react";
import Home from './components/Home';
import Weather from './components/Weather';
import aurora from './assets/sfondi/aurora.jpg'
import beach from './assets/sfondi/beach.jpg'
import clouds from './assets/sfondi/clouds.jpg'
import fog from './assets/sfondi/fog.jpg'
import hills from './assets/sfondi/hills.jpg'
import lightning from './assets/sfondi/lightning.jpg'
import nature from './assets/sfondi/nature.jpg'
import rain from './assets/sfondi/rain.jpg'
import sky from './assets/sfondi/sky.jpg'
import snow from './assets/sfondi/snow.jpg'
import sunrise from './assets/sfondi/sunrise.jpg'
import sunset from './assets/sfondi/sunset.jpg'

let stato_ui = 'Home';
let luoghiRecenti = {
  lista: [
    // {
    //   nome: "FIRENZE"
    // },
    // {
    //   nome: "MILANO"
    // },
    // {
    //   nome: "TORINO"
    // },
    // {
    //   nome: "NAPOLI"
    // }
  ]
}

function App() {

  // if (localStorage.getItem('stato_ui') != null) {
  //   stato_ui = localStorage.getItem('stato_ui')
  // }

  if (localStorage.getItem('luoghi') != null) {
    luoghiRecenti.lista = JSON.parse(localStorage.getItem('luoghi'))
  }
  // else {
  //   localStorage.setItem('luoghi', JSON.stringify(luoghiRecenti.lista))
  // }

  const [ui, setUi] = useState(stato_ui);
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [luogo, setLuogo] = useState(luoghiRecenti.lista);

  const sfondi = [aurora, beach, clouds, fog, hills, lightning, nature, rain, sky, snow, sunrise, sunset]
  const sfondoRandom = sfondi[Math.floor(Math.random() * sfondi.length)]
  const [sfondo, setSfondo] = useState(sfondoRandom)

  // localStorage.setItem('stato_ui', ui)

  localStorage.setItem('luoghi', JSON.stringify(luogo))

  console.log(localStorage.getItem('luoghi'))

  if (ui === "Home") {
    return <Home
      setUi={setUi}
      ui={ui}
      setLocation={setLocation}
      location={location}
      setData={setData}
      data={data}
      setSfondo={setSfondo}
      sfondo={sfondo}
      setLuogo={setLuogo}
      luogo={luogo}
    />
  } else if (ui === "Weather") {
    return <Weather
      setUi={setUi}
      ui={ui}
      setLocation={setLocation}
      location={location}
      setData={setData}
      data={data}
      setSfondo={setSfondo}
      sfondo={sfondo}
      setLuogo={setLuogo}
      luogo={luogo}
    />
  }
}

export default App;
