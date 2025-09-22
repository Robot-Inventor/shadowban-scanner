# Shadowban Scannerの技術情報

これは、Shadowban Scannerの判定処理などの技術情報についてのドキュメントです。

正確性を期すため、このドキュメントで使用する言葉を次のとおり定義します。

- シャドウバン：ツイートが検索結果やおすすめに表示されにくくなったり、それらにまったく表示されなくなったりする状態の総称。[X公式の定義](./about-shadowban.md#シャドウバンとは)ではなく、一般的に用いられる定義
- 事実：Shadowban Scannerの実装など、確実に正しいといえる内容
- 断定：いくつかの事実や調査から、正しいと判断できる内容
- 推定：いくつかの事実や調査から、正しい可能性が高いと判断できる内容

## データの取得方法

Shadowban Scannerでは現在、外部サーバーのAPIやXの内部API等にはアクセスせずに情報を取得しています。これは、ツイートごとに判定結果を表示するという仕様上、APIへのアクセス頻度が高くなり、サーバーに負荷をかけてしまうのを防ぐためです。また、プライバシーやセキュリティーの観点での利点もあります。（事実）

Shadowban ScannerはAPIにアクセスする代わりに、XのWebクライアントのReact Propsを取得しています。React Propsには、Xの内部APIの応答結果が格納されているため、これを利用することでAPIへアクセスせずに情報を取得できます。（事実）

## 判定方法

次のデータは、ツイートのReact Propsのうち、重要な部分を抜粋してTypeScriptの``interface``として表現したものです。（断定）

```typescript
interface TweetProps {
    possibly_sensitive?: boolean | null;
    possibly_sensitive_editable?: boolean | null;
    user: {
        possibly_sensitive?: boolean | null;
        screen_name: string;
        profile_interstitial_type: "" | "sensitive_media" | "fake_account" | "offensive_profile_content" | "timeout";
        withheld_in_countries: string[]
    };
}
```

### アカウントのシャドウバン判定

Shadowban Scannerでは、アカウントのシャドウバンを``TweetProps.user.possibly_sensitive``の値で判定しています。この値が``true``の場合、Shadowban Scannerは、アカウントがシャドウバンされているかセンシティブフラグが付与されているとみなします。（事実）

``TweetProps.user.possibly_sensitive``プロパティーが存在しない場合や、``null``の場合は、混乱を防ぐためにシャドウバンされていないと表示します。（事実）

``TweetProps.user.possibly_sensitive``はアカウント単位のセンシティブフラグです。このフラグが``true``の場合、たいていはツイートが検索結果に表示されないシャドウバン状態にあります。ただし、まれに``true``でもシャドウバンされていなかったり、``false``なのにシャドウバンされていることもあります。いずれにしても、シャドウバンの状態にかかわらず、このフラグが``true``の場合はXによってセンシティブなアカウントとしてみなされていることを示します。（断定・Xの検索結果の調査により判断）

フラグが``true``でもシャドウバンされていない場合、「ぎりぎりシャドウバンはされていないがセンシティブなアカウントとしてみなされている」と考えられます。（推定）

### プロフィールのメディアのセンシティブ判定

Shadowban Scannerでは、``TweetProps.user.profile_interstitial_type``が``sensitive_media``か``offensive_profile_content``の場合、プロフィールのメディアがセンシティブ判定を受けていると表示します。（事実）

``TweetProps.user.profile_interstitial_type``はプロフィールに関するフラグです。このフラグの値が``sensitive_media``か``offensive_profile_content``の場合、プロフィールのメディアがセンシティブとみなされていることを示します。また、プロフィールのメディアはアイコンやヘッダー画像を指していると考えられます。（推定）

フラグの値が``sensitive_media``か``offensive_profile_content``の場合、［ポストするメディアをセンシティブな内容を含むものとして設定する］という設定項目が変更できなくなります。また、投稿するすべてのメディアに対し、強制的にセンシティブフラグが付与されます。（断定・当該設定を変更できないと主張する複数のアカウントを調査した結果により判断）

<details>
<summary><strong>推定の根拠</strong></summary>

2023年9月17日時点では、任意のアカウントのプロフィールを表示した際に``https://abs.twimg.com/responsive-web/client-web-legacy/bundle.UserProfile.58f1422a.js``が読み込まれます。次のコードは、その重要な部分とその周辺の抜粋です。（事実）

なお、URLの``58f1422a``はソースコードの変更によって変わる可能性があります。（断定）

```javascript
Ra = te().cb339f26,
Ua = te().hf06085e,
xa = te().aa959f36,
Oa = te().hf06085e,
Ka = te().jf604336,
Ha = te().c9bfda48,
Wa = te().jf604336,
Va = te().b9a9cbdc,
qa = te().aa959f36,
za = te().i622ef86,
Ga = {
    'default': Ra,
    fake_account: xa,
    offensive_profile_content: Ka,
    sensitive_media: Wa,
    timeout: qa
},
Ya = {
    'default': Ua,
    fake_account: Oa,
    offensive_profile_content: Ha,
    sensitive_media: Va,
    timeout: za
},
```

``sensitive_media``には``Wa``か``Va``のいずれかが代入されています。``Wa``と``Va``はそれぞれ、``te().jf604336``と``te().b9a9cbdc``が代入されています。また、``offensive_profile_content``には``Ka``か``Ha``のいずれかが代入されており、``Ka``と``Ha``はそれぞれ``te().jf604336``と``te().c9bfda48``が代入されています。（事実）

次のコードは、日本語の翻訳データが含まれる``https://abs.twimg.com/responsive-web/client-web-legacy/i18n/ja.9d70063a.js``のうち、重要な部分とその周辺の抜粋です。（事実）

なお、URLの``9d70063a``はソースコードの変更によって変わる可能性があります。（断定）

```javascript
t('d834ab9c', 'プロフィールを表示する'),
t('cb339f26', '注意: 不審な行為が確認されているアカウントです'),
t('hf06085e', 'このアカウントは不審な行為が確認されています。表示してもよろしいですか？'),
t('aa959f36', '注意: このアカウントは一時的に制限されています'),
t('jf604336', '注意: プロフィールにセンシティブな内容が含まれている可能性のあるアカウントです'),
t(
  'c9bfda48',
  '注意: プロフィールにセンシティブと思われる内容が含まれているアカウントです。センシティブな内容の画像やテキストを投稿している可能性があります。表示してもよろしいですか？'
),
t(
  'b9a9cbdc',
  'センシティブな内容の画像やテキストをツイートしている可能性があります。表示してもよろしいですか？'
),
t('i622ef86', 'Xルールに違反している可能性があります。表示してもよろしいですか？'),
```

このコードの``jf604336``の部分を見ると、「注意: プロフィールにセンシティブな内容が含まれている可能性のあるアカウントです」と書かれています。（事実）

他のメッセージの主語が「アカウント」なのにもかかわらず、このメッセージはアカウントではなく「プロフィール」について言及しています（事実）。また、``sensitive_media``という名称から、このメッセージはプロフィールのメディアがセンシティブという意味だと考えられます。（推定）

</details>

### アカウントがブロックされている国の検出

Shadowban Scannerでは、アカウントがブロックされている国を``TweetProps.user.withheld_in_countries``の値で判定しています。この値が空の配列でない場合、Shadowban Scannerは、アカウントがブロックされている国があるとみなします。（事実）

``TweetProps.user.withheld_in_countries``はアカウントがブロックされている国のリストです。このリストには、アカウントがブロックされている国の国コードが格納されています。（事実）

#### 参考

- [特定の国でコンテンツが表示制限される状況の理解](https://help.twitter.com/ja/rules-and-policies/post-withheld-by-country)
- [Tweet object | Docs | X Developer Platform](https://developer.twitter.com/en/docs/twitter-api/v1/data-dictionary/object-model/tweet#:~:text=withheld_copyright%22%3A%20true-,withheld_in_countries,-Array%20of%20String)

### ツイートのセンシティブ判定と年齢制限判定

Shadowban Scannerでは、ツイートのセンシティブ判定を``TweetProps.possibly_sensitive``の値で判定しています。この値が``true``の場合、Shadowban Scannerは、ツイートがセンシティブなツイートとしてみなされていると判定します。（事実）

``TweetProps.possibly_sensitive``プロパティーが存在しない場合や、``null``の場合は、混乱を防ぐためにセンシティブなツイートではないと表示します。（事実）

``TweetProps.possibly_sensitive``はツイート単位のセンシティブフラグです。このフラグが``true``の場合、ツイートがセンシティブなツイートとしてみなされていることを示します。（断定）

``TweetProps.possibly_sensitive``が``true``かつ、``TweetProps.possibly_sensitive_editable``が``true``の場合、そのツイートは［センシティブな内容を含むものを表示しない］設定がオンになっているアカウントの検索結果に表示されなくなります。（推定・Xの検索結果の調査により判断）

``TweetProps.possibly_sensitive``が``true``かつ、``TweetProps.possibly_sensitive_editable``が``false``の場合、そのツイートは検索結果に表示されなくなります。また、年齢制限がかかり、未成年者のアカウントや非ログイン状態で閲覧できなくなります。（断定・該当ツイートを非ログイン状態で表示しようとする試みにより判断）
