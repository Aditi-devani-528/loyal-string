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

import StockfileHome from '../stock-home';
import StockDesign from '../stock-design';
import StockProduct from '../stock-product';
import StockSku from '../stock-sku';
import StockKarigar from '../stock-karigar';
import StockLabel from '../stock-label';
import StockPacket from '../stock-packet';
import StockBox from '../stock-box';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'profile',
    label: 'Category',
    // icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
  {
    value: 'followers',
    label: 'Product',
    // icon: <Iconify icon="solar:heart-bold" width={24} />,
  },
  {
    value: 'friends',
    label: 'Design',
    // icon: <Iconify icon="solar:users-group-rounded-bold" width={24} />,
  },
  {
    value: 'gallery',
    label: 'SKU Report',
    // icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
  {
    value: 'sku',
    label: 'SKU / Karigar Report',
    // icon: <Iconify icon="solar:gallery-wide-bold" width={24} />,
  },
  {
    value: 'label',
    label: 'Lablled Stock',
    // icon: <Iconify icon="solar:-wide-bold" width={24} />,
  },
  {
    value: 'packet',
    label: 'Packets',
    // icon: <Iconify icon="solar:-wide-bold" width={24} />,
  },
  {
    value: 'box',
    label: 'Boxes',
    // icon: <Iconify icon="solar:-wide-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function StockProfileView() {
  const settings = useSettingsContext();

  const { user } = useMockedUser();

  const [searchFriends, setSearchFriends] = useState('');

  const [currentTab, setCurrentTab] = useState('profile');

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

      {currentTab === 'profile' && <StockfileHome info={_userAbout} posts={_userFeeds} />}

      {currentTab === 'followers' && <StockProduct followers={_userFollowers} />}

      {currentTab === 'friends' && (
        <StockDesign
          friends={_userFriends}
          searchFriends={searchFriends}
          onSearchFriends={handleSearchFriends}
        />
      )}

      {currentTab === 'gallery' && <StockSku gallery={_userGallery} />}
      {currentTab === 'sku' && <StockKarigar />}
      {currentTab === 'label' && <StockLabel />}
      {currentTab === 'packet' && <StockPacket />}
      {currentTab === 'box' && <StockBox />}
    </Container>
  );
}
