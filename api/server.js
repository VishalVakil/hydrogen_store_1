// @ts-ignore
// Virtual entry point for the app
import * as remixBuild from '@remix-run/dev/server-build';
import {storefrontRedirect} from '@shopify/hydrogen';
import {createRequestHandler} from '@shopify/remix-oxygen';
import {createAppLoadContext} from '~/lib/context';

/**
 * Export a fetch handler in module format.
 */
export default async function handler(request) {
  try {
    // For Vercel Edge Runtime, we need to adapt the execution context
    const env = process.env;
    const executionContext = {
      waitUntil: (promise) => promise,
      passThroughOnException: () => {},
    };

    const appLoadContext = await createAppLoadContext(
      request,
      env,
      executionContext,
    );

    /**
     * Create a Remix request handler and pass
     * Hydrogen's Storefront client to the loader context.
     */
    const handleRequest = createRequestHandler({
      build: remixBuild,
      mode: process.env.NODE_ENV,
      getLoadContext: () => appLoadContext,
    });

    const response = await handleRequest(request);

    if (appLoadContext.session.isPending) {
      response.headers.set(
        'Set-Cookie',
        await appLoadContext.session.commit(),
      );
    }

    if (response.status === 404) {
      /**
       * Check for redirects only when there's a 404 from the app.
       * If the redirect doesn't exist, then `storefrontRedirect`
       * will pass through the 404 response.
       */
      return storefrontRedirect({
        request,
        response,
        storefront: appLoadContext.storefront,
      });
    }

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error:', error);
    return new Response('An unexpected error occurred', {status: 500});
  }
}
