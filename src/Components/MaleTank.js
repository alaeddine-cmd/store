import React, { useState, useEffect, useRef } from 'react';
import './MaleHoodie.css';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import backgroundImage from "./wall.jpg";

const MaleTank = () => {
    const [designs, setDesigns] = useState({
        front: { src: null, x: 50, y: 50, scale: 1 },
        side: { src: null, x: 50, y: 50, scale: 1 },
        back: { src: null, x: 50, y: 50, scale: 1 },
    });
    const [examples] = useState([
        { id: 1, front: '/assets/custom-hoodie-front (3).jpeg', side: '/assets/white_side_tank.jpg', back: '/assets/white_back_tank.jpg' },
        { id: 2, front: '/assets/custom-hoodie-front (2).jpeg', side: '/assets/black_side_tank.jpg', back: '/assets/black_back_tank.jpg' },
        { id: 3, front: '/assets/black_front_tank.jpg', side: '/assets/black_side_tank.jpg', back: '/assets/goku.jpeg' },
        { id: 4, front: '/assets/super.jpeg', side: '/assets/true_navy_side_tank.jpg', back: '/assets/true_navy_back_tank.jpg' },

        // Add other examples as necessary
    ]);
    const [selectedImage, setSelectedImage] = useState({ src: null, type: null });
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const openFullscreen = (image, type) => {
        setSelectedImage({ src: image, type });
        setIsFullscreen(true);
    };
    // Function to close the full-screen overlay
    const closeFullscreen = () => {
        setIsFullscreen(false);
    };

    const toggleSideMenu = () => {
        setSideMenuOpen(!sideMenuOpen);
    };

    const closeSideMenu = () => {
        setSideMenuOpen(false);
    };

    const sideMenuRef = useRef(null); // Reference to the side menu

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
            front: `${base}${formattedColor}_front_tank.jpg`,
            side: `${base}${formattedColor}_side_tank.jpg`,
            back: `${base}${formattedColor}_back_tank.jpg`,
        };
    }
    const hoodieColors = ['white', 'black', 'silver', 'true_navy',
    ];
    const hoodieImages = hoodieColors.reduce((acc, color) => {
        acc[color] = generateHoodiePaths(color);
        return acc;
    }, {});

    const renderHoodieImage = () => {
        return hoodieImages[selectedColor][selectedView];
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
    const handleViewChange = (type) => {
        const example = examples.find(e => e.id === selectedImage.id);
        if (example && example[type]) {
            setSelectedImage({ src: example[type], type, id: selectedImage.id });
        } else {
            console.error('The requested image does not exist.');
        }
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
    const handleImageClick = (example, type) => {
        setSelectedImage({ src: example[type], type, id: example.id });
        setIsFullscreen(true);
    };
    const currentDesign = designs[selectedView];

    useEffect(() => {
        // Function to handle click event
        function handleClickOutside(event) {
            if (sideMenuRef.current && !sideMenuRef.current.contains(event.target)) {
                closeSideMenu();
            }
        }

        // Add click event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sideMenuRef]); // Ensure the effect runs only once

    return (
        <> <header className="App-header">
            <h1><Link to="/"><img src="/assets/logo_2.png" style={{ maxWidth: "30px", height: "auto", marginRight: "10px" }}
                className="needle" alt="Stitch Switch" /></Link>Stitch Switch</h1>        </header>
            <div className="MaleHoodie" style={{ backgroundImage: `url(${backgroundImage})` }}>

                <button className="button-idea" onClick={() => setSideMenuOpen(!sideMenuOpen)}>Design Ideas<img src="/assets/lamp.png" className="idea" /></button>
                <div className="content-container">
                    <div>
                        <div ref={sideMenuRef} className={`side-menu ${sideMenuOpen ? 'open' : ''}`}>
                            <button className="close-btn" onClick={closeSideMenu}>×</button>

                            <div className="example-thumbnails">
                                {examples.map(example => (
                                    <div key={example.id} className="example-thumbnail" onClick={() => handleImageClick(example, 'front')}>
                                        <img src={example.front} className="example-image" alt="Front view" />
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="hoodie-container">
                        {isFullscreen && selectedImage.src && (
                            <div className="fullscreen-overlay" onClick={closeFullscreen}>
                                <div className="fullscreen-content" onClick={e => e.stopPropagation()}>
                                    <img src={selectedImage.src} alt={`${selectedImage.type} view`} />
                                    <div className="fullscreen-controls">
                                        <button onClick={() => handleViewChange('front')}>Front</button>
                                        <button onClick={() => handleViewChange('side')}>Side</button>
                                        <button onClick={() => handleViewChange('back')}>Back</button>
                                        <button className="button-download" onClick={handleDownloadAllSides}>Download</button>
                                    </div>
                                </div>
                                <button className="close-btn" onClick={closeFullscreen}>(x)</button>
                            </div>
                        )}
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

                        <label className="custom-file-upload">
                            <input type="file" onChange={handleImageUpload} />
                        </label>
                        {currentDesign.src && (
                            <div className="scale-slider">
                                <label htmlFor="scaleControl">Scale Design</label>
                                <input
                                    id="scaleControl"
                                    type="range"
                                    min="0.1"
                                    max=".5"
                                    step="0.01"
                                    value={currentDesign.scale}
                                    onChange={(e) => handleScaleChange(e, selectedView)}
                                />
                            </div>
                        )}
                        {designs[selectedView].src && (
                            <button className="rmv-button" onClick={handleRemoveDesign}>Remove Design</button>
                        )}
                        <button className="download-button" onClick={handleDownload}>Download</button>



                    </div>
                </div>
            </div >
        </>
    );
};

export default MaleTank;