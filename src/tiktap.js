function Tiktap(selector, options = {}) {
    this.contain = document.querySelector(selector);
    if (!this.contain) {
        console.error(`Tiktap: No container found for selector '${selector}'!`);
        return;
    }

    this.tabs = Array.from(this.contain.querySelectorAll("li a"));
    if (!this.tabs.length) {
        console.error(`Tiktap: No tabs found inside the container!`);
        return;
    }

    this.panels = this.tabs
        .map((tab) => {
            const panel = document.querySelector(tab.getAttribute("href"));
            if (!panel) {
                console.error(
                    `Tiktap: No panel found for selector '${tab.getAttribute(
                        "href"
                    )}'`
                );
            }
            return panel;
        })
        .filter(Boolean);
    if (this.panels.length !== this.tabs.length) return;

    this.opt = Object.assign(
        {
            remember: false,
        },
        options
    );

    this._originalHTML = this.contain.innerHTML;

    this._init();
}

Tiktap.prototype._init = function () {
    // Cách 1: Lưu LocalStorage
    // let tabToActivate = null;
    // const savedTab = localStorage.getItem("tiktap--active");
    // if (savedTab) {
    //     tabToActivate = this.tabs.find(
    //         (tab) => tab.getAttribute("href") === savedTab
    //     );
    // } else {
    //     tabToActivate = this.tabs[0];
    // }

    // Cách 2: sử dụng hashURL
    const hash = location.hash;
    const tabToActivate =
        (this.opt.remember &&
            hash &&
            this.tabs.find((tab) => tab.getAttribute("href") === hash)) ||
        this.tabs[0];

    // Xử lý default tab1 được active
    this._activateTab(tabToActivate);

    // Xử lý sự kiện
    this.tabs.forEach((tab) => {
        tab.onclick = (event) => this._handleTabClick(event, tab);
    });
};

Tiktap.prototype._handleTabClick = function (event, tab) {
    event.preventDefault();

    this._activateTab(tab);
};

Tiktap.prototype._activateTab = function (tab) {
    this.tabs.forEach((tab) =>
        tab.closest("li").classList.remove("tiktap--active")
    );

    tab.closest("li").classList.add("tiktap--active");

    this.panels.forEach((panel) => (panel.hidden = true));

    const panelActive = document.querySelector(tab.getAttribute("href"));
    panelActive.hidden = false;

    // Cách 1: Lưu LocalStorage
    // localStorage.setItem("tiktap--active", tab.getAttribute("href"));

    // Cách 2: sử dụng hashURL
    if (this.opt.remember) {
        history.replaceState(null, null, tab.getAttribute("href"));
    }
};

Tiktap.prototype.switch = function (input) {
    let tabToActivate = null;

    if (typeof input === "string") {
        tabToActivate = this.tabs.find(
            (tab) => tab.getAttribute("href") === input
        );

        if (!tabToActivate) {
            console.error(`Tiktap: No panel found with ID '${input}'`);
            return;
        }
    } else if (this.tabs.includes(input)) {
        tabToActivate = input;
    }

    if (!tabToActivate) {
        console.error(`Tiktap: Invalid input '${input}'`);
        return;
    }

    this._activateTab(tabToActivate);
};

Tiktap.prototype.destroy = function () {
    this.contain.innerHTML = this._originalHTML;
    this.panels.forEach((panel) => (panel.hidden = false));
    this.contain = null;
    this.tabs = null;
    this.panels = null;
};
