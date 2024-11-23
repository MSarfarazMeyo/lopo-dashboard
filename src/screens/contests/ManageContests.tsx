import React, { useEffect, useState } from "react";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Menu,
  Space,
  Select,
  Skeleton,
  Modal,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { DownOutlined } from "@ant-design/icons";
import {
  useDeleteContest,
  useGetContests,
  useUpdateContest,
} from "../../hooks/useContests ";
import { showSuccess, showError } from "../../utils/notification";
import { IContest } from "../../types/types";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import useDebouncedValue from "../../hooks/useDebouncedValue";

enum EnumContestStatus {
  draft = "draft",
  ongoing = "ongoing",
  upcoming = "upcoming",
  winner = "winner",
  finished = "finished",
}

const ManageContests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<{ [key: string]: any }>({});

  const navigate = useNavigate();
  const debouncedSearch = useDebouncedValue(searchTerm, 500);

  const {
    data: contests,
    isLoading,
    isError,
  } = useGetContests(debouncedSearch, filters);
  const { mutate: updateContest } = useUpdateContest();
  const { mutate: deleteContest } = useDeleteContest();
  const [uniqueCountries, setUniqueCountries] = useState<any[]>([]);
  const [uniqueCities, setUniqueCities] = useState<any[]>([]);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (contests) {
      // Extract unique country and city values from contests data
      const countries = Array.from(
        new Set(contests.map((contest) => contest?.country))
      );
      const cities = Array.from(
        new Set(contests.map((contest) => contest?.city))
      );

      setUniqueCountries(countries);
      setUniqueCities(cities);
    }
  }, [contests]);

  const handleFilterChange = (field: string, value: any) => {
    setFilters({ ...filters, [field]: value });
  };

  const removeFilter = (key: string) => {
    setFilters((prevFilters) => {
      const { [key]: _, ...rest } = prevFilters; // Destructure to remove the dynamic key
      return rest; // Return the updated state without the key
    });
  };

  // Dropdown menu actions
  const menu = (contestID: number, alias: any) => (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() =>
          navigate(`/dashboard/contests/edit`, {
            state: alias,
          })
        }
      >
        Edit
      </Menu.Item>

      <Menu.Item
        key="3"
        danger
        onClick={() => {
          Modal.confirm({
            title: "Are you sure you want to to delete contest?",
            content: "All media related to this contest will also be deleted",
            okText: "Yes, Delete",
            cancelText: "Cancel",
            onOk: () => {
              handleDelete(contestID);
            },
          });
        }}
      >
        Delete
      </Menu.Item>
      <Menu.Item key="4">Details</Menu.Item>
    </Menu>
  );

  const handleDelete = (contestID: number) => {
    deleteContest(contestID.toString(), {
      onSuccess: () => {
        showSuccess("Deleted", `Contest ${contestID} deleted successfully.`);
        queryClient.invalidateQueries({ queryKey: ["all-contests"] });
      },
      onError: (error) => {
        showError("Error", `Failed to delete contest ${contestID}.`);
        console.error(error);
      },
    });
  };

  const handleStatusChange = (id: number, status: EnumContestStatus) => {
    updateContest(
      { id: id.toString(), contestData: { status } },
      {
        onSuccess: () => {
          showSuccess("updated", "Status updated successfully.");
          queryClient.invalidateQueries({ queryKey: ["all-contests"] });
        },
        onError: () => {
          showError("Error", "Failed to update status.");
        },
      }
    );
  };

  const columns: ColumnsType<IContest> = [
    {
      title: "Contest ID",
      dataIndex: "contestID",
      key: "contestID",
      sorter: (a, b) => a.contestID - b.contestID,
    },
    {
      title: "Contest Name",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="p-2">
          <Input
            placeholder="Search Contest Name"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            onBlur={() => confirm()}
          />
          <div className="flex gap-2 mt-2">
            <Button type="primary" size="small" onClick={() => confirm()}>
              Search
            </Button>
            <Button size="small" onClick={() => clearFilters && clearFilters()}>
              Reset
            </Button>
          </div>
        </div>
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      filters: uniqueCountries.map((country) => ({
        text: country,
        value: country,
      })),
      onFilter: (value, record) => record.country?.toLowerCase() === value,
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      filters: uniqueCities.map((city) => ({
        text: city,
        value: city,
      })),
      onFilter: (value, record) => record.city?.toLowerCase() === value,

      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: EnumContestStatus, record) => (
        <Select
          defaultValue={status}
          onChange={(newStatus) =>
            handleStatusChange(record.contestID, newStatus as EnumContestStatus)
          }
          className="w-full"
        >
          {Object.values(EnumContestStatus).map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      ),

      filterDropdown: ({ confirm, setSelectedKeys, selectedKeys }) => (
        <div className="p-2">
          <Select
            placeholder="Select Status"
            value={selectedKeys[0]} // Bind the selected value
            onChange={(value) => {
              // Update selected key
              setSelectedKeys(value ? [value] : []);

              if (value) {
                handleFilterChange("status", value); // Apply selected value
              } else {
                removeFilter("status"); // Remove status from filters if no value is selected
              }
              confirm(); // Confirm the filter
            }}
            style={{ width: "100%", marginBottom: "8px" }}
            allowClear // Allows clearing the selection
          >
            {Object.values(EnumContestStatus).map((status) => (
              <Select.Option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Select.Option>
            ))}
          </Select>
        </div>
      ),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Credits",
      dataIndex: "creditsRequired",
      key: "creditsRequired",
      sorter: (a, b) => a.creditsRequired - b.creditsRequired,
    },
    {
      title: "People Joined",
      dataIndex: "participantsCount",
      key: "participantsCount",
      sorter: (a, b) => a.participantsCount - b.participantsCount,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={menu(record.contestID, record.alias)}
          trigger={["click"]}
        >
          <Space>
            Actions <DownOutlined />
          </Space>
        </Dropdown>
      ),
    },
  ];

  if (isError) {
    return <div>Error loading contests.</div>;
  }

  // Filter contests based on search term
  const filteredContests = contests?.filter((contest) =>
    contest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 lg:max-w-[calc(100vw-300px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Contests</h1>
        <Button
          type="primary"
          onClick={() => navigate("/dashboard/contests/addnew")}
        >
          Create New Contest
        </Button>
      </div>
      <Input
        placeholder="Search contests..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {isLoading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredContests}
          rowKey="contestID"
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      )}
    </div>
  );
};

export default ManageContests;
