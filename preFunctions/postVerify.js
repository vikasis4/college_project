'use clients';

import React from 'react';
import { GeneralContext } from '@context/general';

export const Logout = async () => {
    const general = React.createContext(GeneralContext);
    localStorage.removeItem('token')
    general.setProfile({ email: '', comments: [], uploads: [], login: false })

}