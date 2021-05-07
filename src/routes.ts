import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InputIcon from '@material-ui/icons/Input';

const routes = [
  {
    name: "Profile",
    path: "/profile",
    icon: AccountCircleIcon
  },
  {
    name: "Register",
    path: "/auth",
    icon: InputIcon
  },
  {
    name: "Login",
    path: "/auth",
    icon: InputIcon
  },
];

export default routes;
