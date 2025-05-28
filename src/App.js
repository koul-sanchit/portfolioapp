import React from 'react';
import { Link } from 'react-scroll';
import './App.css';

// Component imports
import Header from './components/Header';
import About from './components/About';
import Projects from './components/Projects';
import Codeforces from './components/Codeforces';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header />
      
      <main>
        <About />
        <Projects />
        <Codeforces />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;