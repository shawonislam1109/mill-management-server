const authRoutes = require("../src/auth/routes");
const borderRoutes = require("../src/border/routes");
const dashboardRoutes = require("../src/dashboard/routes");

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
    path: "/dashboard",
    handler: dashboardRoutes,
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
