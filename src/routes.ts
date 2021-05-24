const routes = [
  {
    name: "Profile",
    path: "/profile",
    isProtected: true
  },
  {
    name: "Register",
    path: "/auth",
    isProtected: false
  },
  {
    name: "Login",
    path: "/auth",
    isProtected: false
  },
];

export default routes;
