'use strict';

//要素を取得
const qBox = document.getElementById('qBox');
const btn = document.getElementById('btn');
const boxIn = document.getElementById('boxIn');
const itemImg = document.getElementById('itemImg');
const hatena = document.getElementById('hatena');

const Btn = document.getElementById('Btn');
const mario = document.getElementById('mario');

const itemList = document.getElementById('itemList');
const firstItem = document.getElementById('firstItem');
const secondItem = document.getElementById('secondItem');
const thirdItem = document.getElementById('thirdItem');
const massage = document.getElementById('message');
const replay = document.getElementById('replay');

const dokanMenu = document.getElementById('dokan3');
const menu = document.getElementById('menu');
const dokanMusic =document.getElementById('dokan1');
const musicBtn = document.getElementById('musicBtn');
const musicBtn2 = document.getElementById('musicBtn2');

const marioImg = document.getElementById('marioImg');
const playerImg1 = document.getElementById('playerImg1');
const playerImg2 = document.getElementById('playerImg2');
const playerImg3 = document.getElementById('playerImg3');
const playerImg4 = document.getElementById('playerImg4');
//エンディング
const endSentence = document.getElementById('endSentence');
const ending = document.getElementById('ending');

//アイテムメニュー
const itemMenu = document.getElementById('itemMenu');
const itemPageFront = document.getElementById('itemPageFront');
const front = document.getElementById('front');
const back = document.getElementById('back');
const btnBack = document.getElementById('btnBack');
const choice = document.getElementsByClassName('choice');
const menuBack = document.getElementById('menuBack');

const field = document.getElementById('field');

let theCount = 0;

//music
const reachMusic = new Audio('./marioMusic/circenses.mp3');
reachMusic.volume = '.5';
const dokanSound = new Audio('./marioMusic/メニュー.mp3');
const selectSound = new Audio('./marioMusic/キャラ決定.mp3');
const selectSound2 = new Audio('./marioMusic/決定２.mp3');
const delate = new Audio('./marioMusic/キャンセル.mp3');
  
  //ボタンを押すとランダム開始
Btn.addEventListener('click',touchBox);

