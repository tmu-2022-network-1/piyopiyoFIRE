gsap.registerPlugin(ScrollTrigger);

var sw;
var sh;
var y;
var contents = [];
var tops = [];
var danchis = [];
var zoomRate = 1000; //画像のズーム割合

var fadein; //フェードイン開始位置
var p1; //メインコンテンツのz移動開始位置

function getScreenSize()
{
    //現在のウィンドウサイズを取得
    sw = window.innerWidth
    sh = window.innerHeight
    console.log(sw + "," + sh);

    makeContents();
}

function makeContents()
{
    //スクロール用の要素の高さを設定
    var scroll = document.getElementById("scroll");
    scroll.style.width = `${sw}px`;
    scroll.style.height = `${sh * 50}px`;

    fadein = sh * 1.3;
    p1 = sh * 4;
    p2 = p1 + zoomRate;

    var screen = [];
    screen = document.getElementsByClassName("screen");

    for (k=0; k < screen.length; k++)
    {
        screen[k].style.height = `${sh}px`;
        screen[k].style.width = `${sw}px`;
    }

    //基準となる枠、画面サイズに合わせて常に中央に配置
    var base = document.getElementById("base");
    //奥スクロール開始位置を指定
    //base.style.marginTop = "500px";
    base.style.height = `${sh}px`;
    base.style.width = `${sw}px`;
    base.style.position = "sticky";
    base.style.top = 0;

    //画面サイズに合わせて画像サイズを設定
    tops = document.getElementsByClassName("top")
    for ( a=0; a < tops.length; a++)
    {
        tops[a].style.width = "70%";
    }

    contents = document.getElementsByClassName("contents");
    for( i=0; i < contents.length; i++)
    {
        contents[i].style.width = "70%";
    }

    danchis = document.getElementsByClassName("danchis");
    if ( sh < sw )
    {
        for ( j=0; j < danchis.length; j++)
        {
            danchis[j].style.width = "100%";
        }
    }
    else
    {
        for ( j=0; j < danchis.length; j++)
        {
            danchis[j].style.height = "100%";
        }
    }

    
}

function scroll()
{
    //スクロール量を取得
    y = window.pageYOffset
    console.log(y);
    
    //var scaler = document.getElementById("scaler");
    //scaler.style.transform = `translateZ(${y / 1000 }px)`

    //スクロール量に応じてコンテンツをz方向に移動
    //総スクロール量ごとに動かす画像を指定？

    var dis = document.getElementById("discription");

    //途中でフェードイン
    if ( y > fadein )
    {
        
        dis.style.visibility = "visible"
        dis.classList.add("fadeIn");
    }
    else
    //トップに戻ったら再びフェードインするように設定
    {
        dis.style.visibility = "hidden"
        dis.classList.remove("fadeIn");
    }

    //最初のコンテンツをスクロール量に合わせて移動
    if ( y > p1 )
    {
        document.getElementById("danchi").style.transform = `translateZ(${ (y-p1) / zoomRate }px)`;
        document.getElementById("treeL").style.transform = `translateZ(${ (y-p1) / zoomRate }px)`;
        document.getElementById("treeR").style.transform = `translateZ(${ (y-p1) / zoomRate }px)`;
        document.getElementById("cloudL").style.transform = `translateZ(${ (y-p1) / zoomRate }px)`;
        document.getElementById("cloudR").style.transform = `translateZ(${ (y-p1) / zoomRate }px)`;
    }

    if ( y > p2 )
    {
        let con1 = document.getElementById("con1");
        let con2 = document.getElementById("con2");

        con1.style.visibility = "visible"
        con2.style.visibility = "visible"
        con1.style.transform = `translateZ(${ ( y - p2 ) / zoomRate * 1.3 }px)`
        con2.style.transform = `translateZ(${ ( y - p2 ) / zoomRate }px)`
    }
    else
    {
        con1.style.visibility = "hidden"
        con2.style.visibility = "hidden"
    }

    //コンテンツのz座標を取得
    //z座標が0未満または1以上なら非表示にする
    
}

//ページ読み込み時と画面リサイズ時にリアルタイムで画面サイズを取得
window.addEventListener("load",function(){
    getScreenSize();
});
window.addEventListener("scroll",scroll);
window.onresize = getScreenSize;