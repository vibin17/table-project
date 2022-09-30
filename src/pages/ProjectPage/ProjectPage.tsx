import { useParams } from "react-router"

const ProjectPage = () => {
    let id = useParams().id
    return (
        <>
            Project {id}
        </>
    )
}

export default ProjectPage