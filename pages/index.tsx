import { Spaces } from '@/components/Home/Spaces';
import { WithNavBar } from '@/components/layout/WithNavBar';
import type { NextPage } from 'next';

export const Home: NextPage = () => {
    return (
        <WithNavBar>
            <Spaces />
        </WithNavBar>
    );
};

export default Home;
