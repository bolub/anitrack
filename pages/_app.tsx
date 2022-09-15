import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../chakra/theme';

import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Auth0Provider } from '@auth0/auth0-react';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <Auth0Provider
        domain='boluseyi.us.auth0.com'
        clientId='m4kJu9eU90v2KI23nMatpCUYtAkTqAHj'
        redirectUri='http://localhost:3000/'
      >
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />

          <Navbar />

          <Component {...pageProps} />
        </QueryClientProvider>
      </Auth0Provider>
    </ChakraProvider>
  );
}

export default MyApp;
