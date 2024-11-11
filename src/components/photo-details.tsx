import React from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

const PhotoDetails: React.FC = () => {
    // const { id } = useParams<{ id: string }>();
    // const navigate = useNavigate();
    // const photo = usePhoto(id);

    return (
        <div className="photo-details">
            {/*<button onClick={() => navigate(-1)} className="back-button">Back</button>*/}
            {/*<img src={photo.src.large} alt={photo.alt} />*/}
            {/*<h2>{photo.title}</h2>*/}
            {/*<p>{photo.description}</p>*/}
            {/*<span>Photographer: {photo.photographer}</span>*/}
            {/*<span>Date: {photo.date}</span>*/}
        </div>
    );
};

export default PhotoDetails;