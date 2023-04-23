import { createContext, lazy, Suspense, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import {
  CssBaseline,
  ThemeProvider,
  LinearProgress,
  createTheme,
  useMediaQuery,
} from "@mui/material";

import baseTheme, { darkMode, mobile } from "configs/theme";
import routePaths from "configs/routePaths";
import Layout from "components/Layout";
const ProductsPage = lazy(() => import("pages/ProductsPage/ProductsPage"));

const routes = [
  {
    path: routePaths.productsListing,
    Component: <ProductsPage />,
  },
  {
    path: routePaths.compare,
    Component: <div>Compare products page</div>,
  },
  {
    path: routePaths.cart,
    Component: <div>Cart page</div>,
  },
];

export const ColorModeContext = createContext(null);

const App = () => {
  const [themeMode, setThemeMode] = useState("light");
  const isMobile = useMediaQuery("(max-width:600px)");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        ...baseTheme,
        palette: {
          mode: themeMode,
          ...(themeMode === "light" ? baseTheme.palette : darkMode.palette),
        },
        typography: {
          ...(isMobile ? mobile.typography : baseTheme.typography),
        },
      }),
    [themeMode, isMobile]
  );

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<LinearProgress />}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={<Layout>{route.Component}</Layout>}
                />
              ))}
              <Route
                path="/"
                exact
                element={<Navigate to={routePaths.productsListing} replace />}
              />
              <Route
                path="*"
                element={
                  <Layout>
                    <div>Non-existing page</div>
                  </Layout>
                }
              />
            </Routes>
          </Suspense>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
};

export default App;
