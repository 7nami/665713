/** @type {HTMLCanvasElement} */
const canvas = document.querySelector(".canvas-game"); // 获取画布元素
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d"); // 获取2D绘图上下文
/** @type {HTMLButtonElement} */
const buttonPlay = document.querySelector(".button-play"); // 获取开始按钮元素
const scoreElement = document.querySelector(".score-value"); // 获取分数显示元素

canvas.width = 480; // 设置画布宽度
canvas.height = 520; // 设置画布高度

let deltaTime = 1; // 时间增量
let lastTime = 0; // 上一次时间

const scoreValue = 10; // 每吃一个食物的得分
let score = 0; // 当前得分

let isPause = true; // 游戏是否暂停

const CELL_SIZE = 40; // 每个单元格的大小
const MAP_ROWS = canvas.height / CELL_SIZE; // 地图行数
const MAP_COLS = canvas.width / CELL_SIZE; // 地图列数
const MAP_CODE = Object.freeze({ // 地图代码常量
    none: 0, // 空地
    snake: 1, // 蛇
    food: 2, // 食物
});
const map = new Array(MAP_ROWS).fill(0).map(() => new Array(MAP_COLS).fill(0)); // 初始化地图

const keys = new Set(); // 存储按下的键

const DIRECTION_CODE = Object.freeze({ // 方向代码常量
    up: 0,
    down: 1,
    left: 2,
    right: 3,
});

class Vec2 { // 二维向量类
    constructor(x = 0, y = 0) {
        this.x = x; // x坐标
        this.y = y; // y坐标
    }

    copy() { // 复制向量
        return new Vec2(this.x, this.y);
    }
}

class SnakeObject { // 蛇身体部分类
    constructor(pos) {
        this.pos = pos; // 当前位置
        this.prevPos = new Vec2(0, 0); // 上一个位置
        this.timer = 0; // 计时器
    }
    draw() { // 绘制方法
        ctx.shadowColor = "DeepSkyBlue"; // 阴影颜色
        ctx.shadowBlur = 20; // 阴影模糊
        ctx.fillStyle = "DodgerBlue"; // 填充颜色
        ctx.fillRect(
            this.pos.x * CELL_SIZE,
            this.pos.y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        ); // 绘制矩形
    }
}

class Snake { // 蛇类
    constructor() {
        this.direction = DIRECTION_CODE.down; // 初始方向
        this.head = new SnakeObject(new Vec2(1, 1)); // 蛇头
        this.snakeObjects = [this.head]; // 蛇身体部分数组
        this.timer = 0; // 计时器
        this.length = 1; // 蛇长度
        this.maxLength = MAP_ROWS * MAP_COLS - 2; // 蛇最大长度
    }

    inputHandler() { // 输入处理
        if (keys.has("ArrowUp") && this.direction !== DIRECTION_CODE.down) {
            this.direction = DIRECTION_CODE.up;
        } else if (
            keys.has("ArrowDown") &&
            this.direction !== DIRECTION_CODE.up
        ) {
            this.direction = DIRECTION_CODE.down;
        } else if (
            keys.has("ArrowLeft") &&
            this.direction !== DIRECTION_CODE.right
        ) {
            this.direction = DIRECTION_CODE.left;
        } else if (
            keys.has("ArrowRight") &&
            this.direction !== DIRECTION_CODE.left
        ) {
            this.direction = DIRECTION_CODE.right;
        }
    }

    boundsCheck() { // 边界检查
        if (this.head.pos.x < 0) {
            this.head.pos.x = MAP_COLS - 1;
        } else if (this.head.pos.x >= MAP_COLS) {
            this.head.pos.x = 0;
        } else if (this.head.pos.y < 0) {
            this.head.pos.y = MAP_ROWS - 1;
        } else if (this.head.pos.y >= MAP_ROWS) {
            this.head.pos.y = 0;
        }
    }

    foodCheck() { // 食物检查
        if (
            hasFood &&
            map[this.head.pos.x][this.head.pos.y] === MAP_CODE.food
        ) {
            this.createBody(); // 创建新身体部分
            foodList.shift(); // 移除食物
            hasFood = false; // 没有食物
            map[this.head.pos.x][this.head.pos.y] = MAP_CODE.snake; // 更新地图
            score += scoreValue; // 增加分数
            scoreElement.innerText = score; // 更新分数显示
        }
    }

    collisionCheck() { // 碰撞检查
        if (map[this.head.pos.x][this.head.pos.y] === MAP_CODE.snake) {
            isPause = true; // 暂停游戏
            canvas.classList.remove("show"); // 隐藏画布
            buttonPlay.classList.add("show"); // 显示开始按钮
            alert("Game Over!"); // 游戏结束提示
            location.reload(); // 重新加载页面
        }
    }

    createBody() { // 创建新身体部分
        if (this.length === this.maxLength) return;
        this.snakeObjects.push(
            new SnakeObject(new Vec2(this.head.pos.x, this.head.pos.y))
        );
        this.length += 1; // 增加长度
    }

