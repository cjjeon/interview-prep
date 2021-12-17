import { createClient } from "@supabase/supabase-js"
import { Company } from "../models/Company.model"

const REACT_APP_SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL
const REACT_APP_SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY

export const supabase = createClient(
    REACT_APP_SUPABASE_URL ? REACT_APP_SUPABASE_URL : "",
    REACT_APP_SUPABASE_KEY ? REACT_APP_SUPABASE_KEY : ""
)

export function getCompanies(): PromiseLike<{ data: Company[]; error?: string }> {
    return supabase
        .from("company_description")
        .select(
            `
        description,
        company(id,name)
    `
        )
        .then(({ data, error }) => {
            if (error) {
                console.log(error.message)
                return {
                    data: [],
                    error: "Fail to get companies",
                }
            } else {
                if (data) {
                    return {
                        data: data.map((d) => {
                            return {
                                id: d.company.id,
                                name: d.company.name,
                                description: d.description,
                            }
                        }),
                    }
                } else {
                    return {
                        data: [],
                    }
                }
            }
        })
}

export function getCompany(
    companyId: number
): PromiseLike<{ data?: Company; error?: string }> {
    return supabase
        .from("company_description")
        .select(
            `
        description,
        company(id,name)
    `
        )
        .eq("company.id", companyId)
        .limit(1)
        .then(({ data, error }) => {
            if (error) {
                console.error(error.message)
                return {
                    error: "Fail to get company",
                }
            } else {
                if (data) {
                    return {
                        data: {
                            id: data[0].company.id,
                            name: data[0].company.name,
                            description: data[0].description,
                        },
                    }
                } else {
                    return {}
                }
            }
        })
}

export function createCompany(company: Company) {
    return supabase.rpc("create_company", {
        name: company.name,
        description: company.description,
    })
}
