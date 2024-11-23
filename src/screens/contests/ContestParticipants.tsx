import React from "react";
import { Table, Spin, Skeleton, Popconfirm, Button, Select } from "antd";
import {
  useGetAllParticipants,
  useRemoveParticipant,
} from "../../hooks/useParticipants";
import { showError, showSuccess } from "../../utils/notification";
import { useQueryClient } from "@tanstack/react-query";

const ContestParticipants: React.FC<{ contestID: string }> = ({
  contestID,
}) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useGetAllParticipants(contestID);

  const { mutate: removeParticipant } = useRemoveParticipant();

  const handleDelete = (participantId: string) => {
    removeParticipant(participantId, {
      onSuccess: () => {
        showSuccess("Participant removed successfully");
        queryClient.invalidateQueries({ queryKey: ["applicants"] });
      },
      onError: () => {
        showError("Failed to remove participant");
      },
    });
  };

  const handleStatusChange = (participantId: string, status: string) => {
    console.log(`Updating status for ${participantId} to ${status}`);
    showSuccess("", `Updating status for ${participantId} to ${status}`);

    //  updateParticipantStatus(participantId, status);
  };

  if (error) {
    showError("Error fetching participants");
    return <div>Error fetching participants</div>;
  }

  const columns = [
    {
      title: "participant ID",
      dataIndex: "participantID",
      key: "participantID",
    },
    {
      title: "User ID",
      dataIndex: "userID",
      key: "userID",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: any) => (
        <Select
          defaultValue={status}
          onChange={(value) => handleStatusChange(record.participantID, value)}
        >
          <Select.Option value="Pending">Pending</Select.Option>
          <Select.Option value="Approved">Approved</Select.Option>
          <Select.Option value="Rejected">Rejected</Select.Option>
        </Select>
      ),
    },
    {
      title: "Submission Date",
      dataIndex: "submissionDate",
      key: "submissionDate",
      render: (submissionDate: string) => {
        const date = new Date(submissionDate);
        return date.toLocaleString(); // Format the date
      },
    },

    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: any) => (
        <div>
          <Popconfirm
            title="Are you sure to delete this participant?"
            onConfirm={() => handleDelete(record.participantID)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-semibold mb-4">Contest Participants</h2>

      {isLoading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          columns={columns}
          dataSource={data || []}
          rowKey="participantID"
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      )}
    </div>
  );
};

export default ContestParticipants;
