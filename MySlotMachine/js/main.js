'use strict';

{
  class Panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');
// クラス内部から扱う
      this.img = document.createElement('img');
    //   ロードの度に画像を見てランダムなものにする
      this.img.src = this.getRandomImage();
// 初期化=押せない状態にする
      this.timeoutId = undefined;

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
    //   最初はinactive
      this.stop.classList.add('stop', 'inactive');
      this.stop.addEventListener('click', () => {
        if (this.stop.classList.contains('inactive')) {
          return;
        }
        this.stop.classList.add('inactive');
        // clearTimeout() には this.timeoutId を渡す
        clearTimeout(this.timeoutId);
// stopボタンを押すたびにpanelleftを1減らす
        panelsLeft--;

        if (panelsLeft === 0) {
            // 無くなったら呼び出すメソッド
          checkResult();
        // 0になったらまた使えるようになる残りパネルもリセット3から
          spin.classList.remove('inactive');
          panelsLeft = 3;
        }
      });
// imgとstopを子要素として追加
      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector('main');
      main.appendChild(section);
    }

    getRandomImage() {
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
      ];
    //   上の範囲からランダムに選ぶ
      return images[Math.floor(Math.random() * images.length)];
    }

    spin() {
        // 画像は　getRandomImage();メソッドにまとめる
      this.img.src = this.getRandomImage();
    //   50ミリ秒ごとにspinを繰り返す返り値をtimeoutIDにする
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }

    isUnmatched(p1, p2) {
        // 他のイメージプロパティ(p1.p2)と※異なっていた場合true
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }
// このインスタンスのイメージに不可
    unmatch() {
      this.img.classList.add('unmatched');
    }
// アクティブになったら制限を外す
    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }

  function checkResult() {
    //   パネル0が他とマッチしなかった場合
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }
// インスタンスを生成
  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];
// 残ってるパネルの初期値は3
  let panelsLeft = 3;

  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    //   inactiveをspinにつけてそれがついてる間は処理を止める
    if (spin.classList.contains('inactive')) {
      return;
    }
    spin.classList.add('inactive');
// panelで受け取って次の処理をする　
    panels.forEach(panel => {
        // spinボタンを押した時にアクティブになる
      panel.activate();
    //   上のspin()メソッドにまとめる
      panel.spin();
    });
  });
}