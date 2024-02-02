import Heading from "./Heading/Heading";
import LoginForm from "./Body/login_form";
import RegistrationForm from "./Body/registration_form";
import UserList from "./Body/test";
import Inquiry from "./Inquiry";
import "./App.css";

function App() {
  // Inquiry();
  return (
    <div className="App">
      <Heading />
      <content>
        <LoginForm />
        <RegistrationForm />
      </content>
      <UserList />
    </div>
  );
}

export default App;
