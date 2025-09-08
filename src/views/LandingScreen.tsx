// LandingScreen.tsx
import LandingLeftPanel from "../components/LandingLeftPanel";
import LandingRightPanel from "../components/LandingRightPanel";

const LandingScreen: React.FC = () => (
  <div id="app">
    <LandingLeftPanel />
    <LandingRightPanel />
  </div>
);

export default LandingScreen;
