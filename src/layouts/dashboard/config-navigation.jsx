import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useTranslate();

  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        subheader: t('overview'),
        items: [
          // {
          //   title: t('app'),
          //   path: paths.dashboard.root,
          //   icon: ICONS.dashboard,
          // },
          // {
          //   title: t('ecommerce'),
          //   path: paths.dashboard.general.ecommerce,
          //   icon: ICONS.ecommerce,
          // },
          // {
          //   title: t('analytics'),
          //   path: paths.dashboard.general.analytics,
          //   icon: ICONS.analytics,
          // },
          // {
          //   title: t('banking'),
          //   path: paths.dashboard.general.banking,
          //   icon: ICONS.banking,
          // },
          // {
          //   title: t('booking'),
          //   path: paths.dashboard.general.booking,
          //   icon: ICONS.booking,
          // },
          // {
          //   title: t('file'),
          //   path: paths.dashboard.general.file,
          //   icon: ICONS.file,
          // },
          {
            title: t('vendor'),
            path: paths.dashboard.general.vendor,
            icon: ICONS.file,
          },
        ],
      },

      {
        subheader: t('user master'),
        items: [
          {
            title: t('Company'),
            path: paths.dashboard.userMaster.company,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Branch'),
            path: paths.dashboard.userMaster.branch,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Counter'),
            path: paths.dashboard.userMaster.counter,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Department'),
            path: paths.dashboard.userMaster.department,
            // icon: ICONS.dashboard,
          },
          // {
          //   title: t('role'),
          //   path: paths.dashboard.userMaster.role,
          //   // icon: ICONS.dashboard,
          // },
          {
            title: t('Employee'),
            path: paths.dashboard.userMaster.employee,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Bank Account'),
            path: paths.dashboard.userMaster.bank,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Devices'),
            path: paths.dashboard.userMaster.device,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Tax'),
            path: paths.dashboard.userMaster.tax,
            // icon: ICONS.dashboard,
          },
          // {
          //   title: t('Rate Conversion'),
          //   path: paths.dashboard.userMaster.conversion,
          //   // icon: ICONS.dashboard,
          // },
        ],
      },

      // product master

      {
        subheader: t('Products Master'),
        items: [
          {
            title: t('Category'),
            path: paths.dashboard.productMaster.category,
            // icon: ICONS.dashboard,
          },
          // {
          //   title: t('Product'),
          //   path: paths.dashboard.productMaster.product,
          //   // icon: ICONS.dashboard,
          // },
          {
            title: t('Products'),
            path: paths.dashboard.productMaster.products,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Design'),
            path: paths.dashboard.productMaster.design,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Purity'),
            path: paths.dashboard.productMaster.purity,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Packet'),
            path: paths.dashboard.productMaster.packet,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Box'),
            path: paths.dashboard.productMaster.box,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Stone'),
            path: paths.dashboard.productMaster.stone,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Diamond Size/Weight/Rate'),
            path: paths.dashboard.productMaster.diamond,
            // icon: ICONS.dashboard,
          },
          {
            title: t('SKU'),
            path: paths.dashboard.productMaster.sku,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Rates'),
            path: paths.dashboard.productMaster.rate,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Collection'),
            path: paths.dashboard.productMaster.collection,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Occasion'),
            path: paths.dashboard.productMaster.occasion,
            // icon: ICONS.dashboard,
          },
        ],
      },


      // TRADING
      {
        subheader: t('TRADING'),
        items: [
          {
            title: t('Purchase Entry'),
            path: paths.dashboard.trading.purchaseentry,
            icon: ICONS.dashboard,
          },
          {
            title: t('Create Packet'),
            path: paths.dashboard.trading.createpacket,
            icon: ICONS.dashboard,
          },
          {
            title: t('Make Payment'),
            path: paths.dashboard.trading.makepayments,
            icon: ICONS.dashboard,
          },
          {
            title: t('Receive payments'),
            path: paths.dashboard.trading.receivepayments,
            icon: ICONS.dashboard,
          },
          {
            title: t('Credit Note/Sale Return'),
            path: paths.dashboard.trading.creditnote,
            icon: ICONS.dashboard,
          },
          {
            title: t('Debit Note/Sale Return'),
            path: paths.dashboard.trading.debitnote,
            icon: ICONS.dashboard,
          },
          {
            title: t('Stock Transfer'),
            path: paths.dashboard.trading.stocktransfer,
            icon: ICONS.dashboard,
          },
          {
            title: t('Stock Transfer List'),
            path: paths.dashboard.trading.stocktransferlist,
            icon: ICONS.dashboard,
          },
        ],
      },


      // reports
      {
        subheader: t('Reports'),
        items: [
          {
            title: t('Stock'),
            path: paths.dashboard.report.stock,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Sale'),
            path: paths.dashboard.report.sale,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Order List'),
            path: paths.dashboard.report.orderlist,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Purchase'),
            path: paths.dashboard.report.purchase,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Customer Ledger'),
            path: paths.dashboard.report.ladger,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Supplier Ledger'),
            path: paths.dashboard.report.supplier,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Old Metal'),
            path: paths.dashboard.report.metal,
            // icon: ICONS.dashboard,
          },
        ],
      },

      // setting
      {
        subheader: t('Settings'),
        items: [
          {
            title: t('Vendor Tounche'),
            path: paths.dashboard.setting.vendor,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Customer Tounche'),
            path: paths.dashboard.setting.customer,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Diamond Attributes'),
            path: paths.dashboard.setting.diamond,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Pair Customer Vendor'),
            path: paths.dashboard.setting.pair,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Customer Slab'),
            path: paths.dashboard.setting.slab,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Customer Rate of Interest'),
            path: paths.dashboard.setting.rate,
            // icon: ICONS.dashboard,
          },
          {
            title: t('Customer Credit Period'),
            path: paths.dashboard.setting.period,
            // icon: ICONS.dashboard,
          },
        ],
      },

      // MANAGEMENT
      // ----------------------------------------------------------------------
      // {
      //   subheader: t('management'),
      //   items: [
      //     // USER
      //     {
      //       title: t('user'),
      //       path: paths.dashboard.user.root,
      //       icon: ICONS.user,
      //       children: [
      //         { title: t('profile'), path: paths.dashboard.user.root },
      //         { title: t('cards'), path: paths.dashboard.user.cards },
      //         { title: t('list'), path: paths.dashboard.user.list },
      //         { title: t('create'), path: paths.dashboard.user.new },
      //         { title: t('edit'), path: paths.dashboard.user.demo.edit },
      //         { title: t('account'), path: paths.dashboard.user.account },
      //       ],
      //     },

      //     // PRODUCT
      //     {
      //       title: t('product'),
      //       path: paths.dashboard.product.root,
      //       icon: ICONS.product,
      //       children: [
      //         { title: t('list'), path: paths.dashboard.product.root },
      //         {
      //           title: t('details'),
      //           path: paths.dashboard.product.demo.details,
      //         },
      //         { title: t('create'), path: paths.dashboard.product.new },
      //         { title: t('edit'), path: paths.dashboard.product.demo.edit },
      //       ],
      //     },

      //     // ORDER
      //     {
      //       title: t('order'),
      //       path: paths.dashboard.order.root,
      //       icon: ICONS.order,
      //       children: [
      //         { title: t('list'), path: paths.dashboard.order.root },
      //         { title: t('details'), path: paths.dashboard.order.demo.details },
      //       ],
      //     },

      //     // INVOICE
      //     {
      //       title: t('invoice'),
      //       path: paths.dashboard.invoice.root,
      //       icon: ICONS.invoice,
      //       children: [
      //         { title: t('list'), path: paths.dashboard.invoice.root },
      //         {
      //           title: t('details'),
      //           path: paths.dashboard.invoice.demo.details,
      //         },
      //         { title: t('create'), path: paths.dashboard.invoice.new },
      //         { title: t('edit'), path: paths.dashboard.invoice.demo.edit },
      //       ],
      //     },

      //     // BLOG
      //     {
      //       title: t('blog'),
      //       path: paths.dashboard.post.root,
      //       icon: ICONS.blog,
      //       children: [
      //         { title: t('list'), path: paths.dashboard.post.root },
      //         { title: t('details'), path: paths.dashboard.post.demo.details },
      //         { title: t('create'), path: paths.dashboard.post.new },
      //         { title: t('edit'), path: paths.dashboard.post.demo.edit },
      //       ],
      //     },

      //     // JOB
      //     {
      //       title: t('job'),
      //       path: paths.dashboard.job.root,
      //       icon: ICONS.job,
      //       children: [
      //         { title: t('list'), path: paths.dashboard.job.root },
      //         { title: t('details'), path: paths.dashboard.job.demo.details },
      //         { title: t('create'), path: paths.dashboard.job.new },
      //         { title: t('edit'), path: paths.dashboard.job.demo.edit },
      //       ],
      //     },

      //     // TOUR
      //     {
      //       title: t('tour'),
      //       path: paths.dashboard.tour.root,
      //       icon: ICONS.tour,
      //       children: [
      //         { title: t('list'), path: paths.dashboard.tour.root },
      //         { title: t('details'), path: paths.dashboard.tour.demo.details },
      //         { title: t('create'), path: paths.dashboard.tour.new },
      //         { title: t('edit'), path: paths.dashboard.tour.demo.edit },
      //       ],
      //     },

      //     // FILE MANAGER
      //     {
      //       title: t('file_manager'),
      //       path: paths.dashboard.fileManager,
      //       icon: ICONS.folder,
      //     },

      //     // MAIL
      //     {
      //       title: t('mail'),
      //       path: paths.dashboard.mail,
      //       icon: ICONS.mail,
      //       info: <Label color="error">+32</Label>,
      //     },

      //     // CHAT
      //     {
      //       title: t('chat'),
      //       path: paths.dashboard.chat,
      //       icon: ICONS.chat,
      //     },

      //     // CALENDAR
      //     {
      //       title: t('calendar'),
      //       path: paths.dashboard.calendar,
      //       icon: ICONS.calendar,
      //     },

      //     // KANBAN
      //     {
      //       title: t('kanban'),
      //       path: paths.dashboard.kanban,
      //       icon: ICONS.kanban,
      //     },
      //   ],
      // },

      // // DEMO MENU STATES
      // {
      //   subheader: t(t('other_cases')),
      //   items: [
      //     {
      //       // default roles : All roles can see this entry.
      //       // roles: ['user'] Only users can see this item.
      //       // roles: ['admin'] Only admin can see this item.
      //       // roles: ['admin', 'manager'] Only admin/manager can see this item.
      //       // Reference from 'src/guards/RoleBasedGuard'.
      //       title: t('item_by_roles'),
      //       path: paths.dashboard.permission,
      //       icon: ICONS.lock,
      //       roles: ['admin', 'manager'],
      //       caption: t('only_admin_can_see_this_item'),
      //     },
      //     {
      //       title: t('menu_level'),
      //       path: '#/dashboard/menu_level',
      //       icon: ICONS.menuItem,
      //       children: [
      //         {
      //           title: t('menu_level_1a'),
      //           path: '#/dashboard/menu_level/menu_level_1a',
      //         },
      //         {
      //           title: t('menu_level_1b'),
      //           path: '#/dashboard/menu_level/menu_level_1b',
      //           children: [
      //             {
      //               title: t('menu_level_2a'),
      //               path: '#/dashboard/menu_level/menu_level_1b/menu_level_2a',
      //             },
      //             {
      //               title: t('menu_level_2b'),
      //               path: '#/dashboard/menu_level/menu_level_1b/menu_level_2b',
      //               children: [
      //                 {
      //                   title: t('menu_level_3a'),
      //                   path: '#/dashboard/menu_level/menu_level_1b/menu_level_2b/menu_level_3a',
      //                 },
      //                 {
      //                   title: t('menu_level_3b'),
      //                   path: '#/dashboard/menu_level/menu_level_1b/menu_level_2b/menu_level_3b',
      //                 },
      //               ],
      //             },
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       title: t('item_disabled'),
      //       path: '#disabled',
      //       icon: ICONS.disabled,
      //       disabled: true,
      //     },
      //     {
      //       title: t('item_label'),
      //       path: '#label',
      //       icon: ICONS.label,
      //       info: (
      //         <Label color="info" startIcon={<Iconify icon="solar:bell-bing-bold-duotone" />}>
      //           NEW
      //         </Label>
      //       ),
      //     },
      //     {
      //       title: t('item_caption'),
      //       path: '#caption',
      //       icon: ICONS.menuItem,
      //       caption:
      //         'Quisque malesuada placerat nisl. In hac habitasse platea dictumst. Cras id dui. Pellentesque commodo eros a enim. Morbi mollis tellus ac sapien.',
      //     },
      //     {
      //       title: t('item_external_link'),
      //       path: 'https://www.google.com/',
      //       icon: ICONS.external,
      //     },
      //     {
      //       title: t('blank'),
      //       path: paths.dashboard.blank,
      //       icon: ICONS.blank,
      //     },
      //   ],
      // },
    ],
    [t]
  );

  return data;
}
