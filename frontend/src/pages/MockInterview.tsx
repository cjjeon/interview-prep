import React, { useEffect } from "react"
import Webcam from "react-webcam"
import { gql, useMutation, useQuery } from "@apollo/client"
import Loading from "../component/loading/Loading"
import SimpleButton from "../component/buttons/SimpleButton"
import { useNavigate, useParams } from "react-router-dom"
import { MOCK_INTERVIEW_VIEW_PAGE } from "../constant/routes"

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

    if (loading) return <Loading />

    return (
        <div className={"flex flex-col gap-3 p-3"}>
            <div className={"text-lg"}>
                <div>Interview Question:</div>
                <div className={"font-bold"}>{data?.interviewQuestion.question}</div>
            </div>
            <div className={"flex justify-center items-center px-3"}>
                <Webcam audio muted videoConstraints={{ deviceId: deviceId }} ref={webcamRef} />
            </div>
            <div>
                {start ? (
                    <SimpleButton label={"Done Interview"} onClick={handleStop} />
                ) : (
                    <SimpleButton label={"Begin Interview"} onClick={handleStart} />
                )}
            </div>
        </div>
    )
}

export default MockInterview
