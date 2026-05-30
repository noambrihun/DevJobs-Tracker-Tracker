import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddJobPage from './pages/AddJobPage';
import JobsPage from './pages/JobsPage';
import Sidebar from './components/Sidebar';
function App() {

  return (
    <BrowserRouter>
   <div className='flex min-h-screen bg-slate-50 text-white'>
      <Sidebar />
      <main className='flex-1 main-auto'>
        <div className='mx-auto max-w-7xl px-6 py-8 lg:px-10'>
      <Routes>
        <Route path="/" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage />} />

      </Routes>
      </div>
      </main>
      </div>
    </BrowserRouter>
  )
}

export default App
