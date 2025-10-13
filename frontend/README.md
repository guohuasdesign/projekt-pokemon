#Pokemon frontend

```
## Tech stack
**Frontend:** React, TypeScript, Tailwind CSS, DaisyUI, ChartJs, Vite, Zod

## 📦 Installation
npm i react-hook-form zod @hookform/resolvers
npm i chart.js react-chartjs-2
npm i framer-motion


##
App.tsx
└── MainLayout.tsx (user dont need login)
    ├── Nav.tsx
    └── <Outlet />
        └── HomePage.tsx (content)
            └── PokemonLists.tsx (display the Pokemon Lists)
                └── PokemonDetailsPage.tsx (display each Pokemon Details)
        └──MyBattle.tsx (user could not save the battle result)
└──AuthLayout.tsx (after user has signed in)
    ├── Nav.tsx
        └── <Outlet />
            └── HomePage.tsx (content)
                └── PokemonLists.tsx (display the Pokemon Lists)
                    └── PokemonDetailsPage.tsx (display each Pokemon Details)
            └── MyBattle.tsx (user could save the battle result)
            └── MyRosterPage.tsx (show the user saved Pokemons)
            └── MyRosterPage.tsx (show the user saved Pokemons)
            └── Leaderboard.tsx (user could see the ranking)
```
