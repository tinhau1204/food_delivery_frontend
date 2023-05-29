// module.exports = {
// presets: [
//   [
//     "@babel/preset-react",
//     {
//       runtime: "automatic",
//     },
//   ],
// ],
// };
module.exports = function (api) {
  api.cache(true);
  api.assertVersion("^7.4.5");

  const presets = [
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
  ];
  const plugins = [
    [
      "babel-plugin-import",
      {
        libraryName: "@mui/material",
        libraryDirectory: "",
        camel2DashComponentName: false,
      },
      "core",
    ],
    [
      "babel-plugin-import",
      {
        libraryName: "@mui/icons-material",
        libraryDirectory: "",
        camel2DashComponentName: false,
      },
      "icons",
    ],
  ];

  return {
    presets,
    plugins,
  };
};
