import { useState, useEffect, useRef } from "react";
import "./App.css";
import { ContainerList } from "./components/container-list/ContainerList";
import { ContainerImage } from "./components/container-image/ContainerImage";

function App() {
  const [selectedContainerUrl, setSelectedContainerUrl] = useState(null);

  return (
    <div className="App">
      <header>
        <h1>Lector de contenedores</h1>
      </header>
      <main>
        <ContainerList onSelect={(url) => setSelectedContainerUrl(url)} />
        <div className="right-col">
          <ContainerImage imageUrl={selectedContainerUrl} />
        </div>
      </main>
    </div>
  );
}

export default App;
