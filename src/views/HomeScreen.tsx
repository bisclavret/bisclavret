// HomeScreen.tsx
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

const HomeScreen: React.FC = () => (
  <div id="app">
    <LeftPanel />
    <RightPanel />
  </div>
);

export default HomeScreen;
