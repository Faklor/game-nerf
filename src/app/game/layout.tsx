import { Suspense } from 'react';
import Loader from '@/constants/loading'

export default function GameLayout({children}:{
    children: React.ReactNode;
}){
    return (
        <Suspense fallback={Loader()}>
            {children}
        </Suspense>
    );
}
    
