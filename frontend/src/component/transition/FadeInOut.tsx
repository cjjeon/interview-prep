import React, {useState} from 'react';
import {CSSTransition, SwitchTransition} from "react-transition-group";
import SimpleButton from '../buttons/SimpleButton';
import './FadeInOut.css'

interface FadeInOutProps {
    components: React.ReactElement[]
    completeOnClick: () => void
}

const FadeInOut: React.FC<FadeInOutProps> = ({components, completeOnClick}) => {
    const [page, setPages] = useState<number>(0)
    return (
        <SwitchTransition mode={'out-in'}>
            <CSSTransition
                key={page}
                addEndListener={(node, done) => {
                    node.addEventListener("transitionend", done, false)
                }}
                classNames={'__fade'}
            >
                <div>
                    <div>
                        {components[page]}
                    </div>
                    <div className={'flex justify-end items-end gap-2'}>
                        {page !== 0 ?
                            <div className={'w-24'}>
                                <SimpleButton
                                    color={'transparent'}
                                    borderColor={'gray'}
                                    onClick={() => setPages((prevState) => prevState - 1)}
                                    label={'Previous'}
                                />
                            </div> : null}
                        {page < components.length - 1 ?
                            <div className={'w-24'}>
                                <SimpleButton
                                    color={'yellow'}
                                    onClick={() => setPages((prevState) => prevState + 1)}
                                    label={'Next'}
                                />
                            </div> :
                            <div className={'w-24'}>
                                <SimpleButton
                                    color={'yellow'}
                                    onClick={() => completeOnClick()}
                                    label={'Complete'}
                                />
                            </div>
                        }
                    </div>
                </div>
            </CSSTransition>
        </SwitchTransition>
    );
};


export default FadeInOut;