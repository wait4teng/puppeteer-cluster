import * as puppeteer from "puppeteer";

import { ResourceData } from "../ConcurrencyImplementation";
import SingleBrowserImplementation from "../SingleBrowserImplementation";

export default class Context extends SingleBrowserImplementation {
    protected async createResources(): Promise<ResourceData> {
        //console.error("createResources", JSON.stringify(this.contextOptions));
        let context = await (
            this.browser as puppeteer.Browser
        ).createIncognitoBrowserContext({
            ...this.contextOptions,
        });

        const page = await context.newPage();
        return {
            context,
            page,
        };
    }

    protected async freeResources(resources: ResourceData): Promise<void> {
        await resources.context.close();
    }
}
