import React from 'react';
import Modal from 'react-modal';
import {IPhoto} from "../../types/photo";

Modal.setAppElement('#root');

interface PhotoModalProps {
    photo: IPhoto;
    isOpen: boolean;
    onRequestClose: () => void;
    loading?: boolean;
    error?: string | null;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photo, isOpen, onRequestClose, loading, error }) => {
   console.log('photo', photo);
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                content: {
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '70%',
                    height: '70%',
                    maxHeight: '80vh',
                    overflow: 'auto',
                    position: 'relative',
                    background: '#fff',
                    borderRadius: '8px',
                    padding: '20px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    zIndex: 1000,
                },
            }}
        >
            <button
                onClick={onRequestClose}
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: '#f5f5f5',
                    border: 'none',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                }}
            >
                Back
            </button>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">Error: {error}</div>
            ) : photo ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <img
                        src={photo.src.large}
                        alt={photo.alt || 'Photo Image'}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                        }}
                    />
                        <div className="mt-4" style={{textAlign: 'center', padding: '0 20px'}}>
                            <h2>{photo.alt || 'No name'}</h2>
                            <p><strong>Author:</strong> {photo.photographer}</p>
                        </div>
                </div>
            ) : (
                <div className="text-center">Photo not found</div>
            )}
        </Modal>
    );
};
