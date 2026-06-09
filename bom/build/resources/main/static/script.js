const game = document.getElementById("game");
const bom = document.querySelector(".bom");
const leftWall = document.querySelector(".left");
const rightWall = document.querySelector(".right");
const scoreText = document.getElementById("score");
const movespeed = 2;
const gameoverText = document.getElementById("gameover");
const resultBtn =document.getElementById("resultBtn");
const playerName =document.getElementById("playerName").textContent;
const name1 =playerName.replace("の挑戦", "");
let score = 0;
let syutugen = 5000;
let gameOver = false;

resultBtn.addEventListener("click", () => {
    window.location.href =
        "/save?name="
        + name1
        + "&score="
        + score;
    });

spawn();

function spawn(){

    bakudan();

    // だんだん速く
    syutugen -= 300;

    // 最低速度
    if(syutugen < 500){
        syutugen = 500;
    }

    setTimeout(spawn, syutugen);
}


function bakudan(){

    let isDragging = false;
    let defused = false;
    const bom = document.createElement("div");

    bom.textContent = "💣";
    bom.classList.add("bom");

    const randomColor = Math.random();

    if(randomColor < 0.5){
        bom.classList.add("redBomb");
    }
    else{
        bom.classList.add("blueBomb");
    }

    const count = document.createElement("div");
    count.classList.add("count");

    // 最初は非表示
    count.style.display = "none";

    game.appendChild(bom);
    bom.appendChild(count);

     // 初期位置
    let x = 250;
    let y = 100;

    // ランダム方向
    const angle = Math.random() * Math.PI * 2;

    let dx = Math.cos(angle) * movespeed;
    let dy = Math.sin(angle) * movespeed;
    // let dx = movespeed;
    // let dy = movespeed;

    let timer = 10;

    // 移動ループ
    const move = setInterval(() => {
        if(!isDragging){
            x += dx;
            y += dy;
        }

        // 当たり判定用
        const bomRect = bom.getBoundingClientRect();

        const leftRect = leftWall.getBoundingClientRect();
        const rightRect = rightWall.getBoundingClientRect();

        // 壁反射
        if(x <= 0 || x >= game.offsetWidth - 50){
            dx *= -1;
        }

        if(y <= 0 || y >= game.offsetHeight - 70){
            dy *= -1;
        }

        if(!isDragging){
                // 左ブロック
            if(
                bomRect.right > leftRect.left &&
                bomRect.left < leftRect.right &&
                bomRect.bottom > leftRect.top &&
                bomRect.top < leftRect.bottom
            ){
                const bomCenterX =
                    (bomRect.left + bomRect.right) / 2;

                const bomCenterY =
                    (bomRect.top + bomRect.bottom) / 2;

                const wallCenterX =
                    (leftRect.left + leftRect.right) / 2;

                const wallCenterY =
                    (leftRect.top + leftRect.bottom) / 2;

                const diffX = bomCenterX - wallCenterX;
                const diffY = bomCenterY - wallCenterY;

                // 横衝突
                if(Math.abs(diffX) > Math.abs(diffY)){

                    dx *= -1;

                    // 少し押し出す
                    x += dx * 2;
                }

                // 縦衝突
                else{

                    dy *= -1;

                    // 少し押し出す
                    y += dy * 2;
                }
                if(

                bom.classList.contains("redBomb")

                &&

                bomCenterX > leftRect.left
                &&

                bomCenterX < leftRect.right

                &&

                bomCenterY > leftRect.top

                &&

                bomCenterY < leftRect.bottom

                &&
                
                !defused
                ){
                    // ゲームオーバーなら終了
                    if(gameOver){
                        return;
                    }
                    defused = true;

                    clearInterval(countdown);

                    clearInterval(move);

                    count.style.display = "none";

                    bom.classList.remove("danger");

                    score += 10;

                    scoreText.textContent = "Score : " + score;

                    bom.remove();
                }else if(bom.classList.contains("blueBomb")

                &&

                bomCenterX > leftRect.left
                &&

                bomCenterX < leftRect.right

                &&

                bomCenterY > leftRect.top

                &&

                bomCenterY < leftRect.bottom){
                    bakuhatu(bom)
                }
            }


            // 右ブロック
            if(
                bomRect.right > rightRect.left &&
                bomRect.left < rightRect.right &&
                bomRect.bottom > rightRect.top &&
                bomRect.top < rightRect.bottom
            ){
            
                const bomCenterX =
                    (bomRect.left + bomRect.right) / 2;

                const bomCenterY =
                    (bomRect.top + bomRect.bottom) / 2;

                const wallCenterX =
                    (rightRect.left + rightRect.right) / 2;

                const wallCenterY =
                    (rightRect.top + rightRect.bottom) / 2;

                const diffX = bomCenterX - wallCenterX;
                const diffY = bomCenterY - wallCenterY;

                if(

                bom.classList.contains("blueBomb")

                &&

                bomCenterX > rightRect.left

                &&

                bomCenterX < rightRect.right

                &&

                bomCenterY > rightRect.top

                &&

                bomCenterY < rightRect.bottom
                
                &&
                
                !defused
                ){  
                    // ゲームオーバーなら終了
                    if(gameOver){
                        return;
                    }
                    
                    defused = true;

                    clearInterval(countdown);

                    clearInterval(move);

                    count.style.display = "none";

                    bom.classList.remove("danger");

                    score += 10;

                    scoreText.textContent = "Score : " + score;

                    bom.remove();
                }else if(bom.classList.contains("redBomb")

                &&

                bomCenterX > rightRect.left

                &&

                bomCenterX < rightRect.right

                &&

                bomCenterY > rightRect.top

                &&

                bomCenterY < rightRect.bottom){
                    bakuhatu(bom)
                }   

                // 横衝突
                if(Math.abs(diffX) > Math.abs(diffY)){

                    dx *= -1;

                    // 少し押し出す
                    x += dx * 2;
                }

                // 縦衝突
                else{

                    dy *= -1;

                    // 少し押し出す
                    y += dy * 2;
                }
            }
        }

        bom.style.left = x + "px";
        bom.style.top = y + "px";
    }, 20);

    //残り5秒で拡大表示と数字表示
    //残り0秒で爆発
    const countdown = setInterval(() => {

        timer--;

        // 5秒以下になったら表示
        if(timer <= 5){

            count.style.display = "block";

            count.textContent = timer;

            bom.classList.add("danger");
        }

        // 爆発
        if(timer <= 0){

            clearInterval(countdown);

            bakuhatu(bom);
        }

    }, 1000);
    // 掴む
    bom.addEventListener("mousedown", () => {

        isDragging = true;
    });

    // 離す
    document.addEventListener("mouseup", () => {

        isDragging = false;
    });

    document.addEventListener("mousemove", (e) => {

        if(isDragging){

            const gameRect = game.getBoundingClientRect();

            x =
                e.clientX
                - gameRect.left
                - bom.offsetWidth / 2;

            y =
                e.clientY
                - gameRect.top
                - bom.offsetHeight / 2;

            // 左右制限
        if(x < 0){
            x = 0;
        }

        if(x > game.offsetWidth - bom.offsetWidth){
            x = game.offsetWidth - bom.offsetWidth;
        }

        // 上下制限
        if(y < 0){
            y = 0;
        }

        if(y > game.offsetHeight - bom.offsetHeight){
            y = game.offsetHeight - bom.offsetHeight;
        }

            bom.style.left = x + "px";
            bom.style.top = y + "px";
        }
    });
}


function bakuhatu(bom){

    gameOver = true;

    // 爆発表示
    bom.textContent = "💥";

    gameoverText.style.display = "block";

}


