import React from "react"
import Webcam from "react-webcam"
import { gql, useQuery } from "@apollo/client"
import Loading from "../../component/loading/Loading"
import SimpleButton from "../../component/buttons/SimpleButton"

const GET_INTERVIEW_QUESTION = gql`
    query getInterviewQuestion {
        interviewQuestion {
            id
            question
            tip
        }
    }
`

interface GetInterviewQuestion {
    interviewQuestion: {
        id: string
        question: string
        tip: string
    }
}

const MockInterview: React.FC = () => {
    const [start, setStart] = React.useState<boolean>(false)
    const [recordedChunks, setRecordedChunks] = React.useState<Blob[]>([])

    const [deviceId, setDeviceId] = React.useState<string>("")
    const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([])

    const webcamRef = React.useRef<Webcam>(null)
    const mediaRecorderRef = React.useRef<MediaRecorder | null>(null)

    const { data, loading } = useQuery<GetInterviewQuestion>(GET_INTERVIEW_QUESTION)

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
            mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable)
            mediaRecorderRef.current.start()
        }
    }, [webcamRef, setStart, mediaRecorderRef])

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
    }, [mediaRecorderRef, webcamRef, setStart])

    const handleDownload = React.useCallback(() => {
        if (recordedChunks.length) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm",
            })
            const url = URL.createObjectURL(blob)
            const a = document.createElement("a")
            document.body.appendChild(a)
            a.href = url
            a.download = "react-webcam-stream-capture.webm"
            a.click()
            window.URL.revokeObjectURL(url)
            setRecordedChunks([])
        }
    }, [recordedChunks])

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
                    <SimpleButton label={"Done Interview"} onClick={handleStop} color={"yellow"} />
                ) : (
                    <SimpleButton label={"Begin Interview"} onClick={handleStart} color={"yellow"} />
                )}
            </div>
        </div>
    )
}

export default MockInterview
