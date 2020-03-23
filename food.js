/*
 * @Author: your name
 * @Date: 2020-03-21 20:52:26
 * @LastEditTime: 2020-03-23 10:05:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /undefined/Users/apple/Desktop/food.js
 */
(function(window) {
  function Food(options = {}) {
    // 属性
    this.width = options.width || 20;
    this.height = options.height || 20;
    this.bgc = options.bgc || "blue";
    this.x = options.x || 0;
    this.y = options.y || 0;
    // 方法:
    //    根据食物对象的属性把食物创建出来添加到地图中(随机的位置)
  }
  // render
  Food.prototype.render = function(target) {
    // 根据食物对象属性, 把食物创建出来, 添加到地图中
  
    // 面向对象:  实现封装, 方便复用
    // 面向过程
    //  1.  创建一个div, div表示食物元素
    //  2.  div设置样式(width, height,...), 值来源于实例对象
    //  3.  把div添加到地图上
    let div = document.createElement("div");
    div.style.width = `${this.width}px`;
    div.style.height = `${this.height}px`;
    div.style.backgroundColor = this.bgc;
  
    // 设置div位置信息
    // 食物的坐标范围限制: [0, 39]
    // 随机得到一个x坐标, x的坐标范围在[0, 39]范围之间
    // 随机x坐标
    this.x = parseInt((Math.random() * target.offsetWidth) / this.width);
    this.y = parseInt((Math.random() * target.offsetHeight) / this.height);
    div.style.position = "absolute";
    div.style.left = `${this.x * this.width}px`;
    div.style.top = `${this.y * this.height}px`;
    target.appendChild(div);
  };

  window.Food = Food
})(window)
