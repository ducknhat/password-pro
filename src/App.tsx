import React, { useState } from 'react';
import { 
  Shield, Key, BookOpen, AlertOctagon, Lock, 
  FlaskConical, Info 
} from 'lucide-react';
import { AnalyzerView } from './components/AnalyzerView';
import { HowPasswordsWorkView } from './components/HowPasswordsWorkView';
import { CommonThreatsView } from './components/CommonThreatsView';
import { HashingSaltingView } from './components/HashingSaltingView';
import { ExperimentView } from './components/ExperimentView';
import { AboutView } from './components/AboutView';

type TabKey = 'analyzer' | 'how-it-works' | 'threats' | 'hashing' | 'experiment' | 'about';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('analyzer');

  const navItems = [
    { key: 'analyzer', label: 'Analyzer', icon: <Key size={16} /> },
    { key: 'how-it-works', label: 'How Passwords Work', icon: <BookOpen size={16} /> },
    { key: 'threats', label: 'Common Threats', icon: <AlertOctagon size={16} /> },
    { key: 'hashing', label: 'Hashing & Salting', icon: <Lock size={16} /> },
    { key: 'experiment', label: 'Experiment', icon: <FlaskConical size={16} /> },
    { key: 'about', label: 'About', icon: <Info size={16} /> },
  ];

  return (
    <div className="app-container">
      {/* Site Header */}
      <header className="site-header">
        <div className="brand-wrapper">
          <div className="brand-logo-icon">
            <Shield size={28} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 className="brand-title">PasswordGuard</h1>
              <span className="brand-badge">Academic Demo</span>
            </div>
            <p className="brand-subtitle">
              Educational structural evaluation of password strength and authentication mechanics.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs" aria-label="Main Navigation">
          {navItems.map(item => (
            <button
              key={item.key}
              id={`tab-${item.key}`}
              className={`nav-tab-btn ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => setActiveTab(item.key as TabKey)}
              type="button"
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Main Content Area */}
      <main>
        {activeTab === 'analyzer' && <AnalyzerView />}
        {activeTab === 'how-it-works' && <HowPasswordsWorkView />}
        {activeTab === 'threats' && <CommonThreatsView />}
        {activeTab === 'hashing' && <HashingSaltingView />}
        {activeTab === 'experiment' && <ExperimentView />}
        {activeTab === 'about' && <AboutView />}
      </main>

      {/* Site Footer */}
      <footer style={{ marginTop: '3.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
        <div>
          <strong>PasswordGuard:</strong> Educational IT Security Project & Course Presentation.
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <span>100% Client-Side Evaluation</span>
          <span>•</span>
          <span>Zero Server Storage</span>
          <span>•</span>
          <button 
            onClick={() => setActiveTab('about')} 
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', textDecoration: 'underline', font: 'inherit' }}
          >
            Academic Limitations
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
