import { configureStore } from "@reduxjs/toolkit";
import sizes from "./sizes";

export default configureStore({
    reducer: {
        sizes_: sizes
    }
})