import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import "./style.css"

export default function Movie(){
    const [movie, setMovie] = useState([])
        useEffect(() => {
            const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
            promise.then(movies => {
                setMovie(movies.data)
            })
        }, [])
        return(
            <>
                <h2 className='movie-h2'>Selecione o filme</h2>
                <div className='movie'>
                    {movie.map(moviePoster =><Link to={`time/${moviePoster.id}`}><div><img src={moviePoster.posterURL}/> </div></Link>)}
                </div>
            </>
        )
}
