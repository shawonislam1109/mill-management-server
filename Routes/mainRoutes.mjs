import authRoutes from "../src/auth/routes.mjs";
import borderRoutes from "../src/border/routes.mjs";
import buaRoutes from "../src/bua/router.mjs";
import dashboardRoutes from "../src/dashboard/routes.mjs";
import borderMillHistoryRoutes from "../src/millCount/routes.mjs";

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

export default (app) => {
  routes.forEach((route) => {
    if (route.path === "/") {
      app.get(route.path, route.handler);
    } else {
      app.use(`/api/v1${route?.path}`, route.handler);
    }
  });
};
