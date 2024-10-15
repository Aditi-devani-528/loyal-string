import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';
import { CompanyCreatePage, CompanyListView } from 'src/sections/company/view';
import { BranchCreatePage, BranchListView } from 'src/sections/branch/view';
import CounterListView from 'src/sections/counter/view/counter-list-view';
import CounterCreatePage from 'src/sections/counter/view/counter-create-page';
import CounterEditView from 'src/sections/counter/view/counter-edit-view';
import { DepartmentcreatePage, DepartmentListView } from 'src/sections/department/view';
import RoleListView from 'src/sections/role/view/role-list-view';
import RoleCreatePage from 'src/sections/role/view/role-create-page';
import EmployeeListView from 'src/sections/employee/view/employee-list-view';
import EmployeeCreatePage from 'src/sections/employee/view/employee-create-page';
import BankListView from 'src/sections/bank/view/bank-list-view';
import BankCreatePage from 'src/sections/bank/view/bank-create-page';
import DeviceListView from 'src/sections/device/view/device-list-view';
import DeviceCreatePage from 'src/sections/device/view/device-create-page';
import TaxListView from 'src/sections/tax/view/tax-list-view';
import TaxCreatePage from 'src/sections/tax/view/tax-create-page';
import ConversionListView from 'src/sections/conversion/view/conversion-list-view';
import ConversionCreatePage from 'src/sections/conversion/view/conversion-create-page';
import CategoryListView from 'src/sections/category/view/category-list-view';
import CategoryCreateView from 'src/sections/category/view/category-create-view';
import ProductEditView from 'src/sections/product/view/product-edit-view';

import ProductsCreateView from 'src/sections/products/view/products-create-view';
import ProductsEditView from 'src/sections/products/view/products-edit-view';
import ProductsListView from 'src/sections/products/view/products-list-view';

import DesignListView from 'src/sections/design/view/design-list-view';
import DesignCreateView from 'src/sections/design/view/design-create-view';
import PurityListView from 'src/sections/purity/view/purity-list-view';
import PurityCreateView from 'src/sections/purity/view/purity-create-view';
import PacketListView from 'src/sections/packet/view/packet-list-view';
import PacketCreateView from 'src/sections/packet/view/packet-create-view';
import PacketEditView from 'src/sections/packet/view/packet-edit-view';
import BoxCreateView from 'src/sections/box/view/box-create-view';
import BoxListView from 'src/sections/box/view/box-list-view';
import StoneListView from 'src/sections/stone/view/stone-list-view';
import StoneCreateView from 'src/sections/stone/view/stone-create-view';
import DiamondListView from 'src/sections/diamond/view/diamond-list-view';
import DiamondCreateView from 'src/sections/diamond/view/diamond-create-view';
import SkuListView from 'src/sections/sku/view/sku-list-view';
import SkuCreateView from 'src/sections/sku/view/sku-create-view';
import RateListView from 'src/sections/rates/view/rate-list-view';
import RateCreateView from 'src/sections/rates/view/rate-create-view';
import CollectionListView from 'src/sections/collection/view/collection-list-view';
import CollectionCreateView from 'src/sections/collection/view/collection-create-view';
import OccasionListView from 'src/sections/occasion/view/occasion-list-view';
import OccasionCreateView from 'src/sections/occasion/view/occasion-create-view';
import StockProfileView from 'src/sections/stock/view/stock-profile-view';
import SaleView from 'src/sections/sale/view/sale-view';
import { OrderListView } from 'src/sections/order/view';
import OrderView from 'src/sections/order-list/view/order-view';
import PurchaseView from 'src/sections/purchase/view/purchase-view';
import LadgerView from 'src/sections/ladger/view/ladger-view';
import SupplierView from 'src/sections/supplier/view/supplier-view';
import MetalView from 'src/sections/metal/view/metal-view';
import VendorView from 'src/sections/vendor/view/vendor-view';
import VendorCreate from 'src/sections/vendor/view/vendor-create';
import CustomerView from 'src/sections/customer/view/customer-view';
import Customercreate from 'src/sections/customer/view/customer-create';
import DiamondView from 'src/sections/diamondAttributes/view/diamond-view';
import Diamondcreate from 'src/sections/diamondAttributes/view/diamond-create';
import PairView from 'src/sections/pairCustomer/view/pair-view';
import Paircreate from 'src/sections/pairCustomer/view/pair-create';
import SlabView from 'src/sections/slab/view/slab-view';
import Slabcreate from 'src/sections/slab/view/slab-create';
import RateView from 'src/sections/rate/view/rate-view';
import Ratecreate from 'src/sections/rate/view/rate-create';
import PeriodView from 'src/sections/period/view/period-view';
import Periodcreate from 'src/sections/period/view/period-create';
import categoryEditView from '../../sections/category/view/category-edit-view';
import CategoryEditView from '../../sections/category/view/category-edit-view';
import PurityEditView from '../../sections/purity/view/purity-edit-view';
import { ProductCreateView, ProductListView } from 'src/sections/product/view';
import EmployeeEditView from 'src/sections/employee/view/employee-edit-view';

