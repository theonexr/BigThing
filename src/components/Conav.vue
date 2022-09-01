<template>
    <div class="body">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
        <nav>
            <ul class="menus">
                <li class="li">
                    <i class="fa fa-th-large"
                    aria-hidden="true"></i>
                    <span>基础组件</span>
                    <ul>
                        <li>Button 按钮</li>
                        <li>Cell 单元格</li>
                        <li>Icon 图标</li>
                        <li>Image 图片</li>
                        <li>Layout 布局</li>
                        <li>Popop 弹出层</li>
                        <li>Toast 轻提示</li>
                    </ul>
                </li>
                <li class="li">
                    <i class="fa fa-check-square"
                    aria-hidden="true"></i>
                    <span>表单组件</span>
                    <ul>
                        <li>Calendar 日历</li>
                        <li>Cascader 联级选择</li>
                        <li>Checkbox 复选框</li>
                        <li>Field 输入框</li>
                        <li>Picker 选择器</li>
                        <li>Radio 单选框</li>
                        <li>Rate 评分</li>
                        <li>Slider 滑块</li>
                        <li>Stepper 布进器</li>
                        <li>Switch 开关</li>
                    </ul>
                </li>
                    <li class="li">
                    <i class="fa fa-comment"
                    aria-hidden="true"></i>
                    <span>反馈组件</span>
                    <ul>
                        <li>Dialog 弹出框</li>
                        <li>Loading 加载</li>
                        <li>Notify 消息通知</li>
                        <li>Overlay 遮罩层</li>
                    </ul>
                </li>
                   <li class="li">
                    <i class="fa fa-tags"
                    aria-hidden="true"></i>
                    <span>展示组件</span>
                    <ul>
                        <li>Badge 徽标</li>
                        <li>Circle 环形进度条</li>
                        <li>Collapse 折叠面板</li>
                        <li>CounDown 倒计时</li>
                        <li>List 列表</li>
                        <li>NotiseBar 通知栏</li>
                        <li>Progress 进度条</li>
                        <li>Steps 步骤条</li>
                        <li>Tag 标签</li>
                    </ul>
                </li>
                    <li class="li">
                    <i class="fa fa-bars"
                    aria-hidden="true"></i>
                    <span>导航组件</span>
                    <ul>
                        <li>Gird 宫格</li>
                        <li>IndexBar 索引栏</li>
                        <li>NarBar 导航栏</li>
                        <li>Pagination 分页</li>
                        <li>Sidebar 侧边导航</li>
                        <li>Tab 标签页</li>
                        <li>Tabbar 标签栏</li>
                        <li>TreeSelect 分类选择</li>
                    </ul>
                </li>
            </ul>
        </nav>
    </div>
</template>
<style scoped>
/* .body{
    height: 100vh;
    display: flex;
    justify-content: center;
    align-content: center;
    background-color: #e2c8db;
} */
ul{
    list-style: none;
}
nav{
    position: fixed;
    width: 300px;
    height: 650px;
    /* background-color: #c584b3; */
}
.menus{
    margin: 50px 0;
    color: #fff;
    opacity: 0.9;
}
.li{
    letter-spacing: 2px;
    font-size: 17px;
    font-weight: 600;
    padding: 16px 0;

    transition: .3s;
}
.menus li:hover{
    background-color: #eedae9;
}
.menus li:hover span{
    background-color: transparent;
    opacity: 0;
   
}
.li .fa{
    font-size: 20px;
    width: 50px;
    height: 20px;
    text-align: center;
    margin-left: 5px;
}
.li ul{
    width: 0px;
    height: 550px;
    padding: 50px 0;
    /* background-color: #a06993; */
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
    transition: .3s;
}
.li ul li{
    padding: 16px 24px;
    /* 文字禁止换行 */
    white-space: nowrap;
    transition: .3s;
}
.li:hover ul {
    width: 250px;
}
.menus:hover span{
    opacity: 0;
}
.li ul li:hover{
    background: linear-gradient(45deg,#d2a6c6,#069adf);   
}
</style>