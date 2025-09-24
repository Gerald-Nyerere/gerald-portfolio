import { BrowserRouter } from 'react-router-dom'; // Correct import
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout'

import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Certifications from './pages/Certifications'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/contact" element={<Contact />} />
          
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
