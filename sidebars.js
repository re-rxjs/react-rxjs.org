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
          "api/core/state",
          "api/core/useStateObservable",
          "api/core/shareLatest",
          "api/core/suspense",
          "api/core/subscribe",
          "api/core/removeSubscribe",
          "api/core/StateObservable",
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
          "api/utils/selfDependent",
          "api/utils/suspend",
          "api/utils/suspended",
          "api/utils/switchMapSuspended",
          "api/utils/toKeySet",
          {
            type: "category",
            label: "Deprecated",
            items: [
              "api/utils/split",
              "api/utils/collect",
              "api/utils/collectValues",
            ],
          },
        ],
      },
    ],
  },
}
