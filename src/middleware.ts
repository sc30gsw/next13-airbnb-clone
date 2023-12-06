import type { JWT } from 'next-auth/jwt'
import { withAuth } from 'next-auth/middleware'

export const config = {
  // 指定のパス未ログインでアクセスするとリダイレクトする
  matcher: ['/trips', '/reservations', '/properties', '/favorites'],
}

// トークンが存在しない場合、リダイレクトする
export const options = {
  callbacks: {
    authorized: ({ token }: { token: JWT | null }) => {
      return token ? true : false
    },
  },
  // リダイレクトページ
  pages: {
    signIn: '/',
  },
}

export default withAuth(options)
