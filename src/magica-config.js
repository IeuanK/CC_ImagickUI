// Configure magica to find WASM file in the public directory
// This must be set before magica is imported
if (typeof window !== 'undefined') {
  window.Module = {
    locateFile: (path) => {
      if (path.endsWith('.wasm')) {
        // Point to the WASM file in the public directory
        return import.meta.env.BASE_URL + path
      }
      return path
    }
  }
}
