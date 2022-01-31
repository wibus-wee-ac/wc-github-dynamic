import { html, css, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import {styleMap} from 'lit/directives/style-map.js';
import $ from 'axios'
import {until} from 'lit/directives/until.js';

/**
 * A github dynamic element
 */
@customElement('github-dynamic')
export class GithubDynamic extends LitElement {

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

  private async getData(i:number){
    const { data } = await $.get(`https://api.github.com/users/${this.username}/events?per_page=${this.limit}`)
    return data[i]
  }

  private async getStatus(i: number){
    return await this.getData(i).then((res) => { 
    let emoji: string = "🙂";
    
    switch (res ? res.type : '') {
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

     })
  }

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

  private renderHTML(i: number){
    const bgTheme = {background: this.bgColor}
    return html`
      <div class="single-post panel box-shadow-wrap-normal" style=${styleMap(bgTheme)}>
  <div class="post-meta wrapper-lg"><div class="item-meta-ico bg-ico-emoji">
    ${until(this.getStatus(i))}
  </div>    
  <h2 class="m-t-none text-ellipsis index-post-title" style=${styleMap({color: this.titleColor})}>
    <a href="${until(this.getData(i).then((res) => {return res ? res.repo.url:'#'}), "Loading")}">
    ${until(this.getData(i).then((res) => {return res ? res.type:'Null'}), "Loading")}
      </a>
    </h2>
    <p class="summary l-h-2x" style=${styleMap({color: this.descriptionColor})}>
    ${until(this.getData(i).then((res) => {
      switch (res ? res.type : ''){
        case "PushEvent":
          return res.payload.commits[0].message
        case "CreateEvent":
          return res.payload.description
        case "WatchEvent":
          return res.payload.action + " in " + res.repo.name
        case "ForkEvent":
          return "From " + res.repo.name + " to " + res.payload.forkee.full_name
        case "IssuesEvent":
          return res.payload.action + " issue " + res.payload.issue.title
        case "PullRequestEvent":
          return res.payload.action + " pull request " + res.payload.pull_request.title
        case "ReleaseEvent":
          return res.payload.action + " release " + res.payload.release.name
        case "PullRequestReviewCommentEvent":
          return res.payload.action + " pull request " + res.payload.pull_request.title
        default:
          return "Null"
      }
      
    }), "Loading")}
    </p>
      <div class="line line-lg b-b b-light"></div>
<div class="post-item-foot-icon text-ellipsis list-inline" style=${styleMap({color: this.descriptionColor})}>
<li>
<span class="m-r-sm right-small-icons"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></span>
<a href="https://www.ihewro.com/author/1/">${until(this.getData(i).then((res) => {return res ? res.repo.name:'Null'}), "Loading")}</a>
</li>

<li><span class="right-small-icons m-r-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg></span>
${until(this.getData(i).then((res) => {return res ? res.created_at:'Null'}), "Loading")}
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
