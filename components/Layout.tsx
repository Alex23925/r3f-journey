import { ReactNode } from 'react'
import Link from 'next/link'
import Meta from './Meta'
import {useAnimation, motion} from 'framer-motion'
import {useState} from 'react'
import '../styles/layout.scss'
import useStore from '../hooks/store'

interface LayoutProps {
    lessonName: string
    lessonLink: string
    lessonNum: number
    chNum: number
    children: ReactNode
}

export default function Layout({ lessonName, lessonLink, lessonNum, chNum, children }: LayoutProps) {

    // Zustand State 
    // const numLinks = useStore(state => state.numLinks)
    // console.log(numLinks)

    // let linksArray = []
    // for(let i =0; i < numLinks; i++) {
    //     linksArray.push(i)
    // }
    // console.log(linksArray)

    // const aLinks =  linksArray.map((linksArray) =>
    //      <div key={linksArray.toString()} className="link">
    //         <Link href={lessonLink}>
    //             <a className="link--styles">{lessonName}</a>
    //         </Link>
    //     </div>
    //     );

    const easing = [.25, .1, .25, 1];

    const start = {
        initial: {
            y: 0,
            x: -240,
        },
        animate: {
            y: 0,
            x: -240,}
    }

    const controlHideNav = useAnimation();
    const controlShowNav = useAnimation();

    const [navOpen, setNavOpen] = useState(true)

    return (
        <>
            <Meta
                lessonName={lessonName}
                lessonNum={lessonNum}
                chNum={chNum}
            />
            <motion.div animate={controlHideNav} className="nav-bar__container">
                <motion.div 
                    className="nav-bar-tab"
                    onClick={() => {
                        setNavOpen(navOpen === true ? false : true)
                        if(navOpen) {
                            controlHideNav.start({
                                y: 0,
                                x: 248,
                                transition: {
                                    duration: .4,
                                    ease: easing,
                                }
                            })
                        } else {
                            controlHideNav.start({
                                y: 0,
                                x: 0,
                                transition: {
                                    duration: .4,
                                    ease: easing,
                                }
                            })
                        }
                    }}
                >
                    
                </motion.div>

                <motion.section className="nav-bar nav-bar--styles">
                    <div className="link">
                        <Link href='/00-playground'>
                            <a className="link--styles">00. Playground</a>
                        </Link>
                    </div>
                    <div className="link">
                        <Link href='/'>
                            <a className="link--styles">01. Basic Scene</a>
                        </Link>
                    </div>
                    <div className="link">
                        <Link href='/geometries-09'>
                            <a className="link--styles">02. Geometries</a>
                        </Link>
                    </div>
                    <div className="link">
                        <Link href='/10-debugUI'>
                            <a className="link--styles">03. Debug UI</a>
                        </Link>
                    </div>
                    <div className="link">
                        <Link href='/11-textures'>
                            <a className="link--styles">04. Textures</a>
                        </Link>
                    </div>
                    <div className="link">
                        <Link href='/12-materials'>
                            <a className="link--styles">05. Materials</a>
                        </Link>
                    </div>
                    <div className="link">
                        <Link href='/13-text'>
                            <a className="link--styles">06. Text</a>
                        </Link>
                    </div>
                    <div className="link">
                        <Link href='/14-lights'>
                            <a className="link--styles">07. Lights</a>
                        </Link>
                    </div>
                    <div className="link">
                        <Link href='/15-shadows'>
                            <a className="link--styles">08. Shadows</a>
                        </Link>
                    </div>
                    <div className="link">
                        <Link href='/16-haunted-house'>
                            <a className="link--styles">09. Haunted House</a>
                        </Link>
                    </div>
                    <div className="link">
                        <Link href='/17-particles'>
                            <a className="link--styles">10. Particles</a>
                        </Link>
                    </div>
                    <div className="link">
                        <Link href='/18-galaxy'>
                            <a className="link--styles">11. Galaxy Generator</a>
                        </Link>
                    </div>
                </motion.section>
            </motion.div>
            <main className="page-wrapper">{children}</main>
        </>
    )
}