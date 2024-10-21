import Container from '@mui/material/Container';
import { paths } from 'src/routes/paths';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useParams } from '../../../routes/hooks';
import { useGetDiamond } from 'src/api/diamond';
import DiamondCreateNewForm from '../diamond-create-new-form';

// ----------------------------------------------------------------------

export default function DiamondEditView() {
    const settings = useSettingsContext();
    const { id } = useParams();
    const { diamond } = useGetDiamond();

    const currentDiamond = diamond?.find((e) => e?._id === id);

    return (
        <Container maxWidth={settings.themeStretch ? false : 'lg'}>
            <CustomBreadcrumbs
                heading="Edit Diamond"
                links={[
                    {
                        name: 'Dashboard',
                        href: paths.dashboard.root,
                    },
                    {
                        name: 'Diamond',
                        href: paths.dashboard.productMaster.diamond.list,
                    },
                    {
                        name: 'Edit Diamond',
                        href: paths.dashboard.root,
                    },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />
            {currentDiamond && <DiamondCreateNewForm currentDiamond={currentDiamond} />}
        </Container>
    );
}
