import Footer from '../components/footer';
import ReactQueryProvider from './ReactQueryProvider';
import './globals.css';
import 'swiper/swiper-bundle.min.css';
import RecoilProvider from './RecoilProvider';

export const metadata = {
  title: '오짬티파이',
  description: '영화 검색을 위한 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 ">
        <RecoilProvider>
          <ReactQueryProvider>
            {children}

            <Footer />
          </ReactQueryProvider>
        </RecoilProvider>
      </body>
    </html>
  );
}
