import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
import TitlepageComponent from "./comonents/titlePageComponent";
import AddAdditionalPhotosComponent from "./comonents/addAdditionalPhotos";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavigarionComponent className="headerStyles" />
          <Routes>
            <Route exact path="/" element={<TitlepageComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/photoAlbum/" element={<TitlepageComponent />} />
            <Route path="/addPhoto" element={<AddPhotoComponent />} />
            <Route path="/album" element={<YourAlbumComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/showPhotos" element={<ShowPhotos />} />
            <Route path="/showPhotos" element={<ShowPhotos />} />
            <Route
              path="/addAdditionalPhotos"
              element={<AddAdditionalPhotosComponent />}
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
