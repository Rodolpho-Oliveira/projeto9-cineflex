import { useLocation} from "react-router-dom"

import "./style.css"

export default function Success(){
    const location = useLocation()
    const {ticketData: {name, cpf}, seatsNum} = location.state
    return <>
            <h2 className="h2-sucess">Pedido feito com sucesso!</h2>
        <div className="success">
            <div>
                <h3>Filme e sessão</h3>
            </div>
            <div>
                <h3>Ingressos</h3>
                <p>{seatsNum.map((number) =>"Assento " + number + " ")}</p>
            </div>
            <div>
                
                <h3>Comprador</h3>
                <p>Nome: {name}</p>
                <p>CPF: {cpf}</p>
            </div>
        </div>
    </>
}