import { ChakraProvider, CSSReset } from '@chakra-ui/react';

import theme from '../theme';

const MyApp = function ({ Component, pageProps }: any) {
  return (
    <ChakraProvider resetCSS theme={ theme }>
      <CSSReset />
      <Component { ...pageProps } />
    </ChakraProvider>
  );
};

export default MyApp;
