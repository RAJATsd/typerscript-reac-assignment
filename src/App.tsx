import React from "react";
import "./App.css";
import JobsList from "./components/jobs-list/jobs-list";

const App: React.FC = () => {
  return (
    <div className="App">
      <JobsList />
    </div>
  );
};

export default App;
