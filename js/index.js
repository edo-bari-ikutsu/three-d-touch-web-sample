(function () {
    /**
     * タッチ開始イベント
     */
    var _touchStart = function (event) {
        // タッチイベントを評価
        evalTouchEvent(event);
    };
    /**
     * タッチ移動イベント
     */
    var _touchMove = function (event) {
        // タッチイベントを評価
        evalTouchEvent(event);
    };
    /**
     * タッチ終了イベント
     */
    var _touchEnd = function (event) {
        // タッチイベントを評価
        evalTouchEvent(event);
    };
    /**
     * タッチキャンセルイベント
     */
    var _touchCancel = function (event) {
        // タッチイベントを評価
        evalTouchEvent(event);
    };
        
    /**
     * タッチイベントを評価
     */
    var evalTouchEvent = function (event, isTouching) {
        // 既存イベントを打ち消し
        event.preventDefault();

        // タッチ状態を初期化
        setTouchStateDisp(false);

        // forceの初期値を0に設定
        var force = 0;
        // startとmoveの時、タッチイベントからforceを取得
        if (event.type == "touchstart" || event.type == "touchmove") {
            
            // タッチ状態を更新
            setTouchStateDisp(true);

            var touch = event.touches[0];
            if (touch != null && touch.force != null) {
                force = touch.force;
            }
            // forceが取得できないときは0を設定
            if (force == null) {
                force = 0;
            }
        }
        // forceをプログレスバー値に反映
        setProgressBarValue(force);
    }
    
    /**
     * プログレスバー値を設定
     */
    var setProgressBarValue = function (force) {
        var progressBar = document.getElementById("progress-bar");
        progressBar.style.width = force * 100 + "%";
        progressBar.setAttribute("aria-valuenow", (String)(force * 100));
        document.getElementById("force-percent").textContent
        = (String)(Math.floor(force * 10000) / 100);  // 小数点第2位までを表示
    }
    
    /**
     * タッチ状態を画面表示
     */
    var setTouchStateDisp = function (isTouching) {
        document.getElementById("touch-state").textContent =
        isTouching ? "タッチ中です。" : "タッチしていません。";
    }
    
    // ロード時の処理
    window.addEventListener("load", function () {
        // タッチイベント設定
        document.addEventListener("touchstart", _touchStart, false);
        document.addEventListener("touchmove", _touchMove, false);
        document.addEventListener("touchend", _touchEnd, false);
        document.addEventListener("touchcancel", _touchCancel, false);
        
        // プログレスバー値、タッチ状態を初期化
        setProgressBarValue(0);
        setTouchStateDisp(false);
    }, false);
})();
    