import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("p/:hash", "routes/p.$hash.tsx"),
] satisfies RouteConfig;
