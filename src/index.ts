import { html, css, LitElement, TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import {styleMap} from 'lit/directives/style-map.js';
import $ from 'axios'
import Cookies from 'js-cookie'

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

  private setCookie(key: string, value: any){
    return Cookies.set(key, JSON.stringify(value), { expires: 3600000 })
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
    // const response = await $.get(`https://api.github.com/users/${this.username}/events?per_page=${this.limit}`, {
    //   data : {
    //     'If-Modified-Since': "Thu, 05 Jul 2021 15:31:30 GMT"
    //   }
    // })
    // console.log(response)
    // let data = await response.data

    // $.get(`https://api.github.com/users/${this.username}/events?per_page=${this.limit}`).then(function(response){
    //   console.log(response)
    //   this.setCookie('github-dynamic-' + this.username, response.data)
    // })

    const data = [{"id":"19990951550","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":453868496,"name":"wibus-wee/wc-lantern","url":"https://api.github.com/repos/wibus-wee/wc-lantern"},"payload":{"push_id":8970200310,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"fd3aa731d141e487e581608425c2b65ec94f9a43","before":"7508d6ca7bc1f6a7076c14050b12a202882702a0","commits":[{"sha":"fd3aa731d141e487e581608425c2b65ec94f9a43","author":{"email":"1596355173@qq.com","name":"Wibus"},"message":"release: 0.1.3","distinct":true,"url":"https://api.github.com/repos/wibus-wee/wc-lantern/commits/fd3aa731d141e487e581608425c2b65ec94f9a43"}]},"public":true,"created_at":"2022-01-31T06:31:05Z"},{"id":"19990941148","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":453868496,"name":"wibus-wee/wc-lantern","url":"https://api.github.com/repos/wibus-wee/wc-lantern"},"payload":{"push_id":8970194455,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"7508d6ca7bc1f6a7076c14050b12a202882702a0","before":"87feff964684cfddbd165d036a1dc79569d2de9d","commits":[{"sha":"7508d6ca7bc1f6a7076c14050b12a202882702a0","author":{"email":"1596355173@qq.com","name":"Wibus"},"message":"feat: add mobile phone display field","distinct":true,"url":"https://api.github.com/repos/wibus-wee/wc-lantern/commits/7508d6ca7bc1f6a7076c14050b12a202882702a0"}]},"public":true,"created_at":"2022-01-31T06:29:57Z"},{"id":"19990636762","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":453868496,"name":"wibus-wee/wc-lantern","url":"https://api.github.com/repos/wibus-wee/wc-lantern"},"payload":{"push_id":8970040624,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"87feff964684cfddbd165d036a1dc79569d2de9d","before":"b33ee9a6bc8f00e7bdd7e9c0052eac8f600f5f6c","commits":[{"sha":"87feff964684cfddbd165d036a1dc79569d2de9d","author":{"email":"1596355173@qq.com","name":"Wibus"},"message":"release: 0.1.2","distinct":true,"url":"https://api.github.com/repos/wibus-wee/wc-lantern/commits/87feff964684cfddbd165d036a1dc79569d2de9d"}]},"public":true,"created_at":"2022-01-31T05:58:00Z"},{"id":"19990628518","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":453868496,"name":"wibus-wee/wc-lantern","url":"https://api.github.com/repos/wibus-wee/wc-lantern"},"payload":{"push_id":8970035998,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"b33ee9a6bc8f00e7bdd7e9c0052eac8f600f5f6c","before":"4f02bc5d022dbf50e9af33e2eadd5a81f9f97df0","commits":[{"sha":"b33ee9a6bc8f00e7bdd7e9c0052eac8f600f5f6c","author":{"email":"1596355173@qq.com","name":"Wibus"},"message":"docs(readme): update README","distinct":true,"url":"https://api.github.com/repos/wibus-wee/wc-lantern/commits/b33ee9a6bc8f00e7bdd7e9c0052eac8f600f5f6c"}]},"public":true,"created_at":"2022-01-31T05:56:56Z"},{"id":"19990578395","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":453868496,"name":"wibus-wee/wc-lantern","url":"https://api.github.com/repos/wibus-wee/wc-lantern"},"payload":{"push_id":8970008167,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"4f02bc5d022dbf50e9af33e2eadd5a81f9f97df0","before":"88cb9681b3f03bb0483976280c28c5bb21be9b1a","commits":[{"sha":"4f02bc5d022dbf50e9af33e2eadd5a81f9f97df0","author":{"email":"1596355173@qq.com","name":"Wibus"},"message":"pref: demo/index.html","distinct":true,"url":"https://api.github.com/repos/wibus-wee/wc-lantern/commits/4f02bc5d022dbf50e9af33e2eadd5a81f9f97df0"}]},"public":true,"created_at":"2022-01-31T05:50:21Z"},{"id":"19989779023","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":453868496,"name":"wibus-wee/wc-lantern","url":"https://api.github.com/repos/wibus-wee/wc-lantern"},"payload":{"push_id":8969587670,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"88cb9681b3f03bb0483976280c28c5bb21be9b1a","before":"73baea79c3ff00f96833ad3ac4155237a4ef8a39","commits":[{"sha":"88cb9681b3f03bb0483976280c28c5bb21be9b1a","author":{"email":"1596355173@qq.com","name":"Wibus"},"message":"release: 0.1.1","distinct":true,"url":"https://api.github.com/repos/wibus-wee/wc-lantern/commits/88cb9681b3f03bb0483976280c28c5bb21be9b1a"}]},"public":true,"created_at":"2022-01-31T04:09:23Z"},{"id":"19989557105","type":"CreateEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":453868496,"name":"wibus-wee/wc-lantern","url":"https://api.github.com/repos/wibus-wee/wc-lantern"},"payload":{"ref":"main","ref_type":"branch","master_branch":"main","description":"Lantern for Web Components","pusher_type":"user"},"public":true,"created_at":"2022-01-31T03:35:48Z"},{"id":"19989541585","type":"CreateEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":453868496,"name":"wibus-wee/wc-lantern","url":"https://api.github.com/repos/wibus-wee/wc-lantern"},"payload":{"ref":null,"ref_type":"repository","master_branch":"master","description":"Lantern for Web Components","pusher_type":"user"},"public":true,"created_at":"2022-01-31T03:33:04Z"},{"id":"19988911993","type":"WatchEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":315176171,"name":"YunYouJun/utils","url":"https://api.github.com/repos/YunYouJun/utils"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-31T02:02:31Z"},{"id":"19985259002","type":"WatchEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":410070811,"name":"YunYouJun/wc-github-corners","url":"https://api.github.com/repos/YunYouJun/wc-github-corners"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-30T15:08:14Z"},{"id":"19984711534","type":"WatchEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":143822069,"name":"sunface/rust-course","url":"https://api.github.com/repos/sunface/rust-course"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-30T13:30:44Z"},{"id":"19984395782","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":437122628,"name":"wibus-wee/mx-space-install-sh","url":"https://api.github.com/repos/wibus-wee/mx-space-install-sh"},"payload":{"push_id":8966264136,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"2a749ef734ffd3b087a7812c544a8f3caf994721","before":"b684fc9233dffaceeace7ad1ca089d69476c34fd","commits":[{"sha":"2a749ef734ffd3b087a7812c544a8f3caf994721","author":{"email":"1596355173@qq.com","name":"Wibus"},"message":"perf: change GitHub URL","distinct":true,"url":"https://api.github.com/repos/wibus-wee/mx-space-install-sh/commits/2a749ef734ffd3b087a7812c544a8f3caf994721"}]},"public":true,"created_at":"2022-01-30T12:32:20Z"},{"id":"19984382676","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":437122628,"name":"wibus-wee/mx-space-install-sh","url":"https://api.github.com/repos/wibus-wee/mx-space-install-sh"},"payload":{"push_id":8966255266,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"b684fc9233dffaceeace7ad1ca089d69476c34fd","before":"16afe78bbb9a2072ae9c6613c461dc99b923ba95","commits":[{"sha":"b684fc9233dffaceeace7ad1ca089d69476c34fd","author":{"email":"1596355173@qq.com","name":"Wibus"},"message":"Add and modified part of the code","distinct":true,"url":"https://api.github.com/repos/wibus-wee/mx-space-install-sh/commits/b684fc9233dffaceeace7ad1ca089d69476c34fd"}]},"public":true,"created_at":"2022-01-30T12:29:54Z"},{"id":"19984268462","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":410121979,"name":"wibus-wee/GS-server","url":"https://api.github.com/repos/wibus-wee/GS-server"},"payload":{"push_id":8966180156,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"d15fe78f58498e82fb7caa3db235869abf787b95","before":"ffa246ab8e53fb0b8230b58a1745c30a20c712ea","commits":[{"sha":"d15fe78f58498e82fb7caa3db235869abf787b95","author":{"email":"62133302+wibus-wee@users.noreply.github.com","name":"Wibus"},"message":"Create codeql-analysis.yml","distinct":true,"url":"https://api.github.com/repos/wibus-wee/GS-server/commits/d15fe78f58498e82fb7caa3db235869abf787b95"}]},"public":true,"created_at":"2022-01-30T12:08:04Z"},{"id":"19984251729","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":410121979,"name":"wibus-wee/GS-server","url":"https://api.github.com/repos/wibus-wee/GS-server"},"payload":{"push_id":8966169262,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"ffa246ab8e53fb0b8230b58a1745c30a20c712ea","before":"b8233e5c46d8ce6a2d0bac6806ac21eafa2e1cf8","commits":[{"sha":"ffa246ab8e53fb0b8230b58a1745c30a20c712ea","author":{"email":"1596355173@qq.com","name":"Wibus"},"message":"docs(readme): modify README","distinct":true,"url":"https://api.github.com/repos/wibus-wee/GS-server/commits/ffa246ab8e53fb0b8230b58a1745c30a20c712ea"}]},"public":true,"created_at":"2022-01-30T12:04:59Z"},{"id":"19982080248","type":"WatchEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":3124402,"name":"sofish/typo.css","url":"https://api.github.com/repos/sofish/typo.css"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-30T03:16:40Z"},{"id":"19976001489","type":"WatchEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":453282833,"name":"Innei/raycast-extensions","url":"https://api.github.com/repos/Innei/raycast-extensions"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-29T04:36:01Z"},{"id":"19975233422","type":"WatchEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":365098852,"name":"bilibili/ailab","url":"https://api.github.com/repos/bilibili/ailab"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-29T01:46:07Z","org":{"id":12002442,"login":"bilibili","gravatar_id":"","url":"https://api.github.com/orgs/bilibili","avatar_url":"https://avatars.githubusercontent.com/u/12002442?"}},{"id":"19957244290","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":452709404,"name":"wibus-wee/nextjs-notion-starter-kit","url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit"},"payload":{"push_id":8951219430,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"598ecebfe27705fc7514996bf5139fe65e6e0d86","before":"a068d790fd570fb4102145b1f905785cd042c28d","commits":[{"sha":"598ecebfe27705fc7514996bf5139fe65e6e0d86","author":{"email":"1596355173@qq.com","name":"Wibus"},"message":"change consig","distinct":true,"url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/commits/598ecebfe27705fc7514996bf5139fe65e6e0d86"}]},"public":true,"created_at":"2022-01-28T01:41:34Z"},{"id":"19946901842","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":452709404,"name":"wibus-wee/nextjs-notion-starter-kit","url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit"},"payload":{"push_id":8946192060,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"a068d790fd570fb4102145b1f905785cd042c28d","before":"b52c1d4cdad2e17930024fa9e8c4193f83d17b91","commits":[{"sha":"a068d790fd570fb4102145b1f905785cd042c28d","author":{"email":"62133302+wibus-wee@users.noreply.github.com","name":"Wibus"},"message":"Update site.config.js","distinct":true,"url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/commits/a068d790fd570fb4102145b1f905785cd042c28d"}]},"public":true,"created_at":"2022-01-27T14:19:20Z"},{"id":"19946849360","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":452709404,"name":"wibus-wee/nextjs-notion-starter-kit","url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit"},"payload":{"push_id":8946166666,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"b52c1d4cdad2e17930024fa9e8c4193f83d17b91","before":"c0904c88118f75e329fc2992ce579d6fa4c5804d","commits":[{"sha":"b52c1d4cdad2e17930024fa9e8c4193f83d17b91","author":{"email":"62133302+wibus-wee@users.noreply.github.com","name":"Wibus"},"message":"Update site.config.js","distinct":true,"url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/commits/b52c1d4cdad2e17930024fa9e8c4193f83d17b91"}]},"public":true,"created_at":"2022-01-27T14:16:41Z"},{"id":"19946785189","type":"ForkEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":329971644,"name":"transitive-bullshit/nextjs-notion-starter-kit","url":"https://api.github.com/repos/transitive-bullshit/nextjs-notion-starter-kit"},"payload":{"forkee":{"id":452709404,"node_id":"R_kgDOGvvMHA","name":"nextjs-notion-starter-kit","full_name":"wibus-wee/nextjs-notion-starter-kit","private":false,"owner":{"login":"wibus-wee","id":62133302,"node_id":"MDQ6VXNlcjYyMTMzMzAy","avatar_url":"https://avatars.githubusercontent.com/u/62133302?v=4","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","html_url":"https://github.com/wibus-wee","followers_url":"https://api.github.com/users/wibus-wee/followers","following_url":"https://api.github.com/users/wibus-wee/following{/other_user}","gists_url":"https://api.github.com/users/wibus-wee/gists{/gist_id}","starred_url":"https://api.github.com/users/wibus-wee/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/wibus-wee/subscriptions","organizations_url":"https://api.github.com/users/wibus-wee/orgs","repos_url":"https://api.github.com/users/wibus-wee/repos","events_url":"https://api.github.com/users/wibus-wee/events{/privacy}","received_events_url":"https://api.github.com/users/wibus-wee/received_events","type":"User","site_admin":false},"html_url":"https://github.com/wibus-wee/nextjs-notion-starter-kit","description":"Deploy your own Notion-powered website in minutes with Next.js and Vercel.","fork":true,"url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit","forks_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/forks","keys_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/keys{/key_id}","collaborators_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/collaborators{/collaborator}","teams_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/teams","hooks_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/hooks","issue_events_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/issues/events{/number}","events_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/events","assignees_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/assignees{/user}","branches_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/branches{/branch}","tags_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/tags","blobs_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/git/blobs{/sha}","git_tags_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/git/tags{/sha}","git_refs_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/git/refs{/sha}","trees_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/git/trees{/sha}","statuses_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/statuses/{sha}","languages_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/languages","stargazers_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/stargazers","contributors_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/contributors","subscribers_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/subscribers","subscription_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/subscription","commits_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/commits{/sha}","git_commits_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/git/commits{/sha}","comments_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/comments{/number}","issue_comment_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/issues/comments{/number}","contents_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/contents/{+path}","compare_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/compare/{base}...{head}","merges_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/merges","archive_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/{archive_format}{/ref}","downloads_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/downloads","issues_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/issues{/number}","pulls_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/pulls{/number}","milestones_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/milestones{/number}","notifications_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/notifications{?since,all,participating}","labels_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/labels{/name}","releases_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/releases{/id}","deployments_url":"https://api.github.com/repos/wibus-wee/nextjs-notion-starter-kit/deployments","created_at":"2022-01-27T14:13:30Z","updated_at":"2022-01-27T14:13:26Z","pushed_at":"2022-01-24T04:13:03Z","git_url":"git://github.com/wibus-wee/nextjs-notion-starter-kit.git","ssh_url":"git@github.com:wibus-wee/nextjs-notion-starter-kit.git","clone_url":"https://github.com/wibus-wee/nextjs-notion-starter-kit.git","svn_url":"https://github.com/wibus-wee/nextjs-notion-starter-kit","homepage":"https://transitivebullsh.it/nextjs-notion-starter-kit","size":1242,"stargazers_count":0,"watchers_count":0,"language":null,"has_issues":false,"has_projects":true,"has_downloads":true,"has_wiki":false,"has_pages":false,"forks_count":0,"mirror_url":null,"archived":false,"disabled":false,"open_issues_count":0,"license":null,"allow_forking":true,"is_template":false,"topics":[],"visibility":"public","forks":0,"open_issues":0,"watchers":0,"default_branch":"main","public":true}},"public":true,"created_at":"2022-01-27T14:13:31Z"},{"id":"19946783609","type":"WatchEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":329971644,"name":"transitive-bullshit/nextjs-notion-starter-kit","url":"https://api.github.com/repos/transitive-bullshit/nextjs-notion-starter-kit"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-27T14:13:26Z"},{"id":"19941185906","type":"WatchEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":452560011,"name":"Innei/components-playground","url":"https://api.github.com/repos/Innei/components-playground"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-27T08:47:11Z"},{"id":"19925834506","type":"ReleaseEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":410121979,"name":"wibus-wee/GS-server","url":"https://api.github.com/repos/wibus-wee/GS-server"},"payload":{"action":"published","release":{"url":"https://api.github.com/repos/wibus-wee/GS-server/releases/58010042","assets_url":"https://api.github.com/repos/wibus-wee/GS-server/releases/58010042/assets","upload_url":"https://uploads.github.com/repos/wibus-wee/GS-server/releases/58010042/assets{?name,label}","html_url":"https://github.com/wibus-wee/GS-server/releases/tag/v0.1.0","id":58010042,"author":{"login":"wibus-wee","id":62133302,"node_id":"MDQ6VXNlcjYyMTMzMzAy","avatar_url":"https://avatars.githubusercontent.com/u/62133302?v=4","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","html_url":"https://github.com/wibus-wee","followers_url":"https://api.github.com/users/wibus-wee/followers","following_url":"https://api.github.com/users/wibus-wee/following{/other_user}","gists_url":"https://api.github.com/users/wibus-wee/gists{/gist_id}","starred_url":"https://api.github.com/users/wibus-wee/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/wibus-wee/subscriptions","organizations_url":"https://api.github.com/users/wibus-wee/orgs","repos_url":"https://api.github.com/users/wibus-wee/repos","events_url":"https://api.github.com/users/wibus-wee/events{/privacy}","received_events_url":"https://api.github.com/users/wibus-wee/received_events","type":"User","site_admin":false},"node_id":"RE_kwDOGHH2-84DdSm6","tag_name":"v0.1.0","target_commitish":"main","name":"v0.1.0","draft":false,"prerelease":false,"created_at":"2022-01-26T13:19:47Z","published_at":"2022-01-26T13:21:41Z","assets":[],"tarball_url":"https://api.github.com/repos/wibus-wee/GS-server/tarball/v0.1.0","zipball_url":"https://api.github.com/repos/wibus-wee/GS-server/zipball/v0.1.0","body":"# [0.1.0](https://github.com/wibus-wee/GS-server/compare/v0.0.6...v0.1.0) (2022-01-26)\r\n\r\n\r\n### Bug Fixes\r\n\r\n* **ci:** fix vercel.json error ([cdce40f](https://github.com/wibus-wee/GS-server/commit/cdce40ff238f05574404e0268f7ea83b6db11258))\r\n* **ci:** remove bugs in depoly ([086bf7a](https://github.com/wibus-wee/GS-server/commit/086bf7ae69798da482681a2764bb180db759f831))\r\n* **crypt:** fix the example user create password empty ([96c0f7b](https://github.com/wibus-wee/GS-server/commit/96c0f7bc5d40b7a997c5c3178561242c41d602bb))\r\n* **deps:** pin dependencies ([c45cf49](https://github.com/wibus-wee/GS-server/commit/c45cf49756b6de09c7ea3c70565467f8a55a803d))\r\n* **deps:** update dependency @nestjs/swagger to v5.2.0 ([52bcda3](https://github.com/wibus-wee/GS-server/commit/52bcda340e39529b37fe4c681c4916e07a59b70c))\r\n* **deps:** update dependency axios to v0.25.0 ([feb5130](https://github.com/wibus-wee/GS-server/commit/feb51305acebcb3b209808300132f3f2ab26a37e))\r\n* **deps:** update nest monorepo to v8.2.6 ([8cb40d3](https://github.com/wibus-wee/GS-server/commit/8cb40d35c494814507a31b3de252886185608e1a))\r\n* **main:** fix an error if Origin is empty ([f1d27a9](https://github.com/wibus-wee/GS-server/commit/f1d27a986512e1d828de806e665ccb697cce56b3))\r\n* **pages:** fix Params error when fetching page ([a11b8ff](https://github.com/wibus-wee/GS-server/commit/a11b8ffdd1fb88c47fb700f891c8552fe8ece4b1))\r\n* **swagger:** fix swagger setup error ([4a437b4](https://github.com/wibus-wee/GS-server/commit/4a437b42e572a048e1bb6ce456ff759f7047f5eb)), closes [#41](https://github.com/wibus-wee/GS-server/issues/41)\r\n\r\n\r\n### Features\r\n\r\n* **crypt:** new password encryption, automatic encryption comparison ([f2aed68](https://github.com/wibus-wee/GS-server/commit/f2aed68d4c3cadf4267c8d7aff5378c84f47ae86))\r\n* **mailer:** a new feature of mailer (not finished) ([63d3f53](https://github.com/wibus-wee/GS-server/commit/63d3f533e0380fc1073512a6717135c8488423e1))\r\n* **utils:** add a bcrypt.utils ([60a67c5](https://github.com/wibus-wee/GS-server/commit/60a67c59a9394fbda1bba4bb7ce615ee5184487e))\r\n\r\n\r\n### Performance Improvements\r\n\r\n* **auth:** add expires for login api ([0ba8b5b](https://github.com/wibus-wee/GS-server/commit/0ba8b5ba66aa3a3d2e1c5eb91d2750006481e69f))\r\n* **bootstrap:** change text to English & del the hotLoad checking ([301f1f3](https://github.com/wibus-wee/GS-server/commit/301f1f3f88de18763c082fad99ed281979e7fc99))\r\n* **cors:** improve corsOrigin setting ([82708ea](https://github.com/wibus-wee/GS-server/commit/82708ea107bee38f8daeb227af36fdd6e0b1c911))\r\n* **crypt:** change crypto method to sha256 ([0ecd556](https://github.com/wibus-wee/GS-server/commit/0ecd55650e5b482d6d785f6c3c0f4e1dd373912b)), closes [#36](https://github.com/wibus-wee/GS-server/issues/36)\r\n* **env:** add default value for env ([ee3adec](https://github.com/wibus-wee/GS-server/commit/ee3adec02562dff39b44de1fdca933d3bf9b84d9))\r\n* **env:** move PORT to .env ([182ac85](https://github.com/wibus-wee/GS-server/commit/182ac854ac3eba84c63f33cab472123eff7d1a30))\r\n* **main:** move setup into app.listen() method ([166131c](https://github.com/wibus-wee/GS-server/commit/166131c4f8c4f51b05ddd1686f3bec680f754982))\r\n* **main:** remove corsOrigin * ([058937f](https://github.com/wibus-wee/GS-server/commit/058937f78743e6fbcd07a93ab6f3cbcc299e47b0))\r\n* **post/page:** make article content support long Text ([1924544](https://github.com/wibus-wee/GS-server/commit/1924544448eff9ed63467db604ac6bb515b8d249))\r\n\r\n\r\n### BREAKING CHANGES\r\n\r\n* **crypt:** New password encryption, automatic encryption comparison\r\n\r\n### Deps Changed\r\n* fix(deps): update nest monorepo to v8.2.6 (patch) by @renovate in https://github.com/wibus-wee/GS-server/pull/30\r\n* chore(deps): update dependency typescript to v4.5.5 by @renovate in https://github.com/wibus-wee/GS-server/pull/31\r\n* chore(deps): pin dependencies by @renovate in https://github.com/wibus-wee/GS-server/pull/33\r\n* fix(deps): update dependency axios to v0.25.0 by @renovate in https://github.com/wibus-wee/GS-server/pull/26\r\n* fix(deps): pin dependencies by @renovate in https://github.com/wibus-wee/GS-server/pull/35\r\n* chore(deps): pin dependencies by @renovate in https://github.com/wibus-wee/GS-server/pull/37\r\n* chore(deps): update typescript-eslint monorepo to v5.10.1 (patch) by @renovate in https://github.com/wibus-wee/GS-server/pull/39\r\n* fix(deps): update dependency @nestjs/swagger to v5.2.0 by @renovate in https://github.com/wibus-wee/GS-server/pull/40\r\n\r\n\r\n**Full Changelog**: https://github.com/wibus-wee/GS-server/compare/v0.0.6...v0.1.0","mentions_count":1,"mentions":[{"avatar_url":"https://avatars.githubusercontent.com/u/1832810?v=4","login":"renovate","profile_name":null,"profile_url":"https://github.com/renovate","avatar_user_actor":true}],"short_description_html":'<h1>\n<a href="https://github.com/wibus-wee/GS-server/compare/v0.0.6...v0.1.0">0.1.0</a> (2022-01-26)</h1>\n<h3>Bug Fixes</h3>\n<ul>\n<li>\n<strong>ci:</strong> fix vercel.json error (<a href="https://github.com/wibus-wee/GS-server/commit/cdce40ff238f05574404e0268f7ea83b6db11258">cdce40f</a>)</li>\n<li>\n<strong>ci:</strong> remove bugs in depoly (<a href="https://github.com/wibus-wee/GS-server/commit/086bf7ae69798da482681a2764bb180db759f831">086bf7a</a>)</li>\n<li>\n<strong>crypt:</strong> fix the example user create password empty (<a href="https://github.com/wibus-wee/GS-server/commit/96c0f7bc5d40b7a997c5c3178561242c41d602bb">96c0f7b</a>)</li>\n<li>\n<strong>deps:</strong> pin dependencies (<a href="https://github.com/wibus-wee/GS-server/commit/c45cf49756b6de09c7ea3c70565467f8a55a803d">c45cf49</a>)</li>\n<li><strong>deps:</strong></li>\n</ul>',"is_short_description_html_truncated":true}},"public":true,"created_at":"2022-01-26T13:21:41Z"},{"id":"19925834539","type":"CreateEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":410121979,"name":"wibus-wee/GS-server","url":"https://api.github.com/repos/wibus-wee/GS-server"},"payload":{"ref":"v0.1.0","ref_type":"tag","master_branch":"main","description":"the RESTful API service for G Space, powered by @nestjs.","pusher_type":"user"},"public":true,"created_at":"2022-01-26T13:21:41Z"},{"id":"19925805045","type":"PushEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":410121979,"name":"wibus-wee/GS-server","url":"https://api.github.com/repos/wibus-wee/GS-server"},"payload":{"push_id":8935762068,"size":1,"distinct_size":1,"ref":"refs/heads/main","head":"742851a5f0ab439b9912788924c0fd7249d63a28","before":"63d3f533e0380fc1073512a6717135c8488423e1","commits":[{"sha":"742851a5f0ab439b9912788924c0fd7249d63a28","author":{"email":"1596355173@qq.com","name":"wibus-wee"},"message":"release: 0.1.0","distinct":true,"url":"https://api.github.com/repos/wibus-wee/GS-server/commits/742851a5f0ab439b9912788924c0fd7249d63a28"}]},"public":true,"created_at":"2022-01-26T13:19:55Z"},{"id":"19920101828","type":"WatchEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":411493648,"name":"veler/DevToys","url":"https://api.github.com/repos/veler/DevToys"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-26T06:40:40Z"},{"id":"19920093261","type":"WatchEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":207645083,"name":"tannerlinsley/react-query","url":"https://api.github.com/repos/tannerlinsley/react-query"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-26T06:39:42Z"},{"id":"19920088070","type":"WatchEvent","actor":{"id":62133302,"login":"wibus-wee","display_login":"wibus-wee","gravatar_id":"","url":"https://api.github.com/users/wibus-wee","avatar_url":"https://avatars.githubusercontent.com/u/62133302?"},"repo":{"id":60493101,"name":"jwasham/coding-interview-university","url":"https://api.github.com/repos/jwasham/coding-interview-university"},"payload":{"action":"started"},"public":true,"created_at":"2022-01-26T06:39:04Z"}];
    return this.setCookie('github-dynamic-' + this.username, data)
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
    this.getCookie('github-dynamic-' + this.username).length == 0 ? console.log( this.getData() ) : this.getCookie('github-dynamic-' + this.username)
    let data = this.getCookie('github-dynamic-' + this.username)
    return html`
      <div class="single-post panel box-shadow-wrap-normal">
      <div class="panel-heading">
        ${data[i].actor.login}
    </div>
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
