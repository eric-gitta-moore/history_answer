/**
 * 1.如果需要自定保存控件的值，需要将控件ID以bh_开口进行命名，如bh_delay
 * 
 */


importClass(android.content.Intent);
importClass(android.net.Uri);
importClass(android.provider.Settings);
//声明主体颜色
const COLOR = '#4169E1';
//声明脚本标题
const TITLE = '脚本标题';

this.drawUI = (function(){
    return (
        <frame id='frame'>
            <vertical>
                <appbar bg='#696969'>
                    <toolbar title='默认标题'></toolbar>
                </appbar>
                <card cardCornerRadius='5dp' margin='5dp' cardElevation='5dp' padding='5 5 5 5'>
                    <vertical>
                        <Switch id='autoService' text='无障碍服务' checked='{{auto.service != null}}' padding='8 8 8 8' textSize='15sp'></Switch>
                        <Switch id='windowService' text='悬浮窗权限' padding='8 8 8 8' textSize='15sp'></Switch>
                        <Switch id='captureScreenBtn' text='录屏截图授权' padding='8 8 8 8' textSize='15sp'></Switch>
                        <Switch id='debugBtn' text='调试服务' padding='8 8 8 8' textSize='15sp'></Switch>
                        <horizontal>
                            <button id='start' gravity='center' layout_weight='1' text='开始运行' textSize='16sp' textColor='#000000'></button>
                            <button id='quit' gravity='center' layout_weight='1' text='退出软件' textSize='16sp' textColor='#000000'></button>
                        </horizontal>
                    </vertical>
                </card>
                <ScrollView>
                    <vertical id='body' w='*' h='*' padding='5dp'>

                    </vertical>
                </ScrollView>
            </vertical>
        </frame>
    );
})();
// let drawUI = (function(){
//     return (
//     );
// })();

