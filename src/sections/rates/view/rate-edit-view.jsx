import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import { useGetRate } from 'src/api/rate';
import RateCreateNewForm from '../rate-create-new-form';
// ----------------------------------------------------------------------

export default function RateEditView() {
    const params = useParams();
    const { rate } = useGetRate()
    const { id } = params;
    const settings = useSettingsContext();
    const currentRate = rate?.find((e) => e?._id === id);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Rate"
                links={[
                    {
                        name: 'Dashboard',
                        href: paths.dashboard.root,
                    },
                    {
                        name: 'Product Master',
                        href: paths.dashboard.productMaster.rate.list,
                    },
                    { name: 'Add Rate ' },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            {currentRate && <RateCreateNewForm currentRate={currentRate} />}
        </Container>
    );
}
