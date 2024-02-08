import { Header } from "./components/Header";
import "./App.css";
import { Home } from "./components/Home";
import { Navigation } from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import { DetailArticle } from "./components/DetailArticle";
import { useEffect, useState } from "react";
import  UserContext  from "./contexts/UserContext";
import { Users } from "./components/Users";


function App() {

  const [currentUser, setCurrentUser] = useState({});


  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);


  return (
    <>
      <div>
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
          <Navigation user={currentUser} />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/articles/:article_id/comments"
              element={<DetailArticle />}
            />
            <Route path="/users" element={<Users />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </>
  );
}

export default App;
