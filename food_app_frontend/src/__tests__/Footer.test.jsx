import "@testing-library/jest-dom"
import { MemoryRouter } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import { render } from "@testing-library/react"
describe("Footer",()=>{
    test("footer to match snashot",()=>{
        const footer=render(
            <MemoryRouter>
                <Footer/>
            </MemoryRouter>
        )
        expect(footer).toMatchSnapshot()
    })
})

