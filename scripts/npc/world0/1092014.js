var status = 0;
var maps = [104000000, 102000000, 100000000, 101000000, 103000000];
var cost = [1000, 1000, 1000, 800, 1000];
var selectedMap = -1;

function start() {
    cm.sendNext("您好~！我是诺特勒斯号中巴。你想不想又快捷又安全的到达其他地方去？那么请使用我们的出租车吧。它会马上将你送到你想去的地方，价格很便宜哦！");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("在这个村子里还有许多漂亮的景点，如果你想去其他地方，欢迎随时使用我们的出租车服务。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            var selStr = "";
            if (cm.getJobId() == 0)
                selStr += "新手可以享受#b9折#k的价格优惠。";
            selStr += "请选择你的目的地吧。按照目的地不同，车费也有所不同。#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + " 金币)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("看来这里的事情你已经办完了嘛。你确定要去 #b#m" + maps[selection] + "##k吗？票价是 #b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + " 金币#k.");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getMeso() < (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection])) {
                cm.sendNext("你好象没有足够的金币，这样的话，我不能为你服务。");
                cm.dispose();
                return;
            }
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}