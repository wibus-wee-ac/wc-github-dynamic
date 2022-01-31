# GitHub Dynamic for Web Components

[![npm](https://img.shields.io/npm/v/wc-github-dynamic)](https://www.npmjs.com/package/wc-github-dynamic)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/wc-github-dynamic)
![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/wc-github-dynamic)

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

## API

### Example

```html
<lantern-element
  number="2"
  text="Good,Great"
  disPlayBoth
></lantern-element>
<lantern-element
  number="2"
  position="right"
  text="Good,Great"
></lantern-element>
```

<!-- wc-api:start -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
### `src/index.ts`:

#### class: `LanternElement`

##### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

##### Fields

| Name            | Privacy | Type      | Default   | Description                                                                                   | Inherited From |
| --------------- | ------- | --------- | --------- | --------------------------------------------------------------------------------------------- | -------------- |
| `text`          |         | `string`  | `'春,节'`   | The text on lantern，use \`,\` to divide the text                                              |                |
| `number`        |         | `number`  | `2`       | The number of lanterns returned, up to 2                                                      |                |
| `displayMobile` |         | `boolean` | `false`   | display on moblie (very not recommended)                                                      |                |
| `disPlayBoth`   |         | `boolean` | `false`   | Whether to display left or right; otherwise, the output will be based on the 'position' field |                |
| `position`      |         | `string`  | `'right'` | The position of the lantern, left or right                                                    |                |

<hr/>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- wc-api:end -->



## Author

GS-server © Wibus, Released under the MIT License.

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)