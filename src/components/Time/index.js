import { useState, useEffect } from "react"
import { useParams } from 'react-router-dom';
import axios from "axios"

import "./style.css"


function Time(){
    const {movieID} = useParams()
    const [time, setTime] = useState([])
    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieID}/showtimes`)

        promise.then(times => {
            setTime(times.data.days)
            
        })
    }, [])
    return (
        <div className="time">
            <h2>Selecione o horário</h2>
            {time.map(movieTime =>{ const {showtimes: showTimes} = movieTime 
                return( <div><p>{movieTime.weekday} - {movieTime.date}</p> 
                <div>{showTimes.map(hour =>  <p>{hour.name}</p>)}</div>
                </div>)})}
        </div>
    )
        
}

export default Time