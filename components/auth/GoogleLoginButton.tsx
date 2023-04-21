import { GoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

const GoogleLoginButton = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;
  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
            console.log(jwtDecode(res.credential as string));
          }}
          onError={() => {
            console.log('실패');
          }}
        />
      </GoogleOAuthProvider>
    </>
  );
};

export default GoogleLoginButton;
