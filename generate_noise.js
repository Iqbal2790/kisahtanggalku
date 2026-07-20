const fs = require('fs');

const width = 64;
const height = 64;
const header = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAEAAAABAAQMAAACQp+OdAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObb/QAAAC1JREFUeNpjYMAOGJmAwcwEEKGQQYEwFwM2wIARkMEwHwM9wMCECRgJmAaIAAB/eAYCAv+l0wAAAABJRU5ErkJggg==", 'base64');
// Actually, just generate a simple SVG string and base64 it.
const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noiseFilter)"/></svg>`;
const b64 = `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
fs.writeFileSync('noise-base64.txt', b64);
