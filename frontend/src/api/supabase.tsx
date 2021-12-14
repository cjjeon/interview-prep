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
        .from("company")
        .select(
            `
        id,
        name,
        company_description(description)
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
                    const output: Company[] = []

                    data.forEach((d) => {
                        if (
                            d.company_description &&
                            d.company_description.length > 0
                        ) {
                            output.push({
                                id: d.id,
                                name: d.name,
                                description: d.company_description[0].description,
                            })
                        }
                    })

                    return { data: output }
                } else {
                    return {
                        data: [],
                    }
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
