import React, { useState, useRef } from 'react';
import './MaleHoodie.css';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import Examples from './Examples';
function MaleHoodie() {
    const [designs, setDesigns] = useState({
        front: { src: null, x: 50, y: 50, scale: 1 },
        side: { src: null, x: 50, y: 50, scale: 1 },
        back: { src: null, x: 50, y: 50, scale: 1 },
    });


    const hoodieRefs = {
        front: useRef(),
        side: useRef(),
        back: useRef(),
    };
    const [selectedView, setSelectedView] = useState('front');
    const [selectedColor, setSelectedColor] = useState('white');
    const downloadImage = (dataUrl, filename) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const handleDownload = async () => {
        const activeDisplayRef = hoodieRefs[selectedView].current;

        if (activeDisplayRef && designs[selectedView].src) {
            // Consider offering the user to choose a higher scale for better quality
            const scale = window.devicePixelRatio * 2; // Example: doubling the scale for better quality
            const canvas = await html2canvas(activeDisplayRef, {
                scale: scale,
                useCORS: true,
                logging: true, // Consider turning off in production
            });

            // Example: allowing user to choose format and quality. Here we use JPEG for illustration.
            const imageQuality = 0.9; // Quality from 0 to 1, applicable for 'image/jpeg'
            const dataUrl = canvas.toDataURL('image/jpeg', imageQuality);

            downloadImage(dataUrl, `custom-hoodie-${selectedView}.jpeg`); // Adjust file extension based on format
        } else {
            console.error(`No design for ${selectedView} view or element not rendered`);
        }

        // Download the original uploaded image
        if (designs[selectedView].src) {
            downloadImage(designs[selectedView].src, `original-design-${selectedView}.png`);
        }
    };


    const handleThumbnailClick = (view) => {
        setSelectedView(view);
    };
    const handleColorSwatchClick = (color) => {
        setSelectedColor(color);
        setSelectedView('front');
    };
    const handleRemoveDesign = () => {
        setDesigns((prevDesigns) => ({
            ...prevDesigns,
            [selectedView]: { ...prevDesigns[selectedView], src: null, x: 50, y: 50, scale: 1 },
        }));
    };
    const handleImageUpload = (event) => {
        const file = event.target.files[0]; // Get the first file from the input event
        if (file) { // Check if the file exists
            const reader = new FileReader();
            reader.onloadend = () => {
                setDesigns({
                    ...designs,
                    [selectedView]: { src: reader.result, x: 50, y: 50, scale: 1 },
                });
            };
            reader.readAsDataURL(file);
        } else {
            // Handle the case where no file is selected (optional)
            console.log('No file selected.');
        }
    };
    function generateHoodiePaths(color) {
        const base = '/assets/';
        const formattedColor = color.replace(/_/g, '_').toLowerCase(); // Adjust formatting if necessary
        return {
            front: `${base}${formattedColor}_front_hoodie.jpg`,
            side: `${base}${formattedColor}_side_hoodie.jpg`,
            back: `${base}${formattedColor}_back_hoodie.jpg`,
        };
    }
    const hoodieColors = ['white', 'black', 'sport_grey', 'green', 'blue', 'pink',
    ];
    const hoodieImages = hoodieColors.reduce((acc, color) => {
        acc[color] = generateHoodiePaths(color);
        return acc;
    }, {});

    const renderHoodieImage = () => {
        return hoodieImages[selectedColor][selectedView];
    };

    const numberOfColors = hoodieColors.length;
    const colorsPerRow = 2;
    const numberOfRows = Math.ceil(numberOfColors / colorsPerRow);
    const handleWheel = (e) => {
        e.preventDefault();
        const scaleIncrement = 0.05;
        setDesigns(prevDesigns => {
            const newScale = e.deltaY < 0 ? prevDesigns[selectedView].scale + scaleIncrement : prevDesigns[selectedView].scale - scaleIncrement;
            return {
                ...prevDesigns,
                [selectedView]: {
                    ...prevDesigns[selectedView],
                    scale: Math.max(0.1, Math.min(3, newScale)), // Prevent the scale from going below 0.1 or above 3
                },
            };
        });
    };
    const handleScaleChange = (e, view) => {
        const newScale = parseFloat(e.target.value);
        setDesigns((prevDesigns) => ({
            ...prevDesigns,
            [view]: {
                ...prevDesigns[view],
                scale: newScale,
            },
        }));
    };

    const handleDrag = (e, data) => {
        setDesigns(prevDesigns => ({
            ...prevDesigns,
            [selectedView]: {
                ...prevDesigns[selectedView],
                x: data.x,
                y: data.y,
            },
        }));
    };

    const currentDesign = designs[selectedView];

    return (
        <div className="MaleHoodie">
            <div className="content-container">
                <div>
                    <Examples />

                </div>
                <div className="hoodie-container">

                    <div className="main-display" ref={hoodieRefs[selectedView]}>
                        <img src={renderHoodieImage()} alt={`${selectedColor} hoodie`} className="hoodie-image" />
                        {currentDesign.src && (
                            <Draggable bounds="parent" onDrag={handleDrag} position={{ x: currentDesign.x, y: currentDesign.y }}>
                                <img
                                    src={currentDesign.src}
                                    alt="Custom Design"
                                    style={{
                                        width: `${currentDesign.scale * 100}%`,
                                        height: 'auto',
                                        position: 'absolute',
                                        cursor: 'move',
                                        pointerEvents: 'all',
                                    }}
                                    onWheel={handleWheel}
                                />
                            </Draggable>
                        )}
                    </div>

                    <div className="thumbnail-container">
                        {Object.keys(hoodieImages[selectedColor]).map((view) => (
                            <img
                                key={view}
                                src={hoodieImages[selectedColor][view]}
                                alt={`${view} view`}
                                onClick={() => handleThumbnailClick(view)}
                                className={`thumbnail ${selectedView === view ? 'active' : ''}`}
                            />
                        ))}

                    </div>


                    <label className="custom-file-upload">
                        <input type="file" onChange={handleImageUpload} />
                        Upload Design
                    </label>
                    {designs[selectedView].src && (
                        <button onClick={handleRemoveDesign}>Remove Design</button>
                    )}
                    <button onClick={handleDownload}>Download</button>

                    <div className="color-swatches-container">
                        {hoodieColors.map(color => (
                            <div
                                key={color}
                                className={`color-swatch ${color}`}
                                onClick={() => handleColorSwatchClick(color)}
                                style={{ backgroundColor: color }}
                            ></div>
                        ))}
                    </div>
                    {currentDesign.src && (
                        <div className="scale-slider">
                            <label htmlFor="scaleControl">Scale Design</label>
                            <input
                                id="scaleControl"
                                type="range"
                                min="0.1"
                                max="3"
                                step="0.01"
                                value={currentDesign.scale}
                                onChange={(e) => handleScaleChange(e, selectedView)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default MaleHoodie;
