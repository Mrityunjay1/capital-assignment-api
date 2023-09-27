import logo from "./logo.svg";
import "./App.css";
import { Card, Space } from "antd";
import { useEffect, useState } from "react";
import { ProfessionalI } from "./types";
import PopupModal from "./components/PopupModal";
import ReusableCard from "./components/ReusableCard";
import { fetchAllData, updateFormData } from "./apiService";

function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");

  const [allData, setAllData] = useState<ProfessionalI>();
  const [questionsModalValue, setQuestionsModalValue] = useState("");
  const [formData, setFormData] = useState<any>(null);

  const fetchData = async () => {
    try {
      const data = await fetchAllData();
      setAllData(data);
      setFormData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const infoData = allData?.personalInformation
    ? Object.keys(allData.personalInformation)
    : [];

  const profileData = allData?.profile ? Object.keys(allData.profile) : [];

  const personalInfo = allData?.personalInformation!;
  const profileinfo = allData?.profile!;

  const showModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSave = async (selectValue: string, inputValue: string) => {
    const updatedFormData = { ...formData };

    if (
      updatedFormData &&
      updatedFormData.personalInformation &&
      updatedFormData.personalInformation.personalQuestions
    ) {
      const personalQuestions =
        updatedFormData.personalInformation.personalQuestions;
      const updatedQuestions = personalQuestions.map((question: any) => {
        if (question.type === selectValue) {
          return { ...question, question: inputValue };
        }
        return question;
      });

      updatedFormData.personalInformation.personalQuestions = updatedQuestions;
    }

    try {
      const updatedData = await updateFormData(updatedFormData);
      console.log("Updated data:", updatedData);
      setFormData(updatedFormData);
    } catch (error) {
      console.error("Error updating data:", error);
    }

    console.log("Saving newValue:", selectValue);
    console.log("Saving inputValue:", inputValue);
  };

  const startEdit = (questionType: string, questionContent: string) => {
    setEditingQuestion(questionType);
    setEditedContent(questionContent);
  };

  const handleSaveEditedQuestion = (questionType: string) => {
    const editedQuestion = {
      type: questionType,
      question: editedContent,
    };

    fetch("http://127.0.0.1:4010/api/1.0/programs/2/application-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        profileQuestions: profileinfo.profileQuestions.map((item) =>
          item.type === questionType ? editedQuestion : item
        ),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated data:", data);
        setEditingQuestion(null);
        setEditedContent("");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const cancelEdit = () => {
    setEditingQuestion(null);
    setEditedContent("");
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-slate-200 p-4 hidden md:flex flex-col sticky top-0 h-screen">
        <div className="px-4">
          <img src={logo} alt="my logo" />
        </div>
        <div className="justify-stretch py-5 grid grid-cols-1 gap-3 my-auto">
          <div className="bg-slate-100 shadow-md rounded-md px-4 py-3">
            React
          </div>
          <div className="bg-slate-100 shadow-md rounded-md px-4 py-3">
            Typescript
          </div>
          <div className="bg-slate-100 shadow-md rounded-md px-4 py-3">
            Ant Design
          </div>
        </div>
        <div>2023</div>
      </div>
      <div className="w-3/4 px-4 overflow-y-auto">
        <div className="text-4xl pt-10">Capital-Assignment</div>

        <div className="block">
          <Space direction="vertical" size={16}>
            <ReusableCard
              personalInfo={personalInfo}
              infoData={infoData}
              showModal={showModal}
              title="Professional Details"
            />
            <PopupModal
              visible={modalVisible}
              onClose={closeModal}
              title="Questions"
              value={questionsModalValue}
              onSave={handleSave}
              initialSelectValue={questionsModalValue}
            />

            <ReusableCard
              infoData={profileData}
              personalInfo={profileinfo}
              title="Profile"
              showModal={showModal}
            />
            <Card
              title="Additional Questions"
              style={{ width: 500 }}
              headStyle={{ backgroundColor: "#D0F7FA", border: 0 }}
            >
              {profileinfo && profileinfo["profileQuestions"]
                ? profileinfo["profileQuestions"].map((item, index) => (
                    <div
                      key={index}
                      className="border-b-2 py-4 border-gray-400 flex items-center justify-between "
                    >
                      {editingQuestion === item.type ? (
                        <div>
                          <input
                            type="text"
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            className="text-left text-md font-bold"
                          />
                        </div>
                      ) : (
                        <div>
                          <p className="text-left text-sm text-gray-300 ">
                            {item.type}
                          </p>
                          <p className="text-left text-md font-bold">
                            {item.question}
                          </p>
                        </div>
                      )}
                      <div>
                        {editingQuestion === item.type ? (
                          <>
                            <button
                              onClick={() =>
                                handleSaveEditedQuestion(item.type)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => cancelEdit()}
                              className="text-red-500"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => startEdit(item.type, item.question)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                : null}
            </Card>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
