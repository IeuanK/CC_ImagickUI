# ImageMagick Node Editor

A fully in-browser node-based editor for ImageMagick operations built with Vue.js, BaklavaJS, and magica.

## Features

- **Visual Node Editor**: Drag-and-drop interface powered by BaklavaJS
- **In-Browser Processing**: All image processing happens client-side using WebAssembly (magica)
- **Multiple Node Types**:
  - **Input Node**: Load images from your local filesystem
  - **Blur Node**: Apply blur effects with configurable radius and sigma parameters
  - **Scale Node**: Resize images with multiple scaling modes and options
  - **Output Node**: Preview results and download processed images

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser to `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

## Usage

1. **Add Nodes**: Right-click on the canvas or use the node palette to add nodes
2. **Load an Image**: Use the Input node to select an image file from your computer
3. **Connect Nodes**: Click and drag from one node's output to another node's input
4. **Configure Operations**: Adjust parameters in the Blur and Scale nodes
5. **Run the Graph**: Click the "Run" button in the toolbar
6. **Download Results**: Preview the output in the Output node and click "Download" to save

## Node Reference

### Input Node
- **Outputs**: Image data
- **Options**: File picker for selecting images

### Blur Node
- **Inputs**: Image data
- **Outputs**: Blurred image
- **Parameters**:
  - `radius`: Blur radius (0-100)
  - `sigma`: Gaussian sigma value (0-100)
  - `channel`: Color channel to blur (All, Red, Green, Blue, Alpha, Composite)

### Scale Node
- **Inputs**: Image data
- **Outputs**: Scaled image
- **Parameters**:
  - `width`: Target width in pixels (1-10000)
  - `height`: Target height in pixels (1-10000)
  - `maintainAspectRatio`: Preserve image proportions
  - `scaleMode`: Scaling algorithm (Resize, Scale, Sample, Thumbnail)
  - `ignoreAspectRatio`: Force exact dimensions
  - `onlyShrink`: Only scale down, never up
  - `onlyEnlarge`: Only scale up, never down
  - `fillArea`: Fill the specified area
  - `percentage`: Treat dimensions as percentages

### Output Node
- **Inputs**: Image data
- **Options**:
  - `filename`: Output filename (without extension)
  - `format`: Image format (png or jpg)
- **Features**:
  - In-node image preview
  - Download button

## Technology Stack

- **Vue 3**: Progressive JavaScript framework
- **BaklavaJS**: Node editor framework
- **magica**: WebAssembly port of ImageMagick
- **Vite**: Next-generation frontend tooling

## License

ISC
