import { Spaces } from '@/components/Home/Spaces';
import { WithNavBar } from '@/components/layout/WithNavBar';
import type { NextPage } from 'next';
import { useFindManySpace } from '@/zmodel/lib/hooks';

const Home: NextPage = () => {
    const { data: spaces } = useFindManySpace();
    return (
        <WithNavBar>
            <Spaces />
        </WithNavBar>
    );
};

export default Home;
