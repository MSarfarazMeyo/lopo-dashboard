import React, { useState, useEffect } from "react";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useLocation, useNavigate } from "react-router-dom";
import {
  useContestByAlias,
  useCreateContest,
  useUpdateContest,
} from "../../hooks/useContests ";
import { useCreateBucket, useDeleteBucket } from "../../hooks/useBuckets";
import { useQueryClient } from "@tanstack/react-query";
import { showError, showSuccess } from "../../utils/notification";
import FullScreenLoader from "../../components/loader/FullScreenLoader";
import ContestParticipants from "./ContestParticipants";
import { useUploadFile } from "../../hooks/useUpload";

const ContextForm = () => {
  const location = useLocation();
  const contestId = location.state;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: uploadFile } = useUploadFile();
  const { data, error } = useContestByAlias(contestId!);
  const { mutate: editContest } = useUpdateContest();
  const { mutate: addContest } = useCreateContest();
  const { mutate: addBucket } = useCreateBucket();

  const [contestData, setContestData] = useState<any>({
    id: 0,
    name: "",
    alias: "",
    description: "",
    contentExample: "",
    prize: "",
    prizeDescription: "",
    creditsRequired: "",
    country: "",
    city: "",
    address: "",
    status: "draft",
    gender: "",
    ageFrom: "",
    ageTo: "",
    termsConditions: "",
    prizePhoto: "",
    preview: "",
    bucketName: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [previewFile, setPreviewFile] = useState<any>(null);
  const [prizeFile, setPrizeFile] = useState<any>(null);

  useEffect(() => {
    if (data && contestId) {
      setContestData({
        id: data.contestID,
        name: data.name || "",
        alias: data.alias || "",
        description: data.description || "",
        preview: data.preview || "",
        contentExample: data.contentExample || "",
        prizeDescription: data.prizeDescription || "",
        prizePhoto: data.prizePhoto || "",
        prize: data.prize || "",

        creditsRequired: data.creditsRequired || "",
        country: data.country || "",
        city: data.city || "",
        address: data.address || "",
        status: data.status || "draft",
        gender: data.gender || "",
        ageFrom: data.ageFrom || "",
        ageTo: data.ageTo || "",
        bucketName: data?.bucketName || "",

        termsConditions: data.termsConditions || "",
      });

      // Set start and end dates if they exist in the fetched data
      setStartDate(data.startDate ? new Date(data.startDate) : new Date());
      setEndDate(data.endDate ? new Date(data.endDate) : new Date());
    }
  }, [data]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setContestData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    let bucketName = contestId
      ? contestData.bucketName
      : contestData.bucketName
      ? contestData.bucketName
      : contestData.name;
    const contestBody = { ...contestData, startDate, endDate };

    try {
      // Create Bucket

      if (!contestId && !contestData.bucketName) {
        const bucketResponse = await createBucket(bucketName);
        bucketName = bucketResponse?.bucketName;

        setContestData((prevState: any) => ({
          ...prevState,
          bucketName: bucketName,
        }));
        if (!bucketName) {
          throw new Error("Bucket creation failed: No bucket name returned");
        }
      }

      // Upload Preview File
      if (previewFile) {
        contestBody.preview = await uploadSingleFile(previewFile, bucketName);
        setPreviewFile(null);
      }

      // Upload Prize File
      if (prizeFile) {
        contestBody.prizePhoto = await uploadSingleFile(prizeFile, bucketName);
        setPrizeFile(null);
      }
      await saveContest(contestBody, bucketName);
    } catch (error) {
      console.error("Error handling submit:", error);
      showError("", "Error handling submit");
    } finally {
      setIsLoading(false);
    }
  };

  // Separate function to create a bucket
  const createBucket = (bucketName: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      addBucket(
        { bucketName },
        {
          onSuccess: resolve,
          onError: (error) => {
            console.error("Bucket creation error:", error);
            showError("Bucket creation error");
            reject(error);
          },
        }
      );
    });
  };

  // Separate function to upload a single file
  const uploadSingleFile = (
    file: File,
    bucketName: string
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucketName", bucketName);

    return new Promise((resolve, reject) => {
      uploadFile(
        {
          formData,
          onUploadProgress: () => {}, // Optional progress tracking
        },
        {
          onSuccess: (response) => {
            if (response?.fileUrl) {
              resolve(response.fileUrl);
            } else {
              reject(new Error("No file URL in response"));
            }
          },
          onError: (error) => {
            console.error("File upload error:", error);
            showError("File upload error");
            reject(error);
          },
        }
      );
    });
  };

  // Separate function to save the contest
  const saveContest = (contestBody: any, bucketName: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (contestId) {
        editContest(
          { id: contestBody.id, contestData: contestBody },
          {
            onSuccess: (resp) => {
              showSuccess("", "Contest saved successfully");
              queryClient.invalidateQueries({ queryKey: ["all-contests"] });
              navigate("/dashboard/contests");
            },
            onError: (error) => {
              console.error("Edit contest error:", error);
              showError("", "Edit contest error:");
              reject(error);
            },
          }
        );
      } else {
        addContest(
          { ...contestBody, bucketName },
          {
            onSuccess: (resp) => {
              showSuccess("", "Contest saved successfully");
              queryClient.invalidateQueries({ queryKey: ["all-contests"] });
              navigate("/dashboard/contests");
            },
            onError: (error) => {
              console.error("Create contest error:", error);
              showError("", "Create contest error:");
              reject(error);
            },
          }
        );
      }
    });
  };

  const handleChangeStartDate = (date: any) => setStartDate(date);
  const handleChangeEndDate = (date: any) => setEndDate(date);

  const handleFileChange = (e: any, field: any) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);

      if (field === "preview") {
        setPreviewFile(file);
        setContestData((prevState: any) => ({
          ...prevState,
          preview: fileURL,
        }));
      } else if (field === "prizePhoto") {
        setPrizeFile(file);
        setContestData((prevState: any) => ({
          ...prevState,
          prizePhoto: fileURL,
        }));
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md text-left">
      {isLoading && <FullScreenLoader />}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {contestId ? "Edit Contest" : "Create New Contest"}
      </h2>
      <form>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Contest Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={contestData.name}
              onChange={handleChange}
              placeholder="Enter Contest Name"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Contest Description
            </label>
            <textarea
              name="description"
              id="description"
              value={contestData.description}
              onChange={handleChange}
              placeholder="Enter Contest Description"
              rows={4}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            {contestData?.preview && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Image Preview:</p>
                <img
                  src={contestData?.preview}
                  alt="Preview"
                  className="my-2 max-w-full max-h-[150px] border border-gray-300 rounded-md object-contain"
                />
              </div>
            )}

            <label
              htmlFor="preview"
              className="block text-sm font-medium text-gray-700"
            >
              Contest Photo
            </label>
            <input
              type="file"
              name="preview"
              id="preview"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "preview")}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="contentExample"
              className="block text-sm font-medium text-gray-700"
            >
              Contest Example (Optional)
            </label>
            <input
              type="text"
              name="contentExample"
              id="contentExample"
              value={contestData.contentExample}
              onChange={handleChange}
              placeholder="Enter Contest Example URL"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="prize"
              className="block text-sm font-medium text-gray-700"
            >
              Prize Name
            </label>
            <input
              type="text"
              name="prize"
              id="prize"
              value={contestData.prize}
              onChange={handleChange}
              placeholder="Enter Prize Name"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="prizeDescription"
              className="block text-sm font-medium text-gray-700"
            >
              Prize Description
            </label>
            <textarea
              name="prizeDescription"
              id="prizeDescription"
              value={contestData.prizeDescription}
              onChange={handleChange}
              placeholder="Enter Prize Description"
              rows={3}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            {contestData?.prizePhoto && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Image Preview:</p>
                <img
                  src={contestData?.prizePhoto}
                  alt="Preview"
                  className="my-2 max-w-full max-h-[150px] border border-gray-300 rounded-md object-contain"
                />
              </div>
            )}
            <label
              htmlFor="prizePhoto"
              className="block text-sm font-medium text-gray-700"
            >
              Prize Media
            </label>
            <input
              type="file"
              name="prizePhoto"
              id="prizePhoto"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "prizePhoto")}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="creditsRequired"
              className="block text-sm font-medium text-gray-700"
            >
              Credits Required
            </label>
            <input
              type="number"
              name="creditsRequired"
              id="creditsRequired"
              value={contestData.creditsRequired}
              onChange={handleChange}
              placeholder="Enter Credits Required"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Contest Location (Country)
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={contestData.country}
              onChange={handleChange}
              placeholder="Enter Country"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700"
            >
              Contest Location (City)
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={contestData.city}
              onChange={handleChange}
              placeholder="Enter City"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Contest Location (Address)
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={contestData.address}
              onChange={handleChange}
              placeholder="Enter Full Address"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              value={contestData.gender}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={contestData.status}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value={"draft"}>Draft</option>
              <option value={"ongoing"}>Ongoing</option>
              <option value={"upcoming"}>Upcoming</option>
              <option value={"winner"}>Winner</option>
              <option value={"finished"}>Finished</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="ageTo"
              className="block text-sm font-medium text-gray-700"
            >
              age to
            </label>
            <input
              type="number"
              name="ageTo"
              id="ageTo"
              value={contestData.ageTo}
              onChange={handleChange}
              placeholder="Enter Age"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="ageFrom"
              className="block text-sm font-medium text-gray-700"
            >
              age from
            </label>
            <input
              type="number"
              name="ageFrom"
              id="ageFrom"
              value={contestData.ageFrom}
              onChange={handleChange}
              placeholder="Enter Age"
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex space-x-2">
            <div className="w-1/2">
              <label
                htmlFor="startDate"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={handleChangeStartDate}
                dateFormat="MMMM d, yyyy"
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="startDate"
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="endDate"
                className="block text-sm font-medium text-gray-700"
              >
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={handleChangeEndDate}
                dateFormat="MMMM d, yyyy"
                className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                id="endDate"
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full p-3 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {contestId ? "Update Contest" : "Create Contest"}
        </button>
      </form>

      {data && <ContestParticipants contestID={data.contestID.toString()} />}
    </div>
  );
};

export default ContextForm;
