import { useState } from "react";
import usePasswordGenerator from "./Utils/usePasswordGenerator";
import useStrengthChecker from "./Utils/useStrengthChecker";
import { toast } from "react-hot-toast";

function App() {
  // Extracting the values from our custom hook
  const { password, errorMessage, setErrorMessage, generatePassword } =
    usePasswordGenerator();

  // State variables
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false },
  ]);

  const [strength, setStrength] = useState("No Strength"); // Added state for strength

  const [copy, setCopy] = useState(false);

  // This is the function to handle the checkbox state change
  const handleCheckboxChange = (index) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[index].state = !updatedCheckboxData[index].state;
    setCheckboxData(updatedCheckboxData);
  };

  // This is the function to handle the copy button
  // If we want to use toast notifications we have to use then and catch 
  // It uses navigator.clipboard.writeText() method to copy the password onto the clipboard

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
      .then(() => {
        toast.success("Password Copied Successfully");
      })
      .catch(() => {
        toast.error("Failed to Copy Password");
      });

    // Once copy we change the state to true
    setCopy(true);

    // This time out function will automatically change the text inside the copyBtn after 2000 ms
    setTimeout(() => {
      setCopy(false);
    }, 2000);
  };

  const handleCloseErrorMessage = () => {
    setErrorMessage("");
  };

  const handleGeneratePassword = () => {
    generatePassword(checkboxData, length);
    // Update the strength after generating the password
    const strength = useStrengthChecker(password, checkboxData);
    setStrength(strength);
  };

  return (
    <div className="appContainer">
      {/* Main Heading and Slogan */}
      <header className="mainHeader">
        <h1>SecureShield</h1>
        <p>Create, Secure, Protect</p>
      </header>

      {/* Main Content */}
      <div className="container">
        {/* Password text and Copy */}
        {password ? (
          <div className="header">
            <div className="title">{password}</div>
            <button className="copyBtn" onClick={handleCopy}>
              {copy ? "Password Copied" : "Copy"}
            </button>
          </div>
        ) : (
          <h1 className="noPass">Password Not Generated</h1>
        )}

        {/* Character length slider */}
        <div className="charLength">
          <span>
            <label>Character Length</label>
            <label>{length}</label>
          </span>
          <input
            type="range"
            min="4"
            max="20"
            className="charSlider"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        {/* Checkboxes */}
        <div className="checkboxes">
          {checkboxData.map((checkbox, index) => (
            <div key={index}>
              <input
                type="checkbox"
                checked={checkbox.state}
                onChange={() => handleCheckboxChange(index)}
              />
              <label>{checkbox.title}</label>
            </div>
          ))}
        </div>

        {/* Error Message Handling */}
        {errorMessage ? (
          <div className="errorMessage">
            {errorMessage}
            <button className="closeBtn" onClick={handleCloseErrorMessage}>
              Close
            </button>
          </div>
        ) : null}

        {/* Strength of Password */}
        <div className="strength">
          <span>Strength</span>
          <span>{strength}</span>
        </div>

        {/* Generate Button */}
        <button className="generateBtn" onClick={handleGeneratePassword}>
          Generate Password
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 SecureShield. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
