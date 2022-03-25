import Header from "../Header"
import Movie from "../Movie"
import Time from "../Time"
import { BrowserRouter, Routes, Route } from "react-router-dom"


export default function App(){
    return(
    <div className="app">
        <Header />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Movie />} />
                <Route path="/time/:movieID" element={<Time />} />
            </Routes>
		</BrowserRouter>
    </div>
    )
}