/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import NProgress from 'nprogress';
import { ApolloProvider } from '@apollo/client';
import Router from 'next/router';
import withData from '../lib/withData';
import Page from '../components/Page';

// TODO: Swap with our own

import '../components/styles/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(MyApp);
