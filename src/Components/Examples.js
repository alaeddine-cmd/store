import React, { useState } from 'react';
import './Examples.css';
import JSZip from 'jszip'; // Assuming you opt for ZIP approach
import { saveAs } from 'file-saver'; // To save the ZIP file

function Examples() {
    const [examples] = useState([
        { id: 1, front: '/assets/ihih.jpeg', side: '/assets/sport_grey_side_hoodie.jpg', back: '/assets/hihi.jpeg' },
        { id: 2, front: '/assets/simpson.jpeg', side: '/assets/white_side_hoodie.jpg', back: '/assets/white_back_hoodie.jpg' },
        { id: 3, front: '/assets/hunter.jpeg', side: '/assets/black_side_hoodie.jpg', back: '/assets/black_back_hoodie.jpg' },
        { id: 4, front: '/assets/cc.jpeg', side: '/assets/blue_side_hoodie.jpg', back: '/assets/blue_back_hoodie.jpg' },

        // Add other examples as necessary
    ]);

    const [selectedImage, setSelectedImage] = useState({ src: null, type: null, id: null });
    const downloadImage = (imageSrc, filename) => {
        // Function to trigger download for a single image
        const link = document.createElement('a');
        link.href = imageSrc;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleDownloadAllSides = async () => {
        const example = examples.find(e => e.id === selectedImage.id);
        if (!example) {
            console.error('No example selected or example does not exist.');
            return;
        }

        const zip = new JSZip();

        // Function to fetch image as blob
        const fetchImageAsBlob = async (imageUrl) => {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            return blob;
        };

        // Add images to zip
        const imageTypes = ['front', 'side', 'back'];
        for (const type of imageTypes) {
            const imageUrl = example[type];
            if (!imageUrl) continue;
            try {
                const imageBlob = await fetchImageAsBlob(imageUrl);
                zip.file(`${type}.jpg`, imageBlob, { binary: true });
            } catch (error) {
                console.error(`Failed to load image: ${imageUrl}`, error);
            }
        }

        // Generate ZIP
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                saveAs(content, "hoodie-designs.zip");
            });
    };

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
                        <button onClick={handleDownloadAllSides}>Download</button>

                    </div>
                    <button className="close-btn" onClick={closeFullscreen}>x</button>
                </div>
            )}

        </div>
    );
}

export default Examples;
