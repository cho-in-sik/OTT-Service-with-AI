import dynamic from 'next/dynamic';

const MyComponent = dynamic(
  () => import('../../../components/dynamic/Myinfo'),
  {
    ssr: false,
  },
);

const Page = () => {
  return (
    <div>
      <MyComponent />
    </div>
  );
};

export default Page;
