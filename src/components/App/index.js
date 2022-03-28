import Header from "../Header"
import Movie from "../Movie"
import Time from "../Time"
import Seat from "../Seat"
import Success from "../Success"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App(){
    return(
    <div className="app">
        <Header />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Movie />} />
                <Route path="/time/:movieID/" element={<Time />} />
                <Route path="/time/:movieID/seats/:timeID" element={<Seat />} />
                <Route path="/success" element={<Success />}/>
            </Routes>
		</BrowserRouter>
    </div>
    )
}