import CompanyEditView from '../../sections/company/view/company-edit-view';
import MainVendoreListView from '../../sections/mainvendor/view/mainVendore-list-view';
import MainVendoreCreateView from '../../sections/mainvendor/view/mainVendore-create-view';
import MainVendorEditView from '../../sections/mainvendor/view/mainvendor-edit-view';
import DesignEditView from 'src/sections/design/view/design-edit-view';
// import BranchEditView from '../../sections/branch/view/branch-edit-view';
import BranchEditView from '../../sections/branch/view/branch-edit-view';
import TaxEditView from '../../sections/tax/view/tax-edit-view';


// ----------------------------------------------------------------------

// OVERVIEW
const IndexPage = lazy(() => import('src/pages/dashboard/app'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
// PRODUCT
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));
// PRODUCTS
const ProductsListPage = lazy(() => import('src/pages/dashboard/products/list'));
const ProductsCreatePage = lazy(() => import('src/pages/dashboard/products/new'));
const ProductsEditPage = lazy(() => import('src/pages/dashboard/products/edit'));
// ORDER
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// INVOICE
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// USER
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
// BLOG
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
// JOB
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));
const JobListPage = lazy(() => import('src/pages/dashboard/job/list'));
const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'));
const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'));
// TOUR
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// FILE MANAGER
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
// APP
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
// TEST RENDER PAGE BY ROLE
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// BLANK PAGE
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { path: 'vendore', element: <MainVendoreListView /> },
      { path: 'vendorecreate', element: <MainVendoreCreateView /> },
      { path: 'vendore/:id/vendoreedit', element: <MainVendorEditView /> },
      {
        path: 'userMaster',
        children: [
          { element: <UserProfilePage />, index: true },
          
          { path: 'company', element: <CompanyListView /> },
          { path: 'companycreate', element: <CompanyCreatePage /> },
          
          { path: 'branch', element: <BranchListView /> },
          { path: 'branchcreate', element: <BranchCreatePage /> },
          
          { path: 'counter', element: <CounterListView /> },
          { path: 'countercreate', element: <CounterCreatePage /> },
          { path: 'counter/:id/counteredit', element: <CounterEditView /> },
          
          { path: 'department', element: <DepartmentListView /> },
          { path: 'departmentcreate', element: <DepartmentcreatePage /> },
          
          { path: 'role', element: <RoleListView /> },
          { path: 'rolecreate', element: <RoleCreatePage /> },
          
          { path: 'employee', element: <EmployeeListView /> },
          { path: 'employeecreate', element: <EmployeeCreatePage /> },
          { path: 'employee/:id/employeeedit', element: <EmployeeEditView /> },
          
          { path: 'bank', element: <BankListView /> },
          { path: 'bankcreate', element: <BankCreatePage /> },
          
          { path: 'device', element: <DeviceListView /> },
          { path: 'devicecreate', element: <DeviceCreatePage /> },
          
          { path: 'tax', element: <TaxListView /> },
          { path: 'taxcreate', element: <TaxCreatePage /> },
          
          { path: 'conversion', element: <ConversionListView /> },
          { path: 'conversioncreate', element: <ConversionCreatePage /> },
        ],
      },
      {
        path: 'productMaster',
        children: [
          { element: <UserProfilePage />, index: true },

          { path: 'category', element: <CategoryListView /> },
          { path: 'categorycreate', element: <CategoryCreateView /> },
          { path: 'category/:id/categoryedit', element: <CategoryEditView /> },

          // { path: 'product', element: <ProductListView /> },
          // { path: 'productcreate', element: <ProductCreateView /> },
          // { path: 'category/:id/productedit', element: <ProductEditView /> },

          { path: 'products', element: <ProductsListView /> },
          { path: 'productscreate', element: <ProductsCreateView /> },
          { path: 'products/:id/productsedit', element: <ProductsEditView /> },

          { path: 'design', element: <DesignListView /> },
          { path: 'designcreate', element: <DesignCreateView /> },
          { path: 'design/:id/designedit', element: <DesignEditView /> },

          { path: 'purity', element: <PurityListView /> },
          { path: 'puritycreate', element: <PurityCreateView /> },
          { path: 'purity/:id/purityedit', element: <PurityEditView /> },

          { path: 'packet', element: <PacketListView /> },
          { path: 'packetcreate', element: <PacketCreateView /> },
          { path: 'packet/:id/packetedit', element: <PacketEditView /> },

          { path: 'box', element: <BoxListView /> },
          { path: 'boxcreate', element: <BoxCreateView /> },

          { path: 'stone', element: <StoneListView /> },
          { path: 'stonecreate', element: <StoneCreateView /> },

          { path: 'diamond', element: <DiamondListView /> },
          { path: 'diamondcreate', element: <DiamondCreateView /> },

          { path: 'sku', element: <SkuListView /> },
          { path: 'skucreate', element: <SkuCreateView /> },

          { path: 'rate', element: <RateListView /> },
          { path: 'ratecreate', element: <RateCreateView /> },

          { path: 'collection', element: <CollectionListView /> },
          { path: 'collectioncreate', element: <CollectionCreateView /> },

          { path: 'occasion', element: <OccasionListView /> },
          { path: 'occasioncreate', element: <OccasionCreateView /> },
        ],
      },
      {
        path: 'report',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'stock', element: <StockProfileView /> },
          { path: 'sale', element: <SaleView /> },
          { path: 'orderlist', element: <OrderView /> },
          { path: 'purchase', element: <PurchaseView /> },
          { path: 'ladger', element: <LadgerView /> },
          { path: 'supplier', element: <SupplierView /> },
          { path: 'metal', element: <MetalView /> },
        ],
      },
      {
        path: 'setting',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'vendor', element: <VendorView /> },
          { path: 'vendorcreate', element: <VendorCreate /> },
          { path: 'customer', element: <CustomerView /> },
          { path: 'customercreate', element: <Customercreate /> },
          { path: 'diamond', element: <DiamondView /> },
          { path: 'diamondcreate', element: <Diamondcreate /> },
          { path: 'pair', element: <PairView /> },
          { path: 'paircreate', element: <Paircreate /> },
          { path: 'slab', element: <SlabView /> },
          { path: 'slabcreate', element: <Slabcreate /> },
          { path: 'rate', element: <RateView /> },
          { path: 'ratecreate', element: <Ratecreate /> },
          { path: 'period', element: <PeriodView /> },
          { path: 'periodcreate', element: <Periodcreate /> },
        ],
      },
      { element: <IndexPage />, index: true },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },
      {
        path: 'user',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <UserListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },
      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'products',
        children: [
          { element: <ProductsListPage />, index: true },
          { path: 'list', element: <ProductsListPage /> },
          { path: 'new', element: <ProductsCreatePage /> },
          { path: ':id/edit', element: <ProductsEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      {
        path: 'job',
        children: [
          { element: <JobListPage />, index: true },
          { path: 'list', element: <JobListPage /> },
          { path: ':id', element: <JobDetailsPage /> },
          { path: 'new', element: <JobCreatePage /> },
          { path: ':id/edit', element: <JobEditPage /> },
        ],
      },
      {
        path: 'tour',
        children: [
          { element: <TourListPage />, index: true },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      { path: 'file-manager', element: <FileManagerPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];
