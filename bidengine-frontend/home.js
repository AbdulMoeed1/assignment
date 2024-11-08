const dropdown = Vue.component("dropdown", {
  template: "#dropdown",
  props: ["options", "defaultValue"],
  data: function () {
    return { open: false, value: this._props.defaultValue };
  },
  methods: {
    toggleDropdown: function () {
      this.open = !this.open;
    },
    handleSelection: function (event, value) {
      this.value = value;
      this.open = false;
      event.stopPropagation();
    },
    closeMenu: function () {
      this.open = false;
    },
  },
});

const multiSelectDropdown = Vue.component("multi-select-dropdown", {
  template: "#multi-select-dropdown",
  props: ["options", "defaultValues"],
  data: function () {
    return { open: false, values: this._props.defaultValues };
  },
  methods: {
    toggleDropdown: function () {
      this.open = !this.open;
    },
    handleSelection: function (event, value) {
      this.values = this.values.includes(value)
        ? this.values.filter((filterValue) => filterValue !== value)
        : [...this.values, value];
      this.open = false;
      event.stopPropagation();
    },
    handleRemove: function (event, value) {
      this.values = this.values.filter((filterValue) => filterValue !== value);
      this.open = false;
      event.stopPropagation();
    },
    closeMenu: function () {
      this.open = false;
    },
  },
});

const tooltip = Vue.component("tooltip", {
  template: "#tooltip",
});

const staticPercentage = Array.from({ length: 20 }).map((_, index) => {
  return `${(index + 1) * 5}%`;
});

const app = new Vue({
  el: "#home",
  data: {
    staticPercentage,
    activeTab: "car",
    openCollapse: [],
    menu: [
      {
        to: "#",
        label: "Dashboard",
        icon: "./assets/dashboard.svg",
        activeIcon: "./assets/dashboard-active.svg",
      },
      {
        to: "#",
        label: "Analytics",
        icon: "./assets/analytics.svg",
        activeIcon: "./assets/analytics-active.svg",
      },
      {
        to: "#",
        label: "Campaign",
        icon: "./assets/campaign.svg",
        activeIcon: "./assets/campaign-active.svg",
      },
      {
        to: "#",
        label: "Display",
        icon: "./assets/display.svg",
        activeIcon: "./assets/display-active.svg",
      },
      {
        to: "#",
        label: "Help and Support",
        icon: "./assets/help.svg",
        activeIcon: "./assets/help-active.svg",
      },
    ],
    activeItemIndex: 2,
    isDrawerOpen: true,
    areAdvanceFeaturesEnabled: false,
    cpc: "",
  },
  components: { dropdown, multiSelectDropdown, tooltip },
  methods: {
    toggleDrawer: function () {
      this.isDrawerOpen = !this.isDrawerOpen;
      localStorage.setItem("drawer_state", this.isDrawerOpen);
    },
    menuClick: function (index) {
      this.activeItemIndex = index;
    },
    handleTab: function (tab) {
      this.activeTab = tab;
    },
    handleCollapse: function (collapse) {
      this.openCollapse = this.openCollapse.includes(collapse)
        ? this.openCollapse.filter((collapseName) => {
            return collapseName !== collapse;
          })
        : [...this.openCollapse, collapse];
    },
    toggleAdvanceFeatures: function () {
      this.areAdvanceFeaturesEnabled = !this.areAdvanceFeaturesEnabled;
    },
  },
  beforeMount: function () {
    function getLocalDrawerState() {
      const drawerStateLocal = JSON.parse(localStorage.getItem("drawer_state"));
      const drawerState = drawerStateLocal === null ? true : drawerStateLocal;
      return drawerState;
    }

    window.addEventListener("resize", (e) => {
      if (window.innerWidth >= 768) {
        this.isDrawerOpen = getLocalDrawerState();
      } else {
        this.isDrawerOpen = false;
      }
    });
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      this.isDrawerOpen = false;
    } else {
      this.isDrawerOpen = getLocalDrawerState();
    }
  },
});

const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);
