module.exports = {
  someSidebar: {
    Introduction: ["motivation", "core-concepts", "getting-started"],
    Tutorial: ["tutorial/github-issues", "tutorial/todos"],
    "API Reference": [
      {
        type: "category",
        label: "Core",
        items: [
          "api/core/bind",
          "api/core/shareLatest",
          "api/core/suspense",
          "api/core/useSubscribe",
          "api/core/subscribe",
        ],
      },
      {
        type: "category",
        label: "Utils",
        items: [
          "api/utils/collect",
          "api/utils/collectValues",
          "api/utils/mergeWithKey",
          "api/utils/selfDependant",
          "api/utils/split",
          "api/utils/suspend",
          "api/utils/suspended",
          "api/utils/switchMapSuspended",
        ],
      },
    ],
  },
}
