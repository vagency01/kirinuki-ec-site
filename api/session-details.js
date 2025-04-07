<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>VTuber切り抜きサービス</title>
  <style>
    body {
      font-family: 'Hiragino Kaku Gothic ProN', 'メイリオ', sans-serif;
      background-color: #FFF8EF;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 1000px;
      margin: 0 auto;
      padding: 20px;
    }
    header {
      text-align: center;
      margin-bottom: 30px;
    }
    header h1 {
      font-size: 2em;
      margin-bottom: 10px;
    }
    header p {
      font-size: 1em;
      color: #555;
    }
    .banner {
      background-color: #FFFFFF;
      text-align: center;
      padding: 30px;
      margin-bottom: 30px;
      border-radius: 10px;
    }
    .banner img {
      width: 100%;
      max-width: 1600px;
      height: auto;
      display: block;
      margin: 0;
    }
    .plans {
      display: flex;
      justify-content: space-between;
      margin-bottom: 50px;
    }
    .plan {
      background-color: #FFFFFF;
      width: 30%;
      padding: 20px;
      text-align: center;
      border-radius: 10px;
    }
    .plan img {
      width: 100%;
      height: auto;
      display: block;
      margin: 0;
    }
    .buy-button {
      background-color: #FFFFFF;
      color: #333;
      border: 2px solid #FF9D00;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: bold;
    }
    .video-samples {
      text-align: center;
      margin-top: 30px;
    }
    .video-samples h2 {
      margin-bottom: 30px;
    }
    .videos {
      display: flex;
      justify-content: space-between;
    }
    .video {
      width: 30%;
      background-color: #FFFFFF;
      padding: 20px;
      border-radius: 10px;
    }
    .flow {
      text-align: center;
      margin-top: 50px;
    }
    .flow h2 {
      margin-bottom: 20px;
      font-size: 1.5em;
    }
    .flow img {
      width: 100%;
      max-width: 1600px;
      height: auto;
      display: block;
      margin: 0 auto;
    }
    .flow .request-button {
      background-color: #FF9D00;
      color: white;
      padding: 10px 20px;
      border-radius: 20px;
      font-weight: bold;
      cursor: pointer;
      text-decoration: none;
      display: inline-block;
      margin-top: 20px;
    }
    footer {
      width: 100%;
      background-color: #FFA500;
      padding: 5px 5px;
      text-align: center;
      color: #555;
      position: relative;
      justify-content: center;
    }
    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      text-align: center;
    }
    .footer-content h2,
    .footer-content .description {
      color: white;
      margin: 5px 0;
      padding: 0;
    }
    .copyright {
      margin-top: 5px;
      padding: 0;
    }
    .social-icon {
      height: 1.3em;
      width: auto;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- ヘッダー -->
    <header>
      <h1>VTuber切り抜きサービス</h1>
      <p>あなたの配信や動画をもっと魅力的に！ご希望に合わせて編集します。</p>
    </header>

    <!-- バナー画像 -->
    <div class="banner">
      <img src="images/Kari_banner.jpg" alt="バナー画像" />
    </div>

    <!-- プラン一覧 -->
    <div class="plans" id="plans">
      <div class="plan">
        <img src="images/Plan1.jpg" alt="きほんプラン画像" />
        <h2>きほん<br />プラン</h2>
        <p>特定の場所から<br />動画を作ります！</p>
        <p>価格: ¥3,000</p>
        <a href="plan1_form.html">
          <button class="buy-button">このプランを購入</button>
        </a>
      </div>

      <div class="plan">
        <img src="images/Plan2.jpg" alt="おんぶにだっこプラン画像" />
        <h2>おんぶにだっこ<br />プラン</h2>
        <p>リンクを送るだけで完成！</p>
        <p>価格: ¥4,000</p>
        <a href="plan2_form.html">
          <button class="buy-button">このプランを購入</button>
        </a>
      </div>

      <div class="plan">
        <img src="images/Plan3.jpg" alt="ゆるイラスト切り抜き画像" />
        <h2>ゆるイラスト<br />切り抜き</h2>
        <p>イラストで切り抜きを<br />作ります！</p>
        <p>価格: ¥8,000</p>
        <a href="plan3_form.html">
          <button class="buy-button">このプランを購入</button>
        </a>
      </div>
    </div>

    <!-- 動画サンプル -->
    <div class="video-samples">
      <h2>-動画サンプル-</h2>
      <div class="videos">
        <div class="video">
          <h3>動画サンプル①</h3>
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/n3lnpTNxgfo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <div class="video">
          <h3>動画サンプル②</h3>
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/n3lnpTNxgfo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>

        <div class="video">
          <h3>動画サンプル③</h3>
          <iframe width="100%" height="315" src="https://www.youtube.com/embed/n3lnpTNxgfo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    </div>

    <!-- ご依頼の流れ -->
    <div class="flow">
      <h2>-ご依頼の流れ-</h2>
      <img src="images/IrainoNagare.jpg" alt="ご依頼の流れ" />
      <a href="#plans" class="request-button">ご依頼はコチラ</a>
    </div>
  </div>

  <!-- フッター -->
  <footer>
    <div class="footer-content">
      <h2>「Vあげ」とは？</h2>
      <p class="description">V文化が好きなクリエイターが集まり、Vさんを広めたり活動のお手伝いをする有志グループになります！</p>
      <p>ご連絡先 : <a href="mailto:vagency.2107@gmail.com">vagency.2107@gmail.com</a></p>
      <a href="https://x.com/Vagency_1" target="_blank" rel="noopener noreferrer">
        <img src="images/X_icon (1).png" class="social-icon" alt="X" />
      </a>
    </div>
    <p class="copyright">© 2024 Vagency</p>
  </footer>
</body>
</html>
