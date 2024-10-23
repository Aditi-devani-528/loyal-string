import { Helmet } from 'react-helmet-async';
import DiamondEditView from 'src/sections/diamond/view/diamond-edit-view';


// ----------------------------------------------------------------------

export default function DiamondEditPage() {
    return (
        <>
            <Helmet>
                <title>Dashboard: Diamond Edit</title>
            </Helmet>

            <DiamondEditView />
        </>
    );
}
