import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/auth", "routes/auth.tsx", [
    index("routes/auth.signin.tsx"),
    route("signup", "routes/auth.signup.tsx"),
  ]),
  route("/upload", "routes/upload.tsx"),
  route("/feedback/:id", "routes/feedback.tsx"),
] satisfies RouteConfig;
