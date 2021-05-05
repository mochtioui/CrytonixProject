const puppeteer = require('puppeteer')
const cron = require("node-cron");
const Scraper = require('../models/Scraper.model');
const Product = require('../models/Product.model');

scraper = function(
    model = {},
    url = ''
) {

    return (async () => {

        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.goto(url, {waitUntil: 'networkidle2'})

        const result = await page.evaluate(
            (model, url) => {

                const getValues = selectors => selectors.reduce(
                    (acc, selector) => [
                        ...acc,
                        ...Array.from(
                            selector.type === 'css'
                                ? document.querySelectorAll(selector.selector)
                                : queryXPathAll(selector.selector)
                        ).map(
                            tag => tag.textContent.replace(/\s(\s+)/g, '').trim()
                        ).filter(
                            text => text
                        )
                    ],
                    []
                )

                const queryXPathAll = path => {

                    const nodes = []
                    const xpath = document.evaluate(
                        path,
                        document,
                        null,
                        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                        null
                    )

                    for (let i = 0; i < xpath.snapshotLength; i++) {

                        nodes.push(xpath.snapshotItem(i))

                    }

                    return nodes

                }

                const output = {}


                for (let data in model) {

                    if (data !== 'domain' && data !== 'urls' && data !== 'product') {

                        output.value = getValues(model[data])[0]

                    }

                }

                return output

            },
            model,
            url
        )

        await browser.close()

        return result

    })()

}
const processModels = models => Promise.all(
    models.map(model => processLinks(model, model.urls))
).then(
    result => console.log(JSON.stringify(result))
)

const processLinks = (model, urls) => Promise.all(
    urls.map(url => scraper(model, url))
)
exports.scrape = async  (req, res) => {
    try {
   // await processModels(req.body)
  const result =  await scraper(req.body,req.body.urls)
        res.json(result);
    } catch (err) {
        res.json({message: err});
    }
}
cron.schedule("0 0 * * *", function() {
Scraper.find({schedule:"daily"}).then(scrapers =>{
    scrapers.map(async(scrap) => {
        const model =   {

            "abv": [{"type": "xpath", "selector": scrap.selector}],
            "urls": scrap.url,
        }

        console.log(model)
        const property = scrap.property;
        try {
            // await processModels(req.body)
            const result =  await scraper(model,model.urls)

            await Product.updateOne(
                { _id: scrap.product },
                { $set: {[property]: result.value}}
                ,
                {new: true, useFindAndModify: false}
            );
        } catch (err) {
            console.log({message: err})

        }

    })
}).catch();
});
cron.schedule("0 0 * * 0", function() {
    Scraper.find({schedule:"weekly"}).then(scrapers =>{
        scrapers.map(async(scrap) => {
            const model =   {

                "abv": [{"type": "xpath", "selector": scrap.selector}],
                "urls": scrap.url,
            }

            console.log(model)
            const property = scrap.property;
            try {
                // await processModels(req.body)
                const result =  await scraper(model,model.urls)

                await Product.updateOne(
                    { _id: scrap.product },
                    { $set: {[property]: result.value}}
                    ,
                    {new: true, useFindAndModify: false}
                );
            } catch (err) {
                console.log({message: err})

            }

        })
    }).catch();
});
cron.schedule("0 0 1 * *", function() {
    Scraper.find({schedule:"monthly"}).then(scrapers =>{
        scrapers.map(async(scrap) => {
            const model =   {

                "abv": [{"type": "xpath", "selector": scrap.selector}],
                "urls": scrap.url,
            }

            console.log(model)
            const property = scrap.property;
            try {
                // await processModels(req.body)
                const result =  await scraper(model,model.urls)

                await Product.updateOne(
                    { _id: scrap.product },
                    { $set: {[property]: result.value}}
                    ,
                    {new: true, useFindAndModify: false}
                );
            } catch (err) {
                console.log({message: err})

            }

        })
    }).catch();
});
cron.schedule("0 0 1 1 *", function() {
    Scraper.find({schedule:"yearly"}).then(scrapers =>{
        scrapers.map(async(scrap) => {
            const model =   {

                "abv": [{"type": "xpath", "selector": scrap.selector}],
                "urls": scrap.url,
            }

            console.log(model)
            const property = scrap.property;
            try {
                // await processModels(req.body)
                const result =  await scraper(model,model.urls)

                await Product.updateOne(
                    { _id: scrap.product },
                    { $set: {[property]: result.value}}
                    ,
                    {new: true, useFindAndModify: false}
                );
            } catch (err) {
                console.log({message: err})

            }

        })
    }).catch();
});
exports.create = async  (req, res) => {
    const sc = new Scraper(
req.body
    );
    try {
        const saved = await sc.save();
        res.json(saved);
    } catch (err) {
        res.json({message: err});
    }
};
