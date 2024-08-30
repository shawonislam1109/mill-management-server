const authRoutes = require("../src/auth/routes");
const borderRoutes = require("../src/border/routes");
const buaRoutes = require("../src/bua/router");
const dashboardRoutes = require("../src/dashboard/routes");
const borderMillHistoryRoutes = require("../src/millCount/routes");

const routes = [
  {
    path: "/auth",
    handler: authRoutes,
  },
  {
    path: "/borderList",
    handler: borderRoutes,
  },
  {
    path: "/border-history",
    handler: borderMillHistoryRoutes,
  },
  {
    path: "/dashboard",
    handler: dashboardRoutes,
  },
  {
    path: "/bua",
    handler: buaRoutes,
  },
  {
    path: "/",
    handler: (req, res) => {
      res.send({
        message: "Server is running",
      });
    },
  },
];

module.exports = (app) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(`/api/v1${route?.path}`, route.handler);
    }
  });
};
