'use strict';

{
  const words = [
    'apple',
    'sky',
    'blue',
    'middle',
    'set',
  ];
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 3 * 1000;
  let startTime;
//   ゲームは始まっているか初期値はまだ
  let isPlaying = false;

  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  function updateTarget() {
    let placeholder = '';
    for (let i = 0; i < loc; i++) {
        // 最初からloc番目までを_で埋める
      placeholder += '_';
    }
    // substring() に引数をひとつだけ渡してあげる
    // その位置から最後までの部分文字列を返してくれる
    target.textContent = placeholder + word.substring(loc);
  }

  function updateTimer() {
    //   残り時間はゲーム開始時間に制限時間を足してそこから現在の時間を引く
    const timeLeft = startTime + timeLimit - Date.now();
    // 小数点以下を２桁で表示
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);
// timeleftが0より下回ったら
    if (timeLeft < 0) {
      isPlaying = false;

      clearTimeout(timeoutId);
      timerLabel.textContent = '0.00';
    //  画面描画がブロックされるため100ミリ秒後に次の処理をしてもらう
      setTimeout(() => {
        showResult();
      }, 100);

      target.textContent = 'click to replay';
    }
  }

  function showResult() {
      //正解率を求める際に使う定数
      // score と miss を足したものが 0 だったら 0% になる
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    //下記のアラートを表示
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
  }
// windowをクリックしたときの動作
  window.addEventListener('click', () => {
    //   ゲームが始まっているか？true
    if (isPlaying === true) {
        //trueだったらそれ以降の処理はしなくていい
      return;
    }
    isPlaying = true;
//スコアとミスを初期化
    loc = 0;
    score = 0;
    miss = 0;
    // 更新したスコアを代入　カウントが増える
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    // wordsの配列の中からランダムで選ぶ
    word = words[Math.floor(Math.random() * words.length)];
// テキストはwordに格納している中から選ぶ
    target.textContent = word;
    startTime = Date.now();
    updateTimer();
  });
// キーを押し込んだ時の動作eはおそらくevent
  window.addEventListener('keydown', e => {
    // ゲームが始まっていない状態で何らかの文字を打つと、
    // miss としてカウントされてしまったり、正解として処理が進んでしまったりします。
    if (isPlaying !== true) {
        //ゲームは始まっていなかったらそれ以降の処理はしない
      return;
    }
// loc番目
    if (e.key === word[loc]) {
        // タイピングが正解だった場合はlocを一つ増やす＝次のもじに進む
      loc++;
      if (loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        // locを0に戻す
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}