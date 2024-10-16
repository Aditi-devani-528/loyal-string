import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import { useGetDevice } from 'src/api/device';
import DeviceCreateNewForm from '../device-create-new-form';

// ----------------------------------------------------------------------

export default function DeviceEditView() {
  const settings = useSettingsContext();
  const { id } = useParams();
  console.log("Id",id);
  
  const { device } = useGetDevice();
  const currentDevice = device?.find((e) => e?._id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Device"
        links={[  
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Device',
            href: paths.dashboard.userMaster.device.list,
          },
          {
            name: 'Edit Device',
            href: paths.dashboard.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      {currentDevice && <DeviceCreateNewForm currentDevice={currentDevice} />}
    </Container>
  );
}
