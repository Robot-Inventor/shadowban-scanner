# リリース手順

1. ユーザースクリプトを更新するPull Requestをマージする
2. ``src/ts/common/constants.ts``の``RELEASE_NOTE_URL``を更新する
3. ``npm version``でバージョンを上げる
4. 拡張機能ストアに提出する。必要があればストアの説明やスクリーンショット、プライバシーポリシーなどを更新する
5. GitHubのリリースページに追加する
