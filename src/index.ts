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

  private async setCookie(key: string, value: string){
    return await Cookies.set(key, value, { expires: 3600000 })
  }
  private getCookie(key: string) {
    const data = Cookies.get(key)
    return data ? JSON.parse(data) : []
  }
  private removeCookie(key: string) {
    return Cookies.remove(key)
  }

  private async getData(){
    // 发送请求，并带If-Modified-Since头部
    const response = await $.get(`https://api.github.com/users/${this.username}/events?per_page=${this.limit}`, {
      headers: {
        'If-Modified-Since': "Thu, 05 Jul 2021 15:31:30 GMT"
      }
    })
    let data = response.data
    return await this.setCookie('github-dynamic', JSON.stringify(data))
  }

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

  private renderHTML(i: number){
    const bgTheme = {background: this.bgColor}
    this.getCookie('github-dynamic') ? this.getCookie('github-dynamic') : this.getData()
    const data = this.getCookie('github-dynamic')
    return html`
      <div class="single-post panel box-shadow-wrap-normal" style=${styleMap(bgTheme)}>
  <div class="post-meta wrapper-lg"><div class="item-meta-ico bg-ico-emoji">
    ${this.getStatus(data[i].type)}
  </div>    
  <h2 class="m-t-none text-ellipsis index-post-title" style=${styleMap({color: this.titleColor})}>
    <a href="${data[i]}.repo.url">
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
<a href="https://www.ihewro.com/author/1/">${data[i].repo.name}</a>
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
