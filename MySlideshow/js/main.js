'use strict';

{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];
//   最初は0を表示
  let currentIndex = 0;

  const mainImage = document.getElementById('main');
//   ソースにイメージのカレントナンバーを代入
  mainImage.src = images[currentIndex];

  images.forEach((image, index) => {
    // img 要素を生成
    const img = document.createElement('img');
    img.src = image;
// li要素を生成
    const li = document.createElement('li');
    // 今イメージが何番目にあるかのindexがcurrentindexと同じだったらクラスつける
    if (index === currentIndex) {
      li.classList.add('current');
    }
    li.addEventListener('click', () => {
      mainImage.src = image;
    //   全てのli要素を取得
      const thumbnails = document.querySelectorAll('.thumbnails > li');
    //   current クラスが付いている画像から current クラスが取り除ける
      thumbnails[currentIndex].classList.remove('current');
    //   クリックされたカレントインデックスが何番目だったか更新currentを移動
      currentIndex = index;
      thumbnails[currentIndex].classList.add('current');
    });
    // thumbnailsクラスを指定しつつ子要素にimgをたす
    li.appendChild(img);
    document.querySelector('.thumbnails').appendChild(li);
  });

  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    //   nextだから次の数値が欲しい
    let target = currentIndex + 1;
    // target が images.length 、つまり images の要素数と同じになったら 0 に差し戻す
    if (target === images.length) {
      target = 0;
    }
    // .thumbnails の直下の li の target 番目をクリックしたときと同じ処理がしたい
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    // targetが最初の要素より前にきたら飛ばす
    if (target < 0) {
      target = images.length - 1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });
// 止めた時の返り値
  let timeoutId;

  function playSlideshow() {
    timeoutId = setTimeout(() => {
        // nextクリック時の動作　1000ミリ秒＝1秒後
      next.click();
      playSlideshow();
    }, 1000);
  }

  let isPlaying = false;

  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    if (isPlaying === false) {
      playSlideshow();
      play.textContent = 'Pause';
    } else {
        // settimeoutを止める
      clearTimeout(timeoutId);
      play.textContent = 'Play';
    }
    isPlaying = !isPlaying;
  });
}