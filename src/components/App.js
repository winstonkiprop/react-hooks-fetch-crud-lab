
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

//function App() {
import { useEffect } from "react";
function App(questions,setQuestions) {
  const [page, setPage] = useState("List");

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(res => res.json())
      .then(data => console.log(data));
  }
  , []);
  function handleAddNewQuestion(newQuestion){
    const newQuestions = [...questions, newQuestion]
    setQuestions(newQuestions)
    setPage("List")
  }

  function handleDeleteQuestion(deletedQuestionID){
    const newQuestions = questions.filter((question)=>question.id!==deletedQuestionID.id)
    setQuestions(newQuestions)
  }

  function handleUpdateAnswer(updatedQuestion){
    const newQuestions = questions.map((question)=>{
      if(question.correctIndex===updatedQuestion.correctIndex){
        return updatedQuestion
      }
      return question
    })
    setQuestions(newQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm /> : <QuestionList />}
    </main>
  );
}

export default App;
