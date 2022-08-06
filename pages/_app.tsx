import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../chakra/theme';

import '@fontsource/Inter/300.css';
import '@fontsource/Inter/400.css';
import '@fontsource/Inter/500.css';
import '@fontsource/Inter/600.css';
import '@fontsource/Inter/700.css';
import '@fontsource/Inter/800.css';
import '@fontsource/Inter/900.css';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
