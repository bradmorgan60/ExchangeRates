const cheerio = require('cheerio')
const request = require('request')
const fs = require('fs')
const writeStream = fs.createWriteStream("AllCurrencies.csv")

writeStream.write('Country/Currency,Ticker,Symbol\n')

request('https://www.xe.com/symbols/', (error, response, html) => {
    if(!error && response.statusCode == 200) {
        const $ = cheerio.load(html)

        $('#__next > div:nth-child(2) > div:nth-child(3) > section:nth-child(3) > section > ul > li').each((i, brad) => {
            const currency = $(brad)
                .find("div:nth-child(2) > a")
                .text()
                .replace(/\s\s+/g, '')
            
            const ticker = $(brad)
                .find('div:nth-child(3)')
                .text()
                .replace(/\s\s+/g, '')

            const symbol = $(brad)
                .find('div:nth-child(4)')
                .text()
                .replace(/\s\s+/g, '')


                // console.log(currency, ticker)
            // console.log(currency, ticker, symbol)
            // console.log(country)
            writeStream.write(`${currency},${ticker},${symbol}\n`)


        })

        console.log("Scraping done...")
        }
        })

        // #__next > div:nth-child(2) > div:nth-child(3) > section:nth-child(3) > section > ul > li:nth-child(2) > div:nth-child(3)