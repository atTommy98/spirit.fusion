import { Routes, Route } from 'react-router-dom'

import DisplayScreen from './components/DisplayScreen'
import ControllerScreen from './components/ControllerScreen'

function App() {
    return (
        <Routes>
            <Route path='/display/*' element={<DisplayScreen />} />
            <Route path='/controller/*' element={<ControllerScreen />} />

            <Route
                path='/'
                element={
                    <div>
                        <a style={{ display: 'block', padding: '30px' }} href='/display'>
                            DISPLAY SCREEN
                        </a>
                        <br />
                        <a style={{ display: 'block', padding: '30px' }} href='/controller'>
                            CONTROLLER SCREEN
                        </a>
                    </div>
                }
            />
        </Routes>
    )
}

export default App
