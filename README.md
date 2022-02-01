# GitHub Dynamic for Web Components

> 已弃坑，目前遇到的困难：无法异步获取GitHub动态数据，无法设置Cookie后再获取Cookie

A web component by [lit](https://github.com/lit/lit)

The final product is an ES module, and it can be used alone.

> Anywhere like Vanilla JS / Vue / React / Angular / Svelte ...

## Usage

```bash
npm i wc-github-dynamic
```

### By CDN

See [demo/index.html](https://github.com/wibus-wee/wc-github-dynamic/blob/main/demo/index.html)

```html
<!-- cdn -->
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/wc-github-dynamic@latest"
></script>
```

### By NPM

```ts
// main.ts
import "wc-github-dynamic"
```

```html
<!-- index.html -->
<lantern-element></lantern-element>
```

## Notice

Because GitHub Rate limit, this component will set a cookie in browser, the validity period is 1 hour

## API

### Example

```html
<github-dynamic
  username="iRoZhi"
  limit="3"
  bgColor="#fff"
>
</github-dynamic>
```

<!-- wc-api:start -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
### `src/index.ts`:

#### class: `GithubDynamic`

##### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

##### Fields

| Name               | Privacy | Type     | Default       | Description           | Inherited From |
| ------------------ | ------- | -------- | ------------- | --------------------- | -------------- |
| `username`         |         | `string` | `"wibus-wee"` | the github username   |                |
| `limit`            |         | `number` | `10`          | limit number          |                |
| `bgColor`          |         | `string` | `"#fafafa"`   | set background color  |                |
| `titleColor`       |         | `string` | `"#555"`      | set title color       |                |
| `descriptionColor` |         | `string` | `"#8b8b8b"`   | set description color |                |

<hr/>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- wc-api:end -->



## Author

GS-server © Wibus, Released under the MIT License.

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)