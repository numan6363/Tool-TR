const { chalk, inquirer, _, fs, instagram, print, delay } = require("./index.js");

(async () => {
    print(
        chalk`{bold.green
  ▄▄▄▄▄            ▄▄▌  .▄▄ · ▪   ▄▄ • 
  •██  ▪     ▪     ██•  ▐█ ▀. ██ ▐█ ▀ ▪
   ▐█.▪ ▄█▀▄  ▄█▀▄ ██▪  ▄▀▀▀█▄▐█·▄█ ▀█▄
   ▐█▌·▐█▌.▐▌▐█▌.▐▌▐█▌▐▌▐█▄▪▐█▐█▌▐█▄▪▐█
   ▀▀▀  ▀█▄▀▪ ▀█▄▀▪.▀▀▀  ▀▀▀▀ ▀▀▀·▀▀▀▀ 

  Ξ BAŞLIK  : TÜM MEDYAYI SİL (Post/Photo/Videos/etc)
  Ξ GÜNCELLEME : Çarşamba Günü, 4 Ağustos, 2021 (GMT+3)
           : TESTED "OK" BUG? YouTellMe!
    }`
    );
    const questions = [
        {
            type: "Kullanıcı adı",
            name: "Username",
            message: "Kullanıcı adı Giriniz:",
            validate: (val) => val.length != 0 || "Lütfen Kullanıcı adı Giriniz!",
        },
        {
            type: "Şifre",
            name: "password",
            mask: "*",
            message: "Şifre girin:",
            validate: (val) => val.length != 0 || "Lütfen şifre Girin",
        },
        {
            type: "input",
            name: "perExec",
            message: "Yürütme başına giriş sınırı:",
            validate: (val) => /[0-9]/.test(val) || "Sadece giriş numaraları",
        },
        {
            type: "input",
            name: "delayTime",
            message: "Giriş işlem süresi (milisaniye cinsinden):",
            validate: (val) => /[0-9]/.test(val) || "Sadece Giriş Numaraları",
        },
    ];

    try {
        const { username, password, target, perExec, delayTime } = await inquirer.prompt(questions);
        const ig = new instagram(username, password);
        print("Giriş yapılmaya çalışılıyor. . .", "Bekle", true);
        const login = await ig.login();
        print(`Logged in as @${login.username} (User ID: ${login.pk})`, "ok");
        const info = await ig.userInfo(login.pk);
        if (info.media_count != 0) {
            print(`Found ${info.media_count} media`, "ok");
            print("Kullanıcı beslemelerini toplanıyor. . .", "Bekle");
            const feed = await ig.userFeed(login.pk);
            print(`Doing task with ratio ${perExec} target / ${delayTime} milliseconds \n`, "bekle");
            do {
                let items = await feed.items();
                items = _.chunk(items, perExec);
                for (let i = 0; i < items.length; i++) {
                    await Promise.all(
                        items[i].map(async (media) => {
                            const type = media.media_type == 1 ? "fotoğraf" : media.media_type == 2 ? "video" : "carousel";
                            const del = await ig.deleteMedia(media.pk, type);
                            print(`▲ /p/${media.code}/ (${media.pk}) ⇶ ${del ? chalk.bold.green("Silindi!") : chalk.bold.red("Hatalı silinemedi!")}`);
                        })
                    );
                    if (i < items.length - 1) print(`Current Account: (${login.username}) » Delay: ${perExec}/${delayTime}ms \n`, "bekle", true);
                    await delay(delayTime);
                }
            } while (feed.moreAvailable);
            print(`Status: Tüm işlemler tamamlandı!`, "ok", true);
        } else print(`Silinecek bir şey yok!`, "err");
    } catch (err) {
        print(err, "err");
    }
})();
//by 1dcea8095a18ac73b764c19e40644b52 116 111 111 108 115 105 103  118 51
