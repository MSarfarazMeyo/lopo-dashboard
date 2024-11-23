import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Dropdown,
  Menu,
  Space,
  Select,
  Skeleton,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { DownOutlined } from "@ant-design/icons";
import {
  useAllUsers,
  useDeleteUser,
  useUpdateUser,
} from "../../hooks/useUsers"; // Assuming these hooks are implemented
import { showSuccess, showError } from "../../utils/notification";
import { IUser } from "../../types/types";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

enum EnumUserStatus {
  active = "active",
  suspended = "suspended",
  blocked = "blocked",
}

export enum UserLevelEnum {
  free = "free",
  user = "user",
  admin = "admin",
}

const ManageUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const navigate = useNavigate();
  // Fetch users
  const { data: users, isLoading, isError } = useAllUsers();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();
  const queryClient = useQueryClient();

  // Dropdown menu actions for user
  const menu = (userID: number) => (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() =>
          navigate(`/dashboard/users/edit`, {
            state: userID,
          })
        }
      >
        Edit
      </Menu.Item>
      <Menu.Item key="2" danger onClick={() => handleDelete(userID)}>
        Delete
      </Menu.Item>
      <Menu.Item
        key="3"
        onClick={() =>
          navigate(`/dashboard/users/details`, {
            state: userID,
          })
        }
      >
        View Details
      </Menu.Item>
    </Menu>
  );

  const handleDelete = (userID: number) => {
    deleteUser(userID, {
      onSuccess: () => {
        showSuccess("Deleted", `User ${userID} deleted successfully.`);
        queryClient.invalidateQueries({ queryKey: ["all-users"] });
      },
      onError: (error) => {
        showError("Error", `Failed to delete user ${userID}.`);
        console.error(error);
      },
    });
  };

  const handleUserLevelChange = (id: number, userLevel: UserLevelEnum) => {
    updateUser(
      { userID: id, userData: { userLevel } },
      {
        onSuccess: () => {
          showSuccess("Updated", "User level updated successfully.");
          queryClient.invalidateQueries({ queryKey: ["all-users"] });
        },
        onError: () => {
          showError("Error", "Failed to update user level.");
        },
      }
    );
  };

  const handleStatusChange = (id: number, status: EnumUserStatus) => {
    updateUser(
      { userID: id, userData: { status } },
      {
        onSuccess: () => {
          showSuccess("updated", "Status updated successfully.");
          queryClient.invalidateQueries({ queryKey: ["all-users"] });
        },
        onError: () => {
          showError("Error", "Failed to update status.");
        },
      }
    );
  };

  const columns: ColumnsType<IUser> = [
    {
      title: "User ID",
      dataIndex: "userID",
      key: "userID",
      sorter: (a, b) => a.userID - b.userID,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div className="p-2">
          <Input
            placeholder="Search Email"
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
        record.email.toLowerCase().includes(value.toString().toLowerCase()),
    },
    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
    },

    {
      title: "Wallet Credit",
      dataIndex: "walletCredit",
      key: "walletCredit",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: Object.values(EnumUserStatus).map((status) => ({
        text: status.charAt(0).toUpperCase() + status.slice(1),
        value: status,
      })),
      onFilter: (value, record) => record.status === value,
      render: (status: EnumUserStatus, record) => (
        <Select
          defaultValue={status}
          onChange={(newStatus) =>
            handleStatusChange(record.userID, newStatus as EnumUserStatus)
          }
          className="w-full"
        >
          {Object.values(EnumUserStatus).map((status) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      ),
    },

    {
      title: "User Level",
      dataIndex: "userLevel",
      key: "userLevel",
      render: (userLevel: UserLevelEnum, record) => (
        <Select
          defaultValue={userLevel}
          onChange={(newUserLevel) =>
            handleUserLevelChange(record.userID, newUserLevel as UserLevelEnum)
          }
          className="w-full"
        >
          {Object.values(UserLevelEnum).map((level) => (
            <Select.Option key={level} value={level}>
              {level.charAt(0).toUpperCase() + level.slice(1)}{" "}
              {/* Capitalize the first letter */}
            </Select.Option>
          ))}
        </Select>
      ),
    },

    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown overlay={menu(record.userID)} trigger={["click"]}>
          <Space>
            Actions <DownOutlined />
          </Space>
        </Dropdown>
      ),
    },
  ];

  if (isError) {
    showError("", "Error loading users");
    return <div>Error loading users.</div>;
  }

  // Filter users based on search term
  const filteredUsers = users?.filter(
    (user: IUser) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 lg:max-w-[calc(100vw-300px)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <Button
          type="primary"
          onClick={() => navigate("/dashboard/users/addnew")}
        >
          Add New User
        </Button>
      </div>
      <Input
        placeholder="Search users by email or name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {isLoading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="userID"
          pagination={{ pageSize: 10 }}
          scroll={{ x: "max-content" }}
        />
      )}
    </div>
  );
};

export default ManageUsers;
