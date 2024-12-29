// pages/_app.js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} /> {/* This renders the correct page based on the route */}
    </div>
  );
}

export default MyApp;
