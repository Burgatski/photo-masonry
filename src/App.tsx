import {BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import {PhotoGrid} from '@pages/photo-grid';
import {PhotoProvider} from "./context/photo-context";
import {PhotoModalWrapper} from "@components/photo-modal/photo-modal-wrapper.tsx";

function App() {
    return (
        <PhotoProvider>
            <RoutesWrapper />
        </PhotoProvider>
    );
}

function RoutesWrapper() {
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };
    const backgroundLocation = state?.backgroundLocation;

    return (
        <>
            <Routes location={backgroundLocation || location}>
                <Route path="/" element={<PhotoGrid />} />
            </Routes>

            {backgroundLocation && (
                <Routes>
                    <Route path="/photo/:id" element={<PhotoModalWrapper />} />
                </Routes>
            )}
        </>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
