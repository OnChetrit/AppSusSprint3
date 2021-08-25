import {UserPreview} from './cmps/user-preview.jsx'
import {Home} from './pages/home.jsx'

// Simple React Component
export function App() {
    return <section className="app">
       <h1>My App</h1>
       <UserPreview/>
       <Home/>
    </section>
}



// Using Class:
// export class App extends React.Component {
//     render() {
//         return (
//             <div>
//                 <header>
//                     <h1>Lets Play</h1>
//                 </header>
//                 <main>
//                     <Home />
//                 </main>
//             </div>
//         )
//     }
// }

