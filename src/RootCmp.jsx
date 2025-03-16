import React from 'react'
import { Routes, Route, Navigate } from 'react-router'

// import { CarIndex } from './pages/CarIndex.jsx'
// import { ReviewIndex } from './pages/ReviewIndex.jsx'
// import { ChatApp } from './pages/Chat.jsx'
// import { AdminIndex } from './pages/AdminIndex.jsx'

// import { UserDetails } from './pages/UserDetails'
import { AppHeader } from './cmps/AppHeader'
// import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { StoryIndex } from './pages/StoryIndex.jsx'
import { StoryDetails } from './pages/StoryDetails.jsx'
import { userService } from './services/user'
import { UserPage } from './pages/UserPage.jsx'
import { HomePage } from './pages/HomePage.jsx'

function RouteGuard({ children }) {
    const user = userService.getLoggedinUser()


    if (!user) return <Navigate to="/login" />
    return children
}

export function RootCmp() {
    return (
        <div className="main-container">
            {/* <AppHeader /> */}
            {/* <UserMsg /> */}

            <main>
                <Routes>
                    <Route path="" element={<RouteGuard><StoryIndex /></RouteGuard>}>
                        <Route path="" element={<HomePage />} />
                        <Route path="user/:userId" element={<UserPage />} />
                    </Route>
                    

                    {/* <Route path="" element={<RouteGuard><StoryIndex /></RouteGuard>}> */}
                    {/* <Route path="" element={<HomePage />} /> */}
                    {/* <Route path="story/:storyId" element={<StoryDetails />} /> */}
                    {/* <Route path="team" element={<AboutTeam />} /> */}
                    {/* <Route path="vision" element={<AboutVision />} /> */}
                    {/* </Route> */}
                    {/* <Route path="car" element={<CarIndex />} /> */}
                    {/* <Route path="car/:carId" element={<CarDetails />} /> */}
                    {/* <Route path="user/:id" element={<UserDetails />} /> */}
                    {/* <Route path="review" element={<ReviewIndex />} /> */}
                    {/* <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} /> */}
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


