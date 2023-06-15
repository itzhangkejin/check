window.addEventListener('load', function () {
    // 获取图片的接口URL  https://picsum.photos/300/150/?image= w:300px h:150px
    // 获取文本内容dom
    let silde_Text = $(".silde_Text")

    // 获取背景面板元素
    let canvas = $(".canvas")
    let ctx = canvas.getContext("2d")
    // 获取背景遮罩块元素
    let canvas_block = $(".mask")
    let ctx_block = canvas_block.getContext("2d")
    // 获取灰色遮罩块元素white_mask
    let canvas_white_block = $(".white_mask")
    let ctx_white_block = canvas_white_block.getContext("2d")
    // 定义初始化数据
    /*  两个拼图块大小形状是一致的 */
    // 拼图上圆的 圆心是一边长的一半 
    let r = 8 /*定义拼图上圆的半径*/
    let w = 50 /* 拼图的宽 */
    let h = 40 /* 高 */
    /* 拼图的起始坐标 x(5 ~ 20) y拼 = y白 */
    /* 白色遮罩的起始坐标 x（180 ~ 230） y白( 50 ~ 70 ) */
    // 随机生成初始坐标 x拼 、x白 、y拼 
    let xp = ran(5, 20) + 5
    let xb = ran(180, 230) + 180   /* 随机白色遮罩的坐标 */
    let yp = ran(50, 70) + 50
    // 定义 拼图到白色遮罩的距离
    let dis = xb - xp
    // 保存xp 初始 x 坐标
    let x_cun = xp
    // 设置图片的 地址
    let pic_src = getpic()
    show_pic()
    show_white_maskblock(xb, yp, r, w, h)
    show_pic_block()

    /* 获取更新元素 */
    let upd = $(".reset")
    // 点击更新
    upd.addEventListener('click', function () {
        xp = ran(5, 20) + 5
        xb = ran(180, 230) + 180   /* 随机白色遮罩的坐标 */
        yp = ran(50, 70) + 50
        dis = xb - xp
        x_cun = xp
        pic_src = getpic()
        show_pic()
        show_white_maskblock(xb, yp, r, w, h)
        show_pic_block()

        /* ----------- */

        /* 恢复滑块的位置 */

        slidebox.style.left = slidebox_left + 'px'
        slide_t.style.width = 0 + 'px'
        // 恢复样式
        slidebox.className = 'silde_box'
        slide_t.className = 'slide_t'
        /* 恢复本文 */
        silde_Text.innerHTML = '向右滑动滑块填充拼图'
    })
    // 生成图片的函数
    function show_pic() {
        let pic = new Image()
        pic.src = pic_src
        // 生成背景
        pic.addEventListener('load', function () {
            ctx.drawImage(pic, 0, 0)
        })
    }
    //拼图遮罩函数
    function show_pic_block() {
        let pic = new Image()
        pic.src = pic_src
        pic.addEventListener('load', function () {
            show_maskblock(pic, xp, yp, r, w, h, xb)
        })
    }
    // 生成背景遮罩块
    function show_maskblock(img, x, y, r, w, h, x1) {
        // ctx_block.beginPath()
        // ctx_block.moveTo(20, 50)
        // ctx_block.arc(45, 50, 8, -Math.PI, 0)
        // ctx_block.lineTo(70, 50)
        // ctx_block.lineTo(70, 70)
        // ctx_block.arc(70, 70, 8, -Math.PI / 2, Math.PI / 2)
        // ctx_block.lineTo(70, 90)
        // ctx_block.lineTo(20, 90)
        // ctx_block.lineTo(20, 50)

        // 上面是固定位置

        /* ------------------ */

        /* let r = 8 定义拼图上圆的半径
        let w = 50 拼图的宽
        let h = 40 高 */
        ctx_block.beginPath()
        ctx_block.save()/* 保存当前的画布状态 */
        ctx_block.clearRect(0, 0, 300, 150)
        ctx_block.moveTo(x, y)
        ctx_block.arc(x + w / 2, y, r, -Math.PI, 0)
        ctx_block.lineTo(x + w, y)
        ctx_block.arc(x + w, y + h / 2, r, -Math.PI / 2, Math.PI / 2)
        ctx_block.lineTo(x + w, y + h)
        ctx_block.lineTo(x, y + h)
        ctx_block.lineTo(x, y)
        // ctx_block.lineWidth = 2
        // ctx_block.strokeStyle = "red"
        ctx_block.closePath()
        ctx_block.lineWidth = 2
        ctx_block.strokeStyle = "#fff"
        ctx_block.stroke()
        ctx_block.clip() /* 裁剪出拼图的区域 */
        /* 填充图片  ---- 该区域图片应该与白色遮罩的那块图片一致  --- 故需要用到白色区域的初始坐标*/
        ctx_block.drawImage(img, x1, y - r, w + r, h + r, x, y - r, w + r, h + r)
        ctx_block.restore() /* 重置画布上次是画布状态 --- save()保存的状态*/
    }
    // 生成灰色遮罩块
    function show_white_maskblock(x, y, r, w, h) {
        /* 画拼图的路径 */
        ctx_white_block.clearRect(0, 0, 300, 150)
        ctx_white_block.beginPath()
        ctx_white_block.moveTo(x, y)
        ctx_white_block.arc(x + w / 2, y, r, -Math.PI, 0)   /* 拼图上的圆路径 */
        ctx_white_block.lineTo(x + w, y)
        ctx_white_block.arc(x + w, y + h / 2, r, -Math.PI / 2, Math.PI / 2)
        ctx_white_block.lineTo(x + w, y + h)
        ctx_white_block.lineTo(x, y + h)
        ctx_white_block.lineTo(x, y)
        // ctx_white_block.lineWidth = 2
        // ctx_white_block.strokeStyle = "red"
        ctx_white_block.fillStyle = "#fff"
        ctx_white_block.fill()
    }
    // 随机获取图片的函数
    function getpic() {
        // return 'https://picsum.photos/300/150/?image='
        return `./images/it2_${ran(0, 50) + 1}.jpg`
    }
    // 封装生成随机数的函数
    function ran(num1, num2) {
        return parseInt(Math.random() * (num2 - num1))
    }

    /* ---------------------- */
    // 滑块滑动验证
    // 获取滑块元素
    let slidebox = $(".silde_box")
    // 获取进度元素
    let slide_t = $(".slide_t")
    // 定义按下滑块的坐标 ------>只需考虑 x 坐标
    let x_start = 0
    // 定义移动的距离
    let movex = 0
    // 获取滑块距父级元素的left
    let slidebox_left = slidebox.offsetLeft
    // 滑块按下事件
    slidebox.addEventListener('mousedown', downCallback)
    // 滑块按下事件回调
    function downCallback(e) {
        x_start = e.clientX
        // 添加类 --- > 改变样式
        slidebox.classList.add('active_silde_box')
        slide_t.classList.add('active_slide_t')
        /* 让文本内容变成空  */
        silde_Text.innerHTML = ''
        e.preventDefault()/* 阻止(默认行为)事件冒泡到window */
        // 绑定鼠标移动和抬起监听
        document.addEventListener('mousemove', moveCallback)
        document.addEventListener('mouseup', upCallback)
    }
    // 滑块移动事件回调
    function moveCallback(e) {
        e.preventDefault()/* 阻止(默认行为)事件冒泡到window */
        movex = e.pageX - x_start
        console.log(movex);
        if (movex <= 0) {
            movex = 0
        }
        else if (movex >= 250) {
            movex = 250
        }
        slidebox.style.left = (movex + slidebox_left) + 'px'
        slide_t.style.width = movex + 'px'

        /* ------------------------- */

        /* 拼图跟随移动 */
        // 拼图的坐标 == 拼图初始坐标 + 鼠标移动坐标
        xp = x_cun + movex
        show_pic_block() /* 重新渲染 */


    }
    // 滑块鼠标抬起事件回调
    function upCallback() {
        // 移除鼠标移动和抬起监听
        document.removeEventListener('mousemove', moveCallback)
        document.removeEventListener('mouseup', upCallback)
        vertify()
    }
    // 判断是否验证成功
    function vertify() {
        if (movex >= dis - 5 && movex <= dis + 10) {
            slidebox.classList.add('silde_success')
            setTimeout(() => {
                alert("验证成功！")
                // 恢复原来的位置
                slidebox.style.left = slidebox_left + 'px'
                slide_t.style.width = 0 + 'px'
                // 移除样式
                slidebox.className = 'silde_box'
                slide_t.classList.remove('active_slide_t')
                /* 恢复本文 */
                silde_Text.innerHTML = '向右滑动滑块填充拼图'
                // 恢复拼图的位置
                xp = x_cun
                show_pic_block() /* 重新渲染 */
            }, 100);
        } else {
            slidebox.classList.add('silde_fail')
            setTimeout(() => {
                alert("验证失败，请重新尝试！")
                // 恢复原来的位置
                slidebox.style.left = slidebox_left + 'px'
                slide_t.style.width = 0 + 'px'
                // 移除样式
                slidebox.className = 'silde_box'
                slide_t.classList.remove('active_slide_t')
                /* 恢复本文 */
                silde_Text.innerHTML = '向右滑动滑块填充拼图'
                // 恢复拼图的位置
                xp = x_cun
                show_pic_block() /* 重新渲染 */
            }, 100);
        }
        // 移除鼠标移动和抬起监听
        document.removeEventListener('mousemove', moveCallback)
        document.removeEventListener('mouseup', upCallback)

    }

    /* ----------------------- */

    // 封装获取class类元素对象函数
    function $(cla) {
        return document.querySelector(cla)
    }
})