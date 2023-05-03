import DefaultLayout from '@/components/common/defaultLayout';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <DefaultLayout>{children}</DefaultLayout>;
}
