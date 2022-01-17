import React, { useEffect } from "react"
import Webcam from "react-webcam"
import { gql, useMutation, useQuery } from "@apollo/client"
import Loading from "../component/loading/Loading"
import SimpleButton from "../component/buttons/SimpleButton"
import { useNavigate, useParams } from "react-router-dom"
import { DASHBOARD_PAGE, INTERVIEW_PAGE, MOCK_INTERVIEW_VIEW_PAGE } from "../constant/routes"
import { BellIcon } from "@heroicons/react/solid"
import GoBackButton from "../component/buttons/GoBackButton"

const GET_INTERVIEW_QUESTION = gql`
    query getInterviewQuestion {
        interviewQuestion {
            id
            question
            tip
        }
    }
`

interface GetInterviewQuestionData {
    interviewQuestion: {
        id: string
        question: string
        tip: string
    }
}

const UPLOAD_FILE = gql`
    mutation ($companyDescriptionId: ID!, $roleId: ID!, $interviewQuestionId: ID!, $file: Upload!) {
        uploadMockInterview(
            companyDescriptionId: $companyDescriptionId
            roleId: $roleId
            interviewQuestionId: $interviewQuestionId
            file: $file
        )
    }
`

const MockInterview: React.FC = () => {
    const [start, setStart] = React.useState<boolean>(false)
    const [recordedChunks, setRecordedChunks] = React.useState<Blob[]>([])

    const [deviceId, setDeviceId] = React.useState<string>("")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([])

    const webcamRef = React.useRef<Webcam>(null)
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null)

    const { data, loading } = useQuery<GetInterviewQuestionData>(GET_INTERVIEW_QUESTION)
    const [uploadMockInterview] = useMutation(UPLOAD_FILE)
    const { companyDescriptionId, roleId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if (!start && recordedChunks.length) {
            const interviewQuestionId = data?.interviewQuestion.id
            const file = new File(recordedChunks, "abcd.webm", { type: "video/webm" })
            uploadMockInterview({
                variables: {
                    companyDescriptionId,
                    roleId,
                    interviewQuestionId,
                    file,
                },
            }).then(({ data }) => {
                setRecordedChunks([])
                if (companyDescriptionId && roleId) {
                    navigate(
                        MOCK_INTERVIEW_VIEW_PAGE.path
                            .replace(":companyDescriptionId", companyDescriptionId)
                            .replace(":roleId", roleId)
                            .replace(":mockInterviewId", data.uploadMockInterview)
                    )
                }
            })
        }
    }, [start, recordedChunks, uploadMockInterview, companyDescriptionId, data, navigate, roleId])

    const handleDataAvailable = React.useCallback(
        ({ data }: BlobEvent) => {
            if (data.size > 0) {
                setRecordedChunks((prev) => prev.concat(data))
            }
        },
        [setRecordedChunks]
    )

    const handleStart = React.useCallback(() => {
        if (webcamRef?.current && webcamRef.current.stream) {
            setStart(true)
            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                mimeType: "video/webm",
            })
            mediaRecorderRef.current.ondataavailable = handleDataAvailable
            mediaRecorderRef.current.start()
        }
    }, [webcamRef, setStart, mediaRecorderRef, handleDataAvailable])

    const handleDevices = React.useCallback(
        (mediaDevices: MediaDeviceInfo[]) => {
            mediaDevices = mediaDevices.filter(({ kind }) => kind === "videoinput")
            if (mediaDevices.length > 0) {
                setDeviceId(mediaDevices[0].deviceId)
                setDevices(mediaDevices)
            }
        },
        [setDevices]
    )

    const handleStop = React.useCallback(() => {
        if (mediaRecorderRef?.current) {
            mediaRecorderRef.current.stop()
            setStart(false)
        }
    }, [mediaRecorderRef, setStart])

    React.useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then((mediaDevices) => {
            handleDevices(mediaDevices)
        })
    }, [handleDevices])

    if (loading || !data) return <Loading />

    if (!companyDescriptionId || !roleId) {
        navigate(DASHBOARD_PAGE.path)
        return null
    }

    return (
        <div>
            <div className={"my-2"}>
                <GoBackButton
                    link={INTERVIEW_PAGE.path
                        .replace(":companyDescriptionId", companyDescriptionId)
                        .replace(":roleId", roleId)}
                    title={"Go Back To Interview Preparation"}
                />
            </div>
            <div className={"bg-white shadow overflow-hidden sm:rounded-md p-5"}>
                <div className={"border-b-2 border-dashed p-3"}>
                    <div>
                        <h2 className={"text-lg leading-6 font-medium text-gray-900"}>Interview Question</h2>
                        <p className="mt-1 text-base text-gray-500">{data.interviewQuestion.question}</p>
                    </div>
                </div>
                <div className={"flex justify-center items-center border-b-2 border-dashed p-5"}>
                    <Webcam audio muted videoConstraints={{ deviceId: deviceId }} ref={webcamRef} />
                </div>
                <div className={"p-5 text-white font-medium"}>
                    <div className="p-2 rounded-lg bg-yellow-500 shadow-lg sm:p-3">
                        <div className={"flex gap-2"}>
                            <div>
                                <span className="flex p-1 rounded-lg bg-yellow-600">
                                    <BellIcon className="h-5 w-5 text-white" aria-hidden="true" />
                                </span>
                            </div>
                            <span className={"text-lg font-medium mb-2 h-full "}>Quick Tip!</span>
                        </div>
                        <div className={"text-sm"}>{data.interviewQuestion.tip}</div>
                    </div>
                </div>
                <div className={"flex justify-center items-center p-5"}>
                    {start ? (
                        <SimpleButton label={"Done Interview"} onClick={handleStop} />
                    ) : (
                        <SimpleButton label={"Start Interview"} onClick={handleStart} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MockInterview
