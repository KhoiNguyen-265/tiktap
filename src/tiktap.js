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
            onChange: null,
        },
        options
    );

    this._originalHTML = this.contain.innerHTML;

    this.paramKey = selector.replace(/[^a-zA-Z0-9]/g, "");

    this._init();
}

Tiktap.prototype._init = function () {
    const params = new URLSearchParams(location.search);

    const tabSelector = params.get(`${this.paramKey}`);
    const tab =
        (this.opt.remember &&
            tabSelector &&
            this.tabs.find(
                (tab) =>
                    tab.getAttribute("href").replace(/[^a-zA-Z0-9]/g, "") ===
                    tabSelector
            )) ||
        this.tabs[0];

    this.currentTab = tab;

    // Xử lý default tab1 được active
    this._activateTab(tab, false);

    // Xử lý sự kiện
    this.tabs.forEach((tab) => {
        tab.onclick = (event) => this._handleTabClick(event, tab);
    });
};

Tiktap.prototype._handleTabClick = function (event, tab) {
    event.preventDefault();

    this._tryActivateTab(tab);
};

Tiktap.prototype._tryActivateTab = function (tab) {
    if (this.currentTab !== tab) {
        this._activateTab(tab);
        this.currentTab = tab;
    }
};

Tiktap.prototype._activateTab = function (tab, triggerOnChange = true) {
    this.tabs.forEach((tab) =>
        tab.closest("li").classList.remove("tiktap--active")
    );

    tab.closest("li").classList.add("tiktap--active");

    this.panels.forEach((panel) => (panel.hidden = true));

    const panelActive = document.querySelector(tab.getAttribute("href"));
    panelActive.hidden = false;

    if (this.opt.remember) {
        const params = new URLSearchParams(location.search);
        const paramValue = tab
            .getAttribute("href")
            .replace(/[^a-zA-Z0-9]/g, "");
        params.set(this.paramKey, paramValue);
        history.replaceState(null, null, `?${params}`);
    }

    if (triggerOnChange && typeof this.opt.onChange === "function") {
        this.opt.onChange({
            tab,
            panel: panelActive,
        });
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

    this._tryActivateTab(tabToActivate);
};

Tiktap.prototype.destroy = function () {
    this.contain.innerHTML = this._originalHTML;
    this.panels.forEach((panel) => (panel.hidden = false));
    this.contain = null;
    this.tabs = null;
    this.panels = null;
};
