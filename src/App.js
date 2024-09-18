import "./App.css";
import Navbar from "./components/Navbar";
import ResizablePanel from "./components/ResizablePanel";

function App() {
  return (
    <div className="h-screen overflow-hidden">
      <Navbar />
      <ResizablePanel />
    </div>
  );
}

export default App;
