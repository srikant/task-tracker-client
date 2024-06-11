import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import TaskBoard from "./components/task-board/TaskBoard";
import Routes from "./components/Routes";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes />
      {/*<TaskBoard />*/}
    </div>
  );
}

export default App;
