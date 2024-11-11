import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PhotoDetails } from '@pages/photo-details';
import { PhotoGrid } from '@pages/photo-grid';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PhotoGrid />} />
                <Route path="/photo/:id" element={<PhotoDetails />} />
            </Routes>
        </Router>
    );
}

export default App;