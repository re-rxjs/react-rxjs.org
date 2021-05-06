module.exports = {
  someSidebar: {
    Introduction: ["motivation", "quick-start", "features"],
    "API Reference": [
      {
        type: "category",
        label: "Core",
        items: [
          "api/core/bind",
          "api/core/shareLatest",
          "api/core/suspense",
          "api/core/subscribe",
        ],
      },
      {
        type: "category",
        label: "Utils",
        items: [
          "api/utils/combineKeys",
          "api/utils/contextBinder",
          "api/utils/createSignal",
          "api/utils/createKeyedSignal",
          "api/utils/mergeWithKey",
          "api/utils/partitionByKey",
          "api/utils/selfDependant",
          "api/utils/suspend",
          "api/utils/suspended",
          "api/utils/switchMapSuspended",
          {
            type: "category",
            label: "Deprecated",
            items: [
              "api/utils/split",
              "api/utils/collect",
              "api/utils/collectValues",
            ]
          }
        ],
      },
    ],
  },
}
