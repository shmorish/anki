# Flashcards

学習用フラッシュカードアプリケーション

## 概要

このアプリケーションは、フラッシュカードシステムです。React + TypeScript + Viteで構築され、GitHub Pagesで公開されています。

## 技術スタック

- **フレームワーク**: React 19
- **言語**: TypeScript
- **ビルドツール**: Vite
- **スタイリング**: CSS
- **デプロイ**: GitHub Pages
- **CI/CD**: GitHub Actions

## セットアップ

### 必要な環境

- Node.js 20.x以上
- npm

### インストール

```bash
# リポジトリのクローン
git clone <repository-url>
cd anki

# 依存関係のインストール
npm install
```

## 開発

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開きます。



## デプロイ

このプロジェクトはGitHub Actionsで自動デプロイされます。

- `main` ブランチにプッシュすると、自動的にビルド＆デプロイが実行されます
- GitHub Pagesで公開されます

手動でデプロイする場合：

```bash
npm run deploy
```

## フラッシュカードの追加

### アプリ内から追加

1. アプリを開く
2. "Add Card" ボタンをクリック
3. フォームに質問、答え、カテゴリーを入力
4. Issueを作成すると、GitHub Actionsが自動的に `flashcards.json` にカードを追加

## プロジェクト構造

```
anki/
├── .github/
│   └── workflows/          # GitHub Actions ワークフロー
│       ├── build-and-deploy.yml
│       └── process-flashcard-issue.yml
├── src/
│   ├── components/         # Reactコンポーネント
│   │   ├── FlashcardComponent.tsx
│   │   ├── CardNavigation.tsx
│   │   └── AddCardForm.tsx
│   ├── data/
│   │   └── flashcards.json # フラッシュカードデータ
│   ├── types/
│   │   └── flashcard.ts    # TypeScript型定義
│   ├── App.tsx             # メインアプリケーション
│   └── main.tsx            # エントリーポイント
├── package.json
└── vite.config.ts
```
