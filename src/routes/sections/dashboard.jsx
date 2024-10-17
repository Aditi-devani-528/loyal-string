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


// import TradingPurchaseEntryView from '../../sections/purchase entry/view/trading-purchase-entry-view';
// import TradingCreatePacketView from '../../sections/createpacket/view/tranding-create-packet-view';
// import TradingMakePaymentsView from '../../sections/makepayments/view/trading-make-payment-view';
// import TradingReceivePaymentsView from '../../sections/receivepayments/view/trading-receive-payments-view';
// import TradingCreditNoteView from '../../sections/creditnote/view/trading-credit-note-view';
// import TradingCreditNoteCreateView from '../../sections/creditnote/view/trading-credit-note-create-view';
// import TradingDebitNoteView from '../../sections/debitnote/view/trading-debit-note-view';
// import TradingDebitNoteCreateView from '../../sections/debitnote/trading-debit-note-create-view';
// import TradingStockTransferView from '../../sections/stocktransfer/view/trading-stock-transfer-view';
// import TradingStockTransferListView from '../../sections/stocktransferlist/view/trading-stock-transfer-list-view';
// import TradingStockTransferListInStockView
//   from '../../sections/stocktransferlist/view/trading-stock-transfer-list-in-stock';
// import TradingStockTransferListOutStockView
//   from '../../sections/stocktransferlist/view/trading-stock-transfer-list-out-stock';
// ----------------------------------------------------------------------------------------------------------------------------------------------------------------------
import MainVendoreEditPage from '../../pages/dashboard/vendore/edit';
import MainVendoreListPage from '../../pages/dashboard/vendore/list';
import MainVendoreCreatePage from '../../pages/dashboard/vendore/new';
import CompanyListPage from '../../pages/dashboard/company/list';
import CompanyEditPage from '../../pages/dashboard/company/edit';
import CompanyNewPage from '../../pages/dashboard/company/new';
import BranchListPage from '../../pages/dashboard/branch/list';
import BranchCreatePage from '../../pages/dashboard/branch/new';
import BranchEditPage from '../../pages/dashboard/branch/edit';
import CounterCreatePage from '../../pages/dashboard/counter/new';
import CounterListPage from '../../pages/dashboard/counter/list';
import CounterEditPage from '../../pages/dashboard/counter/edit';
import DepartmentListPage from '../../pages/dashboard/department/list';
import DepartmentCreatePage from '../../pages/dashboard/department/new';
import RoleListPage from '../../pages/dashboard/role/list';
import DepartmentEditPage from '../../pages/dashboard/department/edit';
import RoleCreatePage from '../../pages/dashboard/role/new';
import EmployeeListPage from '../../pages/dashboard/employee/list';
import EmployeeCreatePage from '../../pages/dashboard/employee/new';
import EmployeeEditPage from '../../pages/dashboard/employee/edit';
import BankListPage from '../../pages/dashboard/bank/list';
import BankCreatePage from '../../pages/dashboard/bank/new';
import DeviceListPage from '../../pages/dashboard/device/list';
import DeviceCreatePage from '../../pages/dashboard/device/new';
import DeviceEditPage from '../../pages/dashboard/device/edit';
import TaxListPage from '../../pages/dashboard/tax/list';
import TaxCreatePage from '../../pages/dashboard/tax/new';
import TaxEditPage from '../../pages/dashboard/tax/edit';
import ConversionListPage from '../../pages/dashboard/conversion/list';
import ConversionCreatePage from '../../pages/dashboard/conversion/new';
import CategoryListPage from '../../pages/dashboard/category/list';
import CategoryCreatePage from '../../pages/dashboard/category/new';
import CategoryEditPage from '../../pages/dashboard/category/edit';
import ProductsListPage from '../../pages/dashboard/products/list';
import ProductsCreatePage from '../../pages/dashboard/products/new';
import ProductsEditPage from '../../pages/dashboard/products/edit';
import DesignListPage from '../../pages/dashboard/design/list';
import DesignCreatePage from '../../pages/dashboard/design/new';
import DesignEditPage from '../../pages/dashboard/design/edit';
import PurityListPage from '../../pages/dashboard/purity/list';
import PurityCreatePage from '../../pages/dashboard/purity/new';
import PurityEditPage from '../../pages/dashboard/purity/edit';
import PacketListPage from '../../pages/dashboard/packet/list';
import PacketCreatePage from '../../pages/dashboard/packet/new';
import PacketEditPage from '../../pages/dashboard/packet/edit';
import BoxListPage from '../../pages/dashboard/box/list';
import BoxCreatePage from '../../pages/dashboard/box/new';
import BoxEditPage from '../../pages/dashboard/box/edit';
import StoneListPage from '../../pages/dashboard/stone/list';
import StoneCreatePage from '../../pages/dashboard/stone/new';
import StoneEditPage from '../../pages/dashboard/stone/edit';
import DiamondListPage from '../../pages/dashboard/diamond/list';
import DiamondCreatePage from '../../pages/dashboard/diamond/new';
import SkuListPage from '../../pages/dashboard/sku/list';
import SkuCreatePage from '../../pages/dashboard/sku/new';
import RateListPage from '../../pages/dashboard/rate/list';
import RateCreatePage from '../../pages/dashboard/rate/new';
import CollectionListPage from '../../pages/dashboard/collection/list';
import CollectionCreatePage from '../../pages/dashboard/collection/new';
import CollectionEditPage from '../../pages/dashboard/collection/edit';
import OccasionListPage from '../../pages/dashboard/occasion/list';
import OccasionCreatePage from '../../pages/dashboard/occasion/new';
import OcassionEditPage from '../../pages/dashboard/occasion/edit';


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

          { path: 'products', element: <ProductsListPage /> },
          { path: 'productscreate', element: <ProductsCreatePage /> },
          { path: 'products/:id/productsedit', element: <ProductsEditPage /> },

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

          { path: 'collection', element: <CollectionListPage /> },
          { path: 'collectioncreate', element: <CollectionCreatePage /> },
          { path: 'collectioncreate/:id/collectionedit', element: <CollectionEditPage /> },

          { path: 'occasion', element: <OccasionListPage /> },
          { path: 'occasioncreate', element: <OccasionCreatePage /> },
          { path: 'occasion/:id/occasionedit', element: <OcassionEditPage /> },

        ],
      },

      // trading
      // {
      //   path: 'trading',
      //   children: [
      //     { element: <IndexPage />, index: true },
      //     { path: 'purchaseentry', element: <TradingPurchaseEntryView /> },
      //     { path: 'createpacket', element: <TradingCreatePacketView  /> },
      //     { path: 'makepayments', element: <TradingMakePaymentsView  /> },
      //     { path: 'receivepayments', element: <TradingReceivePaymentsView  /> },
      //     { path: 'creditnote', element: <TradingCreditNoteView  /> },
      //     { path: 'creditnotecreate', element: <TradingCreditNoteCreateView  /> },
      //     { path: 'debitnote', element: <TradingDebitNoteView  /> },
      //     { path: 'debitnotecreate', element: <TradingDebitNoteCreateView  /> },
      //     { path: 'stocktransfer', element: <TradingStockTransferView  /> },
      //     { path: 'stocktransferlist', element: <TradingStockTransferListView  /> },
      //     { path: 'stocktransferlistinstock', element: <TradingStockTransferListInStockView  /> },
      //     { path: 'stocktransferlistoutstock', element: <TradingStockTransferListOutStockView  /> },
      //   ]
      // },

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
