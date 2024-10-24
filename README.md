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

## Test Results

| File                              | % Stmts | % Branch | % Funcs | % Lines |
| --------------------------------- | ------- | -------- | ------- | ------- |
| All files                         | 100     | 100      | 100     | 100     |
| src                               | 100     | 100      | 100     | 100     |
| App.vue                           | 100     | 100      | 100     | 100     |
| src/components/AppHeader          | 100     | 100      | 100     | 100     |
| AppHeader.vue                     | 100     | 100      | 100     | 100     |
| src/components/ResourceCostFilter | 100     | 100      | 100     | 100     |
| ResourceCostFilter.vue            | 100     | 100      | 100     | 100     |
| src/components/UnitAgeFilter      | 100     | 100      | 100     | 100     |
| UnitAgeFilter.vue                 | 100     | 100      | 100     | 100     |
| src/components/UnitList           | 100     | 100      | 100     | 100     |
| UnitList.constants.ts             | 100     | 100      | 100     | 100     |
| UnitList.vue                      | 100     | 100      | 100     | 100     |
| src/pages/Home                    | 100     | 100      | 100     | 100     |
| HomeView.vue                      | 100     | 100      | 100     | 100     |
| src/pages/NotFound                | 100     | 100      | 100     | 100     |
| NotFoundView.vue                  | 100     | 100      | 100     | 100     |
| src/pages/UnitDetail              | 100     | 100      | 100     | 100     |
| UnitDetailView.vue                | 100     | 100      | 100     | 100     |
| src/pages/Units                   | 100     | 100      | 100     | 100     |
| UnitsView.vue                     | 100     | 100      | 100     | 100     |
| src/router                        | 100     | 100      | 100     | 100     |
| index.ts                          | 100     | 100      | 100     | 100     |
| src/stores                        | 100     | 100      | 100     | 100     |
| units.ts                          | 100     | 100      | 100     | 100     |
| src/utils                         | 100     | 100      | 100     | 100     |
| mount.ts                          | 100     | 100      | 100     | 100     |

The table above shows the latest test results for our project. These results reflect the reliability and quality of our application.

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

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Additional Notes

- The project uses a custom color palette to match the Age of Empires theme.
- Vuetify components have been customized with custom styles.
- Unit data is loaded from a JSON file.
- The application supports both light and dark themes.
