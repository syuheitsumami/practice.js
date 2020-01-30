'use strict';

{
  const timer = document.getElementById('timer');
  // Command + D で選択してから start
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    //初期値プラス経過時間を引いた数
    const d = new Date(Date.now() - startTime + elapsedTime);
    //2けたで表示その前は0で埋めるdは上のd
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    //上で設定した分秒ミリ秒で表示
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
      // 10ミリ秒後
    }, 10);
  }
//状態
  function setButtonStateInitial() {
    start.classList.remove('inactive');
    //最初stopとresetが押せない
    stop.classList.add('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateRunning() {
    start.classList.add('inactive');
    stop.classList.remove('inactive');
    reset.classList.add('inactive');
  }

  function setButtonStateStopped() {
    start.classList.remove('inactive');
    stop.classList.add('inactive');
    reset.classList.remove('inactive');
  }

  setButtonStateInitial();

  start.addEventListener('click', () => {
    // Start の classList に inactive が含まれていたら
    if (start.classList.contains('inactive') === true) {
      // 上記以外の処理はしない
      return;
    }
    //状態は初期値
    setButtonStateRunning();
    startTime = Date.now();
    //動作カウントアップ
    countUp();
  });

  stop.addEventListener('click', () => {
    if (stop.classList.contains('inactive') === true) {
      return;
    }
    setButtonStateStopped();
    //止める
    clearTimeout(timeoutId);
    //経過時間 全ての　　今　　　　　スタート時
    elapsedTime += Date.now() - startTime;
  });

  reset.addEventListener('click', () => {
    if (reset.classList.contains('inactive') === true) {
      return;
    }
    //状態を初期値に戻す
    setButtonStateInitial();
    //テキストを0に戻す
    timer.textContent = '00:00.000';
    elapsedTime = 0;
  });
}