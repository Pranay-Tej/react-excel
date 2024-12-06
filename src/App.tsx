import "./App.css";
import BulkAddFlow from "./BulkAddFlow";
import BulkEditWithReorderFlow from "./BulkEditWithReorderFlow";

function App() {
  return (
    <>
      <h4>React Excel</h4>
      <br />
      <br />
      <a href="https://github.com/Pranay-Tej/react-excel">GitHub Link</a>
      <br />
      <br />

      <BulkEditWithReorderFlow />

      <hr />
      <br />
      <br />

      <BulkAddFlow />
    </>
  );
}

export default App;
