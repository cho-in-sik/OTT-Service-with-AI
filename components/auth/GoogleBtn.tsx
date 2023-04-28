import { api } from '@/utils/api/customAxios';

function GoogleLoginBtn() {
  async function login() {
    await api.get('/api/auth/login/google');
  }

  return (
    <button
      type="button"
      className="mt-3 btn btn-primary w-full"
      onClick={() => {
        login();
      }}
    >
      구글 로그인
    </button>
  );
}

function GoogleSignUpBtn() {
  async function signUp() {
    await api.get('/api/auth/signup/google');
  }

  return (
    <button
      type="button"
      className="mt-3 btn w-full"
      onClick={() => {
        signUp();
      }}
    >
      구글 회원가입
    </button>
  );
}

export { GoogleLoginBtn, GoogleSignUpBtn };
