import './App.css'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import HomeView from './views/HomeView'
import GameView from './components/GameView'
import ScoreView from './components/ScoreView'
import CustomGameConfigView from './views/CustomGameConfigView'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeView />} />
        <Route path='/GameView' element={<GameView/>}/>
        <Route path='/ScoresView' element={<ScoreView/>}/>
        <Route path='/CustomConfig' element={<CustomGameConfigView/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
