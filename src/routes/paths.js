import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneUI: 'https://mui.com/store/items/zone-landing-page/',
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figma:
    'https://www.figma.com/file/hjxMnGUJCjY7pX8lQbS7kn/%5BPreview%5D-Minimal-Web.v5.4.0?type=design&node-id=0-1&mode=design&t=2fxnS70DuiTLGzND-0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
    demo: {
      details: `/product/${MOCK_ID}`,
    },
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: {
      details: `/post/${paramCase(MOCK_TITLE)}`,
    },
  },
  // AUTH
  auth: {
    amplify: {
      login: `${ROOTS.AUTH}/amplify/login`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      register: `${ROOTS.AUTH}/amplify/register`,
      newPassword: `${ROOTS.AUTH}/amplify/new-password`,
      forgotPassword: `${ROOTS.AUTH}/amplify/forgot-password`,
    },
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
    firebase: {
      login: `${ROOTS.AUTH}/firebase/login`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      register: `${ROOTS.AUTH}/firebase/register`,
      forgotPassword: `${ROOTS.AUTH}/firebase/forgot-password`,
    },
    auth0: {
      login: `${ROOTS.AUTH}/auth0/login`,
    },
    supabase: {
      login: `${ROOTS.AUTH}/supabase/login`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      register: `${ROOTS.AUTH}/supabase/register`,
      newPassword: `${ROOTS.AUTH}/supabase/new-password`,
      forgotPassword: `${ROOTS.AUTH}/supabase/forgot-password`,
    },
  },
  authDemo: {
    classic: {
      login: `${ROOTS.AUTH_DEMO}/classic/login`,
      register: `${ROOTS.AUTH_DEMO}/classic/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/classic/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/classic/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/classic/verify`,
    },
    modern: {
      login: `${ROOTS.AUTH_DEMO}/modern/login`,
      register: `${ROOTS.AUTH_DEMO}/modern/register`,
      forgotPassword: `${ROOTS.AUTH_DEMO}/modern/forgot-password`,
      newPassword: `${ROOTS.AUTH_DEMO}/modern/new-password`,
      verify: `${ROOTS.AUTH_DEMO}/modern/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: `${ROOTS.DASHBOARD}/mail`,
    chat: `${ROOTS.DASHBOARD}/chat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
      vendore: `${ROOTS.DASHBOARD}/vendore`,
      vendorecreate: `${ROOTS.DASHBOARD}/vendorecreate`,
      vendoreedit: (id) => `${ROOTS.DASHBOARD}/vendore/${id}/vendoreedit`,
    },
    userMaster: {
      app: `${ROOTS.DASHBOARD}/app`,

      company: `${ROOTS.DASHBOARD}/userMaster/company`,
      companycreate: `${ROOTS.DASHBOARD}/userMaster/companycreate`,

      branch: `${ROOTS.DASHBOARD}/userMaster/branch`,
      branchcreate: `${ROOTS.DASHBOARD}/userMaster/branchcreate`,

      counter: `${ROOTS.DASHBOARD}/userMaster/counter`,
      countercreate: `${ROOTS.DASHBOARD}/userMaster/countercreate`,
      counteredit: (id) => `${ROOTS.DASHBOARD}/userMaster/counter/${id}/counteredit`,

      department: `${ROOTS.DASHBOARD}/userMaster/department`,
      departmentcreate: `${ROOTS.DASHBOARD}/userMaster/departmentcreate`,

      role: `${ROOTS.DASHBOARD}/userMaster/role`,
      rolecreate: `${ROOTS.DASHBOARD}/userMaster/rolecreate`,

      employee: `${ROOTS.DASHBOARD}/userMaster/employee`,
      employeecreate: `${ROOTS.DASHBOARD}/userMaster/employeecreate`,
      employeeedit: (id) => `${ROOTS.DASHBOARD}/userMaster/employee/${id}/employeeedit`,

      bank: `${ROOTS.DASHBOARD}/userMaster/bank`,
      bankcreate: `${ROOTS.DASHBOARD}/userMaster/bankcreate`,

      device: `${ROOTS.DASHBOARD}/userMaster/device`,
      devicecreate: `${ROOTS.DASHBOARD}/userMaster/devicecreate`,

      tax: `${ROOTS.DASHBOARD}/userMaster/tax`,
      taxcreate: `${ROOTS.DASHBOARD}/userMaster/taxcreate`,

      conversion: `${ROOTS.DASHBOARD}/userMaster/conversion`,
      conversioncreate: `${ROOTS.DASHBOARD}/userMaster/conversioncreate`,
    },
    // productmaster
    productMaster: {
      app: `${ROOTS.DASHBOARD}/app`,

      category: `${ROOTS.DASHBOARD}/productMaster/category`,
      categorycreate: `${ROOTS.DASHBOARD}/productMaster/categorycreate`,
      edit: (id) => `${ROOTS.DASHBOARD}/productMaster/category/${id}/categoryedit`,

      // product: `${ROOTS.DASHBOARD}/productMaster/product`,
      // productcreate: `${ROOTS.DASHBOARD}/productMaster/productcreate`,

      products: `${ROOTS.DASHBOARD}/productMaster/products`,
      productscreate: `${ROOTS.DASHBOARD}/productMaster/productscreate`,
      productsedit: (id) => `${ROOTS.DASHBOARD}/productMaster/products/${id}/productsedit`,

      design: `${ROOTS.DASHBOARD}/productMaster/design`,
      designcreate: `${ROOTS.DASHBOARD}/productMaster/designcreate`,
      designedit: (id) => `${ROOTS.DASHBOARD}/productMaster/design/${id}/designedit`,

      purity: `${ROOTS.DASHBOARD}/productMaster/purity`,
      puritycreate: `${ROOTS.DASHBOARD}/productMaster/puritycreate`,
      purityedit: (id) => `${ROOTS.DASHBOARD}/productMaster/purity/${id}/purityedit`,

      packet: `${ROOTS.DASHBOARD}/productMaster/packet`,
      packetcreate: `${ROOTS.DASHBOARD}/productMaster/packetcreate`,
      packetedit: (id) => `${ROOTS.DASHBOARD}/productMaster/packet/${id}/packetedit`,

      box: `${ROOTS.DASHBOARD}/productMaster/box`,
      boxcreate: `${ROOTS.DASHBOARD}/productMaster/boxcreate`,
      boxedit: (id) => `${ROOTS.DASHBOARD}/productMaster/box/${id}/boxedit`,

      stone: `${ROOTS.DASHBOARD}/productMaster/stone`,
      stonecreate: `${ROOTS.DASHBOARD}/productMaster/stonecreate`,
      stoneedit: (id) => `${ROOTS.DASHBOARD}/productMaster/stone/${id}/stoneedit`,

      diamond: `${ROOTS.DASHBOARD}/productMaster/diamond`,
      diamondcreate: `${ROOTS.DASHBOARD}/productMaster/diamondcreate`,

      sku: `${ROOTS.DASHBOARD}/productMaster/sku`,
      skucreate: `${ROOTS.DASHBOARD}/productMaster/skucreate`,

      rate: `${ROOTS.DASHBOARD}/productMaster/rate`,
      ratecreate: `${ROOTS.DASHBOARD}/productMaster/ratecreate`,

      collection: `${ROOTS.DASHBOARD}/productMaster/collection`,
      collectioncreate: `${ROOTS.DASHBOARD}/productMaster/collectioncreate`,

      occasion: `${ROOTS.DASHBOARD}/productMaster/occasion`,
      occasioncreate: `${ROOTS.DASHBOARD}/productMaster/occasioncreate`,
      occasionedit: (id) => `${ROOTS.DASHBOARD}/productMaster/occasion/${id}/occasionedit`,
    },




    // reports
    report: {
      app: `${ROOTS.DASHBOARD}/app`,
      stock: `${ROOTS.DASHBOARD}/report/stock`,
      sale: `${ROOTS.DASHBOARD}/report/sale`,
      orderlist: `${ROOTS.DASHBOARD}/report/orderlist`,
      purchase: `${ROOTS.DASHBOARD}/report/purchase`,
      ladger: `${ROOTS.DASHBOARD}/report/ladger`,
      supplier: `${ROOTS.DASHBOARD}/report/supplier`,
      metal: `${ROOTS.DASHBOARD}/report/metal`,
    },
    // setting
    setting: {
      app: `${ROOTS.DASHBOARD}/app`,
      vendor: `${ROOTS.DASHBOARD}/setting/vendor`,
      vendorcreate: `${ROOTS.DASHBOARD}/setting/vendorcreate`,
      customer: `${ROOTS.DASHBOARD}/setting/customer`,
      customercreate: `${ROOTS.DASHBOARD}/setting/customercreate`,
      diamond: `${ROOTS.DASHBOARD}/setting/diamond`,
      diamondcreate: `${ROOTS.DASHBOARD}/setting/diamondcreate`,
      pair: `${ROOTS.DASHBOARD}/setting/pair`,
      paircreate: `${ROOTS.DASHBOARD}/setting/paircreate`,
      slab: `${ROOTS.DASHBOARD}/setting/slab`,
      slabcreate: `${ROOTS.DASHBOARD}/setting/slabcreate`,
      rate: `${ROOTS.DASHBOARD}/setting/rate`,
      ratecreate: `${ROOTS.DASHBOARD}/setting/ratecreate`,
      period: `${ROOTS.DASHBOARD}/setting/period`,
      periodcreate: `${ROOTS.DASHBOARD}/setting/periodcreate`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      account: `${ROOTS.DASHBOARD}/user/account`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      details: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      edit: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      details: (id) => `${ROOTS.DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
      },
    },
    job: {
      root: `${ROOTS.DASHBOARD}/job`,
      new: `${ROOTS.DASHBOARD}/job/new`,
      details: (id) => `${ROOTS.DASHBOARD}/job/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.DASHBOARD}/tour`,
      new: `${ROOTS.DASHBOARD}/tour/new`,
      details: (id) => `${ROOTS.DASHBOARD}/tour/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
      },
    },
  },
};
