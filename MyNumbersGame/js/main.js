'use strict';

{
  class Panel {
    constructor(game) {
      this.game = game;
    //   li要素を持つ
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        this.check();
      });
    }

    getEl() {
      return this.el;
    }

    activate(num) {
      this.el.classList.remove('pressed');
    //   li要素にnumをセット
      this.el.textContent = num;
    }

    check() {
        // this.el.textContent は文字列なので parseInt() で数値に
      if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
        //   正解だったら押し込むアクションをする
        this.el.classList.add('pressed');
        // 次の数値を選べるように+1する
        this.game.addCurrentNum();
// 全部パネルを押したらtimeoutidを渡す gameプロパティに書いてあるlevelをもらう
        if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }
  }
// パネルを管理する
  class Board {

    constructor(game) {
        // gameという名前で受け取ってpanelsに渡す
      this.game = game;
      this.panels = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        this.panels.push(new Panel(this.game));
      }
      this.setup();
    }

    setup() {
      const board = document.getElementById('board');
    //   panelsの数だけ要素を追加
      this.panels.forEach(panel => {
        //   li要素を追加したいのでpanelのelをメソッド経由で追加
        //   ※外部から直接アクセスしない方が良い
        board.appendChild(panel.getEl());
      });
    }

    activate() {
      const nums = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        //   末尾に要素を追加
        nums.push(i);
      }
// それぞれのパネルで処理をする
      this.panels.forEach(panel => {
        //   spliceを使ってランダムな位置から1つ要素をとる　返り値は一つでも配列になるから0
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        // numを渡す
        panel.activate(num);
      });
    }
  }

  class Game {
    constructor(level) {
      this.level = level;
    //   boardに渡す
      this.board = new Board(this);

      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;

      const btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        this.start();
      });
      this.setup();
    }
// 最初の状態
    setup() {
      const container = document.getElementById('container');
      const PANEL_WIDTH = 50;
      const BOARD_PADDING = 10;
      /* 50px * 2 + 10px * 2 */
      container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';
    }

    start() {
        // タイマーが走っていたら止める
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
      }
// スタート時は0から
      this.currentNum = 0;
      this.board.activate();
// ボタンクリック時の時間がスタートタイム
      this.startTime = Date.now();
      this.runTimer();
    }

    runTimer() {
      const timer = document.getElementById('timer');
      小数点以下2けたまで表示
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
// runtimer自身を10ミリ秒後に表示
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }
// メソッドをgameclassで実装
    addCurrentNum() {
      this.currentNum++;
    }

    getCurrentNum() {
      return this.currentNum;
    }

    getTimeoutId() {
      return this.timeoutId;
    }

    getLevel() {
      return this.level;
    }
  }
// レベル
  new Game(5);
}