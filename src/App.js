import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

import "./App.css";

import LoginComponent from "./comonents/loginComponent";
import NavigarionComponent from "./comonents/navigation";
import AddPhotoComponent from "./comonents/addPhotoComponent";
import YourAlbumComponent from "./comonents/yourAlbumComponent";

function App() {
  return (
    <Router>
      <div className="App">
        <NavigarionComponent className="headerStyles" />
        <Routes>
          <Route exact path="/" element={<LoginComponent />} />
          <Route path="/addPhoto" element={<AddPhotoComponent />} />
          <Route path="/album" element={<YourAlbumComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
