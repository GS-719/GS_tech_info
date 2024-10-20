import React from 'react'
import "../styles/Privacy_and_TOS.css"
import Link from 'next/link'


const page = () => {
    return (
        <div>
            <div className='main'>
                <div className='gridContainer'>
                    <div className='gridItem'>1</div>
                    <div className='gridItem main_content'>
                        <h1>Terms and Conditions of Use</h1>
                        <br />
                        <div>
                            <h2>1. Terms</h2>
                            <br />
                            <p>By accessing this Website, accessible from <Link href="https://gs-tech-info.vercel.app/" target='_blank'>https://gs-tech-info.vercel.app/</Link>, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law.</p>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div>
                            <h2>2. Use License</h2>
                            <br />
                            <p>Permission is granted to temporarily download one copy of the materials on GS Tech Info's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                            <br />
                            <div>
                                <div>
                                    <p>1. modify or copy the materials;</p>
                                    <p>2. use the materials for any commercial purpose or for any public display</p>
                                    <p>3. attempt to reverse engineer any software contained on GS Tech Info's Website;</p>
                                    <p>4. remove any copyright or other proprietary notations from the materials; or</p>
                                    <p>5. transferring the materials to another person or "mirror" the materials on any other server.</p>
                                </div>
                                <br />
                                <p>This will let GS Tech Info to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format</p>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div>
                            <h2>3. Disclaimer</h2>
                            <br />
                            <p>All the materials on GS Tech Info's Website are provided "as is". GS Tech Info makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, GS Tech Info does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div>
                            <h2>4. Limitations</h2>
                            <br />
                            <p>GS Tech Info or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on GS Tech Info's Website, even if GS Tech Info or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div>
                            <h2>5. Revisions and Errata</h2>
                            <br />
                            <p>The materials appearing on GS Tech Info's Website may include technical, typographical, or photographic errors. GS Tech Info will not promise that any of the materials in this Website are accurate, complete, or current. GS Tech Info may change the materials contained on its Website at any time without notice. GS Tech Info does not make any commitment to update the materials.</p>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div>
                            <h2>6. Links</h2>
                            <br/>
                            <p>GS Tech Info has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by GS Tech Info of the site. The use of any linked website is at the user's own risk.</p>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div>
                            <h2>7. Site Terms of Use Modifications</h2>
                            <br/>
                            <p>GS Tech Info may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div>
                            <h2>8. Your Privacy</h2>
                            <br/>
                            <p>Please read our <Link href="/Privacy">Privacy Policy</Link></p>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        <div>
                            <h2>9. Governing Law</h2>
                            <br/>
                            <p>Any claim related to GS Tech Info's Website shall be governed by the laws of in without regards to its conflict of law provisions.</p>
                        </div>
                        <br/>
                    </div>
                    <div className='gridItem'>3</div>
                </div>
            </div>
        </div>
    )
}

export default page
