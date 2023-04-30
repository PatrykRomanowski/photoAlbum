import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";
import { Provider } from "react-redux";

import "./App.css";

import store from "./store";

import LoginComponent from "./comonents/loginComponent";
import NavigarionComponent from "./comonents/navigation";
import AddPhotoComponent from "./comonents/addPhotoComponent";
import YourAlbumComponent from "./comonents/yourAlbumComponent";
import RegisterComponent from "./comonents/registerComponent";
import Logout from "./comonents/logout";
import ShowPhotos from "./comonents/showPhotoComponent";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavigarionComponent className="headerStyles" />
          <Routes>
            <Route exact path="/" element={<LoginComponent />} />
            <Route path="/addPhoto" element={<AddPhotoComponent />} />
            <Route path="/album" element={<YourAlbumComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/showPhotos" element={<ShowPhotos />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;