import { Suspense } from 'react';
import Loader from '@/constants/loading'

export default function WeaponSelectLayout({children}:{
    children: React.ReactNode;
}){
    return (
        <Suspense fallback={Loader()}>
            {children}
        </Suspense>
    );
}
    
