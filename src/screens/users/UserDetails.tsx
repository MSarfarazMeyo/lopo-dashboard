import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input, Button, Select, Divider, InputNumber } from 'antd';
import { useUserById, useUpdateUser } from '../../hooks/useUsers';
import { showSuccess, showError } from '../../utils/notification';

const UserDetails: React.FC = () => {
  const location = useLocation();
  const userID = location.state; // Get userID from state

  const { data: user, isLoading } = useUserById(userID!); // Fetch user data
  const { mutate: updateUser } = useUpdateUser();
  // const { mutate: updateWallet } = useUpdateWallet();

  const [userForm] = Form.useForm();
  const [walletForm] = Form.useForm();
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (user) {
      userForm.setFieldsValue(user.user);
      walletForm.setFieldsValue(user.wallet);
    }
  }, [user, userForm, walletForm]);

  const handleUserSave = (values: any) => {
    updateUser(
      { userID, userData: values },
      {
        onSuccess: () => {
          showSuccess('Updated', 'User details updated successfully.');
          setEditing(false);
        },
        onError: () => {
          showError('Error', 'Failed to update user details.');
        },
      }
    );
  };

  const handleWalletSave = (values: any) => {
    // updateWallet(
    //   { userID, walletData: values },
    //   {
    //     onSuccess: () => {
    //       showSuccess("Updated", "User financial details updated successfully.");
    //       setEditing(false);
    //     },
    //     onError: () => {
    //       showError("Error", "Failed to update user financial details.");
    //     },
    //   }
    // );
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto  p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Details</h2>

      {/* User Details Form */}
      <Form
        form={userForm}
        layout="vertical"
        onFinish={handleUserSave}
        disabled={!editing}
      >
        <Divider>User Details</Divider>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="userID"
            label="User ID"
          >
            <Input
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled
            />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="googleID"
            label="Google ID"
          >
            <Input
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled
            />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="email"
            label="Email"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="firstName"
            label="First Name"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="lastName"
            label="Last Name"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="status"
            label="Status"
          >
            <Select>
              <Select.Option value="Active">Active</Select.Option>
              <Select.Option value="Inactive">Inactive</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="photo"
            label="Photo"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="age"
            label="Age"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="gender"
            label="Gender"
          >
            <Select>
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="userLevel"
            label="User Level"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="phone"
            label="Phone"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="publicProfile"
            label="Public Profile URL"
          >
            <Input
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled
              placeholder="Not implemented yet"
            />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit">
          Save User Details
        </Button>
      </Form>

      {/* Wallet Details Form */}
      <Form
        form={walletForm}
        layout="vertical"
        onFinish={handleWalletSave}
        disabled={!editing}
        className="mt-8"
      >
        <Divider>User Financials</Divider>
        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="walletID"
            label="Wallet ID"
          >
            <Input
              className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled
            />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="credits"
            label="Credits"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="creditsSpent"
            label="Credits Spent"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="payoutBank"
            label="Payout Bank"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="payoutAccount"
            label="Payout Account"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="address"
            label="Address"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
          <Form.Item
            className="block text-sm font-medium text-gray-700"
            name="shippingAddress"
            label="Shipping Address"
          >
            <Input className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit">
          Save Financial Details
        </Button>
      </Form>

      {/* Logs */}
      <Divider>Logs</Divider>
      <div className="grid grid-cols-2 gap-4">
        <Form.Item
          className="block text-sm font-medium text-gray-700"
          name="signUpDate"
          label="Sign-Up Date"
        >
          <Input
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled
          />
        </Form.Item>
        <Form.Item
          className="block text-sm font-medium text-gray-700"
          name="deleteDate"
          label="Delete Date"
        >
          <Input
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled
          />
        </Form.Item>
        <Form.Item
          className="block text-sm font-medium text-gray-700"
          name="lastActivity"
          label="Last Activity Data"
        >
          <Input
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled
          />
        </Form.Item>
        <Form.Item
          className="block text-sm font-medium text-gray-700"
          name="lastLoginIP"
          label="Last Login IP"
        >
          <Input
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled
          />
        </Form.Item>
        <Form.Item
          className="block text-sm font-medium text-gray-700"
          name="location"
          label="Location (Country / City)"
        >
          <Input
            className="mt-2 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled
          />
        </Form.Item>
      </div>
    </div>
  );
};

export default UserDetails;
