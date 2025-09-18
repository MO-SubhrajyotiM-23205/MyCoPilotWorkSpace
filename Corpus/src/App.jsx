import { useState } from "react";
import "./App.css";
import CorpusForm from "./components/CorpusForm";
import NavigationTab from "./components/NavigationTab";
import Actionable from "./components/Actionable";
import Pending from "./components/Pending";
import History from "./components/History";
import CorpusSearch from "./components/CorpusSearch";
import FetchAPI from "./components/FetchAPI";


function App() {
  const [activeTab, setActiveTab] = useState("ADD CORPUS");

  const renderContent = () => {
    switch (activeTab) {
      case "ACTIONABLE":
        return <Actionable />;
      case "PENDING":
        return <Pending />;
      case "HISTORY":
        return <History />;
      case "ADD CORPUS":
      default:
        return <CorpusForm />;
    }
  };

  return (
    <>
      {/* <CorpusSearch />
      <NavigationTab activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="card">{renderContent()}</div> */}
      <FetchAPI />
    </>
  );
}

export default App;
