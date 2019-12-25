const puppeteer = require('puppeteer-core')
const cheerio   = require('cheerio')

const sekolahkoding = async () => {
    const browser = await puppeteer.launch({
        executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        ignoreDefaultArgs: ['--disable-extensions'],
        headless:true
    })
    const page = await browser.newPage()
    
    await page.goto('https://sekolahkoding.com/login',{
        waitUntil: 'domcontentloaded'
    })

    await page.type('#email', 'yourEmailHere'); 
    const password = await page.$('#password');
    await password.type('yourPasswordHere');
    await password.press('Enter');
    await page.waitFor(1500);

    // set url to first video page
    let url = 'https://sekolahkoding.com/kelas/kenalan-dengan-firebase-dari-google/video/kenalan-dengan-firebase-hosting-website-statis';

    // set total videos in one course
    let totalVideos = 9;

    const urlSplit = url.split('/')[4].replace(/-/g,' ')
    const title = urlSplit.split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')

    await page.goto(url, {waitUntil: 'domcontentloaded'})

    await page.setViewport({ width: 1280, height: 720 })

    //array contains temporary links
    const downloadurl = []
    for(i=1; i<=totalVideos; i++){

        let domLoaded = () => {
            return document.body.innerHTML
        }

        //get video download link in current pages
        await page.waitForFunction(domLoaded)

        let videoPage = await page.evaluate( () => document.body.innerHTML)
        const $ = cheerio.load(videoPage)
        const downloadLink = $('a[href*="/download/video"]').attr('href');
        downloadurl.push("https://sekolahkoding.com" + downloadLink)

        // await page.waitFor(3000)

        if(i != totalVideos) await page.click('.video_nav_next')

    }


    console.log(downloadurl.length + " links didapatkan! \n")
    console.log(downloadurl)

    // return downloadurl

    //array contains fix links
    const finalLinksCollection = [];

    for(i=0; i<downloadurl.length; i++){
        const videoLink = await browser.newPage()
        await videoLink.goto(downloadurl[i])
        finalLinksCollection.push(videoLink.url())   
        await videoLink.close() 
    }

    return {fileTitle:title, links:finalLinksCollection}

}

sekolahkoding()
.then((data) => {

    const file = require('fs')
    file.writeFile('links/' +data.fileTitle + '.txt' ,data.links.join("\n"), err =>{
        if(err) throw err
    })
    console.log("\n Success: All download links Captured!")
})
.catch(err => console.log(err))

