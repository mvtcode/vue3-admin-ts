import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import store from "@/store";
import { GetToken, DelToken, VerifyToken } from "@/services/auth";
import { VerifyTokenRes } from "@/dto/authRes";
import { GetPermission } from "@/services/permissions";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomeView.vue"),
    meta: {
      requestAuth: true,
      permissions: ["viewUserInfo"],
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/LoginView.vue"),
    meta: {
      requestAuth: false,
      permissions: [],
    },
  },
  {
    path: "/forgot",
    name: "Fotgot",
    component: () => import("@/views/ForgotView.vue"),
    meta: {
      requestAuth: false,
      permissions: [],
    },
  },
  {
    path: "/403",
    name: "Forbidden",
    component: () => import("@/views/ForbiddenView.vue"),
    meta: {
      requestAuth: false,
      permissions: [],
    },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
    meta: {
      requestAuth: true,
      permissions: [],
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/NotFoundView.vue"),
    meta: {
      requestAuth: false,
      permissions: [],
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const setTitle = (title: string) => {
  document.title = title;
};

const checkPermission = async (reqPermissions: string[]): Promise<boolean> => {
  if (!reqPermissions || reqPermissions.length === 0) return true;
  const permissions: string[] = await GetPermission();
  if (reqPermissions.length > permissions.length) return false;
  return reqPermissions.every((permission) => permissions.includes(permission));
};

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requestAuth) {
    setTitle(to.name as string);
    return next();
  }

  const token = GetToken();
  if (!token) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }

  const me = store.getters["user/getInfo"];
  if (me) {
    if (await checkPermission((to.meta.permissions as string[]) || [])) {
      setTitle(to.name as string);
      return next();
    } else {
      return next({
        path: "/403",
      });
    }
  }

  try {
    const res: VerifyTokenRes = await VerifyToken(token);
    store.dispatch("user/setInfo", res.data.decode);
    if (await checkPermission((to.meta.permissions as string[]) || [])) {
      setTitle(to.name as string);
      return next();
    } else {
      return next({
        path: "/403",
      });
    }
  } catch (e: any) {
    DelToken();
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
});

// watch for logout
store.watch(
  (state) => {
    return state.user.info;
  },
  (value, oldValue) => {
    if (oldValue && !value && router.currentRoute.value.meta.requestAuth) {
      router.push({
        path: "/login",
      });
    }
  },
  {
    deep: true,
  }
);

export default router;
