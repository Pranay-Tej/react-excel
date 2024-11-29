import "./App.css";
import Excel from "./Excel";
import ExcelContextProvider from "./ExcelContextProvider";

function App() {
  return (
    <>
      <h4>React Excel</h4>
      <br />
      <br />
      <a href="https://github.com/Pranay-Tej/react-excel">GitHub Link</a>

      <ExcelContextProvider>
        <Excel />
      </ExcelContextProvider>
    </>
  );
}

export default App;
