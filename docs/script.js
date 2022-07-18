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
var p2;
var p3;
var p4;
var p5;
var p6;

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
    fadein = sh * 1.2;
    p1 = sh * 4;
    p2 = p1 + zoomRate;
    p3 = p2 + zoomRate;
    p4 = p3 + zoomRate;
    p5 = p4 + zoomRate;
    p6 = p5 + zoomRate;
    p7 = p6 + zoomRate / 2;

    //スクロール用の要素の高さを設定
    var scroll = document.getElementById("scroll");
    scroll.style.width = `${sw}px`;
    scroll.style.height = `${p6}px`;

    //document.body.style.height = `${p7}px`

    var screen = [];
    screen = document.getElementsByClassName("screen");

    for (k=0; k < screen.length; k++)
    {
        screen[k].style.height = `${sh}px`;
        screen[k].style.width = `${sw}px`;
    }

    //基準となる枠、画面サイズに合わせて常に中央に配置
    var base = document.getElementById("base");
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
    danchis2 = document.getElementsByClassName("danchis2")
    if ( sh < sw )
    {
        for ( j=0; j < danchis.length; j++)
        {
            danchis[j].style.width = "100%";
            danchis2[j].style.width = "100%"
        }
    }
    else
    {
        for ( j=0; j < danchis.length; j++)
        {
            danchis[j].style.height = "100%";
            danchis2[j].style.height = "100%";
        }
    }

    document.getElementById("title2").style.height = "40%";    
}

function scroll()
{
    //スクロール量を取得
    y = window.pageYOffset
    console.log(y);

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
        con1.style.transform = `translateZ(${ ( y - p2 ) / zoomRate }px)`
        con2.style.transform = `translateZ(${ ( y - p2 ) / zoomRate * 1.3 }px)`
    }
    else
    {
        con1.style.visibility = "hidden"
        con2.style.visibility = "hidden"
    }

    if ( y > p3 )
    {
        let con3 = document.getElementById("con3");
        let con4 = document.getElementById("con4");

        con3.style.visibility = "visible"
        con4.style.visibility = "visible"
        con3.style.transform = `translateZ(${ ( y - p3 ) / zoomRate }px)`
        con4.style.transform = `translateZ(${ ( y - p3 ) / zoomRate * 1.3 }px)`
    }
    else
    {
        con3.style.visibility = "hidden"
        con4.style.visibility = "hidden"
    }

    if ( y > p4 )
    {
        let con5 = document.getElementById("con5");
        let con6 = document.getElementById("con6");

        con5.style.visibility = "visible"
        con6.style.visibility = "visible"
        con5.style.transform = `translateZ(${ ( y - p4 ) / zoomRate }px)`
        con6.style.transform = `translateZ(${ ( y - p4 ) / zoomRate * 1.3 }px)`
        
    }
    else
    {
        con5.style.visibility = "hidden"
        con6.style.visibility = "hidden"
    }

    
    if ( y > p5 )
    {
        let danchis2 = document.getElementsByClassName("danchis2");
        for ( b=0; b < danchis2.length; b++)
        {
            danchis2[b].style.visibility = "visible";
            danchis2[b].style.transform = `translateZ(${ 0.9 - (y - p5) / zoomRate }px)`;

            if ( (0.9 - (y-p5) / zoomRate) < 0)
            {
                danchis2[b].style.transform = "translateZ(0px)";
            }
        }
    }
    else
    {
        for (b=0; b < danchis2.length; b++)
        {
            danchis2[b].style.visibility = "hidden"
        }
    }

    if ( y > p6 )
    {
        let title2 = document.getElementById("title2");
        title2.style.visibility = "visible";
        title2.classList.add("fadeIn");
        document.getElementById("base").style.position = "fixed";
    }
    else
    //上に戻ったら再びフェードインするように設定
    {
        title2.style.visibility = "hidden"
        title2.classList.remove("fadeIn");
        document.getElementById("base").style.position = "sticky";
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