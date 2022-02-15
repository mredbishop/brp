import { MoreTimeTwoTone, QueryStatsTwoTone } from '@mui/icons-material';
import TodayTwoTone from '@mui/icons-material/TodayTwoTone';
import { Outlet } from 'react-router-dom';
import Layout, { SidebarLinkProps } from '../components/Layout';

function Main() {
    const links: Array<SidebarLinkProps> = [
        { url: '/brp', text: 'Brp', Icon: TodayTwoTone },
        { url: '/flo', text: 'Flo', Icon: MoreTimeTwoTone },
        { url: '/', text: 'Stats', Icon: QueryStatsTwoTone }
    ];

    return (
        <Layout links={links}>
            <Outlet />
        </Layout>
    );
}

export default Main;
