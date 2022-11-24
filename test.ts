import * as puppeteer from "puppeteer";
// import { executablePath } from "puppeteer";
import { Cluster } from "./src/index";
(async (params) => {
    const cluster = await Cluster.launch({
        monitor: false,
        timeout: 7000, // max timeout set to 30 minutes
        concurrency: Cluster.CONCURRENCY_CONTEXT,
        maxConcurrency: 2,
        //workerCreationDelay: 1000,
        //perBrowserOptions,
        puppeteer: puppeteer,
        puppeteerOptions: {
            // executablePath: puppeteer.executablePath(),
            headless: true,
            //product: "chrome",
            args: [
                // `--proxy-server=http://localhost:8090`,
                //  `--proxy-server=${proxy}`,
                "--disable-features=IsolateOrigins,site-per-process,SitePerProcess",
                "--flag-switches-begin --disable-site-isolation-trials --flag-switches-end",
                "--disable-dev-shm-usage",
                "--no-sandbox",
                "--disabled-setupid-sandbox",
                "--disable-gpu",
                //`--window-size=1920,1080`,
                //"--window-position=000,000",
            ],

            //perBrowserOptions: perBrowserOptions,
        },
        /* args: [
            { proxy: "http://127.0.0.1:1087" },
            { proxy: "http://127.0.0.1:1088" },
        ], */
    });

    await cluster.task(async ({ page, data, ...other }) => {
        // console.log(new Date().toLocaleString());
        //console.log(JSON.stringify(aa));
        // const { page, data, ...other } = aa;
        //console.trace("task run");
        const url = data.url || data;
        await page.goto(url);
        const content = await page.content();
        console.info("");
        console.info("===url:", url);
        console.info("===proxyServer:", data.proxyServer);
        console.info("===content:", content);
        console.info("");
        //await handlePage(page, data.url, "");
        // const screen = await page.screenshot();
        // Store screenshot, do something else
    });

    cluster.queue({
        url: "http://api64.ipify.org?q=0",
        proxyServer: "http://127.0.0.1:1087",
    });
    cluster.queue("http://api64.ipify.org?q=1");
    cluster.queue({
        url: "http://api64.ipify.org?q=2",
        proxyServer: "http://127.0.0.1:1087",
    });
    cluster.queue({
        url: "http://api64.ipify.org?q=2",
        proxyServer: "http://127.0.0.1:1087",
    });
    cluster.queue({
        url: "http://api64.ipify.org?q=3",
        proxyServer: "http://127.0.0.1:1087",
    });
    cluster.queue({
        url: "http://api64.ipify.org?q=4",
        proxyServer: "http://127.0.0.1:1087",
    });
    cluster.queue({
        url: "http://api64.ipify.org?q=5",
        //proxyServer: "http://127.0.0.1:1087",
    });
    cluster.queue({
        url: "http://api64.ipify.org?q=6",
        //proxyServer: "http://127.0.0.1:1087",
    });
    // cluster.queue({ url: "https://www.163.com?q=3" });
    // cluster.queue({ url: "https://www.163.com?q=4" });
    // cluster.queue({ url: "https://www.163.com?q=5" });
    // cluster.queue({ url: "https://www.163.com?q=6" });
    // cluster.queue({ url: "https://www.163.com?q=7" });
    // cluster.queue({ url: "https://www.163.com?q=8" });
    // cluster.queue({ url: "https://www.163.com?q=9" });
    // cluster.queue({ url: "https://www.163.com?q=10" });
    // cluster.queue({ url: "https://www.163.com?q=11" });
    // cluster.queue({ url: "https://www.163.com?q=12" });
    // cluster.queue({ url: "https://www.baidu.com?q=13" });
    // cluster.queue({ url: "https://www.baidu.com?q=14" });
    // cluster.queue({ url: "https://www.baidu.com?q=15" });
    // cluster.queue({ url: "https://www.baidu.com?q=16" });
    // many more pages

    await cluster.idle();
    await cluster.close();
})();
