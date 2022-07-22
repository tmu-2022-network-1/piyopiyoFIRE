function getScreenSize()
{
    //現在のウィンドウサイズを取得
    sw = window.innerWidth
    sh = window.innerHeight

    var main = document.getElementById("main");
    main.style.height = `${sh}px`;
    main.style.display = "flex"
    main.style.justifyContent = "center"
    main.style.alignItems = "center"
    if ( sh < sw )
    {
        document.getElementById("whatbody").style.fontSize = `${sh / 20 }px`
        
    }
    else
    {
        document.getElementById("whatbody").style.fontSize = `${sw / 20 }px`
    }
}

window.addEventListener("load", function(){
    getScreenSize();
});

window.onresize = getScreenSize;