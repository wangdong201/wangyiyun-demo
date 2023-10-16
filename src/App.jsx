import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home/HomeView";
import MvRankingList from "./views/Mv/MvRankingList";
import SearchView from "./views/SearchView/SearchView";
import Mine from "./views/Mine/Mine";
import Concern from "./views/Concern/Concern";
import Community from "./views/Community/Community";
import TabBarBlock from "./components/TabBar.jsx";
import Login from "./views/Login/Login";
import PersonalData from "./views/PersonalData/PersonalData";
import PlayMv from "./views/PlayMv/PlayMv";
import PlayMusic from "./views/PlayMusic/PlayMusic";
import MusicPlayBack from "./views/MusicPlayBack/MusicPlayBack";
import SingerSquare from "./views/SingerSquare/SingerSquare";
import PlayMusicCom from "./components/player/PlayMusicCom";
import MusicLabel from "./views/MusicLabel/MusicLabel";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" />} />
        <Route
          path="/Home"
          element={
            <>
              <TabBarBlock />
              <Home />
            </>
          }
        />
        <Route path="/MvRankingList" element={<MvRankingList />} />
        <Route path="/Mine" element={<Mine />} />
        <Route path="/Concern" element={<Concern />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/SearchView" element={<SearchView />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/PersonalData" element={<PersonalData />} />
        <Route path="/PlayMv/:id" element={<PlayMv />} />
        <Route
          path="/PlayMusic/:id"
          element={
            <>
              <PlayMusic />
              <PlayMusicCom />
            </>
          }
        />
        <Route path="/MusicPlayBack/:id" element={<MusicPlayBack />} />
        <Route path="/SingerSquare" element={<SingerSquare />} />
        <Route path="/MusicLabel" element={<MusicLabel />} />
      </Routes>
    </BrowserRouter>
  );
}
