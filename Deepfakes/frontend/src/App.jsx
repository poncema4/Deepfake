import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import WhatIsDeepfake from './components/sections/WhatIsDeepfake/WhatIsDeepfake';
import DeepfakeUses from './components/sections/DeepfakeUses/DeepfakeUses';
import DetectDeepfakes from './components/sections/DetectDeepfakes/DetectDeepfakes';
import ImageStream from './components/ImageStream/ImageStream';
import FlashcardGame from './pages/Game/FlashcardGame';
import Model from './pages/Model/Model';
import About from './pages/AboutUs/About';

import './App.css';

function LandingPage() {
  return (
    <>
      <WhatIsDeepfake />
      <DeepfakeUses />
      <DetectDeepfakes />
      <ImageStream />
    </>
  );
}

function App() {
  return (
    <>
    <NavBar />
    <div className="app">
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/challenge" element={<FlashcardGame />} />
          <Route path="/model" element={<Model />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
    </>
  );
}

export default App;
