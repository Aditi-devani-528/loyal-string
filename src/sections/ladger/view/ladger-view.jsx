import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useMockedUser } from 'src/hooks/use-mocked-user';

import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';


import RdPurches from '../receive-Payment';
import UrdPurches from '../make-payment';
import MakePayment from '../make-payment';
import ReceivePayment from '../receive-Payment';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'urd',
    label: 'Make Payment',
    // icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'rd',
    label: 'Receive Payment',
    // icon: <Iconify icon="solar:heart-bold" width={24} />,
  }, 
];

// ----------------------------------------------------------------------

export default function LadgerView() {
  const settings = useSettingsContext();

  const { user } = useMockedUser();

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('urd');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const handleSearchFriends = useCallback((event) => {
    setSearchFriends(event.target.value);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Stock"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Treding', href: paths.dashboard.user.root },
          { name: 'Stock' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card
        sx={{
          mb: 5,
          height: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            // width: 1,
            // bottom: 3,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 5 },
              justifyContent: {
                sm: 'center',
                md: 'flex-start',
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>
      </Card>

      {currentTab === 'urd' && <MakePayment />}

      {currentTab === 'rd' && <ReceivePayment followers={_userFollowers} />}

    </Container>
  );
}
