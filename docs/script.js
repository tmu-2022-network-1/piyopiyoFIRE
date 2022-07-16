var counter = 0;
var currentX;

function draw()
{
    ellipse(50, 50, 80, 80);
}

function samplePlay()
{
    const sample = new Audio('./images/う.mp3');
    sample.volume = 0.1;
    sample.play();
}

function musicPlay()
{
    counter = 1;
    const music = new Audio('./images/B♭4.mp3');
    music.volume = 0.1;
    music.play();

    //1秒経過したらカウンターを0にする、リロードすると再生されなくなる？
    setTimeout(function(){
        counter = 0;
        console.log("counter=0");
    }, 300)
}

//要素が指定の位置にきたらオーディオを再生する
function audioPlay()
{
    //オーディオ音源を指定（配列？）
    const c = new Audio('./images/う.mp3');

    var targetElement = document.getElementById("test");

    //c要素の位置座標を取得
    var clientRectC = targetElement.getBoundingClientRect();
    
    //画面の左端からc要素の左端までの距離
    var x = clientRectC.left;
    //console.log(x); //できてる

    //要素が画面の左端にきたら（要素のx座標が０を跨いだら）オーディオを再生
    if (currentX * x < 0)
    {
        if (counter === 0)
        {
            musicPlay();　//できた
        }
        else
        {
            return; //できたけど戻ると何回も再生できちゃう
        }
    }

    //要素の最新の座標を保存
    currentX = x;
}

window.addEventListener("scroll", audioPlay);
//リロード時の再生判定用カウンターをリセット
window.addEventListener("load", function(){
    counter = 0;
})
