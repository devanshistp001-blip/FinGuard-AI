import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AnalyzePage from './pages/AnalyzePage';
import ResultPage from './pages/ResultPage';
import HowItWorksPage from './pages/HowItWorksPage';
import SafetyPage from './pages/SafetyPage';
import AboutPage from './pages/AboutPage';
import DemoExamplesPage from './pages/DemoExamplesPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/safety" element={<SafetyPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/demo-examples" element={<DemoExamplesPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
