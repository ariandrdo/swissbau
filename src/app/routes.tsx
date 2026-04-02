import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home").then(m => ({ default: m.Home })));
const Services = lazy(() => import("./pages/Services").then(m => ({ default: m.Services })));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Contact = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const Products = lazy(() => import("./pages/Products").then(m => ({ default: m.Products })));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin").then(m => ({ default: m.AdminLogin })));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout").then(m => ({ default: m.AdminLayout })));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard").then(m => ({ default: m.AdminDashboard })));
const AdminMessages = lazy(() => import("./pages/admin/AdminMessages").then(m => ({ default: m.AdminMessages })));
const AdminProducts = lazy(() => import("./pages/admin/AdminProducts").then(m => ({ default: m.AdminProducts })));
const AdminServices = lazy(() => import("./pages/admin/AdminServices").then(m => ({ default: m.AdminServices })));
const AdminHome = lazy(() => import("./pages/admin/AdminHome").then(m => ({ default: m.AdminHome })));
const AdminAbout = lazy(() => import("./pages/admin/AdminAbout").then(m => ({ default: m.AdminAbout })));
const AdminContact = lazy(() => import("./pages/admin/AdminContact").then(m => ({ default: m.AdminContact })));
const AdminHeader = lazy(() => import("./pages/admin/AdminHeader").then(m => ({ default: m.AdminHeader })));
const AdminFooter = lazy(() => import("./pages/admin/AdminFooter").then(m => ({ default: m.AdminFooter })));

const fallback = <div />;

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, element: <Suspense fallback={fallback}><Home /></Suspense> },
      { path: "services", element: <Suspense fallback={fallback}><Services /></Suspense> },
      { path: "projects", element: <Suspense fallback={fallback}><Products /></Suspense> },
      { path: "about", element: <Suspense fallback={fallback}><About /></Suspense> },
      { path: "contact", element: <Suspense fallback={fallback}><Contact /></Suspense> },
    ],
  },
  {
    path: "/admin/login",
    element: <Suspense fallback={fallback}><AdminLogin /></Suspense>,
  },
  {
    path: "/admin",
    Component: ProtectedRoute,
    children: [
      {
        element: <Suspense fallback={fallback}><AdminLayout /></Suspense>,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: "dashboard", element: <Suspense fallback={fallback}><AdminDashboard /></Suspense> },
          { path: "messages", element: <Suspense fallback={fallback}><AdminMessages /></Suspense> },
          { path: "products", element: <Suspense fallback={fallback}><AdminProducts /></Suspense> },
          { path: "header-editor", element: <Suspense fallback={fallback}><AdminHeader /></Suspense> },
          { path: "footer-editor", element: <Suspense fallback={fallback}><AdminFooter /></Suspense> },
          { path: "services-editor", element: <Suspense fallback={fallback}><AdminServices /></Suspense> },
          { path: "home-editor", element: <Suspense fallback={fallback}><AdminHome /></Suspense> },
          { path: "about-editor", element: <Suspense fallback={fallback}><AdminAbout /></Suspense> },
          { path: "contact-editor", element: <Suspense fallback={fallback}><AdminContact /></Suspense> },
        ],
      },
    ],
  },
]);
