import React, {useEffect, useState} from 'react';
import Loading from '../../component/loading/Loading';
import {useAuth} from "../../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {COMPANY_CREATE_PAGE} from '../../constant/routes';

interface CompaniesProps {

}

const Companies: React.FC<CompaniesProps> = () => {
    const [companies, setCompanies] = useState<[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const {isLoggedIn} = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate(COMPANY_CREATE_PAGE.path)
        }

        // TODO Fetch companies data here
    }, [])

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div>

        </div>
    );
};


export default Companies;