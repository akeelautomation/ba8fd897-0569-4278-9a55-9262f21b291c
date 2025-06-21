import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ReactPixel from 'react-facebook-pixel';

const options = {
    autoConfig: true,
    debug: false,
};

const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID;

if (pixelId) {
  ReactPixel.init(pixelId, undefined, options);
} else {
  console.warn('Facebook Pixel ID is not defined. Please set VITE_FACEBOOK_PIXEL_ID in your .env file.');
}

ReactPixel.pageView();

createRoot(document.getElementById("root")!).render(<App />);
