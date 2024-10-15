const nimaWabetaInfo = require("@mrnima/wabetainfo")

async function TEST_FB_DL() {
    var result = await nimaWabetaInfo.getFromLink("https://wabetainfo.com/whatsapp-for-ios-24-20-71-whats-new/");
    const data = result.result;
    let desc = `
*QUEEN THARU WABETAINFO*
    
title: ${data.title}
date : ${data.date}
description: ${data.short_desc}

full info : ${data.desc}
    
*MADE BY CHAMI*
    `
    console.log(data.image,desc)
}

TEST_FB_DL();