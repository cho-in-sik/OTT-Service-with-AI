import { PropsWithChildren } from 'react';
import Header from '../header';
import Footer from '../footer';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
