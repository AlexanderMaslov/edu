const getHomePageFeatureFlat = <T>(
  config: {
    rawConfig: {
      featureFlags: {
        homePage: T;
      };
    };
  },
  override: (flag: T) => T
) => {
  return override(config.rawConfig.featureFlags.homePage);
};
