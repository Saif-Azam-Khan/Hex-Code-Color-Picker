import { render, screen, waitFor, fireEvent} from "@testing-library/react";
import '@testing-library/jest-dom'; // Ensure jest-dom is imported
// import '@testing-library/dom';
import App from "./App";


describe("App",()=>{
  test('should have a heading with Hex color code', () => {
    render(<App />);
    const heading = screen.getByText(/^#/); // regex to match text starting with #
    expect(heading).toBeInTheDocument();
  });

  test('should have 3 color boxes',async () => {
    render(<App />);
    const container = screen.getByTestId('color-container');
    const children = container.children.length;
    expect(children).toEqual(3);
  });

  test('should display a message if the user selects the correct color',()=>{
    render(<App />);
    const correctBox= screen.getByTestId("correct-color")
    fireEvent.click(correctBox)
    const correctMessage=screen.getByText(/Correct!/)
    expect(correctMessage).toBeInTheDocument()
  })

  test('should display a message if the user selects the in-correct color',()=>{
    render(<App />);
    const inCorrectBox= screen.getAllByTestId("incorrect-color")[0]
    fireEvent.click(inCorrectBox)
    const inCorrectMessage=screen.getByText(/Incorrect!/)
    expect(inCorrectMessage).toBeInTheDocument()
  })

  test("should display the play again button conditionally",()=>{
    render(<App />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
    const inCorrectBox= screen.getAllByTestId("incorrect-color")[0]
    fireEvent.click(inCorrectBox)
    const button= screen.queryByRole('button')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()

  })
})
