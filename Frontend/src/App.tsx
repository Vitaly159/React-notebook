import { Routes, Route } from "react-router-dom";

import { Box } from "@material-ui/core";

import { SignIn } from "./compoments/SignIn/SignIn";
import { Home } from "./compoments/Home/Home";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Box>
  );
}

export default App;
