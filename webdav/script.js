
let DEBUGABLE = false;


threads.start(function () {
    setInterval(function () {
        device.keepScreenOn(10*1000);
        device.keepScreenOn();
        device.keepScreenDim();
        device.keepScreenDim(10*1000);
    }, 5000);
});


var 结算次数 = 0;
setInterval(function () {
    log("setInterval结算次数" + 结算次数);
    // var 结算页面控件 = className("android.view.View").text("找到公众号“学校共青团”，").findOnce();
    if (结算次数 == 0 && (判断界面() == "答题" || 判断界面() == "学习成绩")) {
        log("页面异常，返回上级页面");
        back();

    }
    结算次数 = 0;
}, 1000 * 60);


function 判断界面() {

    var 专项榜 = textContains("专项榜").findOnce();
    if (专项榜)
        return "专项榜";

    var 升级啦 = className("android.view.View").text("好好学习，天天向上！恭喜学习等级提升！").findOnce();
    if (升级啦)
        return "升级啦";

    var 学习成绩 = textContains("得分").findOnce();
    if (学习成绩)
        return "学习成绩";


    var 答题 = textContains("积分").findOnce();
    if (答题)
        return "答题";

    var 对战 = text("对战").findOnce();
    if (对战)
        return "对战";

    var 建党伟业 = textContains("段位").findOnce();
    // var 积分 = textContains("积分").findOnce();
    if (建党伟业 && !答题)
        return "建党伟业";

    return "无法判断";





}

function 进入挑战赛() {
    try {

        for (let index = 0; index < 1; index++) {
            var img = captureScreen();
            var p好友赛 = findColor(img, "#F0AE4F");
            if (p好友赛) {
                log("p好友赛(" + p好友赛.x + ", " + p好友赛.y + ")");
                var p挑战赛 = findColorInRegion(img, "#143254", 0, p好友赛.y - 50, p好友赛.x, 200);
                if (p挑战赛) {
                    log("p挑战赛(" + p挑战赛.x + ", " + p挑战赛.y + ")");
                    break;
                }
            }
            // sleep(500);
        }
        if (p挑战赛)
            click(p挑战赛.x, p挑战赛.y);
    } catch (error) {
        console.error(error);
    }
}

