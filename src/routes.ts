const routes = [
  {
    name: "Profile",
    path: "/profile",
    isProtected: true
  },
  {
    name: "Login",
    path: "/auth",
    isProtected: false
  },
  {
    name: "Register",
    path: "/auth",
    isProtected: false
  },
];

export default routes;
