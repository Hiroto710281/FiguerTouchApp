'use strict';

{
 class Panel {
   constructor (game) {
     this.game = game;
     this.el = document.createElement('li');
     this.el.classList.add('pressed');
     this.el.addEventListener('click', () =>{
       this.check();
     });

   
 }

 getEl() {
   return this.el;
 }

activate(num) {
  this.el.classList.remove('pressed');
  this.el.textContent = num;

}
check() {
  if(this.game.getCurrentNum === parseInt(this.el.textContent, 10))   {
    this.el.classList.add('pressed');
    this.game.addCurrentNum(); 
   if (this.game.getCurrentNum() === 4){
     clearTimeout(this.game.getTimeoutID());
   }
  }
  
}

}
  class Board {
    constructor(game) {
      this.game = game;
      this.panels = [];
      for (let i = 0; i < 4; i++) {
        this.panels.push(new Panel(this.game));
      }
      this.setup();
    }
  
  setup() {
    const board = document.getElementById('board');
    this.panels.forEach(panel => {
      board.appendChild(panel.getEl());
    });
  }
activate() {
  const nums = [0,1,2,3];

  this.panels.forEach(panel => {
    const num = nums.splice(Math.floor(Math.random() * nums.length),1)[0];
   panel.activate(num);
  });
}
}
   class Game {
     constructor (level) {
       this.level = level;
       this.board = new Board(this);
       this. currentNum = undefined;
       this. startTime =undefined;
       this. timeoutID=undefined;
     
       const btn = document.getElementById('btn');
       btn.addEventListener('click', () => {
         this.start;
       });
     }

       start(){
        if (typeof this.timeoutID !== 'undefined') {
          clearTimeout(this.timeoutID);
        }
    
        this.currentNum = 0;
        this.board.activate();
        this.startTime = Date.now();
        this.runTimer();
       }

     runTimer() {
      const timer = document.getElementById('timer');
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
  
      this.timeoutID = setTimeout(() => {
    this.runTimer();
  },10);
  
   }

  addCurrentNum() {
   this.currentNum++;
  }
  getCurrentNum() {
    return this.currentNum;
  }
  getTimeoutID() {
    return this.timeoutID;
  }
  }

  new Game (2);
}
