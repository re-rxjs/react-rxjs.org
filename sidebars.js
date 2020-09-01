module.exports = {
  someSidebar: {
    Introduction: [
      "introduction/getting-started",
      "introduction/motivation",
      "introduction/core-concepts",
    ],
    Tutorial: [
      "tutorial/intro",
      "tutorial/basic"
    ],
    "API Reference": [
      {
        "type": "category",
        "label": "Core",
        "items": [

          "api/core/bind",
          "api/core/share-latest",
          "api/core/suspense",
          "api/core/use-subscribe",
          "api/core/subscribe",
        ]
      },
      {
        "type": "category",
        "label": "Utils",
        "items": [
          "api/utils/collect",
          "api/utils/collect-values",
          "api/utils/merge-with-key",
          "api/utils/self-dependant",
          "api/utils/split",
          "api/utils/suspend",
          "api/utils/suspended",
          "api/utils/switch-map-suspended",
        ]
      }
    ],
  },
};
