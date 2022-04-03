import React, { useState, useEffect } from 'react'
import logo from '../assets/LBmeteo.png'
import axios from 'axios'

export default function Home(props) {

    const [clickRecenti, setclickRecenti] = useState(false);

    const api_key = process.env.REACT_APP_API_KEY
    const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${props.location}&appid=${api_key}&units=metric&lang=it`;

    const goToWeather = () => {

        setclickRecenti(false)

        if (props.location !== '') {
            axios.get(api_url).then((response) => {
                props.setData(response.data)
                console.log(response.data)
                props.setUi("Weather")
            }).catch(err => {
                console.error(err.message)
                props.setUi("Home")
                if (err.response.status === 404) {
                    alert('Città non trovata')
                } else if (err.response.status > 404) {
                    alert('Servizio non disponibile. Riprovare più tardi')
                } else {
                    alert('Errore')
                }

            })
        } else {
            alert('Inserisci una località')
        }
    }

    useEffect(() => {
        console.log(props.location)
        console.log(clickRecenti)
        if (clickRecenti) {
            goToWeather()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickRecenti])

    const enterSearchLocation = (event) => {
        if (event.key === 'Enter') {
            goToWeather()
        }
    }

    const deleteLocation = () => {
        props.setLocation('')
        document.getElementById("inputPlace").focus()
    }

    const cancellaRecenti = () => {
        props.setLuogo([])
        localStorage.setItem('luoghi', JSON.stringify([]))
    }

    return (
        <>
            <div style={{
                background: `url(${props.sfondo}) no-repeat center center/cover`, content: "", position: 'fixed', width: '100%', height: '100%',
                top: 0,
                left: 0,
                zIndex: -1,
                //filter: `blur(4px)`,
                transform: `scale(1.1)`
            }}>
            </div>
            <div className='app'>

                <div className="contenitore d-flex flex-column text-center">

                    <div className="header p-2 text-white fs-2 fw-bold"><img src={logo} alt='LBmeteo' /></div>

                    <div className="content p-2 flex-grow-1 w-100">

                        <div className='sezioneRicerca'>
                            <div className="ricerca input-group input-group-lg text-center">
                                <span className="input-group-text" id="inputGroup-sizing-lg"><i className='bi bi-geo'></i></span>

                                <input type="text" id="inputPlace" className="form-control text-center" placeholder="FIRENZE o ROMA, IT"
                                    value={props.location} onChange={event => props.setLocation(event.target.value.toUpperCase())} onKeyPress={enterSearchLocation}
                                />

                                <span className="input-group-text ricercaNascosto" id="inputGroup-sizing-lg"><i onClick={deleteLocation} className={'bi bi-x-circle ' + (props.location !== '' ? '' : 'invisibile')}></i></span>
                            </div>

                            <button type="button" className="btnCerca btn btn-light" onClick={goToWeather}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </button>
                        </div>

                        {[...props.luogo].length !== 0 ?
                            (<div className="sezioneRecenti">

                                <div className="recentiTitle">Recenti</div>

                                <div className="elencoRecenti">

                                    {[...props.luogo].map((item, key) => {
                                        return (
                                            <div className="elementoRecente" key={key}>
                                                <button type="button" className="btnRecenti btn btn-light" onClick={() => { props.setLocation(item.nome); setclickRecenti(true) }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cloud-sun iconaRecenti" viewBox="0 0 16 16">
                                                        <path d="M7 8a3.5 3.5 0 0 1 3.5 3.555.5.5 0 0 0 .624.492A1.503 1.503 0 0 1 13 13.5a1.5 1.5 0 0 1-1.5 1.5H3a2 2 0 1 1 .1-3.998.5.5 0 0 0 .51-.375A3.502 3.502 0 0 1 7 8zm4.473 3a4.5 4.5 0 0 0-8.72-.99A3 3 0 0 0 3 16h8.5a2.5 2.5 0 0 0 0-5h-.027z" />
                                                        <path d="M10.5 1.5a.5.5 0 0 0-1 0v1a.5.5 0 0 0 1 0v-1zm3.743 1.964a.5.5 0 1 0-.707-.707l-.708.707a.5.5 0 0 0 .708.708l.707-.708zm-7.779-.707a.5.5 0 0 0-.707.707l.707.708a.5.5 0 1 0 .708-.708l-.708-.707zm1.734 3.374a2 2 0 1 1 3.296 2.198c.199.281.372.582.516.898a3 3 0 1 0-4.84-3.225c.352.011.696.055 1.028.129zm4.484 4.074c.6.215 1.125.59 1.522 1.072a.5.5 0 0 0 .039-.742l-.707-.707a.5.5 0 0 0-.854.377zM14.5 6.5a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z" />
                                                    </svg>
                                                    <div className='locationRecenti'>{item.nome}</div>
                                                </button>
                                            </div>
                                        )
                                    })
                                    }
                                </div>

                                <div className="recentiCancella"><button className='btn btn-light' onClick={cancellaRecenti}><i className="bi bi-trash3-fill"></i> Cancella Recenti</button></div>

                            </div>) : null
                        }
                    </div>
                    <div className="footer p-2 text-white fs-6 bg-dark">LBmeteo © Leonardo Bianchini</div>

                </div>
            </div>
        </>
    )
}

