import { RouteInfo } from "./sidebar.metadata";
export const ROUTES: RouteInfo[] = [
  // Admin Modules

  {
    path: "",
    title: "Admin Modules",
    moduleName: "",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },

  {
    path: "/admin/dashboard",
    title: "MENUITEMS.DASHBOARD.TEXT",
    moduleName: "dashboard",
    iconType: "feather",
    icon: "monitor",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/admin/asset-codes",
    title: "Asset Codes",
    moduleName: "asset-codes",
    iconType: "feather",
    icon: "hash",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/admin/categories",
    title: "Categories",
    moduleName: "dashboard",
    iconType: "feather",
    icon: "star",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/admin/custodians",
    title: "MENUITEMS.CUSTODIANS.TEXT",
    moduleName: "custodians",
    iconType: "feather",
    icon: "command",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },

  {
    path: "/admin/departments",
    title: "MENUITEMS.DEPARTMENTS.TEXT",
    moduleName: "departments",
    iconType: "feather",
    icon: "grid",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/admin/department-units",
    title: "MENUITEMS.DEPARTMENT_UNITS.TEXT",
    moduleName: "department-units",
    iconType: "feather",
    icon: "chevrons-down",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  // {
  //   path: "/admin/depreciations",
  //   title: "Depreciations",
  //   moduleName: "dashboard",
  //   iconType: "feather",
  //   icon: "git-merge",
  //   class: "",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["ROLE_ADMIN"],
  //   submenu: [],
  // },
  {
    path: "/admin/locations",
    title: "MENUITEMS.LOCATIONS.TEXT",
    moduleName: "dashboard",
    iconType: "feather",
    icon: "map-pin",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },

  {
    path: "/admin/asset-movements",
    title: "Asset Movements",
    moduleName: "asset-movements",
    iconType: "feather",
    icon: "move",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/admin/attachments",
    title: "Attachments",
    moduleName: "dashboard",
    iconType: "feather",
    icon: "upload",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/admin/transactions",
    title: "User Logs",
    moduleName: "dashboard",
    iconType: "feather",
    icon: "book-open",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/admin/roles/all",
    title: "MENUITEMS.ROLES.TEXT",
    moduleName: "roles",
    iconType: "feather",
    icon: "book",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "",
    title: "MENUITEMS.USERS.TEXT",
    moduleName: "users",
    iconType: "feather",
    icon: "users",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [
      {
        path: "/admin/users/all",
        title: "MENUITEMS.USERS.LIST.ACTIVE_ACCOUNTS",
        moduleName: "users",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/users/locked-accounts",
        title: "MENUITEMS.USERS.LIST.LOCKED_ACCOUNTS",
        moduleName: "users",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/users/inactive-accounts",
        title: "MENUITEMS.USERS.LIST.INACTIVE_ACCOUNTS",
        moduleName: "users",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/users/deleted-accounts",
        title: "MENUITEMS.USERS.LIST.DELETED_ACCOUNTS",
        moduleName: "users",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/admin/users/add-user",
        title: "MENUITEMS.USERS.LIST.ADD_ACCOUNT",
        moduleName: "users",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },

  // Executive Module
  // {
  //   path: "",
  //   title: "Executive Modules",
  //   moduleName: "",
  //   iconType: "",
  //   icon: "",
  //   class: "",
  //   groupTitle: true,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["ROLE_ADMIN"],
  //   submenu: [],
  // },

  // {
  //   path: "/executive/dashboard",
  //   title: "Dashboard",
  //   moduleName: "dashboard",
  //   iconType: "feather",
  //   icon: "monitor",
  //   class: "",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["ROLE_EXECUTIVE", "ROLE_ADMIN"],
  //   submenu: [],
  // },
  // {
  //   path: "/executive/assets",
  //   title: "Assets",
  //   moduleName: "assets",
  //   iconType: "feather",
  //   icon: "gift",
  //   class: "",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["ROLE_EXECUTIVE", "ROLE_ADMIN"],
  //   submenu: [],
  // },
  // {
  //   path: "/executive/asset-movement",
  //   title: "Asset Movements",
  //   moduleName: "asset-movements",
  //   iconType: "feather",
  //   icon: "move",
  //   class: "",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["ROLE_EXECUTIVE", "ROLE_ADMIN"],
  //   submenu: [],
  // },
  // {
  //   path: "/executive/profit-loss",
  //   title: "Profit Loss",
  //   moduleName: "asset-movements",
  //   iconType: "feather",
  //   icon: "bar-chart-2",
  //   class: "",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["ROLE_EXECUTIVE", "ROLE_ADMIN"],
  //   submenu: [],
  // },

  // Supervisor Modules
  {
    path: "",
    title: "Supervisor Modules",
    moduleName: "",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/supervisor/dashboard",
    title: "Dashboard",
    moduleName: "dashboard",
    iconType: "feather",
    icon: "monitor",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_SUPERVISOR", "ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "",
    title: "Assets",
    moduleName: "assets",
    iconType: "feather",
    icon: "gift",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_SUPERVISOR", "ROLE_ADMIN"],
    submenu: [
      {
        path: "supervisor/assets/all-assets",
        title: "All Assets",
        moduleName: "assets",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "supervisor/assets/asset-analysis",
        title: "Assets Analysis",
        moduleName: "assets",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },

  {
    path: "/supervisor/transactions/transactions",
    title: "User Logs",
    moduleName: "transactions",
    iconType: "feather",
    icon: "edit",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_SUPERVISOR", "ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/supervisor/pending/pending",
    title: "Pending Requests",
    moduleName: "pending",
    iconType: "feather",
    icon: "calendar",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_SUPERVISOR", "ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/account/update-profile",
    title: "Account Settings",
    moduleName: "accounts",
    iconType: "feather",
    icon: "settings",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_SUPERVISOR", "ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/account/notifications",
    title: "Notifications",
    moduleName: "accounts",
    iconType: "feather",
    icon: "alerts",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_SUPERVISOR", "ROLE_ADMIN"],
    submenu: [],
  },


  // Clerk Module

  {
    path: "",
    title: "Clerk Modules",
    moduleName: "",
    iconType: "",
    icon: "",
    class: "",
    groupTitle: true,
    badge: "",
    badgeClass: "",
    role: ["ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/clerk/dashboard",
    title: "Dashboard",
    moduleName: "dashboard",
    iconType: "feather",
    icon: "monitor",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_CLERK", "ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "",
    title: "Assets Mngt",
    moduleName: "assets",
    iconType: "feather",
    icon: "trello",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_CLERK", "ROLE_ADMIN"],
    submenu: [
      {
        path: "/clerk/assets/all",
        title: "All Assets",
        moduleName: "assets",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/clerk/assets/add",
        title: "Add Asset",
        moduleName: "assets",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/clerk/assets/import",
        title: "Import Excel",
        moduleName: "assets",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/clerk/assets/pending",
        title: "Pending Requests",
        moduleName: "assets",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/clerk/assets/reporting",
        title: "Assets Reports",
        moduleName: "lease",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "",
    title: "Lease Mgt",
    moduleName: "lease",
    iconType: "feather",
    icon: "grid",
    class: "menu-toggle",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_CLERK", "ROLE_ADMIN"],
    submenu: [
      {
        path: "/clerk/leases/all-leases",
        title: "All Leases",
        moduleName: "lease",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/clerk/leases/manage-lease",
        title: "Manage Lease",
        moduleName: "lease",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/clerk/leases/all-lessors",
        title: "All lessors",
        moduleName: "lease",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/clerk/leases/manage-lessor",
        title: "Manage lessor",
        moduleName: "lease",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },

      {
        path: "/clerk/leases/accounting",
        title: "Accounting",
        moduleName: "lease",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
      {
        path: "/clerk/leases/reporting",
        title: "Leases Reports",
        moduleName: "lease",
        iconType: "",
        icon: "",
        class: "ml-menu",
        groupTitle: false,
        badge: "",
        badgeClass: "",
        role: [""],
        submenu: [],
      },
    ],
  },
  {
    path: "/clerk/assets/profit-loss",
    title: "Profit/Loss",
    moduleName: "assets",
    iconType: "feather",
    icon: "book-open",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_CLERK", "ROLE_ADMIN"],
    submenu: [],
  },

  {
    path: "/clerk/assets/reporting",
    title: "Reports",
    moduleName: "accounts",
    iconType: "feather",
    icon: "book",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_SUPERVISOR", "ROLE_ADMIN"],
    submenu: [],
  },
  {
    path: "/account/update-profile",
    title: "Account Settings",
    moduleName: "accounts",
    iconType: "feather",
    icon: "settings",
    class: "",
    groupTitle: false,
    badge: "",
    badgeClass: "",
    role: ["ROLE_CLERK", "ROLE_ADMIN"],
    submenu: [],
  },

  // Common Modules

  // {
  //   path: "",
  //   title: "Authentication",
  //   moduleName: "authentication",
  //   iconType: "feather",
  //   icon: "user-check",
  //   class: "menu-toggle",
  //   groupTitle: false,
  //   badge: "",
  //   badgeClass: "",
  //   role: ["Admin"],
  //   submenu: [
  //     {
  //       path: "/authentication/signin",
  //       title: "Sign In",
  //       moduleName: "authentication",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       role: [""],
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/signup",
  //       title: "Sign Up",
  //       moduleName: "authentication",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       role: [""],
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/forgot-password",
  //       title: "Forgot Password",
  //       moduleName: "authentication",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       role: [""],
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/locked",
  //       title: "Locked",
  //       moduleName: "authentication",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       role: [""],
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/page404",
  //       title: "404 - Not Found",
  //       moduleName: "authentication",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       role: [""],
  //       submenu: [],
  //     },
  //     {
  //       path: "/authentication/page500",
  //       title: "500 - Server Error",
  //       moduleName: "authentication",
  //       iconType: "",
  //       icon: "",
  //       class: "ml-menu",
  //       groupTitle: false,
  //       badge: "",
  //       badgeClass: "",
  //       role: [""],
  //       submenu: [],
  //     },
  //   ],
  // },
];
