import {FabricJSCanvas, useFabricJSEditor} from "fabricjs-react";
import {Route, Routes} from "react-router-dom";
import {ConstructionPage} from "./pages/ConstructionPage/ConstructionPage.jsx";
import './assets/styles/global.css'
import './assets/styles/normalize.css'

const App = () => {
  const { editor, onReady } = useFabricJSEditor()
  const onAddCircle = () => {
    editor?.addCircle()
  }
  const onAddRectangle = () => {
    editor?.addRectangle()
  }

  return (
      // <ConstructionPage/>
      <Routes>
         <Route path={"/"} element={<ConstructionPage />} />
      </Routes>
      // <div>
      //   <button onClick={onAddCircle}>Add circle</button>
      //   <button onClick={onAddRectangle}>Add Rectangle</button>
      //   <FabricJSCanvas className="sample-canvas" onReady={onReady} />
      // </div>

  )
}

export default App;
