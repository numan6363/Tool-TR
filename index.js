const { chalk, inquirer, print } = require("./tools/index.js");
var moment = require("moment");
var colors = require("colors");
var userHome = require("user-home");

// IP ALGILAMA *BAŞLADI!
var os = require("os");
var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === "IPv4" && !address.internal) {
            addresses.push(address.address);
        }
    }
}
// IP ALGILAMA *SON!

const questionTools = [
    "➥ Bilgi",
    "➥ Bot Like Timeline",
    "➥ Bot Like Target User",
    "➥ Gönderiyi/Fotoğrafı Toplu Sil",

    "➥ F-L -> Takipçi Hedefi",
    "➥ L-C -> Takipçi Hedefi",

    "➥ F-L-C -> Takipçi Hedefi",
    "➥ F-L-C -> Takipçi Hedefi[BETA]",

    "➥ F-L-C -> Takipçi Hedefi v2",

    "➥ F-L-DM -> Takipçi Hedefi(DM)",
    "➥ F-L-DM -> Takipçi Hedefi(DM) [BETA]",

    "➥ F-L-C -> Hashtag Hedefi",
    "➥ F-L-C -> Konum Hedefi",

    "➥ Tüm Takipçilerden Takibi Bırak",
    "➥ Geri Takip Yapmayanların Takibinden Çık",
    "\n",
];

const menuQuestion = {
    type: "liste",
    name: "seçin",
    message: "Araçları Seçin:\n  Aracı Kullanmadan önce (❆ Bilgi)  Kısmını Okuyun\n\n",
    choices: questionTools,
};

const main = async () => {
    try {
        const { choice } = await inquirer.prompt(menuQuestion);
        choice == questionTools[0] && require("./tools/info.js");
        choice == questionTools[1] && require("./tools/liketimeline.js");
        choice == questionTools[2] && require("./tools/liketarget.js");
        choice == questionTools[3] && require("./tools/delallmedia.js");
        choice == questionTools[4] && require("./tools/flonly.js");
        choice == questionTools[5] && require("./tools/lconly.js");
        choice == questionTools[6] && require("./tools/fftauto.js");
        choice == questionTools[7] && require("./tools/fftbetaauto.js");
        choice == questionTools[8] && require("./tools/fftautov2.js");
        choice == questionTools[9] && require("./tools/fftdmauto.js");
        choice == questionTools[10] && require("./tools/fftdmbetaauto.js");
        choice == questionTools[11] && require("./tools/fhtauto.js");
        choice == questionTools[12] && require("./tools/fltauto.js");
        choice == questionTools[13] && require("./tools/unfollowall.js");
        choice == questionTools[14] && require("./tools/unfollnotfollback.js");
        choice == questionTools[15] && process.exit();
    } catch (err) {
        print(err, "err");
    }
};

console.log(chalk`{bold.green
  ▄▄▄▄▄            ▄▄▌  .▄▄ · ▪   ▄▄ • 
  •██  ▪     ▪     ██•  ▐█ ▀. ██ ▐█ ▀ ▪
   ▐█.▪ ▄█▀▄  ▄█▀▄ ██▪  ▄▀▀▀█▄▐█·▄█ ▀█▄
   ▐█▌·▐█▌.▐▌▐█▌.▐▌▐█▌▐▌▐█▄▪▐█▐█▌▐█▄▪▐█
   ▀▀▀  ▀█▄▀▪ ▀█▄▀▪.▀▀▀  ▀▀▀▀ ▀▀▀·▀▀▀▀ 

  Ξ BAŞLIK  : toolsig v4.0
  Ξ GMAİL  : numansoylemez9@gmail.com
  Ξ SON GÜNCELLEME : Çarşamba Günü, 4 Ağustos, 2021

  116 111 111 108 115 105 103  118 51 
  }`);
console.log(chalk`{bold.red   •••••••••••••••••••••••••••••••••••••••••}`);
console.log("  Ξ BAŞLADI  : ".bold.red + moment().format("D MMMM YYYY, h:mm:ss a"));
console.log("  Ξ Dizin Yolu  : ".bold.red + userHome);
console.log("  Ξ SİZİN IP  : ".bold.red + addresses);
console.log(chalk`{bold.red   •••••••••••••••••••••••••••••••••••••••••}`);
main();
