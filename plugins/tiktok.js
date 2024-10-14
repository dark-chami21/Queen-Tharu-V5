const { downloadTiktok } = require(" @mrnima/tiktok-downloader");
async function TEST_TIKTOK_DL(){
    var link = "https://vt.tiktok.com/ZS2vSs5fL/"
    var result = await downloadTiktok(link);
    console.log(result)
}
TEST_TIKTOK_DL()
async function TEST_TIKTOK_DL(){
    var link = "https://vt.tiktok.com/ZS27KJCEG/" 
    var result = await downloadTiktok(link);
    console.log(result)
}
TEST_TIKTOK_DL()
