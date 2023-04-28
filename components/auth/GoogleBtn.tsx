import Link from 'next/link';

function GoogleLoginBtn() {
  return (
    <Link
      href="http://localhost:8080/api/auth/login/google"
      className="mt-3 btn btn-primary w-full"
    >
      구글 로그인
    </Link>
  );
}

function GoogleSignUpBtn() {
  return (
    <Link
      href="http://localhost:8080/api/auth/signup/google"
      className="mt-3 btn w-full"
    >
      구글 회원가입
    </Link>
  );
}

export { GoogleLoginBtn, GoogleSignUpBtn };
