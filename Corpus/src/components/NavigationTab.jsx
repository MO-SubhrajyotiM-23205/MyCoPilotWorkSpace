import "./NavigationTab.css";

const NavigationTab = ({ activeTab, onTabChange }) => {
  const tabs = ["ADD CORPUS", "ACTIONABLE", "PENDING", "HISTORY"];
  return (
    <div className="corpus-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`tab${activeTab === tab ? " active" : ""}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default NavigationTab;
