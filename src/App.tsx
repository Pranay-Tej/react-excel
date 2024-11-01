import "./App.css";
import Excel from "./Excel";
import ExcelContextProvider from "./ExcelContextProvider";

function App() {
  return (
    <ExcelContextProvider>
      <Excel />
    </ExcelContextProvider>
  );
}

export default App;
