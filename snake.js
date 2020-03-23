/*
 * @Author: your name
 * @Date: 2020-03-22 10:48:21
 * @LastEditTime: 2020-03-23 10:09:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /贪吃蛇/snake.js
 */
(function(window) {
  //  蛇对象分析
      //    属性
      //        1. width: 蛇一节的宽度
      //        2. height: 蛇一节的高度
      //        3. headBgc: 蛇头背景颜色
      //        4. bodyBgc: 蛇身背景颜色
      //        5. body: 蛇的每一节的信息
      //                通过数组的长度得知蛇的长度
      //                数组中的每一节是一个对象, 通过这个对象可以得知这一节的坐标信息
      //                数组第一项为蛇头
      //                例如:
      //                  [
      //                    {x: 2, y: 0}, //蛇头信息,
      //                    {x: 1, y: 0}, //蛇中间信息
      //                    {x: 0, y: 0} //蛇尾信息
      //                  ]
      //    方法
      //        render
      //        move 修改body数组中的每一个元素的属性值
      //   创建蛇对象
      function Snake(options = {}) {
        this.width = options.width || 20
        this.height = options.height || 20
        this.direction = options.direction || 'right'
        this.headBgc = options.headBgc || 'yellow'
        this.bodyBgc = options.bodyBgc || 'red'
        this.body = options.body || [{x: 2, y: 0}, {x: 1, y: 0}, {x: 0, y: 0}]
      }
      
      Snake.prototype.render = function(target) {
        // 生成蛇对象
        // 由于蛇的节数大于1, 所以需要遍历, 一节节创建出来
        for (let i = 0; i < this.body.length; i++) {
          let span = document.createElement('span')    
          //用span表示蛇的每一节
          span.style.position = 'absolute'  
          span.style.width = `${this.width}px`
          span.style.height = `${this.height}px`
          i === 0 ? span.style.backgroundColor = `${this.headBgc}` : span.style.backgroundColor = `${this.bodyBgc}`
          span.style.zIndex = i === 0 ? 999: 1
          span.style.left = `${this.body[i].x * this.width}px`
          span.style.top = `${this.body[i].y * this.height}px`
          target.appendChild(span)
        }

        // 添加蛇对象到地图上
      }

      // 蛇移动
      //      方式一:for循环, 修改每一节的坐标
      //      方式二:挪蛇头, 删蛇尾
      //            复制蛇头, 改复制出的蛇头属性值, 
      Snake.prototype.move = function(target, food) {
        // 1.复制当前蛇头的属性和值
        let newHead = {
          x: this.body[0].x,
          y: this.body[0].y
        }
        // 2.根据移动方向去修改蛇头属性值
        switch (this.direction) {
          case 'right':
              // 向右走, x + 1
              newHead.x++
            break;
          case 'left':
              // 向左走, x - 1
              newHead.x--
            break;
          case 'up':
              // 向右走, x + 1
              newHead.y--
            break;
          case 'down':
              // 向右走, x + 1
              newHead.y++
            break;
        }
        //  蛇吃食物分析
        //    移动一次判断一次, 判断蛇头坐标和食物坐标是否相同
        //  newHead的坐标此时是移动后的值, 判断蛇有没有吃到食物
        if(newHead.x === food.x && newHead.y === food.y) {
          // 说明蛇吃到食物了
          // 把地图中的食物删除掉
          let div = document.querySelector('#map div')
          target.removeChild(div)
          // 重新随机一个食物并渲染到地图上
          food.render(target)
          // 把蛇变长
          this.body.push
        }else{
          // 蛇没吃到食物就删除蛇尾
          this.body.pop()
        }
        // 将newHead添加到body数组中
        this.body.unshift(newHead)
       
        let spans = target.querySelectorAll('span')
        for (let i = 0; i < spans.length; i++) {
          target.removeChild(spans[i])
        }
        this.render(target)        
      }

      window.Snake = Snake
})(window)
