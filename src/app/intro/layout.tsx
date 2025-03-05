import { Suspense } from 'react';
import Loader from '@/constants/loading'

export default function IntroLayout({children}:{
    children: React.ReactNode;
}){
    return (
        <Suspense fallback={Loader()}>
            {children}
        </Suspense>
    );
}
    
