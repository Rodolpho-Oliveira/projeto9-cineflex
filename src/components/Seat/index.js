import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, Link, useNavigate} from 'react-router-dom'
import "./style.css"

function Seat(){
  const {timeID} = useParams()
  const [seats, setSeats] = useState([])
  const [seatID, setSeatID] = useState([])
  const [data, setData] = useState({ Name: "", CPF: "" })
  const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${timeID}/seats`)

  function dataConfirmation(event) {
    event.preventDefault()
    if (seatID !== [] && data.CPF.length === 14) {
        const ticketData = {
            ids: seatID,
            name: data.Name,
            cpf: data.CPF
        }
        axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", ticketData)
    }
    else{
      alert("Preencha corretamente!")
    }
  }

    useEffect(() => {
    promise.then(seat =>{
             setSeats(seat.data.seats)
            })
    }, [])
    return(
      <div className="seats">
        <div className="seat">
          <h2>Selecione o(s) assento(s)</h2>
            {seats.map(seatNumber => seatNumber.isAvailable ? <div  className={`seat ${seatID.includes(seatNumber.id) ? "seatSelected" : "seatAvailable"}`}
                onClick={() => {
                    seatID.includes(seatNumber.id)
                        ? setSeatID(() => {
                            let seatIds = seatID.filter(ids => ids !== seatNumber.id)
                            return seatIds
                        })
                        : setSeatID([...seatID, seatNumber.id])
                }}>
                <p>{seatNumber.name}</p></div> : <div className="seatUnavailable"><p>{seatNumber.name}</p></div>)}
        </div>
        <div className="seat-subtitle">
          <div><div className="seatSelected"></div><p>Selecioanado</p></div>
          <div><div className="seatAvailable"></div><p>Disponível</p></div>
          <div><div className="seatUnavailable"></div><p>Indisponível</p></div>
        </div>
        <form onSubmit={dataConfirmation}> 
          <p>Nome do comprador:</p>
          <input type="text" required placeholder="Digite seu nome..." onChange={(e) => {
            setData({ ...data, Name: e.target.value })
            }}/>
          <p>CPF do comprador:</p>
          <input type="number" required placeholder="Digite seu CPF..." onChange={(e) => {
            setData({ ...data, CPF: e.target.value })
          }} maxLength={14}/>
          <div className="seat-button">
            <button type="submit">Reservar assento(s)</button>
          </div>
        </form>
        {console.log(data, seatID)}
      </div>
    )
}

export default Seat
