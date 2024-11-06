import { Routes } from "@angular/router";

export const routes: Routes = [
    {
        path: "login",
        loadComponent: () =>
            import("./login/login.page").then((m) => m.LoginPage),
    },
    {
        path: "register",
        loadComponent: () =>
            import("./register/register.page").then((m) => m.RegisterPage),
    },
    {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
    },
    {
        path: "home",
        loadComponent: () => import("./home/home.page").then((m) => m.HomePage),

        children: [
            {
                path: "viajes",
                loadComponent: () =>
                    import("./home/viajes/viajes.page").then(
                        (m) => m.ViajesPage
                    ),
            },
            {
                path: "map",
                loadComponent: () =>
                    import("./home/map/map.page").then((m) => m.MapPage),
            },
            {
                path: "perfil",
                loadComponent: () =>
                    import("./home/perfil/perfil.page").then(
                        (m) => m.PerfilPage
                    ),
            },
        ],
    },
];
