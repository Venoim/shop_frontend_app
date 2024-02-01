import Heading from "./Heading/Heading";
import LoginForm from "./Body/login_form";
import RegistrationForm from "./Body/registration_form";
import Inquiry from "./Inquiry";
import "./App.css";

function App() {
  Inquiry();
  return (
    <div className="App">
      <Heading />
      <LoginForm />
      <RegistrationForm />
    </div>
  );
}

export default App;