// 関数itemRandom
function boxAction() {
    //関数itemRandomについて
    function itemRandom() {
      
      //アイテムの要素数で乱数をnumに代入
      let num = Math.floor(Math.random()*(choice.length));
      //アイテムのsrc属性を代入
      // itemImg.src = itemImgs[num].src;
      itemImg.src = choice[num].src;
      
      //アイテム決定音
      const stopSound = new Audio('./marioMusic/キュイン.mp3');
      stopSound.volume = '.1';
      stopSound.play();
    }
    //ランダム中のアイテムの画像を装飾する
    itemImg.classList.add('itemImgActive');
    
    let count = 0;
    function countUp() {
      console.log(count ++);
    }
    const intervalId =  setInterval( () => {
      countUp();
      itemRandom();
      //アイテムが決まったとき、そのアイテムをリストに追加
      if(count === 17){
        
        //1回目、2回目、３回目で分ける
        if(theCount === 0) {
          firstItem.src = itemImg.src;
        }else if(theCount === 1) {
          secondItem.src = itemImg.src;
          //1つ目と2つ目が同じ絵柄の場合
          if(firstItem.src === secondItem.src){
            firstItem.classList.remove('opa-7');
            secondItem.classList.remove('opa-7');
            itemList.style.border = '10px dashed red';
            itemList.style.backgroundColor = '#ffbf7f';
            bgm.pause();
            reachMusic.play();
            reachMusic.loop = true;
            field.style.backgroundColor = 'darkred';
          }
        }else if(theCount === 2) {
          thirdItem.src = itemImg.src;
        }
      }
      
      //カウントが30を越えたとき
      if(count>16) {
        //itemImgActiveクラスを外す
        itemImg.classList.remove('itemImgActive');
        //決定したアイテムを大きく表示
        function itemStop() {
          itemImg.classList.toggle('itemImgStop');
        }
        itemStop();
        setTimeout(itemStop,1000);
        //ブロックの画像を初期状態に戻す
        function imgReturn() {
          itemImg.src = './mario item/hatena.png';
        }
        setTimeout(imgReturn,1000);
        //処理をやめる
        clearInterval(intervalId);

        //theCount +1
        theCount ++;
        //３回目なら
        if(theCount === 3){
          //全てのアイテムが揃ったとき
          if(firstItem.src === secondItem.src && firstItem.src === thirdItem.src) {
            reachMusic.pause();
            field.style.backgroundColor = '#a8d3ff';
            itemList.style.border = '10px outset gold';

            massage.classList.add('clearMessage');
            thirdItem.classList.remove('opa-7');
            setTimeout(endingZ,3000);
            setTimeout(endDown,3000);
            setTimeout(() => {
              replay.classList.add('clearReplay')
              massage.classList.remove('clearMessage');
            },33000);
            
            if (musicBtn.classList.contains('bgmOn')) {
              bgm.pause();
              musicBtn.classList.remove('hidden');
              musicBtn2.classList.add('hidden');
              musicBtn.classList.remove('bgmOn');
            }
            //エンディングテーマ
            const endMusic = new Audio('./marioMusic/yoakenosanka.mp3#t=5,36');
            endMusic.volume = '.5';
            endMusic.play();
            // function musicStop() {
            //   endMusic.pause();
            // }
            // setTimeout(musicStop,17000);
          }else{
            setTimeout(reset,1500);
            function reset() {
              firstItem.src = '';
              secondItem.src = '';
              thirdItem.src = '';
              reachMusic.pause();
              reachMusic.currentTime = 0;
              itemList.style.border = '10px outset gold';
              itemList.style.backgroundColor = 'none';
              field.style.backgroundColor = '#a8d3ff';
              theCount = 0;
              if(musicBtn.classList.contains('bgmOn')){
                bgm.play();
              }
            }
          }
        }
      }},100);
    }
    
    // ボタンを押して〜秒後にboxActionを発火
    function touchBox() {
      setTimeout(boxAction,700);
    }
  
  
  Btn.addEventListener('click',marioAction);
  
  //関数marioActionについて
  function marioAction() {
    mario.classList.remove('marioNormal')
    mario.classList.add('jump');
    const jumpSound = new Audio('./marioMusic/se_jump1.mp3');
    jumpSound.volume = '.5';
    jumpSound.play();
    
    const fall = () => {
      mario.classList.remove('jump')
      mario.classList.add('fall');
    }
    setTimeout(fall,350);
    
    const fallRemove = () => {
      mario.classList.remove('fall');
      mario.classList.add('marioNormal');
    }
    setTimeout(fallRemove,2001);
    //マリオがハテナブロックに触れたとき少し上にずらす
    function boxTouch() {
      qBox.classList.toggle('boxUp');
    }
    setTimeout(boxTouch,400);
    //元の位置に戻す
    setTimeout(boxTouch,750);
  }
  
  //dokanMenuをクリックしたとき発火
  dokanMenu.addEventListener('click',openMenu);
  //関数openMenu
  function openMenu() {
    dokanSound.play();

    menu.classList.add('upMenu');
    menuBack.classList.remove('opa0');
  }
  menuBack.addEventListener('click',() => {
    menu.classList.remove('upMenu');
    setTimeout(function() {
      menuBack.classList.add('opa0')},1000); 
  });

  playerImg1.addEventListener('click',()=>{
    selectSound.play();
    marioImg.src = playerImg1.src;
  });
  playerImg2.addEventListener('click',()=>{
    selectSound.play();
    marioImg.src = playerImg2.src;
  });
  playerImg3.addEventListener('click',()=>{
    selectSound.play();
    marioImg.src = playerImg3.src;
  });
  playerImg4.addEventListener('click',()=>{
    selectSound.play();
    marioImg.src = playerImg4.src;
  });

  function endingZ() {
    ending.classList.add('endingZ');
  }


  //bgm
  const bgm = new Audio('./marioMusic/menuettm.mp3');
  bgm.volume = '.5';
  //音楽再生
  musicBtn.addEventListener('click',()=>{
    //音楽が再生されていないなら
    if(!musicBtn.classList.contains('bgmOn')) {
      bgm.play();
      bgm.loop = true;
      musicBtn.classList.add('hidden');
      musicBtn2.classList.remove('hidden');
      musicBtn.classList.add('bgmOn');
    }
  });
  musicBtn2.addEventListener('click',()=>{
    if (musicBtn.classList.contains('bgmOn')) {
      bgm.pause();
      musicBtn.classList.remove('hidden');
      musicBtn2.classList.add('hidden');
      musicBtn.classList.remove('bgmOn');
    }
  });
  

  dokanMusic.addEventListener('mouseover',musicBtnUpA);
  musicBtn.addEventListener('mouseover',musicBtnUpA);
  musicBtn.addEventListener('mouseout',musicBtnUpR);
  musicBtn2.addEventListener('mouseover',musicBtnUpA);
  musicBtn2.addEventListener('mouseout',musicBtnUpR);
  dokanMusic.addEventListener('mouseout',musicBtnUpR);
  function musicBtnUpA() {
    musicBtn.classList.add('musicBtnUp');
    musicBtn2.classList.add('musicBtnUp');
  }
  function musicBtnUpR() {
    musicBtn.classList.remove('musicBtnUp');
    musicBtn2.classList.remove('musicBtnUp');
  }
  


  //関数endDownについて
  function endDown() {
    endSentence.classList.add('endDown');
  }

  //はてなブロックをクリックしたとき発火
  qBox.addEventListener('click',itemZoom);
  //関数itemZoomについて
  function itemZoom() {
    itemMenu.classList.toggle('itemZoom');
    itemPageFront.classList.toggle('itemZoom');
    function frontHidden() {
      itemPageFront.classList.toggle('opa0');
    }
    setTimeout(frontHidden,1500);
    btnBack.classList.remove('opa0');
  }
  function itemSelect(e) {
    e.classList.toggle('theItem');
  }
  //itemZoomを解除
  btnBack.addEventListener('click',()=>{
    itemMenu.classList.toggle('itemZoom');
    setTimeout(zoomRemove,1000);
    function zoomRemove() {
      itemPageFront.classList.toggle('itemZoom');
    }
    itemPageFront.classList.toggle('opa0');
    btnBack.classList.add('opa0');
  });

  //関数erase
  function erase(e) {
    if(!e.classList.contains('choice')){
      selectSound2.play();
    }else {
      delate.play();
    }
    e.classList.toggle('choice');
  }

  replay.addEventListener('click', () => {
    window.location.reload();
  });
  
  if (window.matchMedia && window.matchMedia('(max-device-width: 768px)').matches) {
    mario.addEventListener('click',openMenu);
  }
