# リリース手順

1. リリースノートを更新する

    - リリースノートを表示する場合：
      - `src/ts/common/constants.ts`の`RELEASE_NOTE_URL`を更新する
      - `src/ts/common/constants.ts`の`SHOW_RELEASE_NOTES`を`true`にする
    - リリースノートを表示しない場合：
      - `src/ts/common/constants.ts`の`SHOW_RELEASE_NOTES`を`false`にする

2. `npm version`でバージョンを上げる
3. 1と2を含むPull Requestをmainブランチにマージする
4. ユーザースクリプトを更新するPull Requestをmainブランチにマージする
5. 拡張機能ストアに提出する。必要があればストアの説明やスクリーンショット、プライバシーポリシーなどを更新する
6. GitHubのリリースページに追加する
