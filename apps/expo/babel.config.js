module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      '@crossed/babel-plugin',
      'expo-router/babel',
    ],
  };
};
