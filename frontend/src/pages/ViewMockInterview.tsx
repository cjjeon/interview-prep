import React, { useEffect, useState } from "react"
import { gql, useMutation, useQuery } from "@apollo/client"
import { useParams } from "react-router-dom"
import Loading from "../component/loading/Loading"
import ReactPlayer from "react-player"
import { API_URL } from "../constant/configs"
import { FaRegDizzy, FaRegFrown, FaRegLaughBeam, FaRegMeh, FaRegSmile } from "react-icons/fa"

const GET_MOCK_INTERVIEW_QUESTION = gql`
    query getMockInterview($id: ID!) {
        mockInterview(id: $id) {
            question
            videoUrl
            communicationScore
            confidenceScore
            positivityScore
        }
    }
`

interface GetMockInterviewQuestion {
    mockInterview: {
        question: string
        videoUrl: string
        communicationScore: number
        confidenceScore: number
        positivityScore: number
    }
}

const UPDATE_MOCK_INTERVIEW_QUESTION = gql`
    mutation ($id: ID!, $communicationScore: Int, $confidenceScore: Int, $positivityScore: Int) {
        updateMockInterviewScore(
            id: $id
            communicationScore: $communicationScore
            confidenceScore: $confidenceScore
            positivityScore: $positivityScore
        )
    }
`

interface RateInterviewProps {
    title: string
    score: number
    onChange: (value: number) => void
}

const RateInterview: React.FC<RateInterviewProps> = ({ title, score, onChange }) => {
    return (
        <div className={"flex flex-col gap-2"}>
            <div className={"font-medium text-indigo-600 truncate text-sm"}>{title}</div>
            <div className={"flex justify-center items-center gap-3"}>
                <FaRegDizzy
                    size={score === 0 ? 30 : 25}
                    color={score === 0 ? "red" : "gray"}
                    onClick={() => onChange(0)}
                />
                <FaRegFrown
                    size={score === 1 ? 30 : 25}
                    color={score === 1 ? "lightcoral" : "gray"}
                    onClick={() => onChange(1)}
                />
                <FaRegMeh
                    size={score === 2 ? 30 : 25}
                    color={score === 2 ? "orange" : "gray"}
                    onClick={() => onChange(2)}
                />
                <FaRegSmile
                    size={score === 3 ? 30 : 25}
                    color={score === 3 ? "lightgreen" : "gray"}
                    onClick={() => onChange(3)}
                />
                <FaRegLaughBeam
                    size={score === 4 ? 30 : 25}
                    color={score === 4 ? "green" : "gray"}
                    onClick={() => onChange(4)}
                />
            </div>
        </div>
    )
}

const MockInterview: React.FC = () => {
    const { mockInterviewId } = useParams()

    const [communicationScore, setCommunicationScore] = useState<number>(2)
    const [confidenceScore, setConfidenceScore] = useState<number>(2)
    const [positivityScore, setPositivityScore] = useState<number>(2)

    const { data, loading } = useQuery<GetMockInterviewQuestion>(GET_MOCK_INTERVIEW_QUESTION, {
        variables: {
            id: mockInterviewId,
        },
    })
    const [updateMockInterviewScore] = useMutation(UPDATE_MOCK_INTERVIEW_QUESTION)

    useEffect(() => {
        if (data && data.mockInterview) {
            setCommunicationScore(data.mockInterview.communicationScore)
            setConfidenceScore(data.mockInterview.confidenceScore)
            setPositivityScore(data.mockInterview.positivityScore)
        }
    }, [data])

    useEffect(() => {
        if (!loading) {
            updateMockInterviewScore({
                variables: {
                    id: mockInterviewId,
                    communicationScore,
                    confidenceScore,
                    positivityScore,
                },
            }).then()
        }
    }, [communicationScore, confidenceScore, positivityScore, loading, mockInterviewId, updateMockInterviewScore])

    if (loading || !mockInterviewId || !data) return <Loading />

    return (
        <div className={"flex flex-col gap-10"}>
            <div>
                <h1 className={"text-xl leading-6 font-medium text-gray-900"}>Self Review Mock Interview</h1>
                <p className="mt-1 text-sm text-gray-500">
                    Try and become a interviewer! Evaluate your interviewing skills will help you on interview.
                </p>
            </div>
            <div className={"bg-white shadow overflow-hidden sm:rounded-md p-5"}>
                <div>
                    <h1 className={"text-xl leading-6 font-medium text-gray-900"}>Interview Question</h1>
                    <p className="mt-1 text-gray-500">{data.mockInterview.question}</p>
                </div>
                <div className={"flex justify-center items-center m-10"}>
                    <ReactPlayer url={`${API_URL}/video/${data.mockInterview.videoUrl}`} controls />
                </div>
                <div className={"flex flex-col gap-3"}>
                    <div className={"text-lg font-medium text-gray-900"}>Rate Your Interview</div>
                    <div className={"flex flex-col items-center gap-3"}>
                        <RateInterview
                            title={"How clear was your answer?"}
                            score={communicationScore}
                            onChange={setCommunicationScore}
                        />
                        <RateInterview
                            title={"How confidence did you answer the question?"}
                            score={confidenceScore}
                            onChange={setConfidenceScore}
                        />
                        <RateInterview
                            title={"How was your tone? Was it positive?"}
                            score={positivityScore}
                            onChange={setPositivityScore}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MockInterview
