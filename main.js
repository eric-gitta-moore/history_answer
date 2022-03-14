"ui";

//定义常量对象
const CONFIG = {
    "jgyPath": "dang/",
    "jgyUser": "1462066778@qq.com",
    "jgyKey": "apq5rp6jtgdcrgrb",
    "storageName": "dang"
}


//定义模板系统函数
/**
 * 
 * @param {要保存的本地储存名称} $sStoName 
 * @param {要保存的本地储存键值名称} $sPutName 
 * @param {要保存的变量} $_o 
 */
this.SaveStorage = function ($sStoName, $sPutName, $_o) {
    let $oStorage = storages.create($sStoName);
    $oStorage.put($sPutName, $_o);
}

/**
 * 
 * @param {要保存的本地储存名称} $sStoName 
 * @param {要获取的本地储存键值} $sPutName 
 */
this.getStorage = function ($sStoName, $sGetName) {
    let $oStorage = storages.create($sStoName);
    return $oStorage.get($sGetName);
}

/**
 * 
 * @param {坚果云邮箱账号} $sUser 
 * @param {坚果云应用key} $sKey 
 * @param {坚果云文件路径} $sPath 
 */
this.GetJgyFile = function ($sUser, $sKey, $sPath) {
    let $sJgyApi = "http://dav.jianguoyun.com/dav/";
    let $oJgyFile = http.get($sJgyApi + $sPath, {
        headers: {
            "Authorization": "Basic " + java.lang.String(android.util.Base64.encode(java.lang.String($sUser + ':' + $sKey).getBytes(), 2)),
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        }
    });

    if ($oJgyFile != null && $oJgyFile.statusCode >= 200 && $oJgyFile.statusCode <= 300) {
        console.log("文件获取成功！");
        return $oJgyFile.body.string();
        
    } else {
        console.log("文件获取失败！");
        return null
        
    }
    
}

/**
 * 
 * @param {要进行md5加密的字符串} $sStr 
 */
this.md5 = function ($sStr) {
    return java.math.BigInteger(1,java.security.MessageDigest.getInstance("MD5").digest(java.lang.String($sStr).getBytes())).toString(16);
}

//变量定义结束，开始运行脚本

this.SaveStorage(CONFIG.storageName, "CONFIG", CONFIG);
// console.log('保存CONFIG配置信息到本地储存成功');


/**
 * 
 * @param {需要进行操作的XML文本} _xmlStr 
 * @param {需要提取的ID前缀名} _idSign 
 */
this.xmlStringFindIdAddArray = function (_xmlStr, _idSign) {
    let _arr = [], re = new RegExp("[\'\"]"+_idSign+".+[\'\"]", "g");
    _arr = _xmlStr.match(re);
    return  _arr.map(function(_currentValue, _index, _arr){
        return _currentValue.replace(/[\"\']/g, "");
    });
}

/**
 *
 * @param _viewArr 要进行操作的控件ID数组
 * @param _srotageName 保存控件数据的本地储存名称
 * @param _storageKey 保存控件数据的本地储存键值
 */
this.setViewContent = function (_viewArr, _srotageName, _storageKey) {
    _viewArr = _viewArr || [];
    _srotageName = _srotageName || CONFIG.storageName;
    _storageKey = _storageKey || "viewDataArr";

    // let _storage = storages.create(_srotageName);
    let _viewDataArr = getStorage(_srotageName, _storageKey);
    if (!_viewDataArr) {
        console.error("本地储存没有找到键值为:%s的数据", _storageKey);
        return;
    }
    
    //开始遍历所有的UI控件
    _viewArr.forEach((_view) => {
        if (_viewDataArr[_view]) {
            switch (ui.findView(_view).getAccessibilityClassName()) {
                case 'android.widget.EditText':
                    ui[_view].setText(_viewDataArr[_view]);
                    break;
                case 'android.widget.CheckBox':
                    ui[_view].checked = _viewDataArr[_view];
                    break;
                case 'android.widget.RadioButton':
                    ui[_view].checked = _viewDataArr[_view];
                    break;
                case 'android.widget.Spinner':
                    ui[_view].setSelection(_viewDataArr[_view]);
                    break;
                case 'android.widget.Switch':
                    ui[_view].checked = _viewDataArr[_view];
                    break;
                default:
                    console.error('暂未收录%s类型的控件!', ui.findView(_view).getAccessibilityClassName());
            }
        } else {
            console.error('没有找到ID为:%s的控件数据', _view);
        }
    });
}

/**
 * 
 * @param {要进行操作的控件ID数组} _viewArr 
 * @param {保存控件数据的本地储存名称} _srotageName 
 * @param {保存控件数据的本地储存键值} _storageKey 
 */
this.getViewContent = function (_viewArr, _srotageName, _storageKey) {
    _viewArr = _viewArr || [];
    _srotageName = _srotageName || CONFIG.storageName;
    _storageKey = _storageKey || "viewDataArr";

    // _storage = storages.create(_srotageName);
    //开始遍历ID数组
    let _viewDataArr = {};
    _viewArr.forEach((_view) => {
        switch (ui.findView(_view).getAccessibilityClassName()) {
            case 'android.widget.EditText':
                // log('文本控件');
                _viewDataArr[_view] = ui[_view].text();
                break;
            case 'android.widget.CheckBox':
                // log('多选框控件');
                _viewDataArr[_view] = ui[_view].isChecked();
                break;
            case 'android.widget.RadioButton':
                // log('单选框控件');
                _viewDataArr[_view] = ui[_view].isChecked();
                break;
            case 'android.widget.Spinner':
                // log('下拉菜单控件');
                _viewDataArr[_view] = ui[_view].getSelectedItemPosition();
                break;
            case 'android.widget.Switch':
                log('开关控件');
                _viewDataArr[_view] = ui[_view].isChecked();
                break;
            default:
                console.error('暂未收录%s类型的控件!', ui.findView(_view).getAccessibilityClassName());
        }
    });
    //遍历完成
    SaveStorage(_srotageName, _storageKey, _viewDataArr);
}




//绘制加载界面
ui.layout(
    <frame bg='#000000' w='*' h='*'>
        <text id='loading' text='' w='auto' h='auto' layout_gravity='center' textColor='#ffffff' textSize='22sp'></text>
    </frame>
);

//设置状态栏颜色
ui.statusBarColor('#000000');

//开始加载线程
let oLoadingThreads = threads.start(function() {
    let _dian_ = '.', _str_ = '', _nums_ = 0;
    while (1) {
        console.log('脚本加载线程执行中...');
        _nums_ == 0 ? _str_ = '加载中' : _str_ = _str_ + _dian_;
        ui.run(() => {
            ui.loading.setText(_str_); 
        });
        sleep(1000);
        _nums_++;
        if (_nums_ >= 4) _nums_ = 0;
    }
});

//定义并初始化坚果云文件变量
let sJgyFile = null;

//开始获取坚果云文件线程
let oGetJgyFileThreads = threads.start(function() {
    sJgyFile = GetJgyFile(CONFIG.jgyUser, CONFIG.jgyKey, CONFIG.jgyPath+"mainActivity.js");
    // console.log(_jgyStr);

    if (sJgyFile == null) {
        console.error('mainActivity文件获取失败');
        exit();
    }
    
});

//等待获取脚本线程结束
while(oGetJgyFileThreads.isAlive());
// toastLog('加载完成！');
//中断加载线程
oLoadingThreads.interrupt();
// console.log('sJgyFile:'+sJgyFile);

//开始运行后端代码
// console.show();
eval(sJgyFile);