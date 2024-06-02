import { Spaces } from '@/components/Home/Spaces';
import { WithNavBar } from '@/components/layout/WithNavBar';
import { useSpaceSlug } from '@/lib/context';
import { getSpaceUrl } from '@/lib/urls';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

export const Home: NextPage = () => {
    const router = useRouter();
    const spaceSlug = useSpaceSlug();
    if (spaceSlug) {
        router.push(getSpaceUrl(spaceSlug));
    }
    return (
        <WithNavBar>
            <Spaces />
        </WithNavBar>
    );
};

export default Home;
