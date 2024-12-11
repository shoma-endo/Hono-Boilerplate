# Hono Boilerplate

このプロジェクトは、Node.jsとTypeScriptを使用して構築されたWebアプリケーションです。認証、ルーティング、ミドルウェア、設定、ロギングなどの機能を持っています。

## プロジェクトの概要

このプロジェクトは、ユーザー認証、管理者用ルート、サービスプロバイダー用ルート、Web用ルートなどを提供するWebアプリケーションのボイラープレートです。

## 主要なファイルとディレクトリ

### [`.bolt/`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fshoma.endo%2Fprivate%2FHono-Boilerplate%2F.bolt%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22494622df-648b-4951-8c02-43aa694e1f88%22%5D "/Users/shoma.endo/private/Hono-Boilerplate/.bolt/")
- **config.json**: プロジェクトの設定ファイル。

### [`src/`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fshoma.endo%2Fprivate%2FHono-Boilerplate%2Fsrc%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22494622df-648b-4951-8c02-43aa694e1f88%22%5D "/Users/shoma.endo/private/Hono-Boilerplate/src/")
- **controllers/**: コントローラーが含まれています。
  - **auth.controller.ts**: 認証関連のコントローラー。ログインとユーザー情報取得のハンドラーが定義されています。
    ```ts
    import { Context } from 'hono'
    import { loginSchema } from '../schema/auth.schema.js'
    import { validateRequest } from '../utils/validator.js'
    import { authService } from '../services/auth.service.js'
    import { sendSuccess, sendError } from '../utils/response.js'
    import { logger } from '../lib/logger.js'

    export const loginHandler = async (c: Context) => {
      try {
        const body = await c.req.json()
        const result = await validateRequest(loginSchema, body)
        
        if (!result.success) {
          return sendError(c, 'Invalid input', 400)
        }

        const { user, token } = await authService.login(result.data)
        return sendSuccess(c, { user, token })
      } catch (error) {
        logger.error('Login failed', error)
        return sendError(c, 'Login failed', 500)
      }
    }

    export const getMeHandler = async (c: Context) => {
      try {
        const user = c.get('user')
        const userData = await authService.getUser(user.userId)
        return sendSuccess(c, userData)
      } catch (error) {
        logger.error('Get user failed', error)
        return sendError(c, 'Failed to get user data', 500)
      }
    }
    ```

- **lib/**: ライブラリやユーティリティが含まれています。
  - **auth.ts**: 認証関連の関数。
  - **config.ts**: 設定関連の関数。
  - **db.ts**: データベース関連の関数。
  - **logger.ts**: ロギング関連の関数。

- **middleware/**: ミドルウェアが含まれています。
  - **authMiddleware.ts**: 認証ミドルウェア。
  - **errorHandling.ts**: エラーハンドリングミドルウェア。

- **routes/**: ルーティングが含まれています。
  - **admin/**: 管理者用ルート。
  - **sp/**: サービスプロバイダー用ルート。
  - **web/**: Web用ルート。
    - **auth.routes.ts**: 認証関連のルート。
      ```ts
      import { Hono } from 'hono'
      import { authMiddleware } from '../../middleware/authMiddleware.js'
      import { loginHandler, getMeHandler } from '../../controllers/auth.controller.js'

      const authRouter = new Hono()

      authRouter.post('/login', loginHandler)
      authRouter.get('/me', authMiddleware, getMeHandler)

      export { authRouter }
      ```

- **schema/**: スキーマが含まれています。
  - **auth.schema.ts**: 認証関連のスキーマ。

- **services/**: サービスが含まれています。
  - **auth.service.ts**: 認証サービス。
    ```ts
    import { db } from '../lib/db.js'
    import { generateToken } from '../lib/auth.js'
    import { LoginInput } from '../schema/auth.schema.js'
    export class AuthService {/*...*/}

    export const authService = new AuthService()
    ```

- **utils/**: ユーティリティが含まれています。
  - **response.ts**: レスポンス関連のユーティリティ。
  - **validator.ts**: バリデーション関連のユーティリティ。

### [`src/index.ts`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fshoma.endo%2Fprivate%2FHono-Boilerplate%2Fsrc%2Findex.ts%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22494622df-648b-4951-8c02-43aa694e1f88%22%5D "/Users/shoma.endo/private/Hono-Boilerplate/src/index.ts")
- アプリケーションのエントリーポイントで、サーバーの設定と起動が行われています。
  ```ts
  import { serve } from '@hono/node-server'
  import { Hono } from 'hono'
  import { cors } from 'hono/cors'
  import { logger } from 'hono/logger'
  import { adminApp } from './routes/admin/index.js'
  import { webApp } from './routes/web/index.js'
  import { spApp } from './routes/sp/index.js'
  import { errorHandling } from './middleware/errorHandling.js'
  import { config } from './lib/config.js'

  const app = new Hono()

  // Middleware
  app.use('*', logger())
  app.use('*', cors({
    origin: config.frontendOrigin,
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization']
  }))
  app.use('*', errorHandling)

  // Routes
  app.route('/admin', adminApp)
  app.route('/web', webApp)
  app.route('/sp', spApp)

  // Health check
  app.get('/health', (c) => c.json({ status: 'ok' }))

  serve(app, () => {
    console.log(`Server is running on port ${config.port}`)
  })
  ```

## 環境設定

### .envファイルの設定

プロジェクトのルートディレクトリに[`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FUsers%2Fshoma.endo%2Fprivate%2FHono-Boilerplate%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%2C%22df8feed1-53be-4d47-b7f2-4f25a5153e1a%22%5D "/Users/shoma.endo/private/Hono-Boilerplate/.env")ファイルを作成し、以下の環境変数を設定します。

```env
PORT=8787
FRONTEND_ORIGIN=http://localhost:3000
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=your-stripe-secret-key
NODE_ENV=development
```

## セットアップ手順

1. 依存関係をインストールします。
   ```sh
   npm install
   ```

2. 環境変数を設定します。
   ```sh
   cp .env.example .env
   ```

3. プロジェクトをビルドします。
   ```sh
   npm run build
   ```

4. アプリケーションを起動します。
   ```sh
   npm start
   ```

## 使用方法

### エンドポイント

- **POST /login**: ユーザーのログイン。
- **GET /me**: 認証されたユーザーの情報を取得。

## テスト

テストを実行するには、以下のコマンドを使用します。
```sh
npm test
```

## 貢献ガイドライン

1. フォークしてリポジトリをクローンします。
2. 新しいブランチを作成します。
3. 変更をコミットします。
4. プルリクエストを作成します。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は`LICENSE`ファイルを参照してください。