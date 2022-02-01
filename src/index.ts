import { html, css, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import {styleMap} from 'lit/directives/style-map.js';
import $ from 'axios'
import Cookies from 'js-cookie'
import {until} from 'lit/directives/until.js';

/**
 * A github dynamic element
 */
@customElement('github-dynamic')
export class GithubDynamic extends LitElement {

  static styles = css`
  .single-post.panel {
    border-radius: 6px;
    border: none;
    max-width: 400px;
    margin-left: 10px;
}
.box-shadow-wrap-normal {
    -webkit-box-shadow: 0 1px 3px rgb(0 0 0 / 5%);
    box-shadow: 0 1px 3px rgb(0 0 0 / 5%);
}
.panel {
    transition: all .2s ease;
}
.panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -webkit-box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
    box-shadow: 0 1px 1px rgb(0 0 0 / 5%);
}
@media (max-width: 767px){
  .wrapper-lg, .wrapper-md {
      padding: 15px;
  }
}
.wrapper-lg {
    padding: 30px;
}
.item-meta-ico {
    position: relative;
    display: inline-block;
    width: 42px;
    height: 42px;
    border: 1px solid #eaeaea;
    border-radius: 50%;
    float: left;
    margin-right: 25px;
}
.bg-ico-emoji {
    background: 0 0;
    border: none;
    font-size: 35px;
    margin-right: 15px;
    user-select: none;
    bottom: 8px;
}

@media (max-width: 767px){
  .index-post-title {
    font-size: 17px;
  }
}
@media (max-width: 767px){
  .index-post-title {
    font-size: 17px;
  }
}
@media (max-width: 1199px){
  .index-post-title {
    font-size: 20px;
  }
}
.index-post-title {
    font-size: 22px;
    padding-bottom: 1px;
}
.index-post-title {
    padding-bottom: 1px;
}
.m-t-none {
    margin-top: 0!important;
}
a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
    word-break: break-all;
}
.l-h-2x {
    line-height: 2em;
}
.b-light {
    border-color: rgba(237,241,242,.6);
}
.b-b {
    border-bottom: 1px solid rgba(222,229,231,.45);
}
.line-lg {
    margin-top: 15px;
    margin-bottom: 15px;
}
.line {
    width: 100%;
    height: 2px;
    margin: 10px 0;
    overflow: hidden;
    font-size: 0;
}
.post-item-foot-icon {
    font-size: 13px;
}
.text-ellipsis {
    margin-top: 10px;
}
.list-inline>li {
    display: inline-block;
    padding-right: 5px;
    padding-left: 5px;
}
.m-r-sm {
    margin-right: 10px;
}
.panel-heading {
  border-radius: 4px;
}
.panel-heading {
  padding: 20px;
  margin-bottom: 15px;
  color: #58666e;
  background-color: #edf1f2;
  border-bottom: 1px solid transparent;
  border-radius: 10px;
}
.streamline{
  border-left: 1px solid #23b7e5;
}
.streamline:after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 9px;
  height: 9px;
  margin-left: 13px;
  background-color: #fff;
  border-color: inherit;
  border-style: solid;
  border-width: 1px;
  border-radius: 10px;
  content: '';
}
.streamline:after {
  top: 100px;
  bottom: auto;
}
.streamline:after, .streamline:before {
  display: block;
}
.streamline:after {
  clear: both;
}
  `

  /**
   * the github username
   */
   @property({type: String})
   username = "wibus-wee"
 
   /**
    * limit number
    */
   @property({type: Number})
   limit = 10
 
   /**
    * set background color
    */
   @property({type: String})
   bgColor = "#fafafa"

  /**
   * set title color
   */
  @property({type: String})
  titleColor = "#555"

  /**
   * set description color
   */
  @property({type: String})
  descriptionColor = "#8b8b8b"

  /**
   * Set the cookie, it will be used to store the data. the expire time is 1 hour
   * @param key string
   * @param value value
   * @returns string
   */
  private async setCookie(key: string, value: any){
    return await Cookies.set(key, JSON.stringify(value), { expires: 3600000 })
  }
  /**
   * get the cookie
   * @param key string
   * @returns string[] | null
   */
  private getCookie(key: string) {
    const data = Cookies.get(key)
    return data ? JSON.parse(data) : []
  }

  /**
   * get the github data
   * @returns string[]
   */
  private async getData(){
    // const { data } = await $.get(`https://api.github.com/users/${this.username}/events?per_page=${this.limit}`)
    const data = [{"id":"19544394873","type":"WatchEvent","actor":{"id":37916737,"login":"iRoZhi","display_login":"iRoZhi","gravatar_id":"","url":"https://api.github.com/users/iRoZhi","avatar_url":"https://avatars.githubusercontent.com/u/37916737?"},"repo":{"id":151233668,"name":"ArtalkJS/Artalk","url":"https://api.github.com/repos/ArtalkJS/Artalk"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-01T15:28:47Z","org":{"id":76841221,"login":"ArtalkJS","gravatar_id":"","url":"https://api.github.com/orgs/ArtalkJS","avatar_url":"https://avatars.githubusercontent.com/u/76841221?"}},{"id":"19544393108","type":"WatchEvent","actor":{"id":37916737,"login":"iRoZhi","display_login":"iRoZhi","gravatar_id":"","url":"https://api.github.com/users/iRoZhi","avatar_url":"https://avatars.githubusercontent.com/u/37916737?"},"repo":{"id":345120700,"name":"qwqcode/Atracer","url":"https://api.github.com/repos/qwqcode/Atracer"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-01T15:28:19Z"},{"id":"19542725000","type":"WatchEvent","actor":{"id":37916737,"login":"iRoZhi","display_login":"iRoZhi","gravatar_id":"","url":"https://api.github.com/users/iRoZhi","avatar_url":"https://avatars.githubusercontent.com/u/37916737?"},"repo":{"id":390218088,"name":"iRoZhi/concise_orange","url":"https://api.github.com/repos/iRoZhi/concise_orange"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-01T07:56:35Z"},{"id":"19542724944","type":"WatchEvent","actor":{"id":37916737,"login":"iRoZhi","display_login":"iRoZhi","gravatar_id":"","url":"https://api.github.com/users/iRoZhi","avatar_url":"https://avatars.githubusercontent.com/u/37916737?"},"repo":{"id":390180296,"name":"iRoZhi/imouse","url":"https://api.github.com/repos/iRoZhi/imouse"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-01T07:56:34Z"},{"id":"19542724862","type":"WatchEvent","actor":{"id":37916737,"login":"iRoZhi","display_login":"iRoZhi","gravatar_id":"","url":"https://api.github.com/users/iRoZhi","avatar_url":"https://avatars.githubusercontent.com/u/37916737?"},"repo":{"id":416741705,"name":"iRoZhi/GithubFile","url":"https://api.github.com/repos/iRoZhi/GithubFile"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-01T07:56:32Z"}]
    // console.log(await data)
    return await this.setCookie('github-dynamic-' + this.username, await data)
  }

  /**
   * get the status of the event
   * @param data any
   * @returns string
   */
  private getStatus(data: any){
    let emoji: string = "🙂";
    
    switch (data ? data : '') {
    case "PushEvent":
      emoji = "🧱";
      break;
    case "CreateEvent":
      emoji = "📌";
      break;
    case "WatchEvent":
      emoji = "🔎";
      break;
    case "ForkEvent":
      emoji = "🔨";
      break;
    case "IssuesEvent":
      emoji = "📝";
      break;
    case "PullRequestEvent":
      emoji = "🔧";
      break;
    case "ReleaseEvent":
      emoji = "🎉";
      break;
    case "PullRequestReviewCommentEvent":
      emoji = "💬";
      break;
    default:
      emoji = "🙂";
      break;
    }
    return emoji
  }

  /**
   * return the description of the event
   * @param data any
   * @returns string
   */
  private returnDescription(data: any){
    switch (data ? data.type : ''){
      case "PushEvent":
        return data.payload.commits[0].message
      case "CreateEvent":
        return data.payload.description
      case "WatchEvent":
        return data.payload.action + " in " + data.repo.name
      case "ForkEvent":
        return "From " + data.repo.name + " to " + data.payload.forkee.full_name
      case "IssuesEvent":
        return data.payload.action + " issue " + data.payload.issue.title
      case "PullRequestEvent":
        return data.payload.action + " pull request " + data.payload.pull_request.title
      case "ReleaseEvent":
        return data.payload.action + " release " + data.payload.release.name
      case "PullRequestReviewCommentEvent":
        return data.payload.action + " pull request " + data.payload.pull_request.title
      default:
        return "Null"
    }
  }

  /**
   * render the html
   * @param i number
   * @returns  TemplateResult<1>
   */
  private renderHTML(i: number){ // it must be TemplateResult<1>
    const bgTheme = {background: this.bgColor}
    let data = this.getCookie('github-dynamic-' + this.username)
    if (data.length == 0) {
      console.warn("No data")
    }
    return html`
    <div class="panel-heading single-post panel box-shadow-wrap-normal">
    ${data[i].actor.login}
    </div>
      <div class="single-post panel box-shadow-wrap-normal">
  <div class="post-meta wrapper-lg streamline"  style=${styleMap(bgTheme)}><div class="item-meta-ico bg-ico-emoji">
    ${this.getStatus(data[i].type)}
  </div>    
  <h2 class="m-t-none text-ellipsis index-post-title" style=${styleMap({color: this.titleColor})}>
    <a href="https://github.com/${data[i].repo.name}">
    ${data[i].type}
      </a>
    </h2>
    <p class="summary l-h-2x" style=${styleMap({color: this.descriptionColor})}>
    ${this.returnDescription(data[i])}
    </p>
      <div class="line line-lg b-b b-light"></div>
<div class="post-item-foot-icon text-ellipsis list-inline" style=${styleMap({color: this.descriptionColor})}>
<li>
<span class="m-r-sm right-small-icons"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
<a href="https://github.com/${data[i].repo.name}">${data[i].repo.name}</a>
</li>

<li><span class="right-small-icons m-r-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
${data[i].created_at}
</li>
</div><!--post-meta wrapper-lg-->
</div>
</div>
      `
  }

  render() {
    
    this.getCookie('github-dynamic-' + this.username).length == 0 ? 
    console.log( this.getData() ) : 
    console.log( this.getCookie('github-dynamic-' + this.username) )

    let a: TemplateResult<1>[] = new Array(this.limit)
    for (let i = 0; i < this.limit; i++) {
      if (this.renderHTML(i) == null) {
        break;
      }
      a[i] = this.renderHTML(i) // TemplateResult<1>
    }
    return html`
    ${a}
    `  
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'github-dynamic': GithubDynamic
  }
}
