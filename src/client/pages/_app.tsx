import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { appReducers, initialState } from '../contexts/reducers';
import { AppStateProvider } from '../contexts/appState';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <AppStateProvider reducer={appReducers} initialState={initialState}>
      <Component {...pageProps} />
    </AppStateProvider>
  );
};

export default App;
