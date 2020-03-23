/*
 * @Author: your name
 * @Date: 2020-03-23 09:32:48
 * @LastEditTime: 2020-03-23 10:10:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /贪吃蛇/Game.js
 */
(function(window) {
// 游戏对象
//  管理整个游戏相关的对象(蛇, 食物, 地图)
//  属性
//      1.蛇对象
//      2.食物对象
//      3.地图对象
//  方法
//      1.游戏开始
//      2.游戏结束
function Game(target) {
  this.snake = new Snake();
  this.food = new Food();
  this.map = target;
}

Game.prototype.render = function() {
  // 渲染蛇和食物到地图
  this.snake.render(this.map);
  this.food.render(this.map);
}

Game.prototype.startGame = function() {
  let timerId = setInterval(() => {
    // 拿到snake的move方法
    this.snake.move(this.map, this.food);
    //  蛇撞墙分析
    //      判断: 蛇头的坐标和四面墙的关系
    //  蛇走一次判断一次, 应该写在定时器里面
    let head = this.snake.body[0];
    if (
      head.x > this.map.offsetWidth / this.food.width - 1 ||
      head.x < 0 ||
      head.y > this.map.offsetHeight / this.food.height - 1 ||
      head.y < 0
    ) {
      clearInterval(timerId);
      alert("Game over");
    }
    //  蛇头撞到自己分析
    for (let i = 4; i < this.snake.body.length; i++) {
      if (head.x === this.snake.body[i].x && head.y === this.snake.body[i].y) {
        clearInterval(timerId);
        alert("Game over");
      }
    }
    //    判断依据: 蛇头和蛇身体坐标比较
    //    for循环遍历蛇身, 判断每节蛇身题坐标是否和蛇头坐标重合
    //    移动一次判断一次
    //    蛇头撞到自己, 游戏结束
  }, 100);
  // 控制蛇移动
  document.addEventListener("keyup", e => {
    let keyCode = e.keyCode;
    if (keyCode === 37) {
      if (this.snake.direction === "right") {
        return;
      }
      this.snake.direction = "left";
    } else if (keyCode === 38) {
      if (this.snake.direction === "down") {
        return;
      }
      this.snake.direction = "up";
    } else if (keyCode === 39) {
      if (this.snake.direction === "left") {
        return;
      }
      this.snake.direction = "right";
    } else if (keyCode === 40) {
      if (this.snake.direction === "up") {
        return;
      }
      this.snake.direction = "down";
    }
  });
};
    window.Game = Game
})(window)
