import React, { useEffect } from 'react'
import logo from '../assets/LBmeteo.png'
import moment from 'moment'

export default function Weather(props) {

    useEffect(() => {

        let luoghiRecenti = []
        let luoghiRecentiMax4 = []
        console.log('Lista' + [...props.luogo])
        if ([...props.luogo].find(item => item.nome === props.location)) {
            console.log('SPOSTATO')
            let elementiRimasti = [...props.luogo].filter(item => item.nome !== props.location)
            luoghiRecenti = [...elementiRimasti]
            luoghiRecenti.unshift({ nome: props.location })
        } else {
            console.log('AGGIUNTO')
            luoghiRecenti = [...props.luogo]
            luoghiRecenti.unshift({ nome: props.location })
        }

        luoghiRecentiMax4 = luoghiRecenti.slice(0, 4)
        console.log('Nuova Lista' + luoghiRecentiMax4)
        props.setLuogo(luoghiRecentiMax4)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div style={{
                background: `url(${props.sfondo}) no-repeat center center/cover`, content: "", position: 'fixed', width: '100%', height: '100%',
                top: 0,
                left: 0,
                zIndex: -1,
                filter: `blur(4px)`,
                transform: `scale(1.1)`
            }}>
            </div>
            <div className='app'>

                <div className="contenitore d-flex flex-column text-center">

                    <div className="header p-2 text-white fs-2 fw-bold"><img src={logo} alt='LBmeteo' /></div>

                    <div className="content p-2 flex-grow-1 w-100">

                        <div className="sezioneMeteo d-flex">

                            <div className="col w-50">
                                <div className="location">{props.data ? props.data.name.toUpperCase() : null}, {props.data.sys ? props.data.sys.country.toUpperCase() : null}</div>
                                <div className="temperature">{props.data.main ? props.data.main.temp.toFixed(1) : null} °C</div>
                            </div>
                            <div className="col w-50">
                                <div className="currentWeather">
                                    <img height={180} src={`http://openweathermap.org/img/wn/${props.data.weather ? props.data.weather[0].icon : null}@4x.png`} alt={props.data.weather ? props.data.weather[0].main : null} />
                                </div>
                            </div>
                        </div>

                        <div className="sezioneMeteo d-flex">
                            <div className="col w-50">
                                <div className="forecast">{props.data.weather ? props.data.weather[0].description : null}</div>
                            </div>
                            <div className="col w-50">
                                <div className="wind"><i className="bi bi-wind"></i> {props.data.wind ? (props.data.wind.speed * 3.6).toFixed(2) : null} km/h</div>
                            </div>
                        </div>

                        <div className="sezioneMeteo d-flex">
                            <div className="col w-50">
                                <div className="temp"><i className="bi bi-thermometer-snow"></i> {props.data.main ? props.data.main.temp_min.toFixed(1) : null} °C</div>
                            </div>
                            <div className="col w-50">
                                <div className="temp"><i className="bi bi-thermometer-sun"></i> {props.data.main ? props.data.main.temp_max.toFixed(1) : null} °C</div>
                            </div>
                        </div>

                        <div className="sezioneMeteo d-flex">
                            <div className="col w-50">
                                <div className="temp"><i className="bi bi-sunrise"></i> {props.data.sys ? moment.unix(props.data.sys.sunrise).utcOffset(props.data.timezone / 3600).format("HH:mm") : null}</div>
                            </div>
                            <div className="col w-50">
                                <div className="temp"><i className="bi bi-sunset-fill"></i> {props.data.sys ? moment.unix(props.data.sys.sunset).utcOffset(props.data.timezone / 3600).format("HH:mm") : null}</div>
                            </div>
                        </div>

                        <div className="backBtn">
                            <button type="button" className="btnCerca btn btn-light" onClick={() => {

                                props.setData({})
                                props.setUi("Home")

                            }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                                </svg>
                            </button>
                        </div>

                    </div>


                    <div className="footer p-2 text-white fs-6 bg-dark">LBmeteo © Leonardo Bianchini</div>

                </div>

            </div>
        </>
    )
}
