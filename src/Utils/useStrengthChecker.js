const useStrengthChecker = (password, checkboxData) => {
  const passLen = password.length; // Use length directly
  const selectedOptions = checkboxData.filter(
    (checkbox) => checkbox.state === true
  );
  const selectedOptionsLength = selectedOptions.length;

  if (passLen < 5) {
    if (selectedOptionsLength === 1) {
      return "Critically Insufficient";
    } else {
      return "Insufficient";
    }
  }

  if (passLen < 8) {
    if (selectedOptionsLength === 1) {
      return "Suboptimal";
    } else if (selectedOptionsLength === 2) {
      return "Moderate";
    } else {
      return "Adequate";
    }
  }

  if (passLen < 12) {
    if (selectedOptionsLength === 1) {
      return "Satisfactory";
    } else if (selectedOptionsLength === 2) {
      return "Secure";
    } else if (selectedOptionsLength === 3) {
      return "Robust";
    } else {
      return "Highly Robust";
    }
  }

  if (passLen < 16) {
    if (selectedOptionsLength === 1) {
      return "Highly Robust";
    } else if (selectedOptionsLength === 2) {
      return "Exceptional";
    } else if (selectedOptionsLength === 3) {
      return "Outstanding";
    } else {
      return "Unmatched";
    }
  }

  if (passLen <= 20) {
    if (selectedOptionsLength === 1) {
      return "Exceptional";
    } else if (selectedOptionsLength === 2) {
      return "Outstanding";
    } else if (selectedOptionsLength === 3) {
      return "Unmatched";
    } else {
      return "Supreme";
    }
  }

  return "Invalid Password Length"; // Optional catch-all
};

export default useStrengthChecker;
