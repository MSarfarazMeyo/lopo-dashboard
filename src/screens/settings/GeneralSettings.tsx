import React, { useState, useEffect } from "react";
import { Button, Form, message, Skeleton } from "antd";
import "tailwindcss/tailwind.css";

import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

import { useGetPageData, useUpdatePageData } from "../../hooks/useSettings";

const GeneralSettings: React.FC = () => {
  const { page } = useParams();
  const [termsContent, setTermsContent] = useState<any | null>(null);
  const [privacyContent, setPrivacyContent] = useState<any | null>(null);
  const [editMode, setEditMode] = useState<
    "terms_and_conditions" | "privacy_policy" | null
  >(null);

  const { data: termsData, isLoading: isLoadingTerms } = useGetPageData(
    "terms_and_conditions"
  );
  const { data: privacyData, isLoading: isLoadingPrivacy } =
    useGetPageData("privacy_policy");

  const updateMutation = useUpdatePageData();

  useEffect(() => {
    if (termsData) setTermsContent(termsData.content);
    if (privacyData) setPrivacyContent(privacyData.content);
  }, [termsData, privacyData]);

  const handleSave = (pagee: "terms_and_conditions" | "privacy_policy") => {
    const content =
      pagee === "terms_and_conditions" ? termsContent : privacyContent;

    try {
      // Assuming markdown content, we send the raw text for storage
      updateMutation.mutate(
        { page: pagee, newData: { content } },
        {
          onSuccess: () => {
            message.success(`${pagee} updated successfully!`);
            setEditMode(null);
          },
          onError: () => {
            message.error(`Failed to update ${pagee}.`);
          },
        }
      );
    } catch (err) {
      message.error("Error updating content.");
    }
  };

  if (isLoadingTerms || isLoadingPrivacy) {
    return (
      <div className="p-4">
        <Skeleton active />
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">General Settings</h1>

      {/* Terms Section */}
      {page === "terms_and_conditions" && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="text-xl font-semibold mb-2">Terms and Conditions</h2>
          {editMode === "terms_and_conditions" ? (
            <Form layout="vertical">
              <Form.Item label="Content">
                <MDEditor
                  value={termsContent}
                  onChange={(val) => setTermsContent(val || "")}
                  height="100%"
                />
              </Form.Item>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setEditMode(null)}>Cancel</Button>
                <Button
                  type="primary"
                  onClick={() => handleSave("terms_and_conditions")}
                >
                  Save
                </Button>
              </div>
            </Form>
          ) : (
            <div>
              <MDEditor.Markdown source={termsContent} />
              <Button
                type="primary"
                className="w-[100%]"
                onClick={() => setEditMode("terms_and_conditions")}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Privacy Policy Section */}
      {page === "privacy_policy" && (
        <div className="bg-white p-4 rounded shadow w-[70vw]">
          <h2 className="text-xl font-semibold mb-2">Privacy Policy</h2>
          {editMode === "privacy_policy" ? (
            <Form layout="vertical">
              <Form.Item label="Content">
                <MDEditor
                  value={privacyContent}
                  onChange={(val) => setPrivacyContent(val || "")}
                  height="100%"
                />
              </Form.Item>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setEditMode(null)}>Cancel</Button>
                <Button
                  type="primary"
                  onClick={() => handleSave("privacy_policy")}
                >
                  Save
                </Button>
              </div>
            </Form>
          ) : (
            <div>
              <MDEditor.Markdown source={privacyContent} />
              <Button
                type="primary"
                className="w-[100%]"
                onClick={() => setEditMode("privacy_policy")}
              >
                Edit
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GeneralSettings;
