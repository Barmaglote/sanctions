const JSONResponse = require('../helpers/response');

var links = [
    {
        "id": "10001",
        "type": "charity",
        "titlerus": "Federal Ministry of the Interior and Community",
        "titleeng": "Federal Ministry of the Interior and Community",
        "description": "The official digital point of contact of the German Government for Ukrainian refugee",
        "link": "https://www.germany4ukraine.de/",
        "foto": "www.germany4ukraine.de.png"
    },
    {
        "id": "10002",
        "type": "charity",
        "titlerus": "Aktion Deutschland Hilft",
        "titleeng": "Aktion Deutschland Hilft",
        "description": "German Relief Organisations work together to provide fast help for people in need: this is Aktion Deutschland Hilft",
        "link": "https://www.aktion-deutschland-hilft.de/",
        "foto": "aktion-deutschlanf-hilft.png"
    },
    {
        "id": "10003",
        "type": "charity",
        "titlerus": "Humanitarian and medical aid to Ukraine",
        "titleeng": "Humanitarian and medical aid to Ukraine",
        "description": "We provide logistics of humanitarian cargoes from Europe to Ukraine. Now we have two big hubs: in Lublin, Poland, and in Huși, Romania. Here we receive humanitarian and medical aid, process cargo and deliver it to Ukraine via safe corridors.",
        "link": "https://helpukraine.center/",
        "foto": "helpukraine.center.png"
    },
    {
        "id": "10004",
        "type": "charity",
        "titlerus": "True Russia",
        "titleeng": "True Russia",
        "description": "People of Russian culture and origin who disagree with the actions of Putin’s regime, allegedly representing all of Russia and all Russians.",
        "link": "https://truerussia.org/",
        "foto": "truerussia.png"
    },
    {
        "id": "10005",
        "type": "charity",
        "titlerus": "National Bank of Ukraine",
        "titleeng": "National Bank of Ukraine",
        "description": "The National Bank of Ukraine has opened a special fundraising account for donations from international organizations, donors, and people who care about our common peaceful future. Raised money will be used to provide humanitarian aid to civilians and to support the Armed Forces of Ukraine.",
        "link": "https://helpua.bank.gov.ua/",
        "foto": "nationalbankofukraine.png"
    },
    {
        "id": "10006",
        "type": "youtube",
        "titlerus": "Michael Naki",
        "titleeng": "Mickael Naki",
        "description": "российский блогер, стример и журналист.",
        "foto": "michaelnaki.png",
        "link": "https://youtube.com/c/MackNack"
    },
    {
        "id": "10007",
        "type": "youtube",
        "titlerus": "Yulia Latynina",
        "titleeng": "Yulia Latynina",
        "description": "Официальный канал Юлии Латыниной. О борьбе бульдогов под ковром за откаты и борьбе граждан за права и свободы",
        "foto": "latynina.png",
        "link": "https://www.youtube.com/channel/UCzaqqlriSjVyc795m86GVyg"
    },
    {
        "id": "10008",
        "type": "youtube",
        "titlerus": "Радио Свобода",
        "titleeng": "Радио Свобода",
        "description": "Радио Свобода ставит своей задачей распространение ценностей демократии и гражданского общества, обращаясь к аудитории тех стран, в которых свобода прессы либо запрещена или ограничена властями, либо пока не стала нормой жизни. Журналисты Радио Свобода предоставляют обществу то, чего оно не может узнать из местных средств информации. Это - новости без цензуры, аргументированный и ответственный обмен мнениями, открытое и честное обсуждение проблем.",
        "foto": "svoboda.png",
        "link": "https://www.youtube.com/c/SvobodaRadio"
    },
    {
        "id": "10009",
        "type": "youtube",
        "titlerus": "Популярная политика",
        "titleeng": "Популярная политика",
        "description": "«Популярная политика» — канал, на котором говорят правду о войне, развязанной Путиным против Украины. Присоединяйтесь. Не подчиняйтесь.",
        "foto": "populzarnajuapolitika.png",
        "link": "https://www.youtube.com/c/Популярнаяполитика"
    },
    {
        "id": "10010",
        "type": "youtube",
        "titlerus": "Yevgenia Albats",
        "titleeng": "Yevgenia Albats",
        "description": "Канал Евгении Марковны Альбац/ Yevgenia M. Albats",
        "foto": "albatz.png",
        "link": "https://www.youtube.com/c/YevgeniaAlbats2021"
    },
    {
        "id": "10011",
        "type": "newspapers",
        "titlerus": "Meduza",
        "titleeng": "Meduza",
        "description": "Интернет-издание, созданное бывшим главным редактором Lenta.ru Галиной Тимченко в 2014 году. Создано россиянами, штаб-квартира находится в Риге, Латвия. Публикует материалы на русском и английском языках. По состоянию на май 2022 года издание является лидером по количеству ежемесячных журналистских премий «Редколлегия» - становилось лауреатом 29 раз.",
        "foto": "meduza.png",
        "link": "https://meduza.io/"
    },
    {
        "id": "10012",
        "type": "telegram",
        "titlerus": "Пархомбюро",
        "titleeng": "Пархомбюро",
        "description": "Я - Сергей Пархоменко, и это мое Пархомбюро.",
        "foto": "sparkhomenkovoice.png",
        "link": "https://t.me/s/sparkhomenkovoice"
    },
    {
        "id": "10013",
        "type": "telegram",
        "titlerus": "ЧТД",
        "titleeng": "ЧТД",
        "description": "",
        "foto": "chtede.png",
        "link": "https://t.me/chtede"
    },
    {
        "id": "10014",
        "type": "charity",
        "titlerus": "The Russian Anti-War Committee",
        "titleeng": "The Russian Anti-War Committee",
        "description": "The Russian Anti-War Committee was created in order to oppose this bloody war – to develop a common position, to help people coordinate their efforts, and to resolve the enormous number of problems that have arisen because of Putin’s aggression.",
        "foto": "awc-flag.png",
        "link": "https://antiwarcommittee.info/en/committee/"
    },
    {
        "id": "10015",
        "type": "charity",
        "titlerus": "Рассвет",
        "titleeng": "Sunrise",
        "description": "Humanitarian aid for Ukraine",
        "foto": "awc-flag.png",
        "link": "https://antiwarcommittee.info/helpukraine/"
    },
    {
        "id": "10016",
        "type": "charity",
        "titlerus": "Ковчег",
        "titleeng": "The Ark",
        "description": "The support group for immigrants who left Russia as a result of the war against Ukraine",
        "foto": "awc-flag.png",
        "link": "https://antiwarcommittee.info/kovcheg/"
    },
    {
        "id": "10017",
        "type": "newspapers",
        "titlerus": "Republic",
        "titleeng": "Republic",
        "description": "Republic («Репаблик») — это медиа для русскоязычной аудитории. Наше издание существует с 2009 года, до 2016-го оно называлось Slon.ru. Английское слово Republic («республика») происходит от латинского выражения res publica — «общее дело». У этого названия двойной смысл. Во-первых, мы освещаем темы, которые важны для всех граждан и являются нашим «общим делом». Во-вторых, Republic как издание — это совместное «общее дело» его редакторов и журналистов.",
        "foto": "republic.png",
        "link": "https://republic.ru/"
    },
    {
        "id": "10018",
        "type": "newspapers",
        "titlerus": "Kolezev.ru",
        "titleeng": "Kolezev.ru",
        "description": "Блог Дмитрия Колезева",
        "foto": "kolezev.png",
        "link": "https://kolezev.ru/"
    },
    {
        "id": "10019",
        "type": "charity",
        "titlerus": "Red Cross Ukraine",
        "titleeng": "Red Cross Ukraine",
        "description": "Together, we act before, during and after disasters and health emergencies to meet the needs and improve the lives of vulnerable people. We do so without discrimination as to nationality, race, religious beliefs, class or political opinions. You can also help those in greatest need right now",
        "link": "https://www.redcross.org.ua/",
        "foto": "recrossua.png"
    },
    {
        "id": "10019",
        "type": "charity",
        "titlerus": "Комитет «Гражданское содействие»",
        "titleeng": "Комитет «Гражданское содействие»",
        "description": "Комитет помогает беженцам и мигрантам отстаивать свои права и добиваться, в том числе в судах, помощи, которую обязано оказывать государство. Комитет принимает беженцев из Украины в Москве.",
        "link": "https://refugee.ru/actual/against-war/",
        "foto": "refugee.ru.png"
    },
    {
        "id": "10020",
        "type": "charity",
        "titlerus": "Фонд «Второе дыхание»",
        "titleeng": "Фонд «Второе дыхание»",
        "description": "Фонд принимает одежду и предметы первой необходимости для людей, вынужденных приехать в Россию из Украины. Взрослую одежду можно сдавать в контейнеры по всей России",
        "link": "https://vtoroe.ru/sbor-pomoschi-bezhentsam/",
        "foto": "vtoroe.ru.png"
    },
    {
        "id": "10021",
        "type": "telegram",
        "titlerus": "Настоящее время",
        "titleeng": "Current time",
        "description": "Официальный телеграм телеканала \"Настоящее Время\"",
        "foto": "currenttime.png",
        "link": "https://t.me/currenttime"
    },
    {
        "id": "10022",
        "type": "telegram",
        "titlerus": "ПЛЮЩЕВ",
        "titleeng": "PLUSHEV",
        "description": "Официальный телеграм журналиста Александра Плющева",
        "foto": "plushev.png",
        "link": "https://t.me/plushev"
    },
    {
        "id": "10023",
        "type": "telegram",
        "titlerus": "Команда Навального",
        "titleeng": "Navalny Team",
        "description": "Официальный телеграм Команды Алексея Навального",
        "foto": "teamnavalny.png",
        "link": "https://t.me/teamnavalny"
    },
    {
        "id": "10024",
        "type": "telegram",
        "titlerus": "Любовь Соболь",
        "titleeng": "Team Sobol",
        "description": "Официальный канал политика и юриста Любови Соболь",
        "foto": "teamsobol.png",
        "link": "https://t.me/TeamSobol"
    },
    {
        "id": "10025",
        "type": "telegram",
        "titlerus": "Накипело. Майкл Наки",
        "titleeng": "Накипело. Майкл Наки",
        "description": "Майкл Наки о том, что накипело.",
        "foto": "nakepelo.png",
        "link": "https://t.me/Nackepelo"
    },
    {
        "id": "10026",
        "type": "telegram",
        "titlerus": "Илья Яшин",
        "titleeng": "Илья Яшин",
        "description": "Только правда, только хардкор",
        "foto": "yashin.png",
        "link": "https://t.me/yashin_russia"
    },
    {
        "id": "10027",
        "type": "telegram",
        "titlerus": "Ходорковский",
        "titleeng": "Khodorkovsky",
        "description": "Михаил Борисович Ходорковский",
        "foto": "khodorkovski.png",
        "link": "https://t.me/khodorkovski"
    },
    {
        "id": "10028",
        "type": "telegram",
        "titlerus": "Сталингулаг",
        "titleeng": "Сталингулаг",
        "description": "Александр Горбунов",
        "foto": "stalin_gulag.png",
        "link": "https://t.me/stalin_gulag"
    },
    {
        "id": "10029",
        "type": "telegram",
        "titlerus": "Навальный",
        "titleeng": "Navalny",
        "description": "Финальная битва между добром и нейтралитетом",
        "foto": "navalny.png",
        "link": "https://t.me/navalny"
    },
    {
        "id": "10030",
        "type": "youtube",
        "titlerus": "Ходорковский LIVE",
        "titleeng": "Khodorkovski LIVE",
        "description": "Добро пожаловать на канал Ходорковский лайф. Основной канал МБХ - https://www.youtube.com/user/khodorkovskyru",
        "foto": "khodorkovskylive.png",
        "link": "https://www.youtube.com/c/khodorkovskylive"
    },
    {
        "id": "10031",
        "type": "newspapers",
        "titlerus": "Проект медиа",
        "titleeng": "project.media",
        "description": "Издание «Проект» специализируется на сложных журналистских жанрах: расследование, история, портрет, исследование открытых данных",
        "foto": "project.media.png",
        "link": "https://www.proekt.media/"
    },
    {
        "id": "10032",
        "type": "newspapers",
        "titlerus": "Важные истории",
        "titleeng": "istories.media",
        "description": "«Важные истории» рассказывают о главных героях масштабного расследования из России: среди них высокопоставленные чиновники, депутаты, близкие президента и многие другие.",
        "foto": "istories.media.png",
        "link": "https://www.proekt.media/"
    },
    {
        "id": "10033",
        "type": "youtube",
        "titlerus": "Игорь Александрович Яковенко",
        "titleeng": "Игорь Александрович Яковенко",
        "description": "Канал Игоря Яковенко, журналиста и социолога. Критический анализ процессов в политике, обществе и медиа. Программы \"Медитация\", \"Послевкусие\", \"Медиафрения\"",
        "foto": "yakovenko.png",
        "link": "https://www.youtube.com/channel/UCQkBKu3VZ6d96KJz_ixCq4g"
    },
    {
        "id": "10034",
        "type": "youtube",
        "titlerus": "Острый Угол",
        "titleeng": "Острый Угол",
        "description": "Острый Угол - независимый общественно-политический канал. История современной России, которую не покажут по ТВ.",
        "foto": "ostryiugol.png",
        "link": "https://www.youtube.com/channel/UCwxkg8SN6OHONwcJQb-O4WQ"
    }  
];

module.exports.Links = (req, res) => {
    JSONResponse.Send(res, 200, links);
};

