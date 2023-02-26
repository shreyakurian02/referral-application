import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Button from "@mui/material/Button";

const App = () => {
  return (
    <Router>
      <div>
        <Button variant="contained">Hello World</Button>
        <h1 class="text-3xl text-red-500">Hello world!</h1>
      </div>
    </Router>
  );
};

export default App;
