# Next

## Definition

> Next.js, the React Framework
> Next.js aims to have best-in-class developer experience and many built-in features, such as:

- An intuitive page-based routing system (with support for dynamic routes)
- Pre-rendering, both static generation (SSG) and server-side rendering (SSR) are supported on a per-page basis
- Automatic code splitting for faster page loads
- Client-side routing with optimized prefetching
- Built-in CSS and Sass support, and support for any CSS-in-JS library
- Development environment with Fast Refresh support
- API routes to build API endpoints with Serverless Functions
- Fully extendable

## Feature

> getStaticProps

> getServersideProps
> getServerSideProps only runs on server-side and never runs on the browser. If a page uses getServerSideProps, then:

- When you request this page directly, getServerSideProps runs at request time, and this page will be pre-rendered with the returned props
- When you request this page on client-side page transitions through next/link or next/router, Next.js sends an API request to the server, which runs getServerSideProps
