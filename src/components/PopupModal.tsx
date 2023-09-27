import React, { useState } from "react";
import { Modal, Button, Select, Input } from "antd";

interface PopupModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  value: string; // Add the 'value' prop
  onSave: (newValue: string, inputValue: string) => void;
  initialSelectValue: string;
}

const PopupModal: React.FC<PopupModalProps> = ({
  visible,
  onClose,
  title,
  value,
  onSave,
  initialSelectValue,
}) => {
  const [questionsModalValue, setQuestionsModalValue] =
    useState(initialSelectValue);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (newValue: string) => {
    setQuestionsModalValue(newValue);
  };

  const handleInputValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSave = () => {
    onSave(questionsModalValue, inputValue); // Call the onSave callback with the new value
    onClose(); // Close the modal
  };
  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onClose}
      className="modalStyle"
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        questionsModalValue && (
          <Button className="bg-green-300" key="save" onClick={handleSave}>
            Save
          </Button>
        ),
      ]}
    >
      <div>
        <p>Type</p>
        <Select
          defaultValue="Select Options"
          className="w-full"
          onChange={handleChange}
          value={questionsModalValue}
          options={[
            { value: "paragraph", label: "Paragraph" },
            { value: "multiplechoice", label: "Multiple Choice" },
            { value: "dropdown", label: "Dropdown" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
        {questionsModalValue === "paragraph" && (
          <div className="mt-4">
            <label>Questions</label>
            <Input placeholder="Type Here" onChange={handleInputValueChange} />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PopupModal;
