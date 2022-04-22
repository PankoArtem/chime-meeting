import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { lightTheme, MeetingProvider } from 'amazon-chime-sdk-component-library-react';

// TODO meeting provider children issue

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <MeetingProvider>
        <Component {...pageProps} />
      </MeetingProvider>
    </ThemeProvider>
  );
}

export default MyApp;
