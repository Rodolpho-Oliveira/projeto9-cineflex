import axios from "axios"
import { useState, useEffect} from "react"
import { useParams, useNavigate} from 'react-router-dom'
import "./style.css"

function Seat(){
  const {timeID} = useParams()
  const [seats, setSeats] = useState([])
  const [seatsNum, setSeatsNum] = useState ([])
  const [seatID, setSeatID] = useState([])
  const [data, setData] = useState({ Name: "", CPF: ""})
  const navigate = useNavigate()

  function dataConfirmation(event) {
    event.preventDefault()
    if (seatID !== [] && data.CPF.length === 14) {
        const ticketData = {
            ids: seatID,
            name: data.Name,
            cpf: data.CPF,
            seats: data.Seats
        }
        const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", ticketData)
        promise.then((response) => {
          navigate("/success", { state: {ticketData, seatsNum}})
      })
    }
    else{
      alert("Preencha corretamente!")
    }
  }

    const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${timeID}/seats`)
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
                        seatsNum.includes(seatNumber.name) ?
                          setSeatsNum(() => {
                            let seatsNums = seatsNum.filter(name => name !== seatNumber.name)
                            return seatsNums
                        }) : setSeatsNum([...seatsNum, seatNumber.name])
                }}>
                <p>{seatNumber.name}</p></div> : <div onClick={() => alert("Este assento não está disponível")} className="seatUnavailable"><p>{seatNumber.name}</p></div>)}
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
            <button  type="submit">Reservar assento(s)</button>
          </div>
        </form>
      </div>
    )
}

export default Seat
