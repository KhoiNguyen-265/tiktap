# Tiktap

**Tiktap** is a lightweight JavaScript library for creating and managing **Tabs** in web interfaces.  
It allows you to easily switch between tabs, remember the active tab, and customize behavior as needed.

---

## Features

-   Fast and smooth tab switching.
-   Automatically hide/show content based on the active tab.
-   Supports `onChange` option when the tab changes.
-   Option to remember the active tab using `hash` or `query params`.
-   Lightweight, with no external dependencies.

---

## Installation

### Use directly with JS file

Download [`tiktap.min.js`](./tiktap.min.js) and include it in your HTML:

```html
<script src="tiktap.min.js"></script>
```

### Install via npm

```bash
npm install tiktap
```

---

## Usage

Sample HTML:

```html
<ul class="tiktap" id="myTabs">
    <li><a href="#tab1">Tab 1</a></li>
    <li><a href="#tab2">Tab 2</a></li>
</ul>

<div id="tab1">Content of Tab 1</div>
<div id="tab2">Content of Tab 2</div>
```

JavaScript:

```js
const tabs = new Tiktap("#myTabs", {
    remember: true, // remember the selected tab
    onChange: (tab) => {
        console.log("Switched to tab:", tab);
    },
});
```

---

## Options

| Option       | Type       | Default | Description                                 |
| ------------ | ---------- | ------- | ------------------------------------------- |
| `persistent` | `boolean`  | `false` | Remember the selected tab after page reload |
| `useQuery`   | `boolean`  | `false` | Use query params instead of hash            |
| `onChange`   | `function` | `null`  | Callback function when the tab changes      |

---

## Demo

👉 [View demo on GitHub Pages](https://khoinguyen-265.github.io/tiktap/)

---

## License

MIT © [KhoiNguyen-265](https://github.com/KhoiNguyen-265)
