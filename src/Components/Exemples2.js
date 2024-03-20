import React, { useState } from 'react';
import './Examples.css';

function Examples2() {
    const [examples] = useState([
        { id: 1, front: '/assets/friends.jpeg', side: '/assets/mauve_side_hoodie_fem.jpg', back: '/assets/mauve_back_hoodie_fem.jpg' },
        { id: 2, front: '/assets/black_fem.jpeg', side: '/assets/black_side_hoodie_fem.jpg', back: '/assets/black_back_hoodie_fem.jpg' },
        { id: 3, front: '/assets/stitch.jpeg', side: '/assets/pink_side_hoodie_fem.jpg', back: '/assets/pink_back_hoodie_fem.jpg' },
        { id: 4, front: '/assets/bears.jpeg', side: '/assets/white_side_hoodie_fem.jpg', back: '/assets/white_back_hoodie_fem.jpg' },

        // Add other examples as necessary
    ]);

    const [selectedImage, setSelectedImage] = useState({ src: null, type: null, id: null });

    const handleImageClick = (example, type) => {
        setSelectedImage({ src: example[type], type, id: example.id });
    };

    const handleViewChange = (type) => {
        const example = examples.find(e => e.id === selectedImage.id);
        if (example && example[type]) {
            setSelectedImage({ src: example[type], type, id: selectedImage.id });
        } else {
            console.error('The requested image does not exist.');
        }
    };

    const closeFullscreen = () => {
        setSelectedImage({ src: null, type: null, id: null });
    };

    return (
        <div className="examples-container">
{/*             <h2 className="examples-title">Examples</h2> 
 */}
            <div className="example-thumbnails">
                {examples.map(example => (
                    <div key={example.id} className="example-thumbnail" onClick={() => handleImageClick(example, 'front')}>
                        <img src={example.front} className="example-image" alt="Front view" />
                    </div>
                ))}
            </div>
            {selectedImage.src && (
                <div className="fullscreen-container">
                    <img src={selectedImage.src} alt={`${selectedImage.type} view`} />
                    <div className="view-controls">
                        <button onClick={() => handleViewChange('front')}>Front</button>
                        <button onClick={() => handleViewChange('side')}>Side</button>
                        <button onClick={() => handleViewChange('back')}>Back</button>
                    </div>
                    <button className="close-btn" onClick={closeFullscreen}>x</button>
                </div>
            )}

        </div>
    );
}

export default Examples2;
