# リリース手順

1. ``src/ts/common/constants.ts``の``RELEASE_NOTE_URL``を更新する
2. ``npm version``でバージョンを上げる
3. 1と2を含むPull Requestをmainブランチにマージする
4. ユーザースクリプトを更新するPull Requestをmainブランチにマージする
5. 拡張機能ストアに提出する。必要があればストアの説明やスクリーンショット、プライバシーポリシーなどを更新する
6. GitHubのリリースページに追加する