function 答题() {
    try {

        for (let index = 0; index < 1; index++) {
            // sleep(500);
            if (判断界面() != "答题") {
                return;
            }



            var ok = text("全选").findOnce();

//----------------------------------------------------------------------------------------------------------------
            if (!ok && textContains("太平天国运动、戊戌变法、义和团运动").findOnce())
                ok = textContains("错").findOnce();

//----------------------------------------------------------------------------------------------------------------
            if (!ok)
                ok = text("对").findOnce();
            if (!ok)
                ok = text("以上都是").findOnce();
//----------------------------------------------------------------------------------------------------------------
            if (!ok)
                ok = text("改革开放是决定当代中国前途命运的关键一招，中国大踏步赶上了时代！").findOnce();
            if (!ok)
                ok = text("在中华大地上全面建成了小康社会，历史性地解决了绝对贫困问题").findOnce();
            if (!ok)
                ok = text("经济建设、政治建设、文化建设、社会建设和生态文明建设").findOnce();
            if (!ok)
                ok = text("新三民主义的纲领与共产党在民主革命阶段的纲领基本一致").findOnce();
            if (!ok)
                ok = text("过去我们为什么能够成功、未来我们怎样才能继续成功").findOnce();
            if (!ok)
                ok = text("文化程度比较高，一开始就受到西方先进文化的熏陶").findOnce();
            if (!ok)
                ok = text("划分为右派的，大多数是敌视党和社会主义的").findOnce();
            if (!ok)
                ok = text("“五位一体”总体布局、“四个全面”战略布局").findOnce();
            if (!ok)
                ok = text("从与国民党实行党外合作到实行党内合作").findOnce();
            if (!ok)
                ok = text("从与国民党实行党外合作到实行党内合作").findOnce();
            if (!ok)
                ok = text("“乡镇企业”、“民工潮”、“新农村建设”").findOnce();
            if (!ok)
                ok = text("坚持党指挥枪、建设自己的人民军队").findOnce();
            if (!ok)
                ok = text("“左”倾错误一直得到共产国际的支持").findOnce();
            if (!ok)
                ok = text("全心全意为人民服务以人民为中心").findOnce();
            if (!ok)
                ok = text("争取国家财政经济状况的基本好转").findOnce();
            if (!ok)
                ok = text("五位一体、四个全面、改革开放").findOnce();
            if (!ok)
                ok = text("对党要实、对人要实、对事要实").findOnce();
            if (!ok)
                ok = text("谦虚谨慎、艰苦朴素的工作作风").findOnce();
            if (!ok)
                ok = text("确立了毛泽东在全党的领导地位").findOnce();
            if (!ok)
                ok = text("实现国民经济又好又快发展").findOnce();
            if (!ok)
                ok = text("武汉--上海--瑞金--延安").findOnce();
            if (!ok)
                ok = text("党对人民军队的绝对领导").findOnce();
            if (!ok)
                ok = text("民主革命和社会主义革命").findOnce();
            if (!ok)
                ok = text("和平、发展、合作、共赢").findOnce();
            if (!ok)
                ok = text("“三个主题，三个补充”").findOnce();
            if (!ok)
                ok = text("实现中华民族伟大复兴").findOnce();
            if (!ok)
                ok = text("加强党的执政能力建设").findOnce();
            if (!ok)
                ok = text("我将无我、不负少华").findOnce();
            if (!ok)
                ok = text("最广大人民根本利益").findOnce();
            if (!ok)
                ok = text("科学发展、社会和谐").findOnce();
            if (!ok)
                ok = text("主权、安全、发展").findOnce();
            if (!ok)
                ok = text("中国特色社会主义").findOnce();
            if (!ok)
                ok = text("中共七届二中全会").findOnce();
            if (!ok)
                ok = text("人均国民生产总值").findOnce();
            if (!ok)
                ok = text("四个现代化的任务").findOnce();
            if (!ok)
                ok = text("1997年、1999年").findOnce();
            if (!ok)
                ok = text("党内法规体系").findOnce();
            if (!ok)
                ok = text("《农业税条例》").findOnce();
            if (!ok)
                ok = text("中国共产党领导").findOnce();
            if (!ok)
                ok = text("孟良崮战役").findOnce();
            if (!ok)
                ok = text("瓦窑堡会议").findOnce();
            if (!ok)
                ok = text("1997年7月1日").findOnce();
            if (!ok)
                ok = text("“大跃进”的发动").findOnce();
            if (!ok)
                ok = text("全面现代会建设").findOnce();
            if (!ok)
                ok = text("坚持人民主体地位").findOnce();
            if (!ok)
                ok = text("将革命进行到底").findOnce();
            if (!ok)
                ok = text("人民当家做主").findOnce();
            if (!ok)
                ok = text("一个中国原则").findOnce();
            if (!ok)
                ok = text("马克思主义行").findOnce();
            if (!ok)
                ok = text("全面从严治党").findOnce();
            if (!ok)
                ok = text("党的全面领导").findOnce();
            if (!ok)
                ok = text("根本社会条件").findOnce();
            if (!ok)
                ok = text("马克思主义").findOnce();
            if (!ok)
                ok = text("第一个百年").findOnce();
            if (!ok)
                ok = text("和平、发展").findOnce();
            if (!ok)
                ok = text("9500多万").findOnce();
            if (!ok)
                ok = text("忧患意识").findOnce();
            if (!ok)
                ok = text("血肉联系").findOnce();
            if (!ok)
                ok = text("抗日战争").findOnce();
            if (!ok)
                ok = text("实事求是").findOnce();
            if (!ok)
                ok = text("独立自主").findOnce();
            if (!ok)
                ok = text("价值法则").findOnce();
            if (!ok)
                ok = text("党指挥枪").findOnce();
            if (!ok)
                ok = text("新时代").findOnce();
            if (!ok)
                ok = text("莫斯科").findOnce();
            if (!ok)
                ok = text("②③").findOnce();
            if (!ok)
                ok = text("两").findOnce();
            if (!ok)
                ok = text("②③④").findOnce();
            if (!ok)
                ok = text("30").findOnce();
            if (!ok)
                ok = text("人").findOnce();
            if (!ok)
                ok = text("1915").findOnce();
            if (!ok)
                ok = text("人民").findOnce();
            if (!ok)
                ok = text("党").findOnce();


            if (ok) {
                log("找到选项--"+ok.text());
                click(ok.bounds().centerX(), ok.bounds().centerY());
                continue;
            }
            var p选项 = findColorInRegion(captureScreen(), "#F7A51E", 0, device.height / 2 - 200, device.width, device.height / 3);
            if (p选项) {
                log("p选项坐标为(" + p选项.x + ", " + p选项.y + ")");
                click(p选项.x, p选项.y);
            }

        }
    } catch (error) {
        console.error(error);
    }
}

function 返回主页() {
    try {

        for (let index = 0; index < 1; index++) {
            var p返回主页 = findColorInRegion(captureScreen(), "#F5C142", 0, device.height / 2, device.width, device.height / 3);
            if (p返回主页) {
                log("p返回主页 坐标为(" + p返回主页.x + ", " + p返回主页.y + ")");
                click(p返回主页.x, p返回主页.y);
                break;
            }
            // sleep(500);
        }
    } catch (error) {
        console.error(error);

    }
}

var t = threads.start(function () {
    // console.show();
    alert("提示", "请进入小程序，并点击 专项赛-学习习近平，此时应为专项答题页面，脚本的机制就是乱点，进入专项答题页面后会自动开始");
    alert("看清楚了吗")
    alert("提示", "请进入小程序，并点击 专项赛-学习习近平，此时应为专项答题页面，脚本的机制就是乱点，进入专项答题页面后会自动开始");
    launch("com.tencent.mm");


    if(DEBUGABLE)
    {
        // 请求截图
        try{
            if(!requestScreenCapture()){
                toast("请求截图失败");
                // exit();
            }
        }catch (e)
        {}
    }

    var 结果;
    // var 卡死判断计数 = 0;
    while (1) {
        // if (shutDown)
        //     break;

        结果 = 判断界面();
        log(结果 + "界面");
        if (结果 == "建党伟业") {
            进入挑战赛();
        }
        else if (结果 == "答题") {
            答题();
        }
        else if (结果 == "学习成绩") {
            返回主页();
            结算次数++;
            log("结算次数" + 结算次数);
        }
        else if (结果 == "升级啦") {
            back();
        }
        else if (结果 == "专项榜") {
            back();
        }


        sleep(300);
    }

});