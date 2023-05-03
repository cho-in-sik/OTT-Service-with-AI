import { PropsWithChildren } from 'react';
import Header from '../header';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