//开始加载UI框架
ui.layout(this.drawUI.toString().replace(/#696969/g, COLOR).replace(/默认标题/g, TITLE));

//定义用户界面
var userUI = (function () {
    return (
        <vertical>
            <text text='本脚本需要无障碍权限，录屏权限，悬浮窗权限。'></text>
            <text textColor="red" text='请进入小程序，并点击 专项赛-学习习近平，此时应为专项答题页面'></text>
            <text text='脚本的机制就是乱点'></text>
            <text text='进入专项答题页面后会自动开始'></text>
            <text text='有时候会出现小程序无响应点不动的情况，这个时候程序会有个超时机制，一分钟如果没有pk结果的话会自动重新进入'></text>
            <text text='当前脚本版本：2.3'></text>
            <text text=''></text>
            <text text='更新日志'></text>
            <text text='软件版本：2.1，脚本版本：2.3'></text>
            <text text='·完善题库'></text>
            <text text='软件版本：2.1，脚本版本：2.2'></text>
            <text text='·增加少量题库'></text>
            <text text='软件版本：2.1，脚本版本：2.1'></text>
            <text text='·大改UI界面'></text>
            <text text='·重构代码'></text>
            <text text='·实现热更新'></text>
            <text text='·修改开始按钮位置'></text>
            <text text='软件版本：2.0.0，脚本版本：2.0.0'></text>
            <text text='·增加UI界面'></text>
            <text text='·重写逻辑'></text>
            <text text='软件版本：1.0.0，脚本版本：1.0.0'></text>
            <text text='·发布'></text>
        </vertical>
    )
})();


//设置状态栏颜色
ui.statusBarColor(COLOR);

//把用户UI添加进UI模板
ui.inflate(userUI, ui.body, true);

//开始设置所有控件的值
// setViewContent(xmlStringFindIdAddArray(userUI.toString(), 'bh_'));

//绑定无障碍服务单机事件
ui.autoService.on('click', () => {
    ui.autoService.isChecked() ? auto.service == null ? app.startActivity({ action: "android.settings.ACCESSIBILITY_SETTINGS" }) : log('无障碍处于打开状态') : auto.service == null ? log('无障碍处于关闭状态') : auto.service.disableSelf();
});

ui.captureScreenBtn.on('click', function () {
    if (!ui.captureScreenBtn.isChecked())
    {
        ui.captureScreenBtn.checked = true;
        toast("不可重复点击");
    }
    threads.start(function () {
        // 请求截图
        try{
            if(!requestScreenCapture()){
                toast("请求截图失败");
                // exit();
            }
        }catch (e)
        {}
    });
});


//判断是否有悬浮窗权限
console.log("判断悬浮窗权限");
if(floaty.checkPermission()){
    console.log("有悬浮窗权限");
    ui.windowService.checked = true;
}

//绑定悬浮窗权限单机事件
ui.windowService.on('click', () => {
    floaty.requestPermission();
    // var intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
    //     Uri.parse("package:" + context.getPackageName()));
    // intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
    // app.startActivity(intent);
});

//绑定调试服务单机事件
ui.debugBtn.on('click', function()
{
    if (ui.debugBtn.isChecked()) {
        log('开启调试模式');
        // console.show();
        threads.start(function(){console.show();});
    } else {
        log('关闭调试模式');
        // console.hide();
        threads.start(function(){console.hide();});
    }
});

//创建脚本进程变量
var execution = null;
var exec = null;
var window = null
let shutDown = false;
//绑定开始按钮单机事件
ui.start.on('click', () => {
    if (!window) {
        scriptThreads = threads.start(function () {
            // auto.waitFor();

            //开始保存内容到本地储存
            // getViewContent(xmlStringFindIdAddArray(userUI.toString(), 'bh_'));
            // console.info('保存UI配置数据到本地储存成功！');
            // home();

            if (!ui.autoService.isChecked()) {
                toast("请开启无障碍服务");
                return;
            }
            if (!ui.windowService.isChecked()) {
                toast("请开启悬浮窗权限");
                return;
            }
            if (!ui.captureScreenBtn.isChecked()) {
                toast("请先给予启录屏截图权限");
                return;
            }


            window = floaty.window(
                <frame>
                    <img w="auto" h="auto" src="@drawable/ic_play_circle_outline_black_48dp" id='windowButton' />
                    <text id='scriptState' text='开始' visibility='gone'></text>
                </frame>
            );

            //设置悬浮窗位置
            window.setPosition(0, device.height / 4);

            //记录按键被按下时的触摸坐标
            var x = 0, y = 0;
            //记录按键被按下时的悬浮窗位置
            var windowX, windowY;
            //记录按键被按下的时间以便判断长按等动作
            var downTime;

            //监听滑动悬浮窗事件
            window.windowButton.setOnTouchListener(function (view, event) {
                switch (event.getAction()) {
                    case event.ACTION_DOWN:
                        x = event.getRawX();
                        y = event.getRawY();
                        windowX = window.getX();
                        windowY = window.getY();
                        downTime = new Date().getTime();
                        return true;
                    case event.ACTION_MOVE:
                        //移动手指时调整悬浮窗位置
                        window.setPosition(windowX + (event.getRawX() - x),
                            windowY + (event.getRawY() - y));
                        //如果按下的时间超过1.5秒判断为长按，退出脚本
                        if (new Date().getTime() - downTime > 1500) {
                            toast('长按退出脚本');
                            exit();
                        }
                        return true;
                    case event.ACTION_UP:
                        //手指弹起时如果偏移很小则判断为点击
                        if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                            // toast('停止运行');
                            windowButtonClick();
                        }
                        return true;
                }
                return true;
            });

            function windowButtonClick() {
                if (window.scriptState.getText() == '开始') {
                    // log('execution:' + execution);
                    //开始获取云端的脚本资源
                    let _scriptFile = null;
                    let _GetJgyFileTh = threads.start(function () {
                        _scriptFile = GetJgyFile(CONFIG.jgyUser, CONFIG.jgyKey, CONFIG.jgyPath + "script.js");
                        if (_scriptFile == null) {
                            toast('script文件获取失败');
                            exit();
                            hideConsole();
                        }
                    });

                    while (_GetJgyFileTh.isAlive());

                    // execution = engines.execScript('党史答题', _scriptFile);
                    // shutDown = false;
                    exec = threads.start(function () {
                        eval(_scriptFile)
                    });
                    // device.vibrate(50);
                    window.windowButton.setSource('@drawable/ic_pause_circle_outline_black_48dp');
                    window.scriptState.setText('停止');
                    log('exec:' + exec);

                } else {
                    // log(exec.interrupt());
                    // threads.start(function () {
                    //     exec.interrupt();
                    // });
                    // try
                    // {
                    //     // execution.getEngine().forceStop();
                    //     exec.interrupt();
                    // }catch (e){console.trace(e);}
                    // shutDown = true;
                    // device.vibrate(50);
                    toast("已停止");
                    exit();
                    window.windowButton.setSource('@drawable/ic_play_circle_outline_black_48dp');
                    window.scriptState.setText('开始');
                    // hideConsole();
                }
            }
        });
    } else {
        toast('已经开启启动按钮悬浮窗了');
        // home();
    }
});

function hideConsole() {
    try{console.hide();}catch (e) {}
}

//绑定退出按钮单机事件
ui.quit.on('click', () => {
    hideConsole();
    exit();
});


//回到本界面时，触发resume事件
ui.emitter.on('resume', () => {
    auto.service == null ? ui.autoService.setChecked(false) : ui.autoService.setChecked(true);
});