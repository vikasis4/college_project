'use client';
import React from "react";
import { GeneralContext } from "@context/general";
import { API_BATCH, API_AUTH } from "@utils/apis";

export const PreFunction = () => {

    const general = React.useContext(GeneralContext);

    React.useEffect(() => {

        const fetch_branch_data = async () => {
            const response = await fetch(API_BATCH, {
                method: "GET",
            });
            const data = (await response.json()).data;
            general.setDatas(data);
        }

        const fetch_user_verify = async () => {
            var token = localStorage.getItem('token');
            if (token) {
                var response = await fetch(API_AUTH, {
                    method: 'POST',
                    body: JSON.stringify({ action: "verifyToken", token })
                })
                var result = await response.json();
                if (result.status) {
                    general.setProfile({name:result.account.name, email: result.account.email, comments: result.account.comments, uploads: result.account.uploads, login:true})
                }else{
                    localStorage.removeItem('token')
                }
            }
        }

        fetch_branch_data()
        fetch_user_verify()

    }, [])

}