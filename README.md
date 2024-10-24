# Age of Empires Units

This project is a web application that lists and displays details of units from the Age of Empires units.

## Technologies Used

- Vue 3
- TypeScript
- Vite
- Pinia (for state management)
- Vue Router
- Vuetify (for UI components)
- SCSS (for styling)
- Vitest (for unit testing)
- ESLint (for code quality)
- Prettier (for code formatting)

## Project Structure

- `src/`: Source files
  - `assets/`: Images and style files
  - `components/`: Vue components
  - `pages/`: Page components
  - `router/`: Vue Router configuration
  - `stores/`: Pinia stores
  - `types/`: TypeScript type definitions
  - `utils/`: Helper functions
- `tests/`: Test files

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```

## Test Results

| File                              | % Stmts                                | % Branch                               | % Funcs                                | % Lines                                |
| --------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- | -------------------------------------- |
| All files                         | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src                               | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| App.vue                           | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src/components/AppHeader          | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| AppHeader.vue                     | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src/components/ResourceCostFilter | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| ResourceCostFilter.vue            | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src/components/UnitAgeFilter      | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| UnitAgeFilter.vue                 | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src/components/UnitList           | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| UnitList.constants.ts             | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| UnitList.vue                      | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src/pages/Home                    | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| HomeView.vue                      | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src/pages/NotFound                | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| NotFoundView.vue                  | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src/pages/UnitDetail              | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| UnitDetailView.vue                | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src/pages/Units                   | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| UnitsView.vue                     | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src/router                        | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| index.ts                          | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src/stores                        | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| units.ts                          | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| src/utils                         | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |
| mount.ts                          | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> | <span style="color: green;">100</span> |

The table above shows the latest test results for our project. These results reflect the reliability and quality of our application.

## Additional Notes

- The project uses a custom color palette to match the Age of Empires theme.
- Vuetify components have been customized with custom styles.
- Unit data is loaded from a JSON file.
- The application supports both light and dark themes.
