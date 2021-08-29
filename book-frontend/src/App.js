import RestGithub from "./RestGithub";
import "./App.css";
import WeatherApp from "./WeatherApp";

function App() {
    return (
        <div className="App">
            <WeatherApp />
            <br />
            <RestGithub />
        </div>
    );
}

export default App;
