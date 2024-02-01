import logo from "../logo.svg";
import Heading from "./Heading/Heading";
import RegistrationForm from "./Body/registration_form";
import Inquiry from "./Inquiry";
import "./App.css";

function App() {
  Inquiry();
  return (
    <div className="App">
      <Heading />
      <RegistrationForm />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