    move() { // 移动
        this.head.prevPos = this.head.pos.copy(); // 保存上一个位置
        map[this.head.pos.x][this.head.pos.y] = MAP_CODE.none; // 更新地图
        switch (this.direction) {
            case DIRECTION_CODE.up:
                this.head.pos.y -= 1;
                break;
            case DIRECTION_CODE.down:
                this.head.pos.y += 1;
                break;
            case DIRECTION_CODE.left:
                this.head.pos.x -= 1;
                break;
            case DIRECTION_CODE.right:
                this.head.pos.x += 1;
                break;
        }
        this.boundsCheck(); // 边界检查
        this.collisionCheck(); // 碰撞检查
        this.foodCheck(); // 食物检查
        map[this.head.pos.x][this.head.pos.y] = MAP_CODE.snake; // 更新地图
        this.moveBody(); // 移动身体
    }

    moveBody() { // 移动身体
        for (let i = 1; i < this.snakeObjects.length; i++) {
            map[this.snakeObjects[i].pos.x][this.snakeObjects[i].pos.y] =
                MAP_CODE.none; // 更新地图
            this.snakeObjects[i].prevPos = this.snakeObjects[i].pos.copy(); // 保存上一个位置
            this.snakeObjects[i].pos = this.snakeObjects[i - 1].prevPos; // 更新位置
            map[this.snakeObjects[i].pos.x][this.snakeObjects[i].pos.y] =
                MAP_CODE.snake; // 更新地图
        }
    }

    update() { // 更新
        this.inputHandler(); // 处理输入
        this.timer += deltaTime; // 增加计时器
        if (this.timer >= 0.2) {
            this.move(); // 移动
            this.timer = 0; // 重置计时器
        }
    }

    drawHead() { // 绘制蛇头
        ctx.strokeStyle = "DarkTurquoise"; // 描边颜色
        ctx.lineWidth = 1; // 线宽
        ctx.strokeRect(
            this.head.pos.x * CELL_SIZE,
            this.head.pos.y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        ); // 绘制矩形
    }

    draw() { // 绘制
        this.snakeObjects.forEach((obj) => obj.draw()); // 绘制身体部分
        this.drawHead(); // 绘制蛇头
    }
}
const snake = new Snake(); // 创建蛇实例
const foodList = []; // 食物列表
let hasFood = false; // 是否有食物
class Food { // 食物类
    constructor(pos) {
        this.pos = pos; // 位置
    }
    draw() { // 绘制方法
        ctx.shadowColor = "DeepPink"; // 阴影颜色
        ctx.shadowBlur = 20; // 阴影模糊
        ctx.fillStyle = "Fuchsia"; // 填充颜色
        ctx.beginPath(); // 开始路径
        ctx.arc(
            this.pos.x * CELL_SIZE + CELL_SIZE / 2,
            this.pos.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2,
            0,
            Math.PI * 2
        ); // 绘制圆
        ctx.closePath(); // 关闭路径
        ctx.fill(); // 填充
    }
}

function foodGenerator() { // 食物生成器
    if (!hasFood) {
        let row, col;
        while (
            map[(row = Math.floor(Math.random() * (MAP_ROWS - 1)))][
                (col = Math.floor(Math.random() * (MAP_COLS - 1)))
            ] !== MAP_CODE.none
        ) {
            console.log(row, col);
        }
        map[row][col] = MAP_CODE.food; // 更新地图
        hasFood = true; // 有食物
        foodList.push(new Food(new Vec2(row, col))); // 添加食物到列表
    }
}

function drawMap() { // 绘制地图
    for (let i = 0; i < MAP_ROWS; i++) {
        for (let j = 0; j < MAP_COLS; j++) {
            ctx.strokeStyle = "rgba(255,255,255,0.1)"; // 描边颜色
            ctx.lineWidth = 1; // 线宽
            ctx.strokeRect(j * CELL_SIZE, i * CELL_SIZE, CELL_SIZE, CELL_SIZE); // 绘制矩形
        }
    }
}

function init() { // 初始化
    window.addEventListener("keydown", (e) => {
        keys.add(e.key); // 添加按下的键
    });
    window.addEventListener("keyup", (e) => {
        keys.delete(e.key); // 删除释放的键
    });
    buttonPlay.onclick = (e) => {
        isPause = false; // 取消暂停
        buttonPlay.classList.remove("show"); // 隐藏开始按钮
        canvas.classList.add("show"); // 显示画布
    };
}

function update() { // 更新
    foodGenerator(); // 生成食物
    snake.update(); // 更新蛇
}

function draw() { // 绘制
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
    drawMap(); // 绘制地图
    snake.draw(); // 绘制蛇
    foodList.forEach((food) => food.draw()); // 绘制食物
}

function loop() { // 循环
    requestAnimationFrame(() => loop()); // 请求动画帧
    const now = performance.now(); // 当前时间
    deltaTime = (now - lastTime) / 1000; // 计算时间增量
    lastTime = now; // 更新上一次时间
    if (isPause) { // 如果暂停
        return;
    }
    update(); // 更新
    draw(); // 绘制
}

function main() { // 主函数
    init(); // 初始化
    loop(); // 开始循环
}

window.onload = () => { // 页面加载完成后执行
    main(); // 执行主函数
};
