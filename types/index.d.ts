import { LitElement, TemplateResult } from 'lit';
/**
 * A github dynamic element
 */
export declare class GithubDynamic extends LitElement {
    static styles: import("lit").CSSResult;
    /**
     * the github username
     */
    username: string;
    /**
     * limit number
     */
    limit: number;
    /**
     * set background color
     */
    bgColor: string;
    /**
     * set title color
     */
    titleColor: string;
    /**
     * set description color
     */
    descriptionColor: string;
    /**
     * Set the cookie, it will be used to store the data. the expire time is 1 hour
     * @param key string
     * @param value value
     * @returns string
     */
    private setCookie;
    /**
     * get the cookie
     * @param key string
     * @returns string[] | null
     */
    private getCookie;
    /**
     * get the github data
     * @returns string[]
     */
    private getData;
    /**
     * get the status of the event
     * @param data any
     * @returns string
     */
    private getStatus;
    /**
     * return the description of the event
     * @param data any
     * @returns string
     */
    private returnDescription;
    /**
     * render the html
     * @param i number
     * @returns  TemplateResult<1>
     */
    private renderHTML;
    render(): TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'github-dynamic': GithubDynamic;
    }
}
