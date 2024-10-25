import { Helmet } from 'react-helmet-async';
import RateEditView from 'src/sections/rates/view/rate-edit-view';


// ----------------------------------------------------------------------

export default function RateEditPage() {


    return (
        <>
            <Helmet>
                <title> Dashboard: Rate Edit</title>
            </Helmet>

            <RateEditView />
        </>
    );
}
