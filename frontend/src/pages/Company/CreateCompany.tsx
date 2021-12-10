import React, {useState} from 'react';
import InputText from "../../component/inputs/InputText";
import SimpleButton from "../../component/buttons/SimpleButton";

interface CreateCompanyProps {

}

const CreateCompany: React.FC<CreateCompanyProps> = () => {
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    return (
        <div className={'flex flex-col justify-center h-screen w-full p-20 gap-10'}>
            <div>
                <h1 className={'text-3xl mb-5'}>
                    1. Know The Company
                </h1>
                <div>
                    When you are doing interview, it's important to understand what company you are applying for.
                    So, take your time, look at their website, search their online presents, what they value.
                </div>
            </div>
            <div className={'flex flex-col gap-5'}>
                <div>
                    <div>
                        What's the name of the company?
                    </div>
                    <InputText name={"company-name"} label={"Enter name of the company"} value={name} type={'text'}
                               onChange={(value) => setName(value)}
                               background={'transparent'}
                    />
                </div>
                <div className={'flex flex-col gap-2'}>
                    <div>
                        Most interviewers are interested to know if the candidates are interested in the company. So,
                        they will ask questions such as "Can you tell us about our company?".
                    </div>
                    <div>
                        In your own word, describe about the company. It doesn't have to be long but it's important for
                        you write it out own your own word because it will help you remember.
                    </div>
                    <InputText name={"company-description"}
                               label={"In 50 ~ 100 words, can you tell me what you think the company does?"}
                               value={name}
                               type={'text'}
                               onChange={(value) => setName(value)}
                               background={'transparent'}
                    />
                </div>
                <div>
                    <SimpleButton label={'Next'} onChange={() => null}/>
                </div>
            </div>
        </div>
    );
};


export default CreateCompany;