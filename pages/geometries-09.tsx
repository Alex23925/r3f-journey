import Layout from '../components/Layout'
import CanvasLayout from '../components/CanvasLayout'
import SceneNine from '../components/ch1-scenes/SceneNine'

export default function geometries09() {
    return(
        <>
            <Layout 
                lessonName='First Lesson' 
                lessonNum={0}
                chNum={1}
            >
                <CanvasLayout>
                    <SceneNine />
                </CanvasLayout>
            </Layout>
        </> 
    
    )
}