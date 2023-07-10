'use client';

import React from 'react';
import { API_BATCH, API_AUTH } from "@utils/apis";

export const Logout = (general) => {
    localStorage.removeItem('token')
    general.setProfile({ email: '', comments: [], uploads: [], login: false })
}

export const Post_Verify = async (general) => {
    var token = localStorage.getItem('token');
    if (token) {
        var response = await fetch(API_AUTH, {
            method: 'POST',
            body: JSON.stringify({ action: "verifyToken", token })
        })
        var result = await response.json();
        if (result.status) {
            general.setProfile({ email: result.account.email, comments: result.account.comments, uploads: result.account.uploads, login: true })
        } else {
            general.setProfile({ email: '', comments: [], uploads: [], login: false })
            localStorage.removeItem('token')
        }
    }
}