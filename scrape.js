const puppeteer = require('puppeteer');
const url = 'https://stjohnsairport.com/';
const $ = require('cheerio');
const fs = require('fs');
const YYTDestinations = {
    "Cities": []
}

const uniqueSet = new Set();
puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto(url);
    let html = await page.content();
    await $('#departures  .city > span',html).each(function(i, elem) {
        if(uniqueSet.has($(this).text()))return true;
         uniqueSet.add($(this).text());
     });
    YYTDestinations.Cities = await [...uniqueSet].sort();
            
    await fs.writeFile('YYTDestinations.json', JSON.stringify(YYTDestinations), function(err){
        if (err) throw err;
        console.log("Successfully Written to File.");
    });
    await browser.close();
});