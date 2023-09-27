import { Card, Checkbox, Switch } from "antd";
import React from "react";
import { PersonalInformation, Profile } from "../types";

interface ReusableCardProps {
  infoData: string[];
  personalInfo: PersonalInformation | Profile;
  showModal: () => void;
  title: string;
}

const ReusableCard = ({
  infoData,
  personalInfo,
  showModal,
  title,
}: ReusableCardProps) => {
  return (
    <Card
      title={title}
      style={{ width: 500 }}
      headStyle={{ backgroundColor: "#D0F7FA", border: 0 }}
    >
      {infoData.map((item, index) => {
        if (item === "personalQuestions" || item === "profileQuestions")
          return null;

        // Use a type assertion to specify the expected type
        const property = (personalInfo as PersonalInformation)[
          item as keyof PersonalInformation
        ];

        if (property) {
          return (
            <div
              key={index}
              className="border-b-2 py-4 border-gray-400 flex items-center w-full justify-between"
            >
              <p className="text-left font-semibold ">{item}</p>
              {typeof property === "object" && "show" in property ? (
                <>
                  <Checkbox>Internal</Checkbox>
                  <div className="flex gap-2">
                    <Switch checked={property.show} />
                    <p>{property.show ? "Hide" : "Show"}</p>
                  </div>
                </>
              ) : null}
            </div>
          );
        }

        return null; // Property not found in PersonalInformation
      })}

      <button
        onClick={showModal}
        className="font-bold flex items-center justify-start"
      >
        + Add a Question
      </button>
    </Card>
  );
};

export default ReusableCard;
