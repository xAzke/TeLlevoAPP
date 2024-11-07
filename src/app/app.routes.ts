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
        path: "pasajero",
        loadComponent: () =>
            import("./pasajero/home.page").then((m) => m.HomePage),

        children: [
            {
                path: "inicio",
                loadComponent: () =>
                    import("./pasajero/inicio/inicio.page").then(
                        (m) => m.InicioPage
                    ),
            },
            {
                path: "viajes",
                loadComponent: () =>
                    import("./pasajero/viajes/viajes.page").then(
                        (m) => m.ViajesPage
                    ),
            },
            {
                path: "mapa",
                loadComponent: () =>
                    import("./map/map.page").then((m) => m.MapPage),
            },
            {
                path: "perfil",
                loadComponent: () =>
                    import("./pasajero/perfil/perfil.page").then(
                        (m) => m.PerfilPage
                    ),
            },
        ],
    },
    {
        path: "conductor",
        loadComponent: () =>
            import("./conductor/conductor.page").then((m) => m.ConductorPage),

        children: [
            {
                path: "inicio",
                loadComponent: () =>
                    import("./conductor/inicio/inicio.page").then(
                        (m) => m.InicioPage
                    ),
            },
            {
                path: "crear",
                loadComponent: () =>
                    import("./conductor/crear-viaje/crear-viaje.page").then(
                        (m) => m.CrearViajePage
                    ),
            },
            {
                path: "mapa",
                loadComponent: () =>
                    import("./conductor/mapa/map.page").then((m) => m.MapaPage),
            },
        ],
    },
];
