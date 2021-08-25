import { userService } from "../services/user.service.js"
import { UserMail } from "./UserMail.jsx"


export class MailApp extends React.Component {
    state = {
        users: null,
        currUser: null
    }

    componentDidMount() {
        this.loadUsers()
    }

    loadUsers = () => {
        userService.query()
            .then(users => {
                this.setState({users})
            })
    }
    onGetUser = (userId) => {
        userService.getUserById(userId)
            .then(currUser => {
                this.setState({currUser})
            })
    }


    render() {
        const { users, currUser } = this.state
        if (!users) return <div>Loading...</div>
        return (
            <section className="mail-app">
                <div className="user-list">
                    {users.map(user => (
                        <div className="user-card">
                            <h1>{user.username}</h1>
                            <h1>{user.emailAddress}</h1>
                            <button className="login-btn" onClick={() => {
                                this.onGetUser(user.id)}}>Go</button>
                        </div>
                    ))}
                </div>
             {currUser && <UserMail currUser={currUser} />} 
            </section>
        )
    }

}