import NextAuth, { TokenSet } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/prisma';

export const authOptions = {
  pages: { signIn: '/auth/sign-in' },
  providers: [
    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      id: 'email-password-credential',
      name: 'Credentials',
      credentials: {
        email: { label: '이메일', type: 'text' },
        password: { label: '비밀번호', type: 'password' },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        console.log(credentials);
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user) {
          //   console.log('해당 이메일은 없음');
          //   return null;
          throw new Error('아이디 혹은 비밀번호가 틀립니다.');
        }
        const pwcheck = await bcrypt.compare(
          credentials!.password,
          user.password!,
        );
        if (!pwcheck) {
          //   console.log('비번틀림');
          //   return null;
          throw new Error('아이디 혹은 비밀번호가 틀립니다.');
        }
        // return user as any;
        return { ...credentials, name: user.name } as any;
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // GithubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID!,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    // }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: 'jwt',
    // maxAge: 30 * 24 * 60 * 60, //30일
    // updateAge: 24 * 60 * 60, //1일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.user = {};
        token.user.id = user.id;
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }: { session: any; token: any }) => {
      const [kakao] = await prisma.account.findMany({
        where: { userId: token.user.id, provider: 'kakao' },
      });

      if (kakao.expires_at! * 1000 < Date.now()) {
        try {
          const response = await fetch('https://kauth.kakao.com/oauth/token', {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
              client_id: process.env.KAKAO_CLIENT_ID!,
              client_secret: process.env.KAKAO_CLIENT_SECRET!,
              grant_type: 'refresh_token',
              refresh_token: kakao.refresh_token!,
            }),
            method: 'POST',
          });

          const tokens: TokenSet = await response.json();

          if (!response.ok) throw tokens;

          await prisma.account.update({
            data: {
              access_token: tokens.access_token,
              expires_at: Math.floor(
                Date.now() / 1000 + (tokens.expires_in as number),
              ),
              refresh_token: tokens.refresh_token ?? kakao.refresh_token,
            },
            where: {
              provider_providerAccountId: {
                provider: 'kakao',
                providerAccountId: kakao.providerAccountId,
              },
            },
          });
        } catch (error) {
          console.error('Error refreshing access token', error);
          session.error = 'RefreshAccessTokenError';
        }
      }

      session.user = token.user;
      return session;
    },

    redirect: async ({ url, baseUrl }: { url: any; baseUrl: any }) => {
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`;
      } else if (new URL(url).origin === baseUrl) {
        return `${baseUrl}`;
      }
      return baseUrl;
    },
  },

  secret: 'JJAMBBONG',
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions as any);
