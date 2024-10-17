import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthGuard } from 'src/auth/guard';
import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import ProductsCreateView from 'src/sections/products/view/products-create-view';
import ProductsEditView from 'src/sections/products/view/products-edit-view';
import ProductsListView from 'src/sections/products/view/products-list-view';

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

import CompanyEditView from '../../sections/company/view/company-edit-view';
import MainVendoreListView from '../../sections/mainvendor/view/mainVendore-list-view';
import MainVendoreCreateView from '../../sections/mainvendor/view/mainVendore-create-view';
import MainVendorEditView from '../../sections/mainvendor/view/mainvendor-edit-view';
import DesignEditView from 'src/sections/design/view/design-edit-view';
import DeviceEditView from 'src/sections/device/view/device-edit-view';
// import BranchEditView from '../../sections/branch/view/branch-edit-view';
import BranchEditView from '../../sections/branch/view/branch-edit-view';
import TaxEditView from '../../sections/tax/view/tax-edit-view';
import DepartmentEditView from '../../sections/department/view/department-edit-view';
import OccasionEditView from 'src/sections/occasion/view/occasion-edit-view';

import StoneEditView from '../../sections/stone/view/stone-edit-view';
import BoxEditView from '../../sections/box/view/box-edit-view';


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
      { path: 'vendore', element: <MainVendoreListPage /> },
      { path: 'vendorecreate', element: <MainVendoreCreatePage /> },
      { path: 'vendore/:id/vendoreedit', element: <MainVendoreEditPage /> },

      // User Master
      {
        path: 'userMaster',
        children: [
          { element: <UserProfilePage />, index: true },

          { path: 'company', element: <CompanyListPage /> },
          { path: 'companycreate', element: <CompanyNewPage /> },
          { path: 'company/:id/companyedit', element: <CompanyEditPage /> },

          { path: 'branch', element: <BranchListPage /> },
          { path: 'branchcreate', element: <BranchCreatePage /> },
          { path: 'branch/:id/branchedit', element: <BranchEditPage /> },

          { path: 'counter', element: <CounterListPage /> },
          { path: 'countercreate', element: <CounterCreatePage /> },
          { path: 'counter/:id/counteredit', element: <CounterEditPage /> },

          { path: 'department', element: <DepartmentListPage /> },
          { path: 'departmentcreate', element: <DepartmentCreatePage /> },
          { path: 'department/:id/departmetedit', element: <DepartmentEditPage /> },

          { path: 'role', element: <RoleListPage /> },
          { path: 'rolecreate', element: <RoleCreatePage /> },

          { path: 'employee', element: <EmployeeListPage /> },
          { path: 'employeecreate', element: <EmployeeCreatePage /> },
          { path: 'employee/:id/employeeedit', element: <EmployeeEditPage /> },

          { path: 'bank', element: <BankListPage /> },
          { path: 'bankcreate', element: <BankCreatePage /> },

          { path: 'device', element: <DeviceListPage /> },
          { path: 'devicecreate', element: <DeviceCreatePage /> },
          { path: 'device/:id/deviceedit', element: <DeviceEditPage /> },

          { path: 'tax', element: <TaxListPage /> },
          { path: 'taxcreate', element: <TaxCreatePage /> },
          { path: 'tax/:id/taxedit', element: <TaxEditPage /> },

          { path: 'conversion', element: <ConversionListPage /> },
          { path: 'conversioncreate', element: <ConversionCreatePage /> },
        ],
      },

      //Product Master
      {
        path: 'productMaster',
        children: [
          { element: <UserProfilePage />, index: true },

          { path: 'category', element: <CategoryListPage /> },
          { path: 'categorycreate', element: <CategoryCreatePage /> },
          { path: 'category/:id/categoryedit', element: <CategoryEditPage /> },

          // { path: 'product', element: <ProductListView /> },
          // { path: 'productcreate', element: <ProductCreateView /> },
          // { path: 'category/:id/productedit', element: <ProductEditView /> },

          { path: 'products', element: <ProductsListView /> },
          { path: 'productscreate', element: <ProductsCreateView /> },
          { path: 'products/:id/productsedit', element: <ProductsEditView /> },

          { path: 'design', element: <DesignListPage /> },
          { path: 'designcreate', element: <DesignCreatePage /> },
          { path: 'design/:id/designedit', element: <DesignEditPage /> },

          { path: 'purity', element: <PurityListPage /> },
          { path: 'puritycreate', element: <PurityCreatePage /> },
          { path: 'purity/:id/purityedit', element: <PurityEditPage /> },

          { path: 'packet', element: <PacketListPage /> },
          { path: 'packetcreate', element: <PacketCreatePage /> },
          { path: 'packet/:id/packetedit', element: <PacketEditPage /> },

          { path: 'box', element: <BoxListPage /> },
          { path: 'boxcreate', element: <BoxCreatePage /> },
          { path: 'box/:id/boxedit', element: <BoxEditPage /> },

          { path: 'stone', element: <StoneListPage /> },
          { path: 'stonecreate', element: <StoneCreatePage /> },
          { path: 'stone/:id/stoneedit', element: <StoneEditPage /> },

          { path: 'diamond', element: <DiamondListPage /> },
          { path: 'diamondcreate', element: <DiamondCreatePage /> },

          { path: 'sku', element: <SkuListPage /> },
          { path: 'skucreate', element: <SkuCreatePage /> },

          { path: 'rate', element: <RateListPage /> },
          { path: 'ratecreate', element: <RateCreatePage /> },

          { path: 'collection', element: <CollectionListView /> },
          { path: 'collectioncreate', element: <CollectionCreateView /> },

          { path: 'occasion', element: <OccasionListView /> },
          { path: 'occasioncreate', element: <OccasionCreateView /> },
          { path: 'occasion/:id/occasionedit', element: <OccasionEditView /> },
        ],
      },

      // trading
      {
        path: 'trading',
        children: [
          { element: <IndexPage />, index: true },
          { path: 'purchaseentry', element: <TradingPurchaseEntryView /> },
          { path: 'createpacket', element: <TradingCreatePacketView  /> },
          { path: 'makepayments', element: <TradingMakePaymentsView  /> },
          { path: 'receivepayments', element: <TradingReceivePaymentsView  /> },
          { path: 'creditnote', element: <TradingCreditNoteView  /> },
          { path: 'creditnotecreate', element: <TradingCreditNoteCreateView  /> },
          { path: 'debitnote', element: <TradingDebitNoteView  /> },
          { path: 'debitnotecreate', element: <TradingDebitNoteCreateView  /> },
          { path: 'stocktransfer', element: <TradingStockTransferView  /> },
          { path: 'stocktransferlist', element: <TradingStockTransferListView  /> },
          { path: 'stocktransferlistinstock', element: <TradingStockTransferListInStockView  /> },
          { path: 'stocktransferlistoutstock', element: <TradingStockTransferListOutStockView  /> },
        ]
      },

      // report
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
