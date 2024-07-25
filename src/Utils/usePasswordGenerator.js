import { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkboxData, length) => {
    // This will contain all of the characters allowed in our password
    let charSet = "";
    let generatedPassword = "";

    const selectedOptions = checkboxData.filter(
      (checkbox) => checkbox.state === true
    );

    // Now if no option is selected, we cannot generate a password
    if (selectedOptions.length === 0) {
      setErrorMessage("SELECT AT LEAST ONE OPTION");
      setPassword("");
      return;
    }

    // For selected options we include characters in our charSet
    // And we we'll randomly select characters from this charSet
    selectedOptions.forEach((option) => {
      switch (option.title) {
        case "Include Uppercase Letters":
          charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include Lowercase Letters":
          charSet += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include Numbers":
          charSet += "0123456789";
          break;
        case "Include Symbols":
          charSet += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });

    // We run this for loop to randomly increase characters in our generatedPassword string
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      generatedPassword += charSet[randomIndex];
    }

    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return { password, errorMessage, setErrorMessage, generatePassword };
};

export default usePasswordGenerator;
