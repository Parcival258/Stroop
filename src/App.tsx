import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import HomeView from './views/HomeView'
import GameView from './components/GameView'
import ScoreView from './components/ScoreView'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/GameView' element={<GameView/>}/>
        <Route path='/ScoresView' element={<ScoreView/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
