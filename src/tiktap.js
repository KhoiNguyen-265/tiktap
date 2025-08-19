function Tiktap(selector) {
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

    this._init();
}

Tiktap.prototype._init = function () {
    // Xử lý default tab1 được active
    this._activeTab(this.tabs[0]);

    // Xử lý sự kiện
    this.tabs.forEach((tab) => {
        tab.onclick = (event) => this._handleTabClick(event, tab);
    });
};

Tiktap.prototype._handleTabClick = function (event, tab) {
    event.preventDefault();

    this._activeTab(tab);
};

Tiktap.prototype._activeTab = function (tab) {
    this.tabs.forEach((tab) =>
        tab.closest("li").classList.remove("tiktap--active")
    );

    tab.closest("li").classList.add("tiktap--active");

    this.panels.forEach((panel) => (panel.hidden = true));

    const panelActive = document.querySelector(tab.getAttribute("href"));
    panelActive.hidden = false;
};
