import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import "./styles/generalStyle.scss";
import StoreProvider from "./store/ContextStore";
import { BrowserRouter } from "react-router";
import { useDispatch } from "react-redux";
import { uploadTokenFromLocalStorage } from "./components/Auth/AuthReducer";

function App() {
    let dispatch = useDispatch();
    dispatch(uploadTokenFromLocalStorage());
    return (
        <BrowserRouter>
            <Header />
            <Main />
            <Footer />
        </BrowserRouter>
    );
}

export default App;
