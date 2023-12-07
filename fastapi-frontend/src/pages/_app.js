import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalStateProvider } from '../context/GlobalState';
import styles from '../styles/global.module.css';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStateProvider>
      <div className={styles}><Component {...pageProps} /></div>
    </GlobalStateProvider>
  );
}
export default MyApp;